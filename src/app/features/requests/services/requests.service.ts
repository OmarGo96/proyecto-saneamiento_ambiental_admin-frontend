import {inject, Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from '../../../../environments/environment.development';
import {HttpClient} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class RequestsService {
    private url = environment.urlApi;
    private httpClient = inject(HttpClient);

    getRequestsByStatus(status: any): Observable<any> {
        return this.httpClient.get(`${this.url}/registration/index/${status}`);
    }

    getUserRequests(): Observable<any> {
        return this.httpClient.get(`${this.url}/user-request/index/all`);
    }

    processRequest(data: any): Observable<any> {
        return this.httpClient.post(`${this.url}/registration/process`, data);
    }

    getDocument(name: string): Observable<any> {
        return this.httpClient.get(`${this.url}registration/file/${name}/requests`, { responseType: 'blob' });
    }
}
