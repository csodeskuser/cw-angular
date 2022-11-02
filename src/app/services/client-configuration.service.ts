import { Injectable } from '@angular/core';
import { environment as env } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ClientConfigurationService {

  constructor(
    public http: HttpClient
  ) { }

  getclients(page): Observable<any> {
    return this.http.get(`${env.apiUrl}/api/admin/agent-configurations`+ '?page=' + page,);
  }  

  update(data,id): Observable<any> {
    const headers = { 'content-type': 'application/json'}
    return this.http.put(`${env.apiUrl}/api/admin/agent-configurations/${id}`,JSON.stringify(data),{'headers':headers});
  }
  

  getVersions(): Observable<any> {
    return this.http.get(`${env.apiUrl}/api/admin/agent-configurations/get-all-versions/channel`);
  }  


}
