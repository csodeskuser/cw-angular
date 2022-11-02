import { Injectable } from '@angular/core';
import { environment as env } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RolesService {

  constructor(
    public http: HttpClient
  ) { }

  list(page): Observable<any> {
    const headers = { 'content-type': 'application/json'}
    return this.http.get(`${env.apiUrl}/api/admin/roles`+ '?page=' + page,{'headers':headers});
  }

  update(data): Observable<any> {
    const headers = { 'content-type': 'application/json'}
    return this.http.put(`${env.apiUrl}/api/admin/roles/${data.id}`,JSON.stringify(data),{'headers':headers});
  }
  store(data): Observable<any> {
    const headers = { 'content-type': 'application/json'}
    return this.http.post(`${env.apiUrl}/api/admin/roles`,JSON.stringify(data),{'headers':headers});
  }

  delete(id): Observable<any> {
    const headers = { 'content-type': 'application/json'}
    return this.http.delete(`${env.apiUrl}/api/admin/roles/${id}`,{'headers':headers});
  }

  show(id): Observable<any> {
    const headers = { 'content-type': 'application/json'}
    return this.http.get(`${env.apiUrl}/api/admin/roles/${id}/edit`,{'headers':headers});
  }

  
  search(search): Observable<any> {
    const headers = { 'content-type': 'application/json'}
    return this.http.get(`${env.apiUrl}/api/admin/roles?&search=${search}`,{'headers':headers});
  }
  
  
}
