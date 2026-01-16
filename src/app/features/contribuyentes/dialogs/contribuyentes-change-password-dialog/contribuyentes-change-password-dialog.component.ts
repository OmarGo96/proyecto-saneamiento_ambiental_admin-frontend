import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ContribuyentesService } from '../../services/contribuyentes.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertsService } from '../../../../core/services/alerts.service';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'app-contribuyentes-change-password-dialog',
    imports: [
        ReactiveFormsModule,
        PasswordModule,
        ButtonModule,
        ToastModule
    ],
    templateUrl: './contribuyentes-change-password-dialog.component.html',
    styleUrl: './contribuyentes-change-password-dialog.component.scss'
})
export class ContribuyentesChangePasswordDialogComponent {


    private formBuilder = inject(FormBuilder);
    private contribuyentesService = inject(ContribuyentesService);
    private spinner = inject(NgxSpinnerService);
    private alertsService = inject(AlertsService);
    private messageService = inject(MessageService);
    private dialogRef = inject(DynamicDialogRef);
    private dialogConfig = inject(DynamicDialogConfig);

    public resetPasswordForm: any;

    public contribuyente: any;

    ngOnInit(): void {
        this.contribuyente = this.dialogConfig.data.contribuyente;
        this.initPasswordForm();
    }

    initPasswordForm() {
        this.resetPasswordForm = this.formBuilder.group({
            password: ['', Validators.required],
            password_confirmation: ['', Validators.required]
        });
    }

    changePassword() {
        this.spinner.show();
        const data = this.resetPasswordForm.value;
        this.contribuyentesService.changePassword(this.contribuyente.uuid, data).subscribe({
            next: res => {
                this.spinner.hide();
                this.alertsService.successAlert(res.message).then(res => {
                    if (res.isConfirmed){
                        this.dialogRef.close(true);
                    }
                });
            },
            error: err => {
                this.spinner.hide();
                 this.alertsService.errorAlert(err.error.errors);
            }
        });
    }

    generatePassword(length: number = 16): void {
        const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const lowercase = 'abcdefghijklmnopqrstuvwxyz';
        const numbers = '0123456789';
        const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?';

        const allChars = uppercase + lowercase + numbers + symbols;

        // Al menos un carácter de cada tipo
        let password = [
            uppercase[Math.floor(Math.random() * uppercase.length)],
            lowercase[Math.floor(Math.random() * lowercase.length)],
            numbers[Math.floor(Math.random() * numbers.length)],
            symbols[Math.floor(Math.random() * symbols.length)]
        ];

        // Completar el resto de la contraseña
        for (let i = password.length; i < length; i++) {
            password.push(allChars[Math.floor(Math.random() * allChars.length)]);
        }

        // Mezclar el array
        for (let i = password.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [password[i], password[j]] = [password[j], password[i]];
        }

        const generatedPassword = password.join('');

        // Actualizar ambos campos del formulario
        this.resetPasswordForm.patchValue({
            password: generatedPassword,
            password_confirmation: generatedPassword
        });
    }

    copyPassword(): void {
        const password = this.resetPasswordForm.get('password')?.value;

        if (password) {
            navigator.clipboard.writeText(password).then(() => {
                this.messageService.add({ severity: 'info', summary: 'Mensaje de confirmación', detail: 'Contraseña copiada', life: 2000 });
            });
        }
    }
}
