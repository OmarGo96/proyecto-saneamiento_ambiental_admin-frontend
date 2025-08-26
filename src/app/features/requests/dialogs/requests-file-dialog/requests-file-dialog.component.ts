import {Component, inject, OnInit} from '@angular/core';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import {RequestsService} from '../../services/requests.service';
import {AlertsService} from '../../../../core/services/alerts.service';
import {DynamicDialogConfig, DynamicDialogRef} from 'primeng/dynamicdialog';
import {NgxSpinnerService} from 'ngx-spinner';
import {ToolbarModule} from 'primeng/toolbar';
import {ButtonModule} from 'primeng/button';
import {SkeletonModule} from 'primeng/skeleton';
import {ToastModule} from 'primeng/toast';

@Component({
    selector: 'app-requests-file-dialog',
    imports: [
        ToolbarModule,
        ButtonModule,
        SkeletonModule,
        ToastModule
    ],
    templateUrl: './requests-file-dialog.component.html',
    styleUrl: './requests-file-dialog.component.scss'
})
export class RequestsFileDialogComponent implements OnInit {

    private requestsService = inject(RequestsService)
    private alertsService = inject(AlertsService);
    private spinner = inject(NgxSpinnerService);
    private sanitizer = inject(DomSanitizer);
    private dialogRef = inject(DynamicDialogRef);
    private dialogConfig = inject(DynamicDialogConfig);

    public pdfUrl: any;
    public pdfLib: any;
    public safeUrl: any;
    public currentPage: any;
    public pdfCanvas: any;
    public pdfContext: any;
    public pdfDoc: any;

    public isSmallDivice: any;
    public initialScale: any;
    public scale: any;

    public pageNumPending = false;
    public pageRendering = false;

    public pageNum = 1;
    public scaledBy = 0.5;

    public token: any;
    public isSigned: any;
    public pdfBlob: any;

    public isLoading: boolean = false;
    public request: any;

    ngOnInit() {
        this.request = this.dialogConfig.data.request;
        this.pdfLib = (window as any)['pdfjs-dist/build/pdf'];

        this.pdfLib.GlobalWorkerOptions.workerSrc = 'vendor/pdfjs/build/pdf.worker.js';

        this.pdfCanvas = document.getElementById('pdf-viewer') as HTMLCanvasElement;
        this.pdfContext = this.pdfCanvas.getContext('2d');

        this.previewDocument();

        this.currentPage = 1;

        this.isSmallDivice = window.innerWidth <= 1024;
        this.initialScale = 1.1;
        this.scale = this.initialScale;
    }

    previewDocument() {
        this.spinner.show();
        this.requestsService.getDocument(this.request.pdf).subscribe({
            next: data => {
                this.pdfBlob = data;
                this.pdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(data));
                this.safeUrl = this.pdfUrl.changingThisBreaksApplicationSecurity;
                this.pdfLib.getDocument(this.safeUrl).promise.then((pdfDoc: any) => {
                    this.pdfDoc = pdfDoc;
                    this.renderPage(1);
                    this.isLoading = false; // Ocultar el cargando al terminar de renderizar
                }).catch((err: any) => {
                    console.log(err);
                    this.isLoading = false; // Ocultar si hay error cargando el PDF
                });
            },
            error: err => {
                this.alertsService.errorAlert(err.error.message);
            }
        })
    }

    renderPage(num: any, zoom?: any) {
        // Using promise to fetch the page
        this.pdfDoc.getPage(num).then(async (page: any) => {
            const viewport = page.getViewport({scale: (zoom) ? zoom : this.scale});
            this.pdfCanvas.height = viewport.height;
            this.pdfCanvas.width = viewport.width;

            // Render PDF page into canvas context
            const renderContext = {
                canvasContext: this.pdfContext,
                viewport
            };
            const renderTask = page.render(renderContext);

            // Wait for rendering to finish
            renderTask.promise.then(() => {
                if (this.pageNumPending) {
                    // New page rendering is pending
                    this.renderPage(this.pageNumPending);
                    this.pageNumPending = false;
                }
            });
        });
    }

    zoomIn() {
        if (!this.pdfDoc) {
            return;
        }
        this.scale += this.scaledBy;
        this.renderPage(this.pageNum);
    }

    zoomOut() {
        if (!this.pdfDoc) {
            return;
        }
        this.scale -= this.scaledBy;
        this.renderPage(this.pageNum);
    }

    resetZoom() {
        if (!this.pdfDoc) {
            return;
        }
        this.scale = this.initialScale;
        this.renderPage(this.pageNum);
    }

    prevPage() {
        if (this.pageNum <= 1) {
            return;
        }

        this.pageNum--;
        this.queueRenderPage(this.pageNum);
    }

    queueRenderPage(num: any) {
        if (this.pageRendering) {
            this.pageNumPending = num;
        } else {
            this.renderPage(num);
        }
    }

    nextPage() {
        if (this.pageNum >= this.pdfDoc.numPages) {
            return;
        }

        this.pageNum++;
        this.queueRenderPage(this.pageNum);
    }
}
