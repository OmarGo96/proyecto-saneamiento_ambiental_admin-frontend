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
import {DialogService, DynamicDialogRef} from 'primeng/dynamicdialog';
import {Router} from '@angular/router';
import {TagModule} from 'primeng/tag';
import {CurrencyPipe, DecimalPipe} from '@angular/common';
import {DividerModule} from 'primeng/divider';

@Component({
    selector: 'app-company-compliance',
    imports: [
        IconFieldModule,
        InputIconModule,
        InputTextModule,
        TableModule,
        PopoverModule,
        ButtonModule,
        TableSkeletonComponent,
        TagModule,
        DividerModule,
        DecimalPipe
    ],
    providers: [DialogService, AlertsService, ConfirmationService],
    templateUrl: './company-compliance.component.html',
    styleUrl: './company-compliance.component.scss'
})
export class CompanyComplianceComponent implements OnInit {

    @ViewChild('table') table: any | undefined;

    private reportsService = inject(ReportsService);
    private alertsService = inject(AlertsService);
    private router = inject(Router);

    public companies: any;
    public isLoading: boolean = false;

    ngOnInit() {
        this.getCompanyCompliance();
    }

    getCompanyCompliance() {
        this.isLoading = true;
        this.reportsService.getCompanyCompliance().subscribe({
            next: data => {
                this.isLoading = false;
                this.companies = data.cumplimiento_por_empresa;
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
