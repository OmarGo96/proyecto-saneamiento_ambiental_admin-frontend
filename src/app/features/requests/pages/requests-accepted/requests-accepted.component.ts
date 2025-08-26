import {Component, inject, OnInit, ViewChild} from '@angular/core';
import {IconField, IconFieldModule} from 'primeng/iconfield';
import {InputIcon, InputIconModule} from 'primeng/inputicon';
import {InputText, InputTextModule} from 'primeng/inputtext';
import {TableModule} from 'primeng/table';
import {PopoverModule} from 'primeng/popover';
import {ButtonModule} from 'primeng/button';
import {TableSkeletonComponent} from '../../../../shared/components/skeleton/table-skeleton/table-skeleton.component';
import {DatePipe} from '@angular/common';
import {ConfirmDialog} from 'primeng/confirmdialog';
import {RequestsService} from '../../services/requests.service';
import {AlertsService} from '../../../../core/services/alerts.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {DialogService, DynamicDialogRef} from 'primeng/dynamicdialog';
import {Router} from '@angular/router';
import {RequestsFileDialogComponent} from '../../dialogs/requests-file-dialog/requests-file-dialog.component';
import {ConfirmationService} from 'primeng/api';

@Component({
    selector: 'app-requests-accepted',
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
    templateUrl: './requests-accepted.component.html',
    styleUrl: './requests-accepted.component.scss'
})
export class RequestsAcceptedComponent implements OnInit {
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
        this.getAcceptedRequests();
    }


    public getAcceptedRequests(){
        this.isLoading = true;
        this.requestsService.getRequestsByStatus('validated').subscribe({
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
                this.getAcceptedRequests();
            }
        });
    }


    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.table?.filterGlobal(filterValue, 'contains');
    }
}
