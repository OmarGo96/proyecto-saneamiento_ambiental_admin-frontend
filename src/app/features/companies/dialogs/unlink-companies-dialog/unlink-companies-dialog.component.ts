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

    public unlinkType: string;
    public users: any;

    public unlinkTypes = [
        {name: 'Liberar empresa', value: 'release'},
        {name: 'Adjuntar un nuevo contribuyente', value: 'new_user'},
        {name: 'Adjuntar un contribuyente existente', value: 'user_in_system'}
    ];

    ngOnInit() {
        forkJoin({
            users: this.usersService.getUsers()
        }).subscribe({
            next: ({users}) => {
                this.users = users.users;
            },
            error: err => {
                this.alertsService.errorAlert(err.error.errors);
            }
        });
        this.initUnlinkForm();
    }

    initUnlinkForm() {
        this.unlinkForm = this.formBuilder.group({
            nombre: [''],
            telefono: [''],
            email: [''],
            user_id: ['']
        })
    }

    unlinkCompany() {
        this.alertsService.confirmRequest('¿Está completamente seguro de querer realizar esta acción?')
            .subscribe({
                next: res => {

                },
                error: err => {
                }
            });
    }

    selectUnlinkType(event: any) {
        this.unlinkType = event.value;
    }
}
