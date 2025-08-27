import {inject, Injectable} from '@angular/core';
import {ConfirmationService, MessageService} from "primeng/api";
import Swal from 'sweetalert2';
import {Observable} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class AlertsService {

    private confirmationService = inject(ConfirmationService);

    successAlert(message: string) {
        const confirmation = Swal.fire({
            title: '¡Proceso existoso!',
            text: message,
            icon: 'success',
            confirmButtonText: 'Finalizar',
            allowOutsideClick: false,
            customClass: {
                popup: 'rounded-xl',
                container: 'pt-0',
                confirmButton: 'text-white bg-green-600 rounded-lg px-3 py-2 text-center mr-2',
            },
            buttonsStyling: false,
            heightAuto: false,
        });

        return confirmation;
    }

    errorAlert(messages: any) {
        let msg;
        messages.forEach((m: any) => {
            msg = m.message;
        });

        Swal.fire({
            title: 'Ups, algo salió mal',
            text: msg,
            icon: 'error',
            confirmButtonText: 'Ok',
            allowOutsideClick: false,
            customClass: {
                popup: 'rounded-xl',
                container: 'pt-0',
                confirmButton:
                    'text-white bg-red-500 rounded-lg px-3 py-2 text-center',
            },
            buttonsStyling: false,
            heightAuto: false,
        });
    }

    confirmRequest(message: string, event?: Event): Observable<any> {
        return new Observable<boolean>(observer => {
            this.confirmationService.confirm({
                target: event?.target as EventTarget,
                message,
                header: 'Confirmación',
                icon: 'pi pi-question-circle',
                rejectLabel: 'Cancel',
                rejectButtonProps: {
                    label: 'Cancel',
                    severity: 'secondary',
                    outlined: true,
                },
                acceptButtonProps: {
                    label: 'Continue',
                    severity: 'pimary',
                },
                accept: () => {
                    observer.next(true);
                    observer.complete();
                },
                reject: () => {
                    observer.error(false);
                    observer.complete();
                },
            });
        })
    }

    confirmDelete(message: string) {
        const confirmation = Swal.fire({
            title: message,
            text: 'Esta acción no se puede revertir',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Continuar',
            cancelButtonText: 'Cancelar',
            allowOutsideClick: false,
            customClass: {
                confirmButton:
                    'text-white bg-red-700 rounded-lg px-3 py-2 text-center mr-2',
                cancelButton:
                    'text-white bg-slate-400 rounded-lg px-3 py-2 text-center',
            },
            buttonsStyling: false,
            heightAuto: false,
        });

        return confirmation;
    }
}
