import {Component, inject, OnInit, ViewChild} from '@angular/core';
import {IconField, IconFieldModule} from 'primeng/iconfield';
import {InputIcon, InputIconModule} from 'primeng/inputicon';
import {InputText, InputTextModule} from 'primeng/inputtext';
import {CompaniesService} from '../../services/companies.service';
import {AlertsService} from '../../../../core/services/alerts.service';
import {Router} from '@angular/router';
import {CompaniesStatus} from '../../constants/companies-status';
import {Button, ButtonModule} from 'primeng/button';
import {Popover, PopoverModule} from 'primeng/popover';
import {ConfirmationService, PrimeTemplate} from 'primeng/api';
import {TableModule} from 'primeng/table';
import {TableSkeletonComponent} from '../../../../shared/components/skeleton/table-skeleton/table-skeleton.component';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CompaniesGeolocationComponent} from '../../dialogs/companies-geolocation/companies-geolocation.component';
import {DialogService, DynamicDialogRef} from 'primeng/dynamicdialog';
import {
    CompaniesRegistrationDialogComponent
} from '../../dialogs/companies-registration-dialog/companies-registration-dialog.component';

@Component({
    selector: 'app-companies-registration',
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
    templateUrl: './companies-registration.component.html',
    styleUrl: './companies-registration.component.scss'
})
export class CompaniesRegistrationComponent {

    @ViewChild('table') table: any | undefined;

    private companiesService = inject(CompaniesService);
    private formBuilder = inject(FormBuilder);
    private dialogRef: DynamicDialogRef | undefined;
    private dialogService = inject(DialogService);
    private alertsService = inject(AlertsService);
    private router = inject(Router);



    public companies: any;
    public isLoading: boolean = false;

    public companiesStatus = CompaniesStatus;

    public openSearchCompaniesDialog(){
        this.dialogRef = this.dialogService.open(CompaniesRegistrationDialogComponent, {
            header: 'Buscador de empresa',
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
                console.log(result);
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
