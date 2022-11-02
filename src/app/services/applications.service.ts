import { Injectable } from '@angular/core';
import { environment as env } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApplicationsService {

  constructor(
    public http: HttpClient
  ) { }

  list(page): Observable<any> {
    const headers = { 'content-type': 'application/json'}
    return this.http.get(`${env.apiUrl}/api/admin/applications`+ '?page=' + page,{'headers':headers});
  }

  //Application-Caegories

  index(): Observable<any> {
    const headers = { 'content-type': 'application/json'}
    return this.http.get(`${env.apiUrl}/api/admin/applications-categories`,{'headers':headers});
  }

  addcategory(data): Observable<any> {
    const headers = { 'content-type': 'application/json'}
    return this.http.post(`${env.apiUrl}/api/admin/applications-categories`, JSON.stringify(data),{'headers':headers});
  }

  search(data): Observable<any> {
    if(data.user_id == 0){
      const headers = { 'content-type': 'application/json'}
      return this.http.get(`${env.apiUrl}/api/admin/applications?&search=${data.search}&order_by=${data.order_by}`,{'headers':headers});
    }else{
      const headers = { 'content-type': 'application/json'}
      return this.http.get(`${env.apiUrl}/api/admin/applications?&search=${data.search}&user_id=${data.user_id}&order_by=${data.order_by}`,{'headers':headers});
    }

  }

  classification(): Observable<any> {
    const headers = { 'content-type': 'application/json'}
    return this.http.get(`${env.apiUrl}/api/admin/applications-classification`,{'headers':headers});
  }

  update(data): Observable<any> {
    const headers = { 'content-type': 'application/json'}
    return this.http.put(`${env.apiUrl}/api/admin/applications/index-update`, JSON.stringify(data),{'headers':headers});
  }

}
