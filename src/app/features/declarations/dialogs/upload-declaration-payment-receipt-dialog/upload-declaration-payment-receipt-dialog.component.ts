import {Component, inject, OnInit} from '@angular/core';
import {Button, ButtonModule} from 'primeng/button';
import {CurrencyPipe} from '@angular/common';
import {FormBuilder} from '@angular/forms';
import {DynamicDialogConfig, DynamicDialogRef} from 'primeng/dynamicdialog';
import {FileUploadModule} from 'primeng/fileupload';
import {AlertsService} from '../../../../core/services/alerts.service';
import {DeclarationsService} from '../../services/declarations.service';
import {ConfirmationService} from 'primeng/api';
import {ConfirmDialog} from 'primeng/confirmdialog';

@Component({
    selector: 'app-upload-declaration-payment-receipt-dialog',
    imports: [
        ButtonModule,
        CurrencyPipe,
        FileUploadModule,
        ConfirmDialog
    ],
    providers: [AlertsService, ConfirmationService],
    templateUrl: './upload-declaration-payment-receipt-dialog.component.html',
    styleUrl: './upload-declaration-payment-receipt-dialog.component.scss'
})
export class UploadDeclarationPaymentReceiptDialogComponent implements OnInit {

    private declarationService = inject(DeclarationsService);
    private alertsService = inject(AlertsService);
    private formBuilder = inject(FormBuilder);
    private dialogRef = inject(DynamicDialogRef);
    private dialogConfig = inject(DynamicDialogConfig);

    public declaration: any;

    public isUploading: boolean = false;
    public selectedFiles: any[] = [];
    public fileUploaded: any = false;

    ngOnInit() {
        this.declaration = this.dialogConfig.data.declaration;
    }

    onUpload(event: any) {
        this.alertsService.confirmRequest('¿Estás seguro de adjuntar este recibo de pago?').subscribe({
            next: data => {
                this.isUploading = true;

                this.selectedFiles = event.files;
                let formData = new FormData();

                for (const file of this.selectedFiles) {
                    formData.append('file', file);
                }

                this.declarationService.attachPaymentReceipt(this.declaration.id, formData).subscribe({
                    next: (res: any) => {
                        this.isUploading = false;
                        this.alertsService.successAlert(res.message).then(res => {
                            if (res.isConfirmed){
                                this.dialogRef.close(true);
                            }
                        });
                    },
                    error: err => {
                        this.isUploading = false;
                        this.alertsService.errorAlert(err.error.errors);
                    }
                });
            }
        })



    }

}
