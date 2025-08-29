import {Component, Input} from '@angular/core';
import {UIChart} from 'primeng/chart';

@Component({
  selector: 'app-total-drafts-declarations-chart',
    imports: [
        UIChart
    ],
  templateUrl: './total-drafts-declarations-chart.component.html',
  styleUrl: './total-drafts-declarations-chart.component.scss'
})
export class TotalDraftsDeclarationsChartComponent {

    @Input() totalAcceptedDeclarationsData: any;

    public data: any;
    public options: any;

    constructor() {
    }

    ngOnInit() {
        this.initChart();
    }

    initChart() {
        const data = this.totalAcceptedDeclarationsData;
        console.log(data)
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--p-text-color');
        this.data = {
            labels: ['En Ceros', 'Con Pase a Caja'],
            datasets: [
                {
                    data: [data.in_ceros, data.with_pase_caja],
                    backgroundColor: [documentStyle.getPropertyValue('--p-rose-900'), documentStyle.getPropertyValue('--p-slate-700')],
                    hoverBackgroundColor: [documentStyle.getPropertyValue('--p-rose-900'), documentStyle.getPropertyValue('--p-slate-700')]
                }
            ]
        };

        this.options = {
            cutout: '70%',
            plugins: {
                legend: {
                    labels: {
                        color: textColor
                    }
                }
            }
        };
    }
}
