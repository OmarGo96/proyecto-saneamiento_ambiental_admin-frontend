import {Component, inject, OnInit, ViewChild} from '@angular/core';
import {IconField, IconFieldModule} from 'primeng/iconfield';
import {InputIcon, InputIconModule} from 'primeng/inputicon';
import {InputText, InputTextModule} from 'primeng/inputtext';
import {Button, ButtonModule} from 'primeng/button';
import {Popover, PopoverModule} from 'primeng/popover';
import {ConfirmationService, PrimeTemplate} from 'primeng/api';
import {TableModule} from 'primeng/table';
import {TableSkeletonComponent} from '../../../../shared/components/skeleton/table-skeleton/table-skeleton.component';
import {CompaniesStatus} from '../../../companies/constants/companies-status';
import {CompaniesService} from '../../../companies/services/companies.service';
import {AlertsService} from '../../../../core/services/alerts.service';
import {Router} from '@angular/router';
import {
    CompaniesGeolocationComponent
} from '../../../companies/dialogs/companies-geolocation/companies-geolocation.component';
import {DialogService, DynamicDialogRef} from 'primeng/dynamicdialog';
import {
    OpeningByCompanyDialogComponent
} from '../../dialogs/opening-by-company-dialog/opening-by-company-dialog.component';

@Component({
    selector: 'app-opening-by-company',
    imports: [
        IconFieldModule,
        InputIconModule,
        InputTextModule,
        TableModule,
        PopoverModule,
        ButtonModule,
        TableSkeletonComponent
    ],
    providers: [AlertsService, ConfirmationService, DialogService],
    templateUrl: './opening-by-company.component.html',
    styleUrl: './opening-by-company.component.scss'
})
export class OpeningByCompanyComponent implements OnInit {

    @ViewChild('table') table: any | undefined;

    private companiesService = inject(CompaniesService);
    private alertsService = inject(AlertsService);
    private dialogService = inject(DialogService);
    private dialogRef: DynamicDialogRef | undefined;
    private router = inject(Router);

    public companies: any;
    public isLoading: boolean = false;

    public companiesStatus = CompaniesStatus;

    ngOnInit() {
        this.getAllCompanies()
    }

    public getAllCompanies() {
        this.isLoading = true;
        this.companiesService.getCompaniesByStatus('all').subscribe({
            next: res => {
                this.isLoading = false;
                this.companies = res.companies;
            },
            error: err => {
                this.isLoading = false;
                this.alertsService.errorAlert(err.error.errors);
            }
        });
    }

    public openOpeningCompanyDialog(company: any) {
        this.dialogRef = this.dialogService.open(OpeningByCompanyDialogComponent, {
            header: 'Apertura por empresa',
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
                company
            },
        });

        this.dialogRef.onClose.subscribe((result) => {
            if (result) {
                this.getAllCompanies();
            }
        });
    }

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.table?.filterGlobal(filterValue, 'contains');
    }
}
