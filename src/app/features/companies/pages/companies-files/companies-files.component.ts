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
import {CompanyDocument} from '../../models/company-document.interface';
import {FilesService} from '../../../../core/services/files.service';
import {RejectionReasonDialogComponent} from '../../dialogs/rejection-reason-dialog/rejection-reason-dialog.component';
import {CardModule} from 'primeng/card';
import {BadgeModule} from 'primeng/badge';
import {MessageModule} from 'primeng/message';

@Component({
    selector: 'app-companies-files',
    imports: [
        ButtonModule,
        FileUploadModule,
        DatePipe,
        CardModule,
        BadgeModule,
        MessageModule
    ],
    providers: [MessageService, DialogService, AlertsService, ConfirmationService],
    templateUrl: './companies-files.component.html',
    styleUrl: './companies-files.component.scss'
})
export class CompaniesFilesComponent implements OnInit {

    @Input() companyUuid!: string;

    private companiesService = inject(CompaniesService);
    private alertsService = inject(AlertsService);
    private spinner = inject(NgxSpinnerService);
    private dialogService = inject(DialogService);
    private filesService = inject(FilesService);
    private dialogRef: DynamicDialogRef | undefined;
    private location = inject(Location);

    public documents: CompanyDocument[] = [];
    public currentYear: number;
    public isDownloading: boolean = false;

    ngOnInit() {
        this.currentYear = new Date().getFullYear();
        this.getCompaniesFiles();
    }

    getCompaniesFiles() {
        this.spinner.show();
        this.companiesService.getCompaniesFiles(this.companyUuid, this.currentYear).subscribe({
            next: data => {
                this.documents = data.documents;
                this.spinner.hide();
            },
            error: err => {
                this.spinner.hide();
                this.alertsService.errorAlert([err?.error?.message || 'Error al cargar los documentos']);
            }
        })
    }

    approveDocument(document: CompanyDocument) {
        if (!document.uuid) {
            this.alertsService.errorAlert(['Este documento no se puede aprobar']);
            return;
        }

        this.alertsService.confirmDelete('¿Aprobar este documento?').then((result: any) => {
            if (result.isConfirmed) {
                this.spinner.show();
                this.filesService.reviewCompanyDocument(document.uuid!, 'aprobado').subscribe({
                    next: (response: any) => {
                        this.spinner.hide();
                        this.alertsService.successAlert(response.message || 'Documento aprobado correctamente');
                        this.getCompaniesFiles();
                    },
                    error: (err: any) => {
                        this.spinner.hide();
                        this.alertsService.errorAlert([err?.error?.message || 'Error al aprobar el documento']);
                    }
                });
            }
        });
    }

    rejectDocument(document: CompanyDocument) {
        if (!document.uuid) {
            this.alertsService.errorAlert(['Este documento no se puede rechazar']);
            return;
        }

        // Abrir diálogo para solicitar motivo de rechazo
        const dialogRef = this.dialogService.open(RejectionReasonDialogComponent, {
            header: 'Rechazar Documento',
            width: '500px',
            modal: true,
            closable: true,
            closeOnEscape: true,
            breakpoints: {
                '960px': '75vw',
                '640px': '90vw'
            }
        });

        dialogRef.onClose.subscribe((reason: string | null) => {
            if (reason) {
                this.spinner.show();
                this.filesService.reviewCompanyDocument(document.uuid!, 'rechazado', reason).subscribe({
                    next: (response: any) => {
                        this.spinner.hide();
                        this.alertsService.successAlert(response.message || 'Documento rechazado correctamente');
                        this.getCompaniesFiles();
                    },
                    error: (err: any) => {
                        this.spinner.hide();
                        this.alertsService.errorAlert([err?.error?.message || 'Error al rechazar el documento']);
                    }
                });
            }
        });
    }

    viewDocument(document: CompanyDocument) {

        console.log(document);
        if (!document.file) {
            this.alertsService.errorAlert(['No hay archivo disponible para visualizar']);
            return;
        }

        const documentTypeMap: Record<string, string> = {
            'acta constitutiva': 'actas',
            'poder notarial': 'notariales',
            'constancia de situación fiscal': 'constancias',
            'licencia de funcionamiento': 'licencias_funcionamiento',
            'licencia estatal': 'licencias_estatales',
        };

        const normalizedName = document.type_document_name
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/[()]/g, '')
            .replace(/\s+/g, ' ')
            .trim();

        const documentType = Object.entries(documentTypeMap).find(([key]) =>
            normalizedName.includes(key.normalize('NFD').replace(/[\u0300-\u036f]/g, ''))
        )?.[1] ?? (normalizedName.includes('identificac') ? 'identificaciones' : normalizedName);

