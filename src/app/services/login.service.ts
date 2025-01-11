import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ILogin, OLogin } from '../models/login.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  login(param: ILogin): Observable<OLogin> {
    return this.http.post<OLogin>("/api/login", param);
  }
}
