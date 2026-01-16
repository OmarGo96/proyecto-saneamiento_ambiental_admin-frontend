import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {ButtonModule} from 'primeng/button';
import {NgxSpinnerComponent} from 'ngx-spinner';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

@Component({
  selector: 'app-root',
    imports: [
        ButtonModule,
        RouterOutlet,
        ToastModule,
        ConfirmDialogModule,
        NgxSpinnerComponent
    ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'gs-frontend-angular-template';
}
