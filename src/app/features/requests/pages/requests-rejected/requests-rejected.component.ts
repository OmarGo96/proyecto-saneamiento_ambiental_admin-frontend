import {Component, inject, OnInit, ViewChild} from '@angular/core';
import {IconFieldModule} from 'primeng/iconfield';
import {InputIconModule} from 'primeng/inputicon';
import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import {DatePipe} from '@angular/common';
import {PopoverModule} from 'primeng/popover';
import {TableModule} from 'primeng/table';
import {TableSkeletonComponent} from '../../../../shared/components/skeleton/table-skeleton/table-skeleton.component';
import {RequestsService} from '../../services/requests.service';
import {AlertsService} from '../../../../core/services/alerts.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {DialogService, DynamicDialogRef} from 'primeng/dynamicdialog';
import {Router} from '@angular/router';
import {ConfirmDialog} from 'primeng/confirmdialog';
import {RequestsFileDialogComponent} from '../../dialogs/requests-file-dialog/requests-file-dialog.component';
import {ConfirmationService} from 'primeng/api';

@Component({
    selector: 'app-requests-rejected',
    imports: [
        IconFieldModule,
        InputIconModule,
        InputTextModule,
        TableModule,
        PopoverModule,
        ButtonModule,
        TableSkeletonComponent,
        DatePipe,
        ConfirmDialog
    ],
    providers: [AlertsService, ConfirmationService, DialogService],
    templateUrl: './requests-rejected.component.html',
    styleUrl: './requests-rejected.component.scss'
})
export class RequestsRejectedComponent implements OnInit {
    @ViewChild('table') table: any | undefined;


    private requestsService = inject(RequestsService)
    private alertsService = inject(AlertsService);
    private spinner = inject(NgxSpinnerService);
    private dialogService = inject(DialogService);
    private dialogRef: DynamicDialogRef | undefined;
    private router = inject(Router);

    public isLoading = false;

    public requests: any;

    ngOnInit() {
        this.getRejectedRequests();
    }


    public getRejectedRequests() {
        this.isLoading = true;
        this.requestsService.getRequestsByStatus('rejected').subscribe({
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

    public openRequestsFileDialog(request: any) {
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
                this.getRejectedRequests();
            }
        });
    }


    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.table?.filterGlobal(filterValue, 'contains');
    }
}
