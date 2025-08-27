import {Component, inject, OnInit} from '@angular/core';
import {IconFieldModule} from 'primeng/iconfield';
import {InputIconModule} from 'primeng/inputicon';
import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import {UsersService} from '../../../../core/services/users.service';
import {AlertsService} from '../../../../core/services/alerts.service';
import {DialogService, DynamicDialogRef} from 'primeng/dynamicdialog';
import {Router} from '@angular/router';
import {CreateUsersDialogComponent} from '../../dialogs/create-users-dialog/create-users-dialog.component';
import {TableModule} from 'primeng/table';
import {PopoverModule} from 'primeng/popover';
import {TableSkeletonComponent} from '../../../../shared/components/skeleton/table-skeleton/table-skeleton.component';
import {UpdateUsersDialogComponent} from '../../dialogs/update-users-dialog/update-users-dialog.component';
import {ConfirmationService, MessageService} from 'primeng/api';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
    selector: 'app-users',
    imports: [
        IconFieldModule,
        InputIconModule,
        InputTextModule,
        TableModule,
        PopoverModule,
        ButtonModule,
        TableSkeletonComponent
    ],
    providers: [AlertsService, ConfirmationService, DialogService],
    templateUrl: './users.component.html',
    styleUrl: './users.component.scss'
})
export class UsersComponent implements OnInit {

    private usersService = inject(UsersService);
    private alertsService = inject(AlertsService);
    private spinner = inject(NgxSpinnerService);
    private dialogService = inject(DialogService);
    private dialogRef: DynamicDialogRef | undefined;
    private router = inject(Router);

    public users: any;
    public isLoading: boolean = false;
    public isDeleting: boolean = false;

    ngOnInit() {
        this.getUsers();
    }

    private getUsers() {
        this.isLoading = true;
        this.usersService.getUsers().subscribe({
            next: data => {
                this.isLoading = false;
                this.users = data.admins;
            },
            error: err => {
                this.isLoading = false;
                this.alertsService.errorAlert(err.error.errors);
            }
        })
    }

    openCreateUsersDialog() {
        this.dialogRef = this.dialogService.open(CreateUsersDialogComponent, {
            header: 'Crear nuevo usuario',
            width: '20vw',
            closeOnEscape: false,
            modal: true,
            closable: true,
            baseZIndex: 1,
            breakpoints: {
                '960px': '75vw',
                '640px': '90vw'
            },
        });

        this.dialogRef.onClose.subscribe((result) => {
            if (result) {
                this.getUsers();
            }
        });
    }

    openUpdateUserDialog(user: any) {
        this.dialogRef = this.dialogService.open(UpdateUsersDialogComponent, {
            data: {
                user
            },
            header: 'Update user',
            width: '20vw',
            closeOnEscape: false,
            modal: true,
            closable: true,
            baseZIndex: 1,
            breakpoints: {
                '960px': '75vw',
                '640px': '90vw'
            },
        });

        this.dialogRef.onClose.subscribe((result) => {
            if (result) {
                this.getUsers();
            }
        });

    }

    public deleteUser(userId: any) {
        this.alertsService.confirmDelete('¿Estás seguro de querer realizar esta acción?')
            .then(result => {
                if (result.isConfirmed) {
                    this.spinner.show();


                    this.usersService.deleteUser(userId).subscribe({
                        next: data => {
                            this.spinner.hide();
                            this.alertsService.successAlert(data.message).then(result => {
                                if (result.isConfirmed) {
                                    this.getUsers()
                                }
                            });
                        },
                        error: err => {
                            this.spinner.hide();
                            this.alertsService.errorAlert(err.error.errors);
                        }
                    })
                }
            })
    }

    public reactiveUser(userId: any) {
        this.alertsService.confirmDelete('¿Estás seguro de querer realizar esta acción?')
            .then(result => {
                if (result.isConfirmed) {
                    this.spinner.show();


                    this.usersService.reactiveUser(userId).subscribe({
                        next: data => {
                            this.spinner.hide();
                            this.alertsService.successAlert(data.message).then(result => {
                                if (result.isConfirmed) {
                                    this.getUsers()
                                }
                            });
                        },
                        error: err => {
                            this.spinner.hide();
                            this.alertsService.errorAlert(err.error.errors);
                        }
                    })
                }
            })
    }
}
