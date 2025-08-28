import {Component, Input, OnInit} from '@angular/core';
import {ChartModule} from 'primeng/chart';

@Component({
    selector: 'app-total-monthly-declarations-chart',
    imports: [ChartModule],
    templateUrl: './total-monthly-declarations-chart.component.html',
    styleUrl: './total-monthly-declarations-chart.component.scss'
})
export class TotalMonthlyDeclarationsChartComponent implements OnInit {

    @Input() totalMonthlyDeclarationsData: any;

    data: any;

    options: any;

    constructor() {
    }

    ngOnInit() {
        console.log(this.totalMonthlyDeclarationsData);
        this.initChart();
    }

    initChart() {
        const data = this.totalMonthlyDeclarationsData;
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--p-text-color');
        this.data = {
            labels: ['Borrador', 'Aceptadas', 'Rechazadas', 'En revisión'],
            datasets: [
                {
                    data: [data.created, data.accepted, data.rejected, data.under_review],
                    backgroundColor: [documentStyle.getPropertyValue('--p-cyan-500'), documentStyle.getPropertyValue('--p-orange-500'), documentStyle.getPropertyValue('--p-gray-500')],
                    hoverBackgroundColor: [documentStyle.getPropertyValue('--p-cyan-400'), documentStyle.getPropertyValue('--p-orange-400'), documentStyle.getPropertyValue('--p-gray-400')]
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
