import {Component, inject, OnInit} from '@angular/core';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import {RequestsService} from '../../services/requests.service';
import {AlertsService} from '../../../../core/services/alerts.service';
import {DynamicDialogConfig, DynamicDialogRef} from 'primeng/dynamicdialog';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
  selector: 'app-requests-file-dialog',
  imports: [],
  templateUrl: './requests-file-dialog.component.html',
  styleUrl: './requests-file-dialog.component.scss'
})
export class RequestsFileDialogComponent implements OnInit {

    private requestsService = inject(RequestsService)
    private alertsService = inject(AlertsService);
    private spinner = inject(NgxSpinnerService);
    private sanitizer= inject(DomSanitizer);
    private dialogRef = inject(DynamicDialogRef);
    private dialogConfig = inject(DynamicDialogConfig);

    public file: SafeResourceUrl;
    public safeURL: Blob;
    public request: any;

    ngOnInit() {
        this.request = this.dialogConfig.data.request;
        this.getPdfRequest();
    }

    getPdfRequest(){
        this.spinner.show();
        this.requestsService.getDocument(this.request.pdf).subscribe({
            next: data => {
                this.spinner.hide();
                this.file = this.sanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(data));
                this.safeURL = this.file.changingThisBreaksApplicationSecurity;
            },
            error: err => {

            }
        })
    }
}
