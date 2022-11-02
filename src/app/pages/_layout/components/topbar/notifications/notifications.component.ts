import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {

  constructor() { }

  events = [
    {text: 'Costo Eliminado', date: '2021-04-19'},
    {text: 'Costo Eliminado', date: '2021-04-19'},
    {text: 'Costo Eliminado', date: '2021-04-19'},
    {text: 'Costo Eliminado', date: '2021-04-19'},            
  ]  

  ngOnInit(): void {
  }

}
