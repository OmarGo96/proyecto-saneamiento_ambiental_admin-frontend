import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';

@Injectable({
    providedIn: 'root',
})
export class ContribuyentesService {
    private url = environment.urlApi;
    private httpClient = inject(HttpClient);

    getContribuyentes(): Observable<any> {
        return this.httpClient.get(`${this.url}/users/index`);
    }

    changePassword(contribuyenteUuid: string, data: any): Observable<any> {
        return this.httpClient.put(
            `${this.url}/users/change-password/${contribuyenteUuid}`,
            data,
        );
    }

    downloadContribuyentesExcel(): Observable<any> {
        return this.httpClient.get(`${this.url}/reports/users-companies`, {
            responseType: 'blob',
        });
    }
}
