import {Component, OnInit} from '@angular/core';
import {ChartModule} from 'primeng/chart';

@Component({
  selector: 'app-collection-report',
  imports: [
      ChartModule
  ],
  templateUrl: './collection-report.component.html',
  styleUrl: './collection-report.component.scss'
})
export class CollectionReportComponent implements OnInit {

    data: any;

    options: any;

    ngOnInit() {
        this.initChart();
    }

    initChart(){
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--p-text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--p-text-muted-color');
        const surfaceBorder = documentStyle.getPropertyValue('--p-content-border-color');

        this.data = {
            labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
            datasets: [
                {
                    label: 'Año anterior',
                    backgroundColor: documentStyle.getPropertyValue('--p-stone-500'),
                    borderColor: documentStyle.getPropertyValue('--p-stone-500'),
                    data: [3036, 4488, 3959, 3126, 3967, 5530, 5961, 3782, 5129, 5796, 4608, 4557]
                },
                {
                    label: 'Año en curso',
                    backgroundColor: documentStyle.getPropertyValue('--p-rose-900'),
                    borderColor: documentStyle.getPropertyValue('--p-rose-900'),
                    data: [4756, 5237, 4134, 5905, 5386, 7097, 4443, 5403, 7572, 4976, 6590, 9635]
                }
            ]
        };

        this.options = {
            maintainAspectRatio: false,
            aspectRatio: 0.8,
            plugins: {
                legend: {
                    labels: {
                        color: textColor
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: textColorSecondary,
                        font: {
                            weight: 500
                        }
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                },
                y: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                }
            }
        };
    }
}
