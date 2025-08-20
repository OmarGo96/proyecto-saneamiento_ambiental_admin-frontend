import {Component, inject, OnInit, ViewChild} from '@angular/core';
import {IconFieldModule} from 'primeng/iconfield';
import {InputIconModule} from 'primeng/inputicon';
import {InputTextModule} from 'primeng/inputtext';
import {TableModule} from 'primeng/table';
import {PopoverModule} from 'primeng/popover';
import {ButtonModule} from 'primeng/button';
import {TableSkeletonComponent} from '../../../../shared/components/skeleton/table-skeleton/table-skeleton.component';
import {CompaniesService} from '../../services/companies.service';
import {AlertsService} from '../../../../core/services/alerts.service';
import {Router} from '@angular/router';
import {CompaniesStatus} from '../../constants/companies-status';
import {DialogService, DynamicDialogRef} from 'primeng/dynamicdialog';
import {UnlinkCompaniesDialogComponent} from '../../dialogs/unlink-companies-dialog/unlink-companies-dialog.component';
import {CompaniesGeolocationComponent} from '../../dialogs/companies-geolocation/companies-geolocation.component';
import {ConfirmationService} from 'primeng/api';

@Component({
    selector: 'app-companies-with-representative',
    imports: [
        IconFieldModule,
        InputIconModule,
        InputTextModule,
        TableModule,
        PopoverModule,
        ButtonModule,
        TableSkeletonComponent
    ],
    providers: [DialogService, AlertsService, ConfirmationService],
    templateUrl: './companies-with-representative.component.html',
    styleUrl: './companies-with-representative.component.scss'
})
export class CompaniesWithRepresentativeComponent implements OnInit {
    @ViewChild('table') table: any | undefined;

    private companiesService = inject(CompaniesService);
    private dialogService = inject(DialogService);
    private dialogRef: DynamicDialogRef | undefined;
    private alertsService = inject(AlertsService);
    private router = inject(Router);

    public companies: any;
    public isLoading: boolean = false;

    public companiesStatus = CompaniesStatus;

    ngOnInit() {
        this.getCompaniesWithRepresentative()
    }

    public getCompaniesWithRepresentative(){
        this.isLoading = true;
        this.companiesService.getCompaniesByStatus('attached').subscribe({
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

    public openUnlinkCompaniesDialog(){
        this.dialogRef = this.dialogService.open(UnlinkCompaniesDialogComponent, {
            header: 'Desvincular empresa',
            width: '30vw',
            closeOnEscape: false,
            modal: true,
            closable: true,
            baseZIndex: 1,
            breakpoints: {
                '960px': '75vw',
                '640px': '90vw'
            },
        });

        this.dialogRef.onClose.subscribe((result) => {
            if (result) {
                this.getCompaniesWithRepresentative();
            }
        });
    }

    public openGeolocationDialog(){
        this.dialogRef = this.dialogService.open(CompaniesGeolocationComponent, {
            header: 'Geolocalización de la empresa',
            width: '40vw',
            closeOnEscape: false,
            modal: true,
            closable: true,
            baseZIndex: 1,
            breakpoints: {
                '960px': '75vw',
                '640px': '90vw'
            },
        });

        this.dialogRef.onClose.subscribe((result) => {
            if (result) {
                this.getCompaniesWithRepresentative();
            }
        });
    }

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.table?.filterGlobal(filterValue, 'contains');
    }
}
