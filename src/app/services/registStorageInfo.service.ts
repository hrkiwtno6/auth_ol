import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IRegistStorageInfo, ORegistStorageInfo } from '../models/registStorageInfo.model';

@Injectable({
  providedIn: 'root'
})
export class RegistStorageInfoService {

  constructor(private http: HttpClient) { }

  registStorageInfo(param: IRegistStorageInfo): Observable<ORegistStorageInfo> {
    return this.http.post<ORegistStorageInfo>("/api/registStorageInfo", param);
  }
}
