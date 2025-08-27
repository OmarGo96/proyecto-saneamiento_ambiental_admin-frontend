import {Component, inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {AlertsService} from '../../../../core/services/alerts.service';
import {DynamicDialogConfig, DynamicDialogRef} from 'primeng/dynamicdialog';
import {ConfirmationService} from 'primeng/api';
import {Button} from 'primeng/button';
import {InputText} from 'primeng/inputtext';
import {Select} from 'primeng/select';
import {UsersService} from '../../../../core/services/users.service';

@Component({
    selector: 'app-update-users-dialog',
    imports: [
        ReactiveFormsModule,
        Button,
        InputText,
        Select
    ],
    providers: [AlertsService, ConfirmationService],
    templateUrl: './update-users-dialog.component.html',
    styleUrl: './update-users-dialog.component.scss'
})
export class UpdateUsersDialogComponent implements OnInit {

    public updateUserForm: FormGroup;

    private usersService = inject(UsersService);
    private alertsService = inject(AlertsService);
    private formBuilder = inject(FormBuilder);
    private dialogRef = inject(DynamicDialogRef);
    private dialogConfig = inject(DynamicDialogConfig);

    public user: any;
    public isLoading = false;

    public usersRoles = [
        { name: 'Normal', value: '1'},
        { name: 'Administrador', value: '2'}
    ]

    ngOnInit() {
        this.user = this.dialogConfig.data.user;
        console.log(this.user);
        this.initUpdateUserForm();
    }

    initUpdateUserForm() {
        this.updateUserForm = this.formBuilder.group({
            id: [this.user.id],
            rol: [this.user.rol.toString(), Validators.required],
            nombre: [this.user.nombre, Validators.required],
            apellidos: [this.user.apellidos, Validators.required],
            email: [this.user.email, [Validators.required, Validators.email]],
        });
    }

    updateUser(){
        this.isLoading = true;
        const data = this.updateUserForm.value;
        this.usersService.updateUser(this.user.id, data).subscribe({
            next: data => {
                this.isLoading = false;
                this.alertsService.successAlert(data.message).then(res => {
                    if (res.isConfirmed){
                        this.dialogRef.close(true);
                    }
                });
            },
            error: err => {
                this.isLoading = false;
                if (err.status == 500) {
                    this.alertsService.errorAlert([{message: `${err.statusText}: ${err.error.exception}`}]);
                } else {
                    this.alertsService.errorAlert(err.error.errors);
                }
            }
        })
    }

}
