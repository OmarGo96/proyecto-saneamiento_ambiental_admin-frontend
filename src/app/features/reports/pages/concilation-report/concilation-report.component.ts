import { Component, inject } from '@angular/core';
import { ChartModule } from 'primeng/chart';
import { ReportsService } from '../../services/reports.service';
import { AlertsService } from '../../../../core/services/alerts.service';
import { SelectModule } from 'primeng/select';
import { NgxSpinnerService } from 'ngx-spinner';
import { CurrencyPipe } from '@angular/common';

@Component({
    selector: 'app-concilation-report',
    imports: [ChartModule, SelectModule, CurrencyPipe],
    templateUrl: './concilation-report.component.html',
    styleUrl: './concilation-report.component.scss',
})
export class ConcilationReportComponent {
    private reportsService = inject(ReportsService);
    private alertsService = inject(AlertsService);
    private spinner = inject(NgxSpinnerService);

    data: any;
    options: any;

    public collectionInfo: any;

    public years = [
        { value: "2024" },
        { value: "2025" },
        { value: "2026" }
    ]

    ngOnInit() {
        // this.getConciliationReport();
    }

    getConciliationReport(event: any) {    
        this.spinner.show();
        const data = {
            year: event.value
        }
        this.reportsService.getConcilation(data).subscribe({
            next: (data) => {
                this.spinner.hide();
                this.collectionInfo = data;
                this.initChart(data.recaudacion_mensual);
            },
            error: (err) => {
                this.spinner.hide();
                this.alertsService.errorAlert(err.error.errors);
            },
        });
    }

    initChart(monthlyCollection: any) {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--p-text-color');
        const textColorSecondary = documentStyle.getPropertyValue(
            '--p-text-muted-color',
        );
        const surfaceBorder = documentStyle.getPropertyValue(
            '--p-content-border-color',
        );

        const monthlyCollectionValues = [];
        for (const value of monthlyCollection) {
            monthlyCollectionValues.push(value.recaudacion);
        }

        this.data = {
            labels: [
                'Enero',
                'Febrero',
                'Marzo',
                'Abril',
                'Mayo',
                'Junio',
                'Julio',
                'Agosto',
                'Septiembre',
                'Octubre',
                'Noviembre',
                'Diciembre',
            ],
            datasets: [
                {
                    label: 'Recaudación mensual',
                    backgroundColor: documentStyle.getPropertyValue('--p-stone-500'),
                    borderColor: documentStyle.getPropertyValue('--p-stone-500'),
                    data: monthlyCollectionValues,
                }
            ],
        };

        this.options = {
            maintainAspectRatio: false,
            aspectRatio: 0.8,
            plugins: {
                legend: {
                    labels: {
                        color: textColor,
                    },
                },
            },
            scales: {
                x: {
                    ticks: {
                        color: textColorSecondary,
                        font: {
                            weight: 500,
                        },
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false,
                    },
                },
                y: {
                    ticks: {
                        color: textColorSecondary,
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false,
                    },
                },
            },
        };
    }
}
