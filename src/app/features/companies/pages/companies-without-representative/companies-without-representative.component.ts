import {Component, inject, OnInit, ViewChild} from '@angular/core';
import {CompaniesService} from '../../services/companies.service';
import {AlertsService} from '../../../../core/services/alerts.service';
import {Router} from '@angular/router';
import {CompaniesStatus} from '../../constants/companies-status';
import {IconFieldModule} from 'primeng/iconfield';
import {InputIconModule} from 'primeng/inputicon';
import {InputTextModule} from 'primeng/inputtext';
import {TableModule} from 'primeng/table';
import {PopoverModule} from 'primeng/popover';
import {ButtonModule} from 'primeng/button';
import {TableSkeletonComponent} from '../../../../shared/components/skeleton/table-skeleton/table-skeleton.component';
import {ConfirmationService} from 'primeng/api';

@Component({
    selector: 'app-companies-without-representative',
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
    templateUrl: './companies-without-representative.component.html',
    styleUrl: './companies-without-representative.component.scss'
})
export class CompaniesWithoutRepresentativeComponent implements OnInit {
    @ViewChild('table') table: any | undefined;

    private companiesService = inject(CompaniesService);
    private alertsService = inject(AlertsService);
    private router = inject(Router);

    public companies: any;
    public isLoading: boolean = false;

    public companiesStatus = CompaniesStatus;

    ngOnInit() {
        this.getCompaniesWithoutRepresentative()
    }

    public getCompaniesWithoutRepresentative() {
        this.isLoading = true;
        this.companiesService.getCompaniesByStatus('free').subscribe({
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

    public viewCompanyDetails(company: any) {
        localStorage.setItem(this.companiesService.companyToken, btoa(JSON.stringify(company)));
        this.router.navigate(['/empresas/detalle']);
    }

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.table?.filterGlobal(filterValue, 'contains');
    }
}
