import {inject, Injectable} from '@angular/core';
import {environment} from '../../../environments/environment.development';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
    private url = environment.urlApi;
    private httpClient = inject(HttpClient);


    getUsers(): Observable<any> {
        return this.httpClient.get(`${this.url}/users/index`);
    }
}
