import {  Component, Input } from '@angular/core';
import { CalendarView, CalendarEvent } from 'angular-calendar';
import { startOfDay } from 'date-fns';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AddManualTimeComponent } from './add-manual-time/add-manual-time.component';
import { GeneralService } from 'src/app/services/general.service';
import * as moment from 'moment';


@Component({
  selector: 'manual-time-component',
  styleUrls: ['./manual-time.component.scss'],
  templateUrl: './manual-time.component.html',
})
export class ManualTimeComponent {
  viewDate: Date = new Date();
  view: CalendarView = CalendarView.Month;
  CalendarView = CalendarView;
  modal: any;
  date: string;

  constructor(
    public modalService: NgbModal,
    public generalService: GeneralService
  ) {
    generalService.setTitle('Tiempo Manual')    
  }

  events: CalendarEvent[] = [
    {
      start: startOfDay(new Date()),
      title: 'Evento de prueba',
      
    }
  ]  

  setView(view: CalendarView) {
    this.view = view;
  }

  dayClicked({ date, events }): void {  
    const modalRef = this.modalService.open(AddManualTimeComponent);
    date = moment(date).format('YYYY-MM-DD');
    modalRef.componentInstance.info = {
      date: date,
      user: 'Erka Rebolledo'
    };      
    console.log('date', date);
    console.log('events', events);
    //this.openAppointmentList(date)
  }
  
  eventClicked({ event }: { event: CalendarEvent }): void {
    console.log('Event clicked', event);
  }    

  openModal(content) {
    this.modalService.open(content);
  }
  
}
