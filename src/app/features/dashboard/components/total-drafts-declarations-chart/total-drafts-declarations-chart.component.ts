import { Component } from '@angular/core';
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
    data: any;

    options: any;

    constructor() {
    }

    ngOnInit() {
        this.initChart();
    }

    initChart() {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--p-text-color');
        this.data = {
            labels: ['Borrador', 'Otros'],
            datasets: [
                {
                    data: [674, 6785],
                    backgroundColor: [documentStyle.getPropertyValue('--p-cyan-500'), documentStyle.getPropertyValue('--p-orange-500')],
                    hoverBackgroundColor: [documentStyle.getPropertyValue('--p-cyan-400'), documentStyle.getPropertyValue('--p-orange-400')]
                }
            ]
        };

        this.options = {
            cutout: '50%',
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
