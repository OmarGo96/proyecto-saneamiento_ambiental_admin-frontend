import {Component, inject, OnInit, ViewChild} from '@angular/core';
import {ReportsService} from '../../services/reports.service';
import {Button, ButtonModule} from 'primeng/button';
import {IconField, IconFieldModule} from 'primeng/iconfield';
import {InputIcon, InputIconModule} from 'primeng/inputicon';
import {InputText, InputTextModule} from 'primeng/inputtext';
import {Popover, PopoverModule} from 'primeng/popover';
import {ConfirmationService, PrimeTemplate} from 'primeng/api';
import {TableModule} from 'primeng/table';
import {TableSkeletonComponent} from '../../../../shared/components/skeleton/table-skeleton/table-skeleton.component';
import {CompaniesService} from '../../../companies/services/companies.service';
import {AlertsService} from '../../../../core/services/alerts.service';
import {Router} from '@angular/router';
import {CompaniesStatus} from '../../../companies/constants/companies-status';
import {data} from 'autoprefixer';
import {
    CompaniesGeolocationComponent
} from '../../../companies/dialogs/companies-geolocation/companies-geolocation.component';
import {DialogService, DynamicDialogRef} from 'primeng/dynamicdialog';
import {
    HotelAnnualOccupancyDialogComponent
} from '../../dialogs/hotel-annual-occupancy-dialog/hotel-annual-occupancy-dialog.component';

@Component({
    selector: 'app-hotel-annual-occupancy',
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
    templateUrl: './hotel-annual-occupancy.component.html',
    styleUrl: './hotel-annual-occupancy.component.scss'
})
export class HotelAnnualOccupancyComponent implements OnInit {
    @ViewChild('table') table: any | undefined;

    private reportsService = inject(ReportsService);
    private companiesService = inject(CompaniesService);
    private alertsService = inject(AlertsService);
    private dialogService = inject(DialogService);
    private dialogRef: DynamicDialogRef | undefined;
    private router = inject(Router);

    public companies: any;
    public isLoading: boolean = false;

    public companiesStatus = CompaniesStatus;

    ngOnInit() {
        this.getHotelAnnualOccupancy();
    }

    public getHotelAnnualOccupancy() {
        this.isLoading = true;
        this.reportsService.getHotelAnnualOccupancy().subscribe({
            next: ({data}) => {
                this.isLoading = false;
                this.companies = data;
            },
            error: err => {
                this.isLoading = false;
                this.alertsService.errorAlert(err.error.errors);
            }
        })
    }

    public openHotelAnnualOccupancyDialog(company: any) {
        this.dialogRef = this.dialogService.open(HotelAnnualOccupancyDialogComponent, {
            header: 'Ocupación',
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
                occupancy: company.ocupacion_por_anio
            }
        });

        this.dialogRef.onClose.subscribe((result) => {
            if (result) {
                this.getHotelAnnualOccupancy();
            }
        });
    }

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.table?.filterGlobal(filterValue, 'contains');
    }
}
