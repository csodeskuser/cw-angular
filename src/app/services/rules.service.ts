import { Injectable } from '@angular/core';
import { environment as env } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class RulesService {

  constructor( public http: HttpClient) { }

  addRule(data): Observable<any> {
    const headers = { 'content-type': 'application/json'}
    return this.http.post(`${env.apiUrl}/api/admin/rules`, JSON.stringify(data),{'headers':headers});
  }
  
  list(filter): Observable<any> {
    const headers = { 'content-type': 'application/json'}
    return this.http.get(`${env.apiUrl}/api/admin/rules?page=${filter.page}&user_id=${filter.userId}&user_group_id=${filter.groupId}`,{'headers':headers});
  }

  show(id): Observable<any> {
    const headers = { 'content-type': 'application/json'}
    return this.http.get(`${env.apiUrl}/api/admin/rules/${id}`,{'headers':headers});
  }
  
  update(id,data): Observable<any> {
    const headers = { 'content-type': 'application/json'}
    return this.http.put(`${env.apiUrl}/api/admin/rules/${id}`,JSON.stringify(data),{'headers':headers});
  }

  delete(id): Observable<any> {
    const headers = { 'content-type': 'application/json'}
    return this.http.delete(`${env.apiUrl}/api/admin/rules/${id}`,{'headers':headers});
  }

}
