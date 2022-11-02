import { Injectable } from '@angular/core';
import { environment as env } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserGroupsService {

  constructor(
    public http: HttpClient
  ) { }

  userGroup(filter): Observable<any> {
    const headers = { 'content-type': 'application/json'}
    return this.http.get(`${env.apiUrl}/api/admin/user-groups?page=${filter.page}&per_page=${filter.per_page}`,{'headers':headers});
  }

  editGroup(data): Observable<any> {
    const headers = { 'content-type': 'application/json'}
    return this.http.put(`${env.apiUrl}/api/admin/user-groups/${data.id}`,JSON.stringify(data),{'headers':headers});
  }

  addGroup(data): Observable<any> {
    const headers = { 'content-type': 'application/json'}
    return this.http.post(`${env.apiUrl}/api/admin/user-groups`, JSON.stringify(data),{'headers':headers});
  }

  show(id): Observable<any> {
    const headers = { 'content-type': 'application/json'}
    return this.http.get(`${env.apiUrl}/api/admin/user-groups/${id}`,{'headers':headers});
    
  }

  userList(): Observable<any> {
    const headers = { 'content-type': 'application/json'}
    return this.http.get(`${env.apiUrl}/api/admin/user-groups/create`,{'headers':headers});
    
  }

  groupList(): Observable<any> {
    const headers = { 'content-type': 'application/json'}
    return this.http.get(`${env.apiUrl}/api/admin/rules/create`,{'headers':headers});
    
  }

  export(lang): Observable<Blob> {
    return this.http.get(`${env.apiUrl}/api/admin/user-groups/export?lang=${lang}`, { responseType: 'blob' });
  }
  
  search(search): Observable<any> {
    const headers = { 'content-type': 'application/json'}
    return this.http.get(`${env.apiUrl}/api/admin/user-groups?&search=${search}`,{'headers':headers});
  }

  deleteGroup(id): Observable<any> {
    const headers = { 'content-type': 'application/json'}
    return this.http.delete(`${env.apiUrl}/api/admin/user-groups/${id}`,{'headers':headers});
  }

}
