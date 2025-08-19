import {Component} from '@angular/core';
import {
    TotalMonthlyDeclarationsChartComponent
} from '../../components/total-monthly-declarations-chart/total-monthly-declarations-chart.component';
import {
    TotalDraftsDeclarationsChartComponent
} from '../../components/total-drafts-declarations-chart/total-drafts-declarations-chart.component';
import {TableModule} from 'primeng/table';
import {DeclarationsStatus} from '../../../declarations/constants/declarations-status';

@Component({
    selector: 'app-dashboard',
    imports: [
        TableModule,
        TotalMonthlyDeclarationsChartComponent,
        TotalDraftsDeclarationsChartComponent
    ],
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

    public declarationsStatus = DeclarationsStatus
}
