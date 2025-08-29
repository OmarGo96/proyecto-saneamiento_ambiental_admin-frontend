import {Component, Input, OnInit} from '@angular/core';
import {ChartModule} from 'primeng/chart';
import {DecimalPipe} from '@angular/common';

@Component({
    selector: 'app-total-monthly-declarations-chart',
    imports: [ChartModule, DecimalPipe],
    templateUrl: './total-monthly-declarations-chart.component.html',
    styleUrl: './total-monthly-declarations-chart.component.scss'
})
export class TotalMonthlyDeclarationsChartComponent implements OnInit {

    @Input() totalMonthlyDeclarationsData: any;

    public data: any;
    public options: any;

    ngOnInit() {
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
                    backgroundColor: [documentStyle.getPropertyValue('--p-stone-800'), documentStyle.getPropertyValue('--p-stone-500'), documentStyle.getPropertyValue('--p-rose-900'), documentStyle.getPropertyValue('--p-slate-500')],
                    hoverBackgroundColor: [documentStyle.getPropertyValue('--p-stone-800'), documentStyle.getPropertyValue('--p-stone-500'), documentStyle.getPropertyValue('--p-rose-900'), documentStyle.getPropertyValue('--p-slate-500')]
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
