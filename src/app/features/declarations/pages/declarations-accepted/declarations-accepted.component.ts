import {Component, inject, OnInit, ViewChild} from '@angular/core';
import {ButtonModule} from 'primeng/button';
import {IconFieldModule} from 'primeng/iconfield';
import {InputIconModule} from 'primeng/inputicon';
import {InputTextModule} from 'primeng/inputtext';
import {DialogService, DynamicDialogRef} from 'primeng/dynamicdialog';
import {TableModule} from 'primeng/table';
import {PopoverModule} from 'primeng/popover';
import {TableSkeletonComponent} from '../../../../shared/components/skeleton/table-skeleton/table-skeleton.component';
import {DeclarationsService} from '../../services/declarations.service';
import {AlertsService} from '../../../../core/services/alerts.service';
import {Router} from '@angular/router';
import {DeclarationsStatus} from '../../constants/declarations-status';
import {CurrencyPipe} from '@angular/common';
import {ConfirmationService} from 'primeng/api';
import {NgxSpinnerService} from 'ngx-spinner';
import {
    UploadDeclarationPaymentReceiptDialogComponent
} from '../../dialogs/upload-declaration-payment-receipt-dialog/upload-declaration-payment-receipt-dialog.component';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
    selector: 'app-declarations-accepted',
    imports: [
        IconFieldModule,
        InputIconModule,
        InputTextModule,
        TableModule,
        PopoverModule,
        ButtonModule,
        TableSkeletonComponent,
        CurrencyPipe
    ],
    providers: [AlertsService, ConfirmationService, DialogService],
    templateUrl: './declarations-accepted.component.html',
    styleUrl: './declarations-accepted.component.scss'
})
export class DeclarationsAcceptedComponent implements OnInit {

    @ViewChild('table') table: any | undefined;

    private declarationsService = inject(DeclarationsService)
    private alertsService = inject(AlertsService);
    private spinner = inject(NgxSpinnerService);
    private sanitizer = inject(DomSanitizer);
    private dialogService = inject(DialogService);
    private dialogRef: DynamicDialogRef | undefined;
    private router = inject(Router);

    public declarations: any;
    public declarationsStatus = DeclarationsStatus;
    public isLoading: boolean = false;
    public isDeleting: boolean = false;

    public pdfUrl: any;

    ngOnInit() {
        this.getDeclarationsAccepted()
    }

    public getDeclarationsAccepted(){
        this.isLoading = true;
        this.spinner.show();
        this.declarationsService.getDeclarationsByStatus('approved').subscribe({
            next: res => {
                this.spinner.hide();
                this.isLoading = false;
                this.declarations = res.statements;
            },
            error: err => {
                this.spinner.hide();
                this.isLoading = false;
                this.alertsService.errorAlert(err.error.errors);
            }
        });
    }

    public viewDeclarationDetails(declaration: any) {
        localStorage.setItem(this.declarationsService.declarationToken, btoa(JSON.stringify(declaration)));
        const url = this.router.serializeUrl(this.router.createUrlTree(['/administrador/declaraciones/detalle']));
        window.open(url, '_blank');
    }

    public openUploadPaymentReceipt(declaration: any){
        this.dialogRef = this.dialogService.open(UploadDeclarationPaymentReceiptDialogComponent, {
            header: 'Adjuntar recibo de pago',
            width: '40vw',
            closeOnEscape: false,
            modal: true,
            closable: true,
            baseZIndex: 1,
            breakpoints: {
                '960px': '75vw',
                '640px': '90vw'
            },
            data: {
                declaration
            },
        });

        this.dialogRef.onClose.subscribe((result) => {
            if (result) {
                this.getDeclarationsAccepted();
            }
        });
    }

    public getDeclarationReceipt(fileName: string){
        this.spinner.show();
        this.declarationsService.getDeclarationReceipt(fileName).subscribe({
            next: res => {
                this.spinner.hide();
                this.pdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(res));
                window.open(this.pdfUrl.changingThisBreaksApplicationSecurity, '_blank')
            },
            error: err => {
                this.spinner.hide();
                this.alertsService.errorAlert(['Ocurrio un error al obtener el documento. Intente de nuevo más tarde.']);
            }
        })
    }

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.table?.filterGlobal(filterValue, 'contains');
    }
}
