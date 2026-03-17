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

    createCompaniesDocumentation(companyId: string, data: FormData): Observable<any> {
        return this.httpClient.post(`${this.url}/documentation/store/${companyId}`, data);
    }

    deleteCompaniesDocumentation(documentUuid: string): Observable<any> {
        return this.httpClient.delete(`${this.url}/company-documents/${documentUuid}`);
    }

    reviewCompanyDocument(documentUuid: string, status: 'aprobado' | 'rechazado', rejectionReason?: string | null): Observable<any> {
        const payload: any = { status };
        if (rejectionReason) {
            payload.rejection_reason = rejectionReason;
        }
        return this.httpClient.put(`${this.url}/company-documents/review/${documentUuid}`, payload);
    }

    getDocumentFile(fileName: string, documentType: string): Observable<Blob> {
        return this.httpClient.get(`${this.url}/company-documents/file/${fileName}/${documentType}`, {
            responseType: 'blob'
        });
    }

}
