import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';

@Component({
  selector: 'time-periods',
  templateUrl: './time-periods.component.html',
  styleUrls: ['./time-periods.component.scss']
})
export class TimePeriodsComponent implements OnChanges {

  constructor() { }
  
  @Input() typeReportIn: any;
  @Output() typeReportOut = new EventEmitter<any>();
  typeReport: any;

  ngOnChanges() {
    this.typeReport=this.typeReportIn;
  }

  changeTypeReport(typeReport) {
    this.typeReport = typeReport;
    this.typeReportOut.emit(typeReport);
  }

}
