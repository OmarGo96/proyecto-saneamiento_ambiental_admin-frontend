import {Component, OnInit} from '@angular/core';
import {ChartModule} from 'primeng/chart';

@Component({
    selector: 'app-total-monthly-declarations-chart',
    imports: [ChartModule],
    templateUrl: './total-monthly-declarations-chart.component.html',
    styleUrl: './total-monthly-declarations-chart.component.scss'
})
export class TotalMonthlyDeclarationsChartComponent implements OnInit {
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
             labels: ['Pase a caja', 'Aceptadas', 'Rechazadas'],
             datasets: [
                 {
                     data: [300, 50, 100],
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
