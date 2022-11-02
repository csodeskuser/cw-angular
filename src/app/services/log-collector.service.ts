import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment as env } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LogCollectorService {

  constructor(
    public http: HttpClient
  ) { }

  add(data): Observable<any> {
    return this.http.post(`${env.apiUrl}/api/admin/collector-logs`, data);
  }

  list(id): Observable<any> {
    return this.http.get(`${env.apiUrl}/api/admin/collector-logs?user_id=${id}`);
  }
  
  delete(id): Observable<any> {
    return this.http.delete(`${env.apiUrl}/api/admin/collector-logs/${id}`);
  }  
  download(id): Observable<Blob> {
    return this.http.get(`${env.apiUrl}/api/admin/collector-logs/download/${id}`, { responseType: 'blob'} );
  }

}
