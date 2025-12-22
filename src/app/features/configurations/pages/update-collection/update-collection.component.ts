import {Component, inject} from '@angular/core';
import {ButtonModule} from 'primeng/button';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {SelectModule} from 'primeng/select';
import {OpeningService} from '../../services/opening.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {AlertsService} from '../../../../core/services/alerts.service';
import {MultiSelectModule} from 'primeng/multiselect';
import {ConfirmationService} from 'primeng/api';
import {TableModule} from 'primeng/table';
import {TableSkeletonComponent} from '../../../../shared/components/skeleton/table-skeleton/table-skeleton.component';
import {CompaniesStatus} from '../../../companies/constants/companies-status';
import {CurrencyPipe, DatePipe} from '@angular/common';
import {DialogService, DynamicDialogRef} from 'primeng/dynamicdialog';
import {
    OpeningByCompanyDialogComponent
} from '../../dialogs/opening-by-company-dialog/opening-by-company-dialog.component';
import {
    UpdateCollectionDialogComponent
} from '../../dialogs/update-collection-dialog/update-collection-dialog.component';

@Component({
    selector: 'app-update-collection',
    imports: [
        SelectModule,
        ReactiveFormsModule,
        ButtonModule,
        MultiSelectModule,
        TableModule,
        TableSkeletonComponent,
        DatePipe,
        CurrencyPipe
    ],
    providers: [AlertsService, ConfirmationService, DialogService],
    templateUrl: './update-collection.component.html',
    styleUrl: './update-collection.component.scss'
})
export class UpdateCollectionComponent {
    public yearForm: FormGroup;
    public openingForm: FormGroup;

    private openingService = inject(OpeningService);
    private spinner = inject(NgxSpinnerService);
    private alertsService = inject(AlertsService);
    private dialogService = inject(DialogService);
    private dialogRef: DynamicDialogRef | undefined;
    private formBuilder = inject(FormBuilder);

    public openingToAttach: any[] = []
    public years: any;
    public openingList: any;
    public toppings = new FormControl();
    public company: any;

    public isLoading: boolean = false;
    public isOpening: boolean = false;

    ngOnInit() {
        this.years = this.generateYearsArray();

        this.initYearForm();
    }

    initYearForm() {
        this.yearForm = this.formBuilder.group({
            year: ['', Validators.required],
        });
    }

    getOpeningList() {
        this.isLoading = true;
        const data = this.yearForm.value;
        this.openingService.getListByYear(data.year).subscribe({
            next: data => {
                this.openingList = data.openings
                this.isLoading = false;
            },
            error: err => {
                this.isLoading = false;
                this.alertsService.errorAlert(err.error.errors);
            }
        });
    }

    public openUpdateCollectionDialog(opening: any) {
        this.dialogRef = this.dialogService.open(UpdateCollectionDialogComponent, {
            header: 'Actualizar recaudación',
            width: '30vw',
            closeOnEscape: false,
            modal: true,
            closable: true,
            baseZIndex: 1,
            breakpoints: {
                '960px': '75vw',
                '640px': '90vw'
            },
            data: {
                opening
            },
        });

        this.dialogRef.onClose.subscribe((result) => {
            if (result) {
                this.getOpeningList();
            }
        });
    }

    public generateYearsArray(): any[] {
        const currentYear = new Date().getFullYear();
        const yearsArray = [];

        for (let year = 2017; year <= currentYear; year++) {
            yearsArray.push({year: year.toString()});
        }

        return yearsArray;
    }

    protected readonly companiesStatus = CompaniesStatus;
}
