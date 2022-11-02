import { Injectable } from '@angular/core';
import { environment as env } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ModulesService {

  constructor(
    public http: HttpClient
  ) { }


  addModule(data): Observable<any> {
    const headers = { 'content-type': 'application/json'}
    return this.http.post(`${env.apiUrl}/api/admin/modules`, JSON.stringify(data),{'headers':headers});
  }

  list(page): Observable<any> {
    const headers = { 'content-type': 'application/json'}
    return this.http.get(`${env.apiUrl}/api/admin/modules`+ '?page=' + page,{'headers':headers});
  }


  show(id): Observable<any> {
    const headers = { 'content-type': 'application/json'}
    return this.http.get(`${env.apiUrl}/api/admin/modules/${id}`,{'headers':headers});
  }

  edit(data): Observable<any> {
    const headers = { 'content-type': 'application/json'}
    return this.http.put(`${env.apiUrl}/api/admin/modules/${data.id}`, JSON.stringify(data),{'headers':headers});
  }

  delete(id): Observable<any> {
    const headers = { 'content-type': 'application/json'}
    return this.http.delete(`${env.apiUrl}/api/admin/modules/${id}`,{'headers':headers});
  }
  
  
}
