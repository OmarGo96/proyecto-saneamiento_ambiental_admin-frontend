import {Component, inject, OnInit, ViewChild} from '@angular/core';
import {ReportsService} from '../../services/reports.service';
import {CompaniesService} from '../../../companies/services/companies.service';
import {AlertsService} from '../../../../core/services/alerts.service';
import {DialogService, DynamicDialogRef} from 'primeng/dynamicdialog';
import {Router} from '@angular/router';
import {IconFieldModule} from 'primeng/iconfield';
import {InputIconModule} from 'primeng/inputicon';
import {InputTextModule} from 'primeng/inputtext';
import {TableModule} from 'primeng/table';
import {Popover, PopoverModule} from 'primeng/popover';
import {ButtonModule} from 'primeng/button';
import {TableSkeletonComponent} from '../../../../shared/components/skeleton/table-skeleton/table-skeleton.component';
import {ConfirmationService} from 'primeng/api';
import {CurrencyPipe} from '@angular/common';
import {TagModule} from 'primeng/tag';
import {DividerModule} from 'primeng/divider';
import {NgxSpinnerService} from 'ngx-spinner';
import {
    CompaniesGeolocationComponent
} from '../../../companies/dialogs/companies-geolocation/companies-geolocation.component';
import {HotelSerpInfoDialogComponent} from '../../dialogs/hotel-serp-info-dialog/hotel-serp-info-dialog.component';

@Component({
    selector: 'app-hotels-without-statements',
    imports: [
        IconFieldModule,
        InputIconModule,
        InputTextModule,
        TableModule,
        PopoverModule,
        ButtonModule,
        TableSkeletonComponent,
        TagModule,
        DividerModule
    ],
    providers: [DialogService, AlertsService, ConfirmationService],
    templateUrl: './hotels-without-statements.component.html',
    styleUrl: './hotels-without-statements.component.scss'
})
export class HotelsWithoutStatementsComponent implements OnInit {

    @ViewChild('op') op!: Popover;
    @ViewChild('table') table: any | undefined;

    private reportsService = inject(ReportsService);
    private companiesService = inject(CompaniesService);
    private alertsService = inject(AlertsService);
    private spinner = inject(NgxSpinnerService);
    private dialogService = inject(DialogService);
    private dialogRef: DynamicDialogRef | undefined;
    private router = inject(Router);

    public companies: any;
    public selectedMonths = [];
    public isLoading: boolean = false;

    ngOnInit() {
        this.getHotelWithoutStatements();
    }

    getHotelWithoutStatements() {
        this.isLoading = true;
        this.reportsService.getHotelWithoutStatements().subscribe({
            next: data => {
                this.isLoading = false;
                this.companies = data.hoteles_sin_declaraciones;
            },
            error: err => {
                this.isLoading = false;
                this.alertsService.errorAlert(err.error.errors);
            }
        });
    }

    getSERPAPIInfo(company: any) {
       /* this.openSERPAPIInfoDialog(company, {
            web_url: "https://www.barcelo.com/en-us/occidental-at-xcaret-destination/?utm_source=google&utm_medium=or…",
            address: "Camino a Xcaret Carretera Federal Chetumal - Puerto, Avenida Benito Juárez, 282, 77710 Playa del Carmen, Q.R., Mexico",
            hotel_class: "5-star hotel",
            market_offer: []
        });*/

        this.spinner.show();

        this.reportsService.getSERPAPIInfo(company.property_token_serp_api).subscribe({
            next: res => {
                this.spinner.hide();
                this.openSERPAPIInfoDialog(company, res.data);
            },
            error: err => {
                this.spinner.hide();
                this.alertsService.errorAlert(err.error.errors);
            }
        })
    }

    openSERPAPIInfoDialog(company: any, serpInfo: any) {
        this.dialogRef = this.dialogService.open(HotelSerpInfoDialogComponent, {
            header: company.hotel,
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
                company,
                serp_info: serpInfo
            },
        });

        this.dialogRef.onClose.subscribe((result) => {
            if (result) {
                console.log(result);
            }
        });
    }

    toggle(event: any, months: any) {
        this.op.toggle(event);
        this.selectedMonths = months;
    }

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.table?.filterGlobal(filterValue, 'contains');
    }
}
