import {Component, inject, OnInit} from '@angular/core';
import {ChartModule} from 'primeng/chart';
import {ReportsService} from '../../services/reports.service';
import {AlertsService} from '../../../../core/services/alerts.service';
import {ConfirmationService} from 'primeng/api';

@Component({
    selector: 'app-collection-report',
    imports: [
        ChartModule
    ],
    providers: [AlertsService, ConfirmationService],
    templateUrl: './collection-report.component.html',
    styleUrl: './collection-report.component.scss'
})
export class CollectionReportComponent implements OnInit {

    private reportsService = inject(ReportsService);
    private alertsService = inject(AlertsService);

    data: any;
    options: any;

    public previousYear: any;
    public currentYear: any;

    ngOnInit() {


        this.getCollectionReport();
    }

    getCollectionReport() {
        this.reportsService.getCollection().subscribe({
            next: data => {
                this.previousYear = data.previous_year;
                this.currentYear = data.current_year;

                this.initChart();
            },
            error: err => {
                this.alertsService.errorAlert(err.error.errors);
            }
        })
    }

    initChart() {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--p-text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--p-text-muted-color');
        const surfaceBorder = documentStyle.getPropertyValue('--p-content-border-color');

        const prevYearTotalValues = [];
        const currYearTotalValues = [];
        for (const value of this.previousYear) {
            prevYearTotalValues.push(value.total);
        }

        for (const value of this.currentYear) {
            currYearTotalValues.push(value.total);
        }

        this.data = {
            labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
            datasets: [
                {
                    label: 'Año anterior',
                    backgroundColor: documentStyle.getPropertyValue('--p-stone-500'),
                    borderColor: documentStyle.getPropertyValue('--p-stone-500'),
                    data: prevYearTotalValues
                },
                {
                    label: 'Año en curso',
                    backgroundColor: documentStyle.getPropertyValue('--p-rose-900'),
                    borderColor: documentStyle.getPropertyValue('--p-rose-900'),
                    data: currYearTotalValues
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
