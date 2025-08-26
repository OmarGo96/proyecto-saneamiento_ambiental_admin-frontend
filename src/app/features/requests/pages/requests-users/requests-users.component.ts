import {Component, inject, OnInit, ViewChild} from '@angular/core';
import {IconFieldModule} from 'primeng/iconfield';
import {InputIconModule} from 'primeng/inputicon';
import {InputTextModule} from 'primeng/inputtext';
import {ConfirmDialog} from 'primeng/confirmdialog';
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
import {RequestsFileDialogComponent} from '../../dialogs/requests-file-dialog/requests-file-dialog.component';
import {RejectRequestsDialogComponent} from '../../dialogs/reject-requests-dialog/reject-requests-dialog.component';
import {ConfirmationService} from 'primeng/api';

@Component({
    selector: 'app-requests-users',
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
    templateUrl: './requests-users.component.html',
    styleUrl: './requests-users.component.scss'
})
export class RequestsUsersComponent implements OnInit {
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
        this.getUsersRequests();
    }


    public getUsersRequests() {
        this.isLoading = true;
        this.requestsService.getUserRequests().subscribe({
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
                this.getUsersRequests();
            }
        });
    }

    public acceptRequest(request: any) {
        this.alertsService.confirmRequest("¿Está seguro de realizar esta acción?").subscribe({
            next: res => {
                this.spinner.show();
                const data = {register_id: request.id, estatus: '1'}
                this.requestsService.processRequest(data).subscribe({
                    next: res => {
                        this.spinner.hide();
                        this.alertsService.successAlert(res.message).then(res => {
                            if (res.isConfirmed) {
                                this.getUsersRequests();
                            }
                        });
                    },
                    error: err => {
                        this.spinner.hide();
                        this.alertsService.errorAlert(err.error.errors);
                    }
                })
            }
        })
    }

    public openRejectRequestDialog(request: any) {
        this.dialogRef = this.dialogService.open(RejectRequestsDialogComponent, {
            header: 'Rechazo de solicitud',
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
                this.getUsersRequests();
            }
        });
    }


    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.table?.filterGlobal(filterValue, 'contains');
    }
}
