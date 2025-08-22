import {Component, inject, OnInit} from '@angular/core';
import {SelectModule} from 'primeng/select';
import {FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {CompaniesService} from '../../services/companies.service';
import {InputTextModule} from 'primeng/inputtext';
import {forkJoin} from 'rxjs';
import {UsersService} from '../../../../core/services/users.service';
import {AlertsService} from '../../../../core/services/alerts.service';
import {ButtonModule} from 'primeng/button';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmationService} from 'primeng/api';
import {DynamicDialogConfig, DynamicDialogRef} from 'primeng/dynamicdialog';

@Component({
    selector: 'app-unlink-companies-dialog',
    imports: [
        SelectModule,
        InputTextModule,
        ReactiveFormsModule,
        ButtonModule,
        ConfirmDialogModule
    ],
    providers: [AlertsService, ConfirmationService],
    templateUrl: './unlink-companies-dialog.component.html',
    styleUrl: './unlink-companies-dialog.component.scss'
})
export class UnlinkCompaniesDialogComponent implements OnInit {

    public unlinkForm: FormGroup;

    private companiesService = inject(CompaniesService);
    private usersService = inject(UsersService);
    private alertsService = inject(AlertsService);
    private formBuilder = inject(FormBuilder);
    private dialogRef = inject(DynamicDialogRef);
    private dialogConfig = inject(DynamicDialogConfig);

    public unlinkType: string;
    public users: any;
    public company: any;
    public isLoading: boolean;

    public unlinkTypes = [
        {name: 'Liberar empresa', value: 'release'},
        {name: 'Adjuntar un nuevo contribuyente', value: 'new_user'},
        {name: 'Adjuntar un contribuyente existente', value: 'user_in_system'}
    ];

    ngOnInit() {
        this.company = this.dialogConfig.data.company;

        forkJoin({
            users: this.usersService.getUsers()
        }).subscribe({
            next: ({users}) => {
                this.users = users.users;
                this.initUnlinkForm();
            },
            error: err => {
                this.alertsService.errorAlert(err.error.errors);
            }
        });
    }

    initUnlinkForm() {
        this.unlinkForm = this.formBuilder.group({
            nombre: [''],
            telefono: [''],
            email: [''],
            user_id: ['']
        })
    }

    confirmUnlinkRequest() {
        this.alertsService.confirmRequest('¿Está completamente seguro de querer realizar esta acción?')
            .subscribe({
                next: res => {
                    this.isLoading = true;
                    if (this.unlinkType != 'release') {
                        this.unlinkCompany();
                    } else {
                        this.releaseCompany();
                    }
                }
            });
    }

    unlinkCompany() {
        const data = this.unlinkForm.value;
        this.companiesService.unlinkCompany(data, this.company.id).subscribe({
            next: res => {
                this.isLoading = false;
                this.alertsService.successAlert(res.message).then(
                    res => {
                        if (res.isConfirmed) {
                            this.dialogRef.close(true);
                        }
                    }
                );
            },
            error: err => {
                this.isLoading = false;
                this.alertsService.errorAlert([{ message: err.error.errors}]);
            }
        });
    }

    releaseCompany() {
        this.companiesService.releaseCompany(this.company.id).subscribe({
            next: res => {
                this.isLoading = false;
                this.alertsService.successAlert(res.message).then(
                    res => {
                        if (res.isConfirmed) {
                            this.dialogRef.close(true);
                        }
                    }
                );
            },
            error: err => {
                this.isLoading = false;
                this.alertsService.errorAlert(err.error.errors);
            }
        });
    }

    selectUnlinkType(event: any) {
        this.unlinkType = event.value;
        this.unlinkForm.reset();
    }
}
