import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment as env } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  constructor(
    public http: HttpClient
  ) { }

  title = new BehaviorSubject("ClowdWork");

  getTitle() {
    return this.title;
  }

  setTitle(title) {
    this.title.next(title);
  } 

  getApiUrl() {
    return env.apiUrl;
  }
}
