import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IDeleteStorageInfo, ODeleteStorageInfo } from '../models/deleteStorageInfo.model';

@Injectable({
  providedIn: 'root'
})
export class DeleteStorageInfoService {

  constructor(private http: HttpClient) { }

  deleteStorageInfo(param: IDeleteStorageInfo): Observable<ODeleteStorageInfo> {
    return this.http.post<ODeleteStorageInfo>("/api/deleteStorageInfo", param);
  }
}
