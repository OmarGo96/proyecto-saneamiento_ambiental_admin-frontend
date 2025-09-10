import {inject, Injectable} from '@angular/core';
import {environment} from '../../../../environments/environment.development';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GeolocationService {
    private url = environment.urlApi;
    private httpClient = inject(HttpClient);

    getCompaniesGeolocation(): Observable<any> {
        return this.httpClient.get(`${this.url}/companies/get-geolocalization`);
    }
}
