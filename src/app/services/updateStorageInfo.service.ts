import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IUpdateStorageInfo, OUpdateStorageInfo } from '../models/updateStorageInfo.model';

@Injectable({
  providedIn: 'root'
})
export class UpdateStorageInfoService {

  constructor(private http: HttpClient) { }

  updateStorageInfo(param: IUpdateStorageInfo): Observable<OUpdateStorageInfo> {
    return this.http.post<OUpdateStorageInfo>("/api/updateStorageInfo", param);
  }
}
