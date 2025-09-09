import {Component, inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {SessionService} from '../../../../core/services/session.service';
import {AlertsService} from '../../../../core/services/alerts.service';
import {Router} from '@angular/router';
import {InputTextModule} from 'primeng/inputtext';
import {PasswordModule} from 'primeng/password';
import {ButtonModule} from 'primeng/button';
import moment from 'moment';
import {ConfirmationService} from 'primeng/api';

@Component({
    selector: 'app-login',
    imports: [
        ReactiveFormsModule,
        InputTextModule,
        PasswordModule,
        ButtonModule
    ],
    providers: [AlertsService, ConfirmationService],
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
    public loginForm: any;

    private sessionService = inject(SessionService);
    private alertsService = inject(AlertsService);
    private formBuilder = inject(FormBuilder);
    private router = inject(Router);

    public currentYear = moment().format('YYYY');

    public isLoading = false;

    ngOnInit() {
        this.initLoginForm();
    }

    initLoginForm() {
        this.loginForm = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(8)]],
        });
    }

    onLogin() {
        this.isLoading = true;
        const data = this.loginForm.value;

        this.sessionService.login(data).subscribe({
            next: res => {
                const token = res.token;

                sessionStorage.setItem(this.sessionService.jwtToken, token);

                this.router.navigate(['/dashboard']);

                this.isLoading = false;
            },
            error: err => {
                this.isLoading = false;
                this.alertsService.errorAlert(err.error.errors);
            }
        })
    }
}
