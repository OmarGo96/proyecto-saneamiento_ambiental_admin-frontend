import {Component, inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {CompaniesService} from '../../services/companies.service';
import {AlertsService} from '../../../../core/services/alerts.service';
import {InputGroupModule} from 'primeng/inputgroup';
import {InputTextModule} from 'primeng/inputtext';
import {InputGroupAddonModule} from 'primeng/inputgroupaddon';
import {DynamicDialogRef} from 'primeng/dynamicdialog';
import {ButtonModule} from 'primeng/button';
import {ConfirmationService} from 'primeng/api';

@Component({
    selector: 'app-companies-registration-dialog',
    imports: [
        InputGroupModule,
        InputGroupAddonModule,
        InputTextModule,
        ReactiveFormsModule,
        ButtonModule
    ],
    providers: [AlertsService, ConfirmationService],
    templateUrl: './companies-registration-dialog.component.html',
    styleUrl: './companies-registration-dialog.component.scss'
})
export class CompaniesRegistrationDialogComponent implements OnInit {

    private companiesService = inject(CompaniesService);
    private formBuilder = inject(FormBuilder);
    private alertsService = inject(AlertsService);
    private dialogRef = inject(DynamicDialogRef);

    public searchForm: FormGroup;

    public isSearching: boolean = false;

    ngOnInit() {
        this.initSearchForm();
    }

    initSearchForm() {
        this.searchForm = this.formBuilder.group({
            nombre_establecimiento: ['', [Validators.required, Validators.minLength(4)]]
        });
    }

    searchCompany(){
        this.isSearching = true;
        const data = this.searchForm.value;
        this.companiesService.searchCompanies(data).subscribe({
            next: data => {
                this.isSearching = false;
                this.dialogRef.close(data.companies);
            },
            error: err => {
                this.isSearching = false;
                this.alertsService.errorAlert([{message: err.error.errors}]);
            }
        })
    }
}
