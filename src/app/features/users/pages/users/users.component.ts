import {Component, inject, OnInit} from '@angular/core';
import {IconFieldModule} from 'primeng/iconfield';
import {InputIconModule} from 'primeng/inputicon';
import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import {UsersService} from '../../services/users.service';
import {AlertsService} from '../../../../core/services/alerts.service';
import {DialogService, DynamicDialogRef} from 'primeng/dynamicdialog';
import {Router} from '@angular/router';
import {CreateUsersDialogComponent} from '../../dialogs/create-users-dialog/create-users-dialog.component';
import {TableModule} from 'primeng/table';
import {PopoverModule} from 'primeng/popover';
import {TableSkeletonComponent} from '../../../../shared/components/skeleton/table-skeleton/table-skeleton.component';
import {UpdateUsersDialogComponent} from '../../dialogs/update-users-dialog/update-users-dialog.component';
import {MessageService} from 'primeng/api';

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
    providers: [DialogService],
    templateUrl: './users.component.html',
    styleUrl: './users.component.scss'
})
export class UsersComponent implements OnInit {

    private usersService = inject(UsersService);
    private alertsService = inject(AlertsService);
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
        console.log('Getting users...');
    }

    openCreateUsersDialog() {
        this.dialogRef = this.dialogService.open(CreateUsersDialogComponent, {
            header: 'Create new user',
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

    public deleteUser(userUuid: string) {
        this.alertsService.confirmDelete('Please confirm that you would like to delete this user?')
            .then(result => {
                if (result.isConfirmed) {
                    this.isDeleting = true;

                    // TODO: Se solicita la eliminación del usuario

                    /*this.usersService.deleteUsers(userUuid).subscribe({
                        next: res => {
                            this.isDeleting = false;
                            this.alertsService.successAlert(res.message).then(result => {
                                if (result.isConfirmed) {
                                    this.getUsers()
                                }
                            });
                        },
                        error: err => {
                            this.isDeleting = false;
                            this.alertsService.errorAlert(err.error.errors);
                        }
                    })*/
                }
            })
    }
}
