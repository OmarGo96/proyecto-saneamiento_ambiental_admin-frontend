import {Component, inject, Input, OnInit} from '@angular/core';
import {CompaniesService} from '../../services/companies.service';
import {ButtonModule} from 'primeng/button';
import {FileUploadModule} from 'primeng/fileupload';
import {ConfirmationService, MessageService} from 'primeng/api';
import {
    AddCompaniesDocumentationDialogComponent
} from '../../dialogs/add-companies-documentation-dialog/add-companies-documentation-dialog.component';
import {DialogService, DynamicDialogRef} from 'primeng/dynamicdialog';
import {AlertsService} from '../../../../core/services/alerts.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {DatePipe, Location} from '@angular/common';

@Component({
    selector: 'app-companies-files',
    imports: [
        ButtonModule,
        FileUploadModule,
        DatePipe
    ],
    providers: [MessageService, DialogService, AlertsService, ConfirmationService],
    templateUrl: './companies-files.component.html',
    styleUrl: './companies-files.component.scss'
})
export class CompaniesFilesComponent implements OnInit {

    @Input() companyId: any;

    private companiesService = inject(CompaniesService);
    private alertsService = inject(AlertsService);
    private spinner = inject(NgxSpinnerService);
    private dialogService = inject(DialogService);
    private dialogRef: DynamicDialogRef | undefined;
    private location = inject(Location);

    public documentation: any;

    ngOnInit() {
        this.getCompaniesFiles();
    }

    getCompaniesFiles() {
        this.spinner.show();
        this.companiesService.getCompaniesFiles(this.companyId).subscribe({
            next: data => {
                this.documentation = data.documentation;
                this.spinner.hide();
            },
            error: err => {
                this.spinner.hide();
            }
        })
    }

    public openAddCompaniesDocumentationDialog() {
        this.dialogRef = this.dialogService.open(AddCompaniesDocumentationDialogComponent, {
            header: 'Agregar documentación',
            width: '30vw',
            closeOnEscape: false,
            modal: true,
            closable: true,
            baseZIndex: 1,
            breakpoints: {
                '960px': '75vw',
                '640px': '90vw'
            },
            data: {
                companyId: this.companyId
            }
        });

        this.dialogRef.onClose.subscribe((result: any) => {
            if (result) {
                this.getCompaniesFiles();
            }
        });
    }

    goBack() {
        localStorage.removeItem(this.companiesService.companyToken);
        this.location.back();
    }

}
