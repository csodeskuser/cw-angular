import { Injectable } from '@angular/core';
import { environment as env } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    public http: HttpClient
  ) {  }

  login(data): Observable<any> {
    const headers = { 'content-type': 'application/json'}
    return this.http.post(`${env.apiUrl}/api/auth/login`, JSON.stringify(data),{'headers':headers});
  }

  changepassword(data): Observable<any> {
    return this.http.post(`${env.apiUrl}/api/auth/password`, data);
  }

  getPermissions(): Observable<any> {
    return this.http.get(`${env.apiUrl}/api/admin/permissions`);  
  }

  getPermissionsWithPage(page): Observable<any> {
    return this.http.get(`${env.apiUrl}/api/admin/permissions?page=${page}`);  
  }

  getPermissionsByID(id): Observable<any> {
    return this.http.get(`${env.apiUrl}/api/admin/permissions/${id}`);  
  }
  
  createPermissions(data): Observable<any> {
    return this.http.post(`${env.apiUrl}/api/admin/permissions`,data);  
  } 

  updatePermissions(id,data): Observable<any> {
    return this.http.put(`${env.apiUrl}/api/admin/permissions/${id}`,data);  
  } 

  register(data): Observable<any> {
    return this.http.post(`${env.apiUrl}/api/auth/login`, data);
  }  
}
