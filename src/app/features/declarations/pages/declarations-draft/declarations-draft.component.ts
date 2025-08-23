import {Component, inject, OnInit, ViewChild} from '@angular/core';
import {ButtonModule} from 'primeng/button';
import {IconFieldModule} from 'primeng/iconfield';
import {InputIconModule} from 'primeng/inputicon';
import {InputTextModule} from 'primeng/inputtext';
import {PopoverModule} from 'primeng/popover';
import {TableModule} from 'primeng/table';
import {TableSkeletonComponent} from '../../../../shared/components/skeleton/table-skeleton/table-skeleton.component';
import {AlertsService} from '../../../../core/services/alerts.service';
import {DialogService, DynamicDialogRef} from 'primeng/dynamicdialog';
import {Router} from '@angular/router';
import {DeclarationsService} from '../../services/declarations.service';
import {CurrencyPipe} from '@angular/common';
import {DeclarationsStatus} from '../../constants/declarations-status';
import {ConfirmationService} from 'primeng/api';

@Component({
    selector: 'app-declarations-draft',
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
    templateUrl: './declarations-draft.component.html',
    styleUrl: './declarations-draft.component.scss'
})
export class DeclarationsDraftComponent implements OnInit {

    @ViewChild('table') table: any | undefined;

    private declarationsService = inject(DeclarationsService)
    private alertsService = inject(AlertsService);
    private dialogService = inject(DialogService);
    private dialogRef: DynamicDialogRef | undefined;
    private router = inject(Router);

    public declarations: any;
    public isLoading: boolean = false;
    public isDeleting: boolean = false;

    public declarationsStatus = DeclarationsStatus;

    ngOnInit() {
        this.getDraftDeclarations()
    }

    public getDraftDeclarations() {
        this.isLoading = true;
        this.declarationsService.getDeclarationsByStatus('borrador').subscribe({
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
