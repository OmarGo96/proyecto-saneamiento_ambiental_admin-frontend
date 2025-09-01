import {inject, Injectable} from '@angular/core';
import {environment} from '../../../../environments/environment.development';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {
    private url = environment.urlApi;
    private httpClient = inject(HttpClient);

    generateGeneralReport(data: any): Observable<any> {
        return this.httpClient.post(`${this.url}/reports/general`, data, { responseType: 'blob' });
    }

    getAnnualGrowth(): Observable<any> {
        return this.httpClient.get(`${this.url}/reports/annual-growth`);
    }
}
