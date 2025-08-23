import {inject, Injectable} from '@angular/core';
import {environment} from '../../../../environments/environment.development';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class DeclarationsService {

    private url = environment.urlApi;
    private httpClient = inject(HttpClient);

    public declarationToken = 'LJ5niqoEdiZ9DxskgY2wnlslY6EkxXiS';

    getDeclarationsByStatus(status: any): Observable<any> {
        return this.httpClient.get(`${this.url}/statement/index/${status}`);
    }

    validatePayment(id: any): Observable<any> {
        return this.httpClient.get(`${this.url}/statement/check-payment/${id}`);
    }

    processDeclaration(data: any){
        return this.httpClient.post(`${this.url}/statement/process`, data);
    }

    attachPaymentReceipt(declarationId: any, data: any){
        return this.httpClient.post(`${this.url}/statement/attach-receipt/${declarationId}`, data);
    }
}
