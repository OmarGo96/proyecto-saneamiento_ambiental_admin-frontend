import { Component, inject, ViewChild } from '@angular/core';
import { ContribuyentesService } from '../../services/contribuyentes.service';
import { AlertsService } from '../../../../core/services/alerts.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { PopoverModule } from 'primeng/popover';
import { ButtonModule } from 'primeng/button';
import { TableSkeletonComponent } from '../../../../shared/components/skeleton/table-skeleton/table-skeleton.component';
import { ContribuyentesChangePasswordDialogComponent } from '../../dialogs/contribuyentes-change-password-dialog/contribuyentes-change-password-dialog.component';
import {
    ContribuyentesCompaniesDialogComponent
} from '../../dialogs/contribuyentes-companies-dialog/contribuyentes-companies-dialog.component';

@Component({
    selector: 'app-contribuyentes-list',
    imports: [
        IconFieldModule,
        InputIconModule,
        InputTextModule,
        TableModule,
        PopoverModule,
        ButtonModule,
        TableSkeletonComponent,
    ],
    templateUrl: './contribuyentes-list.component.html',
    styleUrl: './contribuyentes-list.component.scss',
    providers: [AlertsService, ConfirmationService, DialogService],
})
export class ContribuyentesListComponent {

    @ViewChild('table') table: any | undefined;
    private contribuyentesService = inject(ContribuyentesService);
    private alertsService = inject(AlertsService);
    private spinner = inject(NgxSpinnerService);
    private dialogService = inject(DialogService);
    private dialogRef: DynamicDialogRef | undefined;
    private router = inject(Router);

    public contribuyentes: any;
    public isLoading: boolean = false;
    public isDeleting: boolean = false;

    ngOnInit() {
        this.getContribuyentes();
    }

    private getContribuyentes() {
        this.spinner.show();
        this.contribuyentesService.getContribuyentes().subscribe({
            next: (data) => {
                this.spinner.hide();
                this.contribuyentes = data.users;
            },
            error: (err) => {
                this.spinner.hide();
                this.alertsService.errorAlert(err.error.errors);
            },
        });
    }

    openContribuyentesChangePasswordDialog(contribuyente: any) {
        this.dialogRef = this.dialogService.open(
            ContribuyentesChangePasswordDialogComponent,
            {
                data: {
                    contribuyente,
                },
                header: 'Gestionar contraseña',
                width: '20vw',
                closeOnEscape: false,
                modal: true,
                closable: true,
                baseZIndex: 1,
                breakpoints: {
                    '960px': '75vw',
                    '640px': '90vw',
                },
            },
        );

        this.dialogRef.onClose.subscribe((result) => {
            if (result) {
                this.getContribuyentes();
            }
        });
    }

    openContribuyentesCompaniesDialog(contribuyente: any) {
        this.dialogRef = this.dialogService.open(
            ContribuyentesCompaniesDialogComponent,
            {
                data: {
                    contribuyente,
                },
                header: 'Empresas del contribuyente',
                closeOnEscape: false,
                modal: true,
                closable: true,
                baseZIndex: 1
            },
        );

        this.dialogRef.onClose.subscribe((result) => {
            if (result) {
                this.getContribuyentes();
            }
        });
    }

    downloadContribuyentesExcel() {
        this.spinner.show();
        this.contribuyentesService.downloadContribuyentesExcel().subscribe({
            next: (data) => {
                this.spinner.hide();
                const url = URL.createObjectURL(data);
                window.open(url);
            },
            error: (err) => {
                this.spinner.hide();
                console.log(err);
            },
        });
    }

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.table?.filterGlobal(filterValue, 'contains');
    }
}
