import {Component, inject} from '@angular/core';
import {ChartModule, UIChart} from 'primeng/chart';
import {DynamicDialogConfig, DynamicDialogRef} from 'primeng/dynamicdialog';

@Component({
    selector: 'app-hotel-monthly-occupancy-dialog',
    imports: [
        ChartModule
    ],
    templateUrl: './hotel-monthly-occupancy-dialog.component.html',
    styleUrl: './hotel-monthly-occupancy-dialog.component.scss'
})
export class HotelMonthlyOccupancyDialogComponent {
    private dialogRef = inject(DynamicDialogRef);
    private dialogConfig = inject(DynamicDialogConfig);

    public data: any;
    public occupancy: any;
    public options: any;

    ngOnInit() {
        this.occupancy = this.dialogConfig.data.occupancy;

        this.initChart();
    }

    initChart() {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--p-text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--p-text-muted-color');
        const surfaceBorder = documentStyle.getPropertyValue('--p-content-border-color');

        const labels: any[] = [];
        const occupancyAvarage: any[] = [];
        for (let label of this.occupancy) {
            labels.push(label.mes);
            occupancyAvarage.push(label.porcentaje_ocupacion);
        }

        this.data = {
            labels: labels,
            datasets: [
                {
                    label: 'Porcentaje de ocupación',
                    backgroundColor: documentStyle.getPropertyValue('--p-stone-500'),
                    borderColor: documentStyle.getPropertyValue('--p-stone-500'),
                    data: occupancyAvarage
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
