import { Injectable } from '@angular/core';
import { environment as env } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    public http: HttpClient
  ) { }


  addUser(data): Observable<any> {
    const headers = { 'content-type': 'application/json'}
    return this.http.post(`${env.apiUrl}/api/admin/users`, JSON.stringify(data),{'headers':headers});
  }

  create(): Observable<any> {
    const headers = { 'content-type': 'application/json'}
    return this.http.get(`${env.apiUrl}/api/admin/users/create`,{'headers':headers});
  }

  list(page): Observable<any> {
    const headers = { 'content-type': 'application/json'}
    return this.http.get(`${env.apiUrl}/api/admin/users`+ '?page=' + page,{'headers':headers});
  }

  show(id): Observable<any> {
    const headers = { 'content-type': 'application/json'}
    return this.http.get(`${env.apiUrl}/api/admin/users/${id}`,{'headers':headers});
  }

  edit(data): Observable<any> {
    const headers = { 'content-type': 'application/json'}
    return this.http.put(`${env.apiUrl}/api/admin/users/${data.id}`, JSON.stringify(data),{'headers':headers});
  }

  delete(id): Observable<any> {
    const headers = { 'content-type': 'application/json'}
    return this.http.delete(`${env.apiUrl}/api/admin/users/${id}`,{'headers':headers});
  }

  status(id): Observable<any>{
  const headers = { 'content-type': 'application/json'}
  return this.http.patch(`${env.apiUrl}/api/admin/users/status/${id}`,{'headers':headers});
  }
 
  
  screenshots(id): Observable<any>{
    const headers = { 'content-type': 'application/json'}
    return this.http.patch(`${env.apiUrl}/api/admin/agent-configurations/${id}/field/screenshots_enabled`,{'headers':headers});
  }

  silentmode(id): Observable<any>{
      const headers = { 'content-type': 'application/json'}
      return this.http.patch(`${env.apiUrl}/api/admin/agent-configurations/${id}/field/silent_mode`,{'headers':headers});
  }

  search(search): Observable<any> {
    const headers = { 'content-type': 'application/json'}
    return this.http.get(`${env.apiUrl}/api/admin/users?&search=${search}`,{'headers':headers});
  }
  
  userbygrpid(uuid): Observable<any> {
    const headers = { 'content-type': 'application/json'}
    return this.http.get(`${env.apiUrl}/api/admin/user-groups/${uuid}`,{'headers':headers});
  }

  //to show users roles and group

  // /api/admin/users/1faf6496-3372-403d-ade3-4018dca8f4f5/edit

}
