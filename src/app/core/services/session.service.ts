import {inject, Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment.development';
import {Router} from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class SessionService {

    private httpClient = inject(HttpClient);
    private router = inject(Router);

    private urlApi = environment.urlApi;

    public jwtToken = 'VdiuajS4DLTUHg';

    constructor() {
    }

    login(data: any): Observable<any> {
        return this.httpClient.post(`${this.urlApi}/administrator/session`, data);
    }

    logout() {
        sessionStorage.clear();
        this.router.navigate(['auth/login']);
    }

    getToken() {
        const token = sessionStorage.getItem(this.jwtToken);

        if (token) {
            return token;
        }

        return null;
    }
}
