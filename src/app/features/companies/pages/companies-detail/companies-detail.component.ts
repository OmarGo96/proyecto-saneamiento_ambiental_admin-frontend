import {Component, inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {AlertsService} from '../../../../core/services/alerts.service';
import {DatePipe, Location} from '@angular/common';
import {ButtonModule} from 'primeng/button';
import {ToggleSwitchModule} from 'primeng/toggleswitch';
import {InputTextModule} from 'primeng/inputtext';
import {SelectModule} from 'primeng/select';
import {CompaniesService} from '../../services/companies.service';
import {CompaniesStatus} from '../../constants/companies-status';
import {InputNumberModule} from 'primeng/inputnumber';
import {ConfirmationService} from 'primeng/api';

@Component({
    selector: 'app-companies-detail',
    imports: [
        ButtonModule,
        ToggleSwitchModule,
        ReactiveFormsModule,
        InputTextModule,
        SelectModule,
        InputNumberModule,
        DatePipe
    ],
    providers: [AlertsService, ConfirmationService],
    templateUrl: './companies-detail.component.html',
    styleUrl: './companies-detail.component.scss'
})
export class CompaniesDetailComponent implements OnInit {
    private companiesService = inject(CompaniesService);
    private formBuilder = inject(FormBuilder);
    private alertsService = inject(AlertsService);
    private location = inject(Location);

    public bedroomsForm: FormGroup;

    public company: any;
    public companiesStatus = CompaniesStatus;
    public isLoading: boolean = false;
    public isUpdating: boolean = false;

    ngOnInit() {
        const companyToken: any = localStorage.getItem(this.companiesService.companyToken);
        this.company = JSON.parse(atob(companyToken));

        this.initBedroomsForm();

    }

    initBedroomsForm() {
        this.bedroomsForm = this.formBuilder.group({
            habitaciones: [this.company.habitaciones, Validators.required],
        });
    }

    updateBedrooms() {
        this.isUpdating = true;
        const data = this.bedroomsForm.value;
        this.companiesService.updateBedrooms(this.company.id, data).subscribe({
            next: data => {
                this.isUpdating = false;
                this.alertsService.successAlert(data.message);
            },
            error: err => {
                this.isUpdating = false;
                this.alertsService.errorAlert(err.error.errors);
            }
        })
    }

    goBack() {
        localStorage.removeItem(this.companiesService.companyToken);
        this.location.back();
    }
}
