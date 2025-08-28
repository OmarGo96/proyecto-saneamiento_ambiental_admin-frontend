import {Component, inject, OnInit} from '@angular/core';
import {Button, ButtonModule} from 'primeng/button';
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {IftaLabel} from 'primeng/iftalabel';
import {Textarea} from 'primeng/textarea';
import {Select, SelectModule} from 'primeng/select';
import {NgxSpinnerService} from 'ngx-spinner';
import {AlertsService} from '../../../../core/services/alerts.service';
import {OpeningService} from '../../services/opening.service';
import {MultiSelectModule} from 'primeng/multiselect';
import {DynamicDialogConfig, DynamicDialogRef} from 'primeng/dynamicdialog';

@Component({
    selector: 'app-opening-by-company-dialog',
    imports: [
        SelectModule,
        ReactiveFormsModule,
        ButtonModule,
        MultiSelectModule
    ],
    templateUrl: './opening-by-company-dialog.component.html',
    styleUrl: './opening-by-company-dialog.component.scss'
})
export class OpeningByCompanyDialogComponent implements OnInit {

    public yearForm: FormGroup;
    public openingForm: FormGroup;

    private openingService = inject(OpeningService);
    private spinner = inject(NgxSpinnerService);
    private alertsService = inject(AlertsService);
    private formBuilder = inject(FormBuilder);
    private dialogRef = inject(DynamicDialogRef);
    private dialogConfig = inject(DynamicDialogConfig);

    public openingToAttach: any[] = []
    public years: any;
    public openingList: any;
    public toppings = new FormControl();
    public company: any;

    public isLoading: boolean = false;
    public isOpening: boolean = false;

    ngOnInit() {
        this.company = this.dialogConfig.data.company;

        this.years = this.generateYearsArray();

        this.initYearForm();
        this.initOpeningForm();
    }

    initYearForm() {
        this.yearForm = this.formBuilder.group({
            year: ['', Validators.required],
        })
    }

    initOpeningForm() {
        this.openingForm = this.formBuilder.group({
            anio: [''],
            mes: ['', Validators.required]
        })
    }


    getOpeningList() {
        this.isLoading = true;
        const data = this.yearForm.value;
        this.openingService.getListByYear(data.year).subscribe({
            next: data => {
                this.openingList = data.openings
                const selected: any[] = this.openingList.filter((opening: any) => opening.estatus == 1).map((item: any) => {
                    this.openingToAttach.push(item.id)
                    return item.id
                })
                this.toppings = new FormControl(selected)
                this.isLoading = false;
            },
            error: err => {
                this.isLoading = false;
                this.alertsService.errorAlert(err.error.errors);
            }
        })
    }

    openingAction(){
        this.isOpening = true;
        const data = {
            openings: this.openingToAttach
        }

        this.openingService.exception(this.company.id, data).subscribe({
            next: data => {
                this.isOpening = false;
                this.alertsService.successAlert(data.message).then(res => {
                    if (res.isConfirmed){
                        this.dialogRef.close(true);
                    }
                })
            },
            error: err => {
                this.isOpening = false;
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