        this.spinner.show();

        this.filesService.getDocumentFile(document.file, documentType).subscribe({
            next: (blob: Blob) => {
                this.spinner.hide();

                // Crear una URL temporal del blob
                const fileURL = URL.createObjectURL(blob);

                // Abrir en nueva pestaña
                const newWindow = window.open(fileURL, '_blank');

                // Liberar la URL del blob después de un tiempo
                if (newWindow) {
                    newWindow.onload = () => {
                        setTimeout(() => URL.revokeObjectURL(fileURL), 100);
                    };
                } else {
                    setTimeout(() => URL.revokeObjectURL(fileURL), 60000);
                }
            },
            error: err => {
                this.spinner.hide();
                this.alertsService.errorAlert(['Error al cargar el documento, por favor intenta nuevamente']);
            }
        });
    }


    hasFile(document: CompanyDocument): boolean {
        return document.file !== null && document.file !== '';
    }

    getStatusClass(status: string | null): string {
        if (!status) return 'bg-gray-100 text-gray-800';

        switch (status) {
            case 'aprobado':
            case 'approved':
                return 'bg-green-100 text-green-800';
            case 'rechazado':
            case 'rejected':
                return 'bg-red-100 text-red-800';
            case 'pendiente':
            case 'pending':
                return 'bg-yellow-100 text-yellow-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    }

    getStatusText(status: string | null): string {
        if (!status) return 'Sin subir';

        switch (status) {
            case 'aprobado':
            case 'approved':
                return 'Aprobado';
            case 'rechazado':
            case 'rejected':
                return 'Rechazado';
            case 'pendiente':
            case 'pending':
                return 'Pendiente';
            default:
                return 'Sin estado';
        }
    }

    getStatusSeverity(status: string | null): 'success' | 'danger' | 'warn' | 'info' | 'secondary' | 'contrast' {
        if (!status) return 'secondary';

        switch (status) {
            case 'aprobado':
            case 'approved':
                return 'success';
            case 'rechazado':
            case 'rejected':
                return 'danger';
            case 'pendiente':
            case 'pending':
                return 'warn';
            default:
                return 'secondary';
        }
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
                companyUuid: this.companyUuid
            }
        });

        this.dialogRef.onClose.subscribe((result: boolean) => {
            if (result) {
                this.getCompaniesFiles();
            }
        });
    }

    goBack() {
        localStorage.removeItem(this.companiesService.companyToken);
        this.location.back();
    }

    isReviewed(document: CompanyDocument): boolean {
        if (!document.status) return false;
        const status = document.status.toLowerCase();
        return status === 'aprobado' || status === 'approved' || status === 'rechazado' || status === 'rejected';
    }

    /**
     * Verifica si hay documentos disponibles para descargar (aprobados o pendientes)
     */
    hasDocumentsToDownload(): boolean {
        return this.documents.some(doc => {
            if (!doc.status || !doc.file) return false;
            const status = doc.status.toLowerCase();
            return (status === 'aprobado' || status === 'approved' || 
                    status === 'pendiente' || status === 'pending');
        });
    }

    /**
     * Descargar todos los documentos de la empresa en formato ZIP
     */
    downloadAllDocuments(): void {
        if (!this.companyUuid) {
            this.alertsService.errorAlert(['No se ha seleccionado ninguna empresa']);
            return;
        }

        if (!this.hasDocumentsToDownload()) {
            this.alertsService.errorAlert(['No hay documentos disponibles para descargar']);
            return;
        }

        this.isDownloading = true;
        this.spinner.show();

        this.companiesService.downloadAllDocuments(this.companyUuid).subscribe({
            next: (blob: Blob) => {
                // Crear URL temporal del blob
                const url = window.URL.createObjectURL(blob);
                
                // Crear elemento <a> temporal
                const a = document.createElement('a');
                a.href = url;
                a.download = `documentos-empresa-${this.currentYear}.zip`;
                
                // Simular click para descargar
                document.body.appendChild(a);
                a.click();
                
                // Limpiar
                document.body.removeChild(a);
                window.URL.revokeObjectURL(url);
                
                this.isDownloading = false;
                this.spinner.hide();
                
                this.alertsService.successAlert('Documentos descargados correctamente');
            },
            error: (err) => {
                this.isDownloading = false;
                this.spinner.hide();
                
                let errorMessage = 'Error al descargar los documentos';
                
                if (err.status === 404) {
                    errorMessage = 'Empresa no encontrada';
                } else if (err.status === 400) {
                    errorMessage = 'No hay documentos disponibles para descargar';
                }
                
                this.alertsService.errorAlert([err?.error?.message || errorMessage]);
            }
        });
    }

}
