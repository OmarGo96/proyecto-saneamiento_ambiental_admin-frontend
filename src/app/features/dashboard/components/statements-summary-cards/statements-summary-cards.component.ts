import {Component, Input} from '@angular/core';
import {DecimalPipe} from '@angular/common';

@Component({
  selector: 'app-statements-summary-cards',
    imports: [
        DecimalPipe
    ],
  templateUrl: './statements-summary-cards.component.html',
  styleUrl: './statements-summary-cards.component.scss'
})
export class StatementsSummaryCardsComponent {

    @Input() summaryData: any;

}
