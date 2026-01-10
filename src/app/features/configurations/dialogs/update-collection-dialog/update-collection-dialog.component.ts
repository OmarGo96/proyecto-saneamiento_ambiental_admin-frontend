import {Component, inject, OnInit} from '@angular/core';
import {InputNumberModule} from 'primeng/inputnumber';
import {ButtonModule} from 'primeng/button';
import {OpeningService} from '../../services/opening.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {AlertsService} from '../../../../core/services/alerts.service';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {DynamicDialogConfig, DynamicDialogRef} from 'primeng/dynamicdialog';

@Component({
    selector: 'app-update-collection-dialog',
    imports: [
        InputNumberModule,
        ButtonModule,
        ReactiveFormsModule
    ],
    templateUrl: './update-collection-dialog.component.html',
    styleUrl: './update-collection-dialog.component.scss'
})
export class UpdateCollectionDialogComponent implements OnInit {

    private openingService = inject(OpeningService);
    private spinner = inject(NgxSpinnerService);
    private alertsService = inject(AlertsService);
    private formBuilder = inject(FormBuilder);
    private dialogRef = inject(DynamicDialogRef);
    private dialogConfig = inject(DynamicDialogConfig);

    public updateCollectionForm: FormGroup;
    public opening: any;

    ngOnInit() {
        this.opening = this.dialogConfig.data.opening;
        this.initUpdateCollectionForm();
    }

    initUpdateCollectionForm(){
        this.updateCollectionForm = this.formBuilder.group({
            recaudacion: [this.opening.recaudacion, Validators.required],
        });
    }

    updateCollection(){
        this.spinner.show();
        const data = this.updateCollectionForm.value;
        this.openingService.updateCollection(this.opening.uuid, data).subscribe({
            next: data => {
                this.spinner.hide();
                this.alertsService.successAlert(data.message).then(
                    result => {
                        if (result) {
                            this.dialogRef.close(true);
                        }
                    }
                );
            },
            error: err => {
                this.spinner.hide();
                this.alertsService.errorAlert(err.error.errors);
            }
        })
    }

}
