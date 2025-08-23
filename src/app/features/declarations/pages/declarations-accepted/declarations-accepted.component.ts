import {Component, inject, OnInit, ViewChild} from '@angular/core';
import {ButtonModule} from 'primeng/button';
import {IconFieldModule} from 'primeng/iconfield';
import {InputIconModule} from 'primeng/inputicon';
import {InputTextModule} from 'primeng/inputtext';
import {DialogService, DynamicDialogRef} from 'primeng/dynamicdialog';
import {TableModule} from 'primeng/table';
import {PopoverModule} from 'primeng/popover';
import {TableSkeletonComponent} from '../../../../shared/components/skeleton/table-skeleton/table-skeleton.component';
import {DeclarationsService} from '../../services/declarations.service';
import {AlertsService} from '../../../../core/services/alerts.service';
import {Router} from '@angular/router';
import {DeclarationsStatus} from '../../constants/declarations-status';
import {CurrencyPipe} from '@angular/common';
import {ConfirmationService} from 'primeng/api';

@Component({
    selector: 'app-declarations-accepted',
    imports: [
        IconFieldModule,
        InputIconModule,
        InputTextModule,
        TableModule,
        PopoverModule,
        ButtonModule,
        TableSkeletonComponent,
        CurrencyPipe
    ],
    providers: [AlertsService, ConfirmationService, DialogService],
    templateUrl: './declarations-accepted.component.html',
    styleUrl: './declarations-accepted.component.scss'
})
export class DeclarationsAcceptedComponent implements OnInit {

    @ViewChild('table') table: any | undefined;

    private declarationsService = inject(DeclarationsService)
    private alertsService = inject(AlertsService);
    private dialogService = inject(DialogService);
    private dialogRef: DynamicDialogRef | undefined;
    private router = inject(Router);

    public declarations: any;
    public declarationsStatus = DeclarationsStatus;
    public isLoading: boolean = false;
    public isDeleting: boolean = false;

    ngOnInit() {
        this.getDeclarationsAccepted()
    }

    public getDeclarationsAccepted(){
        this.isLoading = true;
        this.declarationsService.getDeclarationsByStatus('approved').subscribe({
            next: res => {
                this.isLoading = false;
                this.declarations = res.statements;
            },
            error: err => {
                this.isLoading = false;
                this.alertsService.errorAlert(err.error.errors);
            }
        });
    }

    public viewDeclarationDetails(declaration: any) {
        localStorage.setItem(this.declarationsService.declarationToken, btoa(JSON.stringify(declaration)));
        this.router.navigate(['/declaraciones/detalle']);
    }

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.table?.filterGlobal(filterValue, 'contains');
    }
}
