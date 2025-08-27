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
    providers: [AlertsService, ConfirmationService],
    templateUrl: './opening-by-company.component.html',
    styleUrl: './opening-by-company.component.scss'
})
export class OpeningByCompanyComponent implements OnInit{

    @ViewChild('table') table: any | undefined;

    private companiesService = inject(CompaniesService);
    private alertsService = inject(AlertsService);
    private router = inject(Router);

    public companies: any;
    public isLoading: boolean = false;

    public companiesStatus = CompaniesStatus;

    ngOnInit() {
        this.getDraftDeclarations()
    }

    public getDraftDeclarations() {
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

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.table?.filterGlobal(filterValue, 'contains');
    }
}
