import { Injectable } from '@angular/core';
import { environment as env } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ScreenshotsService {

  constructor(
    public http: HttpClient
  ) { }

  getscreenshots(data): Observable<any> {
    const headers = { 'content-type': 'application/json'}
    return this.http.get(`${env.apiUrl}/api/admin/screenshots?date=${data.date}&user_id=${data.uid}`,{'headers':headers});
  }

  getthumbnail(url): Observable<Blob> {
    const headers = { 'content-type': 'image/jpeg'}
    return this.http.get(`${env.apiUrl}/storage/app${url}`,{ responseType: 'blob' });
  }

  download(id): Observable<Blob> {
    const headers = { 'content-type': 'image/jpeg'}
    return this.http.get(`${env.apiUrl}/api/admin/screenshots/${id}`,{ responseType: 'blob' });
  }

  deleteScrenshot(id): Observable<any> {
    const headers = { 'content-type': 'application/json'}
    return this.http.delete(`${env.apiUrl}/api/admin/screenshots/${id}`,{'headers':headers});
  }
}
