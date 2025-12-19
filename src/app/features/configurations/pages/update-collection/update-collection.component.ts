import {Component, inject} from '@angular/core';
import {ButtonModule} from 'primeng/button';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {SelectModule} from 'primeng/select';
import {OpeningService} from '../../services/opening.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {AlertsService} from '../../../../core/services/alerts.service';
import {MultiSelectModule} from 'primeng/multiselect';
import {ConfirmationService} from 'primeng/api';

@Component({
    selector: 'app-update-collection',
    imports: [
        SelectModule,
        ReactiveFormsModule,
        ButtonModule,
        MultiSelectModule
    ],
    providers: [AlertsService, ConfirmationService],
    templateUrl: './update-collection.component.html',
    styleUrl: './update-collection.component.scss'
})
export class UpdateCollectionComponent {
    public yearForm: FormGroup;
    public openingForm: FormGroup;

    private openingService = inject(OpeningService);
    private spinner = inject(NgxSpinnerService);
    private alertsService = inject(AlertsService);
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
                console.log(data.openings);
                this.openingList = data.openings
                /*const selected: any[] = this.openingList.filter((opening: any) => opening.estatus == 1).map((item: any) => {
                    this.openingToAttach.push(item.id)
                    return item.id
                })
                this.toppings = new FormControl(selected)*/
                this.isLoading = false;
            },
            error: err => {
                this.isLoading = false;
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
