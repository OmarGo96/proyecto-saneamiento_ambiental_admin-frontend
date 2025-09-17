import {Component, inject, OnInit} from '@angular/core';
import {DeclarationsService} from '../../services/declarations.service';
import {ButtonModule} from 'primeng/button';
import {DeclarationsStatus} from '../../constants/declarations-status';
import {FormBuilder, ReactiveFormsModule} from '@angular/forms';
import {ToggleSwitchModule} from 'primeng/toggleswitch';
import {InputTextModule} from 'primeng/inputtext';
import {SelectModule} from 'primeng/select';
import {AlertsService} from '../../../../core/services/alerts.service';
import {CurrencyPipe, Location, PercentPipe} from '@angular/common';
import {ConfirmationService} from 'primeng/api';
import {MessageModule} from 'primeng/message';
import {NgxSpinnerService} from 'ngx-spinner';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
    selector: 'app-declarations-details',
    imports: [
        ButtonModule,
        ToggleSwitchModule,
        ReactiveFormsModule,
        InputTextModule,
        SelectModule,
        CurrencyPipe,
        MessageModule
    ],
    providers: [AlertsService, ConfirmationService],
    templateUrl: './declarations-details.component.html',
    styleUrl: './declarations-details.component.scss'
})
export class DeclarationsDetailsComponent implements OnInit {


    private declarationsService = inject(DeclarationsService);
    private sanitizer = inject(DomSanitizer);
    private alertsService = inject(AlertsService);
    private spinner = inject(NgxSpinnerService);
    private location = inject(Location);

    public declaration: any;
    public declarationsStatus = DeclarationsStatus;
    public isLoading: boolean = false;
    public isUpdating: boolean = false;

    public pdfUrl: any;

    ngOnInit() {
        const declarationToken: any = localStorage.getItem(this.declarationsService.declarationToken);
        this.declaration = JSON.parse(atob(declarationToken));

    }

    getDeclaractionFormat(declarationId: any){
        this.spinner.show();
        this.declarationsService.getStatementFormat(declarationId).subscribe({
            next: data => {
                this.pdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(data));
                window.open(this.pdfUrl.changingThisBreaksApplicationSecurity, '_blank')
                this.spinner.hide();
            },
            error: err => {
                console.log(err);
                this.spinner.hide();
                this.alertsService.errorAlert(['Ocurrio un error al obtener el documento. Intente de nuevo más tarde.']);
            }
        });
    }

    openPaseCaja(url: string) {
        window.open(url, '_blank');
    }

    goBack() {
        localStorage.removeItem(this.declarationsService.declarationToken);
        this.location.back();
    }

}
