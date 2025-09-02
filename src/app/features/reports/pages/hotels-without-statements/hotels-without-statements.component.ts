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
        CurrencyPipe,
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
    private dialogService = inject(DialogService);
    private dialogRef: DynamicDialogRef | undefined;
    private router = inject(Router);

    public companies: any;
    public selectedMonths = [];
    public isLoading: boolean = false;

    ngOnInit() {
        this.getHotelWithoutStatements();
    }

    getHotelWithoutStatements(){
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

    toggle(event: any, months: any) {
        this.op.toggle(event);
        this.selectedMonths = months;
    }

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.table?.filterGlobal(filterValue, 'contains');
    }
}
