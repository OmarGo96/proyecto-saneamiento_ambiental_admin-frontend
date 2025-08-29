import {Component, Input, OnInit} from '@angular/core';
import {TableModule} from 'primeng/table';
import {DeclarationsStatus} from '../../../declarations/constants/declarations-status';
import {DecimalPipe} from '@angular/common';

@Component({
  selector: 'app-statements-summary-by-status',
    imports: [
        TableModule,
        DecimalPipe
    ],
  templateUrl: './statements-summary-by-status.component.html',
  styleUrl: './statements-summary-by-status.component.scss'
})
export class StatementsSummaryByStatusComponent implements OnInit {

    @Input() globalStatementsData: any;

    public globalStatements: any[] = []

    ngOnInit() {
        this.globalStatements = Object.entries(this.globalStatementsData).map(([key, value]) => ({
            status: key,
            count: value
        }));

    }

    public declarationsStatus = DeclarationsStatus
}
