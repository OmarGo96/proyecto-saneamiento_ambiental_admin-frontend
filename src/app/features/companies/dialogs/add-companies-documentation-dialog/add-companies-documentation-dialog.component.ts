import {Component, inject, OnInit} from '@angular/core';
import {FileUploadModule} from 'primeng/fileupload';
import {forkJoin} from 'rxjs';
import {SelectModule} from 'primeng/select';
import {FilesService} from '../../../../core/services/files.service';
import {AlertsService} from '../../../../core/services/alerts.service';
import {FormsModule} from '@angular/forms';
import {ConfirmationService} from 'primeng/api';
import {ButtonModule} from 'primeng/button';
import {NgxSpinnerService} from 'ngx-spinner';
import {DynamicDialogRef} from 'primeng/dynamicdialog';

@Component({
    selector: 'app-add-companies-documentation-dialog',
    imports: [
        FileUploadModule,
        SelectModule,
        FormsModule,
        ButtonModule,
    ],
    providers: [AlertsService, ConfirmationService],
    templateUrl: './add-companies-documentation-dialog.component.html',
    styleUrl: './add-companies-documentation-dialog.component.scss'
})
export class AddCompaniesDocumentationDialogComponent implements OnInit {

    private filesService = inject(FilesService);
    private alertsService = inject(AlertsService);
    private spinner = inject(NgxSpinnerService);
    private dialogRef = inject(DynamicDialogRef);

    public uploadedFiles: any[] = [];
    public documentTypes: any;
    public selectedDocumentType: any;

    ngOnInit() {
        this.loadInitialData();
    }

    loadInitialData() {
        forkJoin({
            types: this.filesService.getDocumentTypes()
        }).subscribe({
            next: ({types}) => {
                this.documentTypes = types.documents;
            },
            error: err => {
                this.alertsService.errorAlert(err.error.errors);
            }
        });
    }

    uploadCompaniesDocumentation(files: any) {
        this.spinner.show();

        let formData = new FormData();

        for (const file of files) {
            formData.append('file', file);
            formData.append('type_document_id', this.selectedDocumentType);
        }

        this.filesService.createCompaniesDocumentation(this.selectedDocumentType, formData).subscribe({
            next: data => {
                this.spinner.hide();
                this.alertsService.successAlert(data.message).then(res => {
                    if (res.isConfirmed) {
                        this.dialogRef.close(true);
                    }
                });
            },
            error: err => {
                this.alertsService.errorAlert(err.error.errors);
                this.spinner.hide();
            }
        });
    }

    public chooseFile(event: any, callback: any) {
        callback();
    }
}
