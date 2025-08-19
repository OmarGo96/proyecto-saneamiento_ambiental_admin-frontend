import {inject, Injectable} from '@angular/core';
import {environment} from '../../../../environments/environment.development';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompaniesService {
    private url = environment.urlApi;
    private httpClient = inject(HttpClient);

    public companyToken = 'kLV3F5ZukcIQetF3cPT3HMAPw6uU0DsH';

    getCompaniesByStatus(status: any): Observable<any> {
        return this.httpClient.get(`${this.url}/companies/index/${status}`);
    }

    updateBedrooms(companyId: any, data: any): Observable<any> {
        return this.httpClient.put(`${this.url}/companies/updateBedrooms/${companyId}`, data);
    }
}
