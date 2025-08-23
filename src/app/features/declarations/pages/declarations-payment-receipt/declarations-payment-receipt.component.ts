import {Component, inject, OnInit, ViewChild} from '@angular/core';
import {ButtonModule} from 'primeng/button';
import {IconFieldModule} from 'primeng/iconfield';
import {InputIconModule} from 'primeng/inputicon';
import {InputTextModule} from 'primeng/inputtext';
import {PopoverModule} from 'primeng/popover';
import {TableModule} from 'primeng/table';
import {TableSkeletonComponent} from '../../../../shared/components/skeleton/table-skeleton/table-skeleton.component';
import {AlertsService} from '../../../../core/services/alerts.service';
import {DialogService, DynamicDialogRef} from 'primeng/dynamicdialog';
import {Router} from '@angular/router';
import {DeclarationsService} from '../../services/declarations.service';
import {CurrencyPipe} from '@angular/common';
import {DeclarationsStatus} from '../../constants/declarations-status';
import {ConfirmationService} from 'primeng/api';
import {NgxSpinnerService} from 'ngx-spinner';
import {
    CompaniesGeolocationComponent
} from '../../../companies/dialogs/companies-geolocation/companies-geolocation.component';
import {
    UploadDeclarationPaymentReceiptDialogComponent
} from '../../dialogs/upload-declaration-payment-receipt-dialog/upload-declaration-payment-receipt-dialog.component';
import {ConfirmDialog} from 'primeng/confirmdialog';
import {
    RejectDeclarationDialogComponent
} from '../../dialogs/reject-declaration-dialog/reject-declaration-dialog.component';

@Component({
    selector: 'app-declarations-payment-receipt',
    imports: [
        IconFieldModule,
        InputIconModule,
        InputTextModule,
        TableModule,
        PopoverModule,
        ButtonModule,
        TableSkeletonComponent,
        CurrencyPipe,
        ConfirmDialog
    ],
    providers: [AlertsService, ConfirmationService, DialogService],
    templateUrl: './declarations-payment-receipt.component.html',
    styleUrl: './declarations-payment-receipt.component.scss'
})
export class DeclarationsPaymentReceiptComponent implements OnInit {

    @ViewChild('table') table: any | undefined;

    private declarationsService = inject(DeclarationsService)
    private alertsService = inject(AlertsService);
    private spinner = inject(NgxSpinnerService);
    private dialogService = inject(DialogService);
    private dialogRef: DynamicDialogRef | undefined;
    private router = inject(Router);

    public declarations: any;
    public declarationsStatus = DeclarationsStatus;
    public isLoading: boolean = false;
    public isDeleting: boolean = false;

    ngOnInit() {
        this.getDeclarationsPaymentReceipt()
    }

    public getDeclarationsPaymentReceipt(){
        this.isLoading = true;
        this.declarationsService.getDeclarationsByStatus('to_pay').subscribe({
            next: res => {
                this.isLoading = false;
                this.declarations = res.statements;
            },
            error: err => {
                this.isLoading = false;
                this.alertsService.errorAlert(err.error.errors);
            }
        });
    }

    public validatePayment(declaration: any){
        this.spinner.show();
        this.declarationsService.validatePayment(declaration.id).subscribe({
            next: res => {
                this.spinner.hide();
                this.alertsService.successAlert(res.message).then(res => {
                    if (res.isConfirmed){
                        this.getDeclarationsPaymentReceipt();
                    }
                });
            },
            error: err => {
                this.spinner.hide();
                this.alertsService.errorAlert([{message: err.error.errors}]);
            }
        })
    }

    acceptDeclaration(declaration: any){
        this.alertsService.confirmRequest('¿Estás seguro de aceptar esta declaración?').subscribe({
            next: res => {
                this.spinner.show();
                const data = { estatus: 2, statement_id: declaration.id };
                this.declarationsService.processDeclaration(data).subscribe({
                    next: (res: any) => {
                        this.spinner.hide();
                        this.alertsService.successAlert(res.message).then(res => {
                            if (res.isConfirmed){
                                this.getDeclarationsPaymentReceipt();
                            }
                        })
                    },
                    error: err => {
                        this.spinner.hide();
                        this.alertsService.errorAlert(err.error.errors);
                    }
                })
            }
        })
    }

    rejectDeclaration(declaration: any){
        this.dialogRef = this.dialogService.open(RejectDeclarationDialogComponent, {
            header: 'Rechazo de declaración',
            width: '30vw',
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
                this.getDeclarationsPaymentReceipt();
            }
        });
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
                this.getDeclarationsPaymentReceipt();
            }
        });
    }

    public viewDeclarationDetails(declaration: any) {
        localStorage.setItem(this.declarationsService.declarationToken, btoa(JSON.stringify(declaration)));
        this.router.navigate(['/declaraciones/detalle']);
    }

    public applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.table?.filterGlobal(filterValue, 'contains');
    }
}
