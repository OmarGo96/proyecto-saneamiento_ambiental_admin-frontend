import {Component, inject, OnInit, ViewChild} from '@angular/core';
import {ReportsService} from '../../services/reports.service';
import {Button, ButtonModule} from 'primeng/button';
import {IconField, IconFieldModule} from 'primeng/iconfield';
import {InputIcon, InputIconModule} from 'primeng/inputicon';
import {InputText, InputTextModule} from 'primeng/inputtext';
import {ConfirmationService, PrimeTemplate} from 'primeng/api';
import {TableModule} from 'primeng/table';
import {TableSkeletonComponent} from '../../../../shared/components/skeleton/table-skeleton/table-skeleton.component';
import {PopoverModule} from 'primeng/popover';
import {AlertsService} from '../../../../core/services/alerts.service';
import {CurrencyPipe} from '@angular/common';

@Component({
    selector: 'app-statements-by-company',
    imports: [
        IconFieldModule,
        InputIconModule,
        InputTextModule,
        TableModule,
        PopoverModule,
        ButtonModule,
        TableSkeletonComponent,
        CurrencyPipe
    ],
    providers: [AlertsService, ConfirmationService],
    templateUrl: './statements-by-company.component.html',
    styleUrl: './statements-by-company.component.scss'
})
export class StatementsByCompanyComponent implements OnInit {
    @ViewChild('table') table: any | undefined;

    private reportsService = inject(ReportsService);
    private alertsService = inject(AlertsService);

    public companies: any;
    public isLoading: boolean = false;

    ngOnInit() {
        this.getStatementsByCompany();
    }

    getStatementsByCompany() {
        this.reportsService.getStatementsByCompany().subscribe({
            next: data => {
                console.log(data.companies)
                this.companies = data.companies;
            },
            error: err => {
                this.alertsService.errorAlert(err.error.errors);
            }
        })
    }

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.table?.filterGlobal(filterValue, 'contains');
    }

}
