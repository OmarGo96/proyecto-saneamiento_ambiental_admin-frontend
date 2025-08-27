import {Component, inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {InputTextModule} from 'primeng/inputtext';
import {SelectModule} from 'primeng/select';
import {Button} from 'primeng/button';
import {AlertsService} from '../../../../core/services/alerts.service';
import {DynamicDialogConfig, DynamicDialogRef} from 'primeng/dynamicdialog';
import {UsersService} from '../../../../core/services/users.service';

@Component({
    selector: 'app-create-users-dialog',
    imports: [
        ReactiveFormsModule,
        InputTextModule,
        SelectModule,
        Button
    ],
    templateUrl: './create-users-dialog.component.html',
    styleUrl: './create-users-dialog.component.scss'
})
export class CreateUsersDialogComponent implements OnInit {

    public createUserForm: FormGroup;

    private usersService = inject(UsersService);
    private alertsService = inject(AlertsService);
    private formBuilder = inject(FormBuilder);
    private dialogRef = inject(DynamicDialogRef);
    private dialogConfig = inject(DynamicDialogConfig);

    public usersRoles = [
        { name: 'Normal', value: '1'},
        { name: 'Administrador', value: '2'}
    ]

    public isLoading = false;

    ngOnInit() {
        this.initCreateUserForm();
    }

    initCreateUserForm() {
        this.createUserForm = this.formBuilder.group({
            id: [''],
            rol: ['', Validators.required],
            nombre: ['', Validators.required],
            apellidos: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
        });
    }

    createUser(){
        this.isLoading = true;
        const data = this.createUserForm.value;
        this.usersService.createUser(data).subscribe({
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
