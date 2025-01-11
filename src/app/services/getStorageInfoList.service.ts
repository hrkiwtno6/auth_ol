import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OGetStorageInfoList, IGetStorageInfoList } from '../models/getStorageInfoList.model';

@Injectable({
  providedIn: 'root'
})
export class GetStorageInfoListService {

  constructor(private http: HttpClient) { }

  getStorageInfoList(param: IGetStorageInfoList): Observable<OGetStorageInfoList> {
    return this.http.post<OGetStorageInfoList>("/api/getStorageInfoList", param);
  }
}
