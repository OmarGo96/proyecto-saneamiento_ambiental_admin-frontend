import {Component, inject, OnInit} from '@angular/core';
import {TextareaModule} from 'primeng/textarea';
import {IftaLabelModule} from 'primeng/iftalabel';
import {ButtonModule} from 'primeng/button';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {DeclarationsService} from '../../services/declarations.service';
import {AlertsService} from '../../../../core/services/alerts.service';
import {DynamicDialogConfig, DynamicDialogRef} from 'primeng/dynamicdialog';

@Component({
    selector: 'app-reject-declaration-dialog',
    imports: [
        TextareaModule,
        IftaLabelModule,
        ButtonModule,
        ReactiveFormsModule,
    ],
    templateUrl: './reject-declaration-dialog.component.html',
    styleUrl: './reject-declaration-dialog.component.scss'
})
export class RejectDeclarationDialogComponent implements OnInit {

    private declarationService = inject(DeclarationsService);
    private alertsService = inject(AlertsService);
    private formBuilder = inject(FormBuilder);
    private dialogConfig = inject(DynamicDialogConfig);
    private dialogRef = inject(DynamicDialogRef);

    public rejectForm: FormGroup;

    public declaration: any;
    public isRejecting: boolean = false;

    ngOnInit() {
        this.declaration = this.dialogConfig.data.declaration;
        this.initRejectDeclarationForm()
    }

    initRejectDeclarationForm() {
        this.rejectForm = this.formBuilder.group({
            statement_id: [this.declaration.id.toString()],
            estatus: ['-1', Validators.required],
            observaciones: ['', Validators.required]
        });
    }

    rejectDeclaration() {
        this.isRejecting = true;
        const data = this.rejectForm.value;
        this.declarationService.processDeclaration(data).subscribe({
            next: (res: any) => {
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
