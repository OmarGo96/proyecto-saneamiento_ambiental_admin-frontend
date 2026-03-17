import {Component, inject} from '@angular/core';
import {DynamicDialogConfig, DynamicDialogRef} from 'primeng/dynamicdialog';
import {FormsModule} from '@angular/forms';
import {ButtonModule} from 'primeng/button';
import {TextareaModule} from 'primeng/textarea';

@Component({
    selector: 'app-rejection-reason-dialog',
    standalone: true,
    imports: [
        FormsModule,
        ButtonModule,
        TextareaModule
    ],
    template: `
        <div class="space-y-4">
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                    Motivo del rechazo <span class="text-red-500">*</span>
                </label>
                <textarea
                    pTextarea
                    [(ngModel)]="rejectionReason"
                    rows="5"
                    placeholder="Ingresa el motivo por el cual se rechaza este documento..."
                    class="w-full"
                    [autoResize]="true">
                </textarea>
                @if (showError && !rejectionReason) {
                    <small class="text-red-500 mt-1 block">Este campo es obligatorio</small>
                }
            </div>

            <div class="flex justify-end space-x-2">
                <p-button
                    label="Cancelar"
                    severity="secondary"
                    [outlined]="true"
                    (click)="cancel()"
                />
                <p-button
                    label="Rechazar Documento"
                    severity="danger"
                    (click)="confirm()"
                />
            </div>
        </div>
    `
})
export class RejectionReasonDialogComponent {
    private dialogRef = inject(DynamicDialogRef);
    private config = inject(DynamicDialogConfig);

    rejectionReason = '';
    showError = false;

    cancel() {
        this.dialogRef.close(null);
    }

    confirm() {
        if (!this.rejectionReason || this.rejectionReason.trim() === '') {
            this.showError = true;
            return;
        }

        this.dialogRef.close(this.rejectionReason.trim());
    }
}

