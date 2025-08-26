import {Component, inject, OnInit} from '@angular/core';
import {Button, ButtonModule} from "primeng/button";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {IftaLabel, IftaLabelModule} from "primeng/iftalabel";
import {Textarea, TextareaModule} from "primeng/textarea";
import {AlertsService} from '../../../../core/services/alerts.service';
import {DynamicDialogConfig, DynamicDialogRef} from 'primeng/dynamicdialog';
import {RequestsService} from '../../services/requests.service';

@Component({
    selector: 'app-reject-requests-dialog',
    imports: [
        TextareaModule,
        IftaLabelModule,
        ButtonModule,
        ReactiveFormsModule,
    ],
    templateUrl: './reject-requests-dialog.component.html',
    styleUrl: './reject-requests-dialog.component.scss'
})
export class RejectRequestsDialogComponent implements OnInit {

    private requestsService = inject(RequestsService);
    private alertsService = inject(AlertsService);
    private formBuilder = inject(FormBuilder);
    private dialogConfig = inject(DynamicDialogConfig);
    private dialogRef = inject(DynamicDialogRef);

    public rejectForm: FormGroup;

    public request: any;
    public isRejecting: boolean = false;

    ngOnInit() {
        this.request = this.dialogConfig.data.request;
        this.initRejectDeclarationForm()
    }

    public initRejectDeclarationForm() {
        this.rejectForm = this.formBuilder.group({
            register_id: [this.request.id.toString()],
            estatus: ['-1', Validators.required],
            observaciones: ['', Validators.required]
        });
    }

    public rejectRequest(){
        this.isRejecting = true;
        const data = this.rejectForm.value;
        this.requestsService.processRequest(data).subscribe({
            next: res => {
                this.isRejecting = false;
                this.alertsService.successAlert(res.message).then(res => {
                    if (res.isConfirmed) {
                        this.dialogRef.close(true);
                    }
                })
            },
            error: err => {
                this.isRejecting = false;
                if (err.status == 500) {
                    this.alertsService.errorAlert([{message: `${err.statusText}: ${err.error.exception}`}]);
                } else {
                    this.alertsService.errorAlert(err.error.errors);
                }
            }
        })
    }
}
