import {inject, Injectable} from '@angular/core';
import {environment} from '../../../../environments/environment.development';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class OpeningService {
    private url = environment.urlApi;
    private httpClient = inject(HttpClient);

    getListByYear(year: any): Observable<any> {
        return this.httpClient.get(`${this.url}/opening/by-year/${year}`);
    }

    opening(data: any): Observable<any> {
        return this.httpClient.post(`${this.url}/opening/store`, data);
    }

    exception(companyId: any, data: any): Observable<any> {
        return this.httpClient.post(`${this.url}/exceptions/store/${companyId}`, data);
    }
}
