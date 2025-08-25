import {Component, inject, OnInit, ViewChild} from '@angular/core';
import {IconFieldModule} from 'primeng/iconfield';
import {InputIconModule} from 'primeng/inputicon';
import {InputTextModule} from 'primeng/inputtext';
import {TableModule} from 'primeng/table';
import {PopoverModule} from 'primeng/popover';
import {ButtonModule} from 'primeng/button';
import {AlertsService} from '../../../../core/services/alerts.service';
import {ConfirmationService} from 'primeng/api';
import {DialogService, DynamicDialogRef} from 'primeng/dynamicdialog';
import {Router} from '@angular/router';
import {CurrencyPipe, DatePipe} from '@angular/common';
import {TableSkeletonComponent} from '../../../../shared/components/skeleton/table-skeleton/table-skeleton.component';
import {DeclarationsStatus} from '../../../declarations/constants/declarations-status';
import {RequestsService} from '../../services/requests.service';
import {
    UploadDeclarationPaymentReceiptDialogComponent
} from '../../../declarations/dialogs/upload-declaration-payment-receipt-dialog/upload-declaration-payment-receipt-dialog.component';
import {RequestsFileDialogComponent} from '../../dialogs/requests-file-dialog/requests-file-dialog.component';

@Component({
    selector: 'app-requests-registrations',
    imports: [
        IconFieldModule,
        InputIconModule,
        InputTextModule,
        TableModule,
        PopoverModule,
        ButtonModule,
        CurrencyPipe,
        TableSkeletonComponent,
        DatePipe
    ],
    providers: [AlertsService, ConfirmationService, DialogService],
    templateUrl: './requests-registrations.component.html',
    styleUrl: './requests-registrations.component.scss'
})
export class RequestsRegistrationsComponent implements OnInit {
    @ViewChild('table') table: any | undefined;


    private requestsService = inject(RequestsService)
    private alertsService = inject(AlertsService);
    private dialogService = inject(DialogService);
    private dialogRef: DynamicDialogRef | undefined;
    private router = inject(Router);

    public isLoading = false;

    public requests: any;

    ngOnInit() {
        this.getCreatedRequests();
    }


    public getCreatedRequests(){
        this.isLoading = true;
        this.requestsService.getRequestsByStatus('create').subscribe({
            next: data => {
                this.isLoading = false;
                this.requests = data.requests;
            },
            error: err => {
                this.isLoading = false;
                this.alertsService.errorAlert(err.error.errors);
            }
        });
    }

    public openRequestsFileDialog(request: any){
        this.dialogRef = this.dialogService.open(RequestsFileDialogComponent, {
            header: 'Documento de la Solicitud',
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
                request
            },
        });

        this.dialogRef.onClose.subscribe((result) => {
            if (result) {
                this.getCreatedRequests();
            }
        });
    }


    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.table?.filterGlobal(filterValue, 'contains');
    }

}
