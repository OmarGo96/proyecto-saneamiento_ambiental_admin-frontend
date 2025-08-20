import { Component } from '@angular/core';
import {TableModule} from 'primeng/table';
import {DeclarationsStatus} from '../../../declarations/constants/declarations-status';

@Component({
  selector: 'app-statements-summary-by-status',
    imports: [
        TableModule
    ],
  templateUrl: './statements-summary-by-status.component.html',
  styleUrl: './statements-summary-by-status.component.scss'
})
export class StatementsSummaryByStatusComponent {

    public declarationsStatus = DeclarationsStatus
}
