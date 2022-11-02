import { Injectable } from '@angular/core';
import { environment as env } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ReportsService {

  constructor(
    public http: HttpClient
  ) { }

  getWorkedTime(): Observable<any> {
    return this.http.get(`${env.apiUrl}/api/v1/worked_time?category_id=1&date=2021-05-24&enterprise_id=1&per_page=200&type=weekly`);
  }  

  useractivity(filter): Observable<any> {
    const headers = { 'content-type': 'application/json'}
    return this.http.get(`${env.apiUrl}/api/admin/reports/activity-per-users?date=${filter.date}&user_group_id=${filter.user_group_id}&user_id=${filter.user_id}`,{'headers':headers});
  }

  useractivityrange(filter): Observable<any> {
    const headers = { 'content-type': 'application/json'}
    return this.http.get(`${env.apiUrl}/api/admin/reports/activity-per-users-hours-range?date=${filter.date}&user_group_id=${filter.user_group_id}&user_id=${filter.user_id}`,{'headers':headers});
  }

  ///api/admin/reports/activity-daily?start_date=2022-09-23&end_date=2022-09-23

  activityDaily(filter): Observable<any> {
    const headers = { 'content-type': 'application/json'}
    return this.http.get(`${env.apiUrl}/api/admin/reports/activity-daily?start_date=${filter.start_date}&end_date=${filter.end_date}&user_group_id=${filter.user_group_id}&user_id=${filter.user_id}&productivity_hour=${filter.productivity_hour}`,{'headers':headers});
  }

  workedTime(filter): Observable<any> {
    const headers = { 'content-type': 'application/json'}
    return this.http.get(`${env.apiUrl}/api/admin/reports/worked-time?date=${filter.date}&category=${filter.category_id}&user_group_id=${filter.user_group_id}&user_id=${filter.user_id}&type=${filter.type}`,{'headers':headers});
  }

  applications(filter):  Observable<any> {
    const headers = { 'content-type': 'application/json'}
    return this.http.get(`${env.apiUrl}/api/admin/reports/using-applications?start_date=${filter.start_date}&end_date=${filter.end_date}&classification_id=${filter.class_id}&user_id=${filter.user_id}&user_group_id=${filter.user_group_id}&page=${filter.page}&per_page=${filter.per_page}`, {'headers':headers});
  }

  classification():  Observable<any> {
    const headers = { 'content-type': 'application/json'}
    return this.http.get(`${env.apiUrl}/api/admin/applications-classification`, {'headers':headers});
  }

  detail(filter):  Observable<any> {
    
    const headers = { 'content-type': 'application/json'}
    return this.http.get(`${env.apiUrl}/api/admin/reports/caption-application?start_date=${filter.start_date}&end_date=${filter.end_date}&application_id=${filter.application_id}&classification_id=${filter.class_id}&user_id=${filter.user_id}&user_group_id=${filter.user_group_id}&page=${filter.page}&per_page=${filter.per_page}`, {'headers':headers});
  }


  // activityExport(data): Observable<any> {
  //   const headers = { 'content-type': 'application/json'}
  //   return this.http.post(`${env.apiUrl}/api/admin/export/activity-per-users`, JSON.stringify(data),{'headers':headers});
  // }

  activityExport(data): Observable<any> {
    const headers = { 'content-type': 'application/json'}
    return this.http.post(`${env.apiUrl}/api/admin/export/activity-per-users`,  JSON.stringify(data),{'headers':headers,responseType: 'blob'});
  }


  dailyActExport(data): Observable<any> {
    const headers = { 'content-type': 'application/json'}
    return this.http.post(`${env.apiUrl}/api/admin/export/activity-daily`,  JSON.stringify(data),{'headers':headers,responseType: 'blob'});
  }
  

  workedTimeExport(data): Observable<any> {
    const headers = { 'content-type': 'application/json'}
    return this.http.post(`${env.apiUrl}/api/admin/export/worked-time`,  JSON.stringify(data),{'headers':headers,responseType: 'blob'});
  }

  exportApplication(data): Observable<any> {
    const headers = { 'content-type': 'application/json'}
    return this.http.post(`${env.apiUrl}/api/admin/export/using-applications`,  JSON.stringify(data),{'headers':headers,responseType: 'blob'});
  }

}
