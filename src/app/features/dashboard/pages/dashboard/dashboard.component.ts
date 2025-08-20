import {Component} from '@angular/core';
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

@Component({
    selector: 'app-dashboard',
    imports: [
        TableModule,
        TotalMonthlyDeclarationsChartComponent,
        TotalDraftsDeclarationsChartComponent,
        StatementsSummaryCardsComponent,
        StatementsSummaryByStatusComponent
    ],
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

    public registrationRequest = RegistrationRequest;
    public declarationsStatus = DeclarationsStatus
}
