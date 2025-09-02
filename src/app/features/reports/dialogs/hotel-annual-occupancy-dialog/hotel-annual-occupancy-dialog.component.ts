import {Component, inject, OnInit} from '@angular/core';
import {DynamicDialogConfig, DynamicDialogRef} from 'primeng/dynamicdialog';
import {ChartModule} from 'primeng/chart';

@Component({
    selector: 'app-hotel-annual-occupancy-dialog',
    imports: [
        ChartModule
    ],
    templateUrl: './hotel-annual-occupancy-dialog.component.html',
    styleUrl: './hotel-annual-occupancy-dialog.component.scss'
})
export class HotelAnnualOccupancyDialogComponent implements OnInit {
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

        const labels: any[] =  [];
        const occupancyAvarage: any[] = [];
        for (let label of this.occupancy) {
            labels.push(label.anio);
            occupancyAvarage.push(label.promedio_ocupacion);
        }

        this.data = {
            labels: labels,
            datasets: [
                {
                    label: 'Promedio de ocupación',
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
