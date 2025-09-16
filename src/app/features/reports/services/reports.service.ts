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

    getCollection(): Observable<any> {
        return this.httpClient.get(`${this.url}/reports/collection`);
    }

    getAnnualGrowth(): Observable<any> {
        return this.httpClient.get(`${this.url}/reports/annual-growth`);
    }

    getHotelAnnualOccupancy(): Observable<any> {
        return this.httpClient.get(`${this.url}/reports/hotel-annual-occupancy`);
    }

    getHotelMonthlyOccupancy(): Observable<any> {
        return this.httpClient.get(`${this.url}/reports/hotel-monthly-occupancy`);
    }

    getStatementsByCompany(): Observable<any> {
        return this.httpClient.get(`${this.url}/reports/statements-by-company`);
    }

    getHotelWithoutStatements(): Observable<any> {
        return this.httpClient.get(`${this.url}/reports/hotels-without-statements`);
    }

    getCompanyCompliance(): Observable<any> {
        return this.httpClient.get(`${this.url}/reports/company-compliance`);
    }

    getSERPAPIInfo(serpToken: string): Observable<any> {
        return this.httpClient.get(`${this.url}/search-in-google/${serpToken}`);
    }
}
