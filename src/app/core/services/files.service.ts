import {inject, Injectable} from '@angular/core';
import {environment} from '../../../environments/environment.development';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilesService {
    private url = environment.urlApi;
    private httpClient = inject(HttpClient);

    getDocumentTypes(): Observable<any> {
        return this.httpClient.get(`${this.url}/type-documents/show`);
    }

    createCompaniesDocumentation(companyId: any, data: any): Observable<any> {
        return this.httpClient.post(`${this.url}/documentation/store/${companyId}`, data);
    }

}
