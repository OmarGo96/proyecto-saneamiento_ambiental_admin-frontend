import {Component, inject, OnInit, ViewChild} from '@angular/core';
import {ReportsService} from '../../services/reports.service';
import {CompaniesService} from '../../../companies/services/companies.service';
import {AlertsService} from '../../../../core/services/alerts.service';
import {DialogService, DynamicDialogRef} from 'primeng/dynamicdialog';
import {Router} from '@angular/router';
import {CompaniesStatus} from '../../../companies/constants/companies-status';
import {IconFieldModule} from 'primeng/iconfield';
import {InputIconModule} from 'primeng/inputicon';
import {InputTextModule} from 'primeng/inputtext';
import {TableModule} from 'primeng/table';
import {PopoverModule} from 'primeng/popover';
import {ButtonModule} from 'primeng/button';
import {TableSkeletonComponent} from '../../../../shared/components/skeleton/table-skeleton/table-skeleton.component';
import {ConfirmationService} from 'primeng/api';
import {
    HotelAnnualOccupancyDialogComponent
} from '../../dialogs/hotel-annual-occupancy-dialog/hotel-annual-occupancy-dialog.component';
import {
    HotelMonthlyOccupancyDialogComponent
} from '../../dialogs/hotel-monthly-occupancy-dialog/hotel-monthly-occupancy-dialog.component';

@Component({
    selector: 'app-hotel-monthly-occupancy',
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
    templateUrl: './hotel-monthly-occupancy.component.html',
    styleUrl: './hotel-monthly-occupancy.component.scss'
})
export class HotelMonthlyOccupancyComponent implements OnInit {
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
        this.reportsService.getHotelMonthlyOccupancy().subscribe({
            next: ({data}) => {
                this.isLoading = false;
                this.companies = data;
                console.log(data);
            },
            error: err => {
                this.isLoading = false;
                this.alertsService.errorAlert(err.error.errors);
            }
        })
    }

    public openHotelMonthlyOccupancyDialog(company: any) {
        this.dialogRef = this.dialogService.open(HotelMonthlyOccupancyDialogComponent, {
            header: 'Ocupación mensual',
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
                occupancy: company.ocupacion_por_mes
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
