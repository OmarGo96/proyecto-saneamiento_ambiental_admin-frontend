import {Component, inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Months} from '../../../../core/constants/months';
import {SelectModule} from 'primeng/select';
import {ButtonModule} from 'primeng/button';
import {ReportsService} from '../../services/reports.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {AlertsService} from '../../../../core/services/alerts.service';
import {ConfirmationService} from 'primeng/api';

@Component({
    selector: 'app-reports-year-month',
    imports: [
        SelectModule,
        ButtonModule,
        ReactiveFormsModule,
    ],
    providers: [AlertsService, ConfirmationService],
    templateUrl: './reports-year-month.component.html',
    styleUrl: './reports-year-month.component.scss'
})
export class ReportsYearMonthComponent implements OnInit {

    public reportForm: FormGroup;

    private reportsService = inject(ReportsService);
    private spinner = inject(NgxSpinnerService);
    private alertsService = inject(AlertsService);
    private formBuilder = inject(FormBuilder);

    public years: any;
    public months = Months;

    ngOnInit() {
        this.initReportForm();
        this.years = this.generateYearsArray();
    }

    initReportForm() {
        this.reportForm = this.formBuilder.group({
            year: ['', Validators.required],
            month: ['', Validators.required]
        });
    }

    generateReport() {
        this.spinner.show();
        const data = this.reportForm.value;
        this.reportsService.generateGeneralReport(data).subscribe({
            next: data => {
                this.spinner.hide();
                const file = URL.createObjectURL(data)
                window.open(file, '_blank');
            },
            error: err => {
                this.spinner.hide();
                this.alertsService.errorAlert(err.error.errors);
            }
        })
    }

    public generateYearsArray(): any[] {
        const currentYear = new Date().getFullYear();
        const yearsArray = [];

        for (let year = 2017; year <= currentYear; year++) {
            yearsArray.push({year: year.toString()});
        }

        return yearsArray;
    }
}
