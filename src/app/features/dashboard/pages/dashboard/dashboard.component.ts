import {Component, inject, OnInit} from '@angular/core';
import {
    TotalMonthlyDeclarationsChartComponent
} from '../../components/total-monthly-declarations-chart/total-monthly-declarations-chart.component';
import {
    TotalDraftsDeclarationsChartComponent
} from '../../components/total-drafts-declarations-chart/total-drafts-declarations-chart.component';
import {TableModule} from 'primeng/table';
import {DeclarationsStatus} from '../../../declarations/constants/declarations-status';
import {
    StatementsSummaryCardsComponent
} from '../../components/statements-summary-cards/statements-summary-cards.component';
import {
    StatementsSummaryByStatusComponent
} from '../../components/statements-summary-by-status/statements-summary-by-status.component';
import {RegistrationRequest} from '../../constants/demo';
import {DashboardService} from '../../services/dashboard.service';
import {AlertsService} from '../../../../core/services/alerts.service';
import {ConfirmationService} from 'primeng/api';
import {DatePipe} from '@angular/common';
import {SkeletonModule} from 'primeng/skeleton';
import {TableSkeletonComponent} from '../../../../shared/components/skeleton/table-skeleton/table-skeleton.component';

@Component({
    selector: 'app-dashboard',
    imports: [
        TableModule,
        TotalMonthlyDeclarationsChartComponent,
        TotalDraftsDeclarationsChartComponent,
        StatementsSummaryCardsComponent,
        StatementsSummaryByStatusComponent,
        SkeletonModule,
        DatePipe,
        TableSkeletonComponent
    ],
    providers: [AlertsService, ConfirmationService],
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {

    private dashboardService = inject(DashboardService);
    private alertsService = inject(AlertsService);

    public currentMonthStatements: any;
    public acceptedStatements: any;
    public summary: any;
    public globalStatements: any;

    public registrationRequest: any;
    public declarationsStatus = DeclarationsStatus

    ngOnInit() {
        this.getStatisticsReport();
    }

    getStatisticsReport(){
        this.dashboardService.getStatisticsReport().subscribe({
            next: data => {
                this.currentMonthStatements = data.current_month_statements;
                this.acceptedStatements = data.accepted_statements;
                this.summary = data.resumen;
                this.globalStatements = data.global_statements;
                this.registrationRequest = data.registration_requests;
            },
            error: err => {
                this.alertsService.errorAlert(err.error.errors);
            }
        })
    }
}
