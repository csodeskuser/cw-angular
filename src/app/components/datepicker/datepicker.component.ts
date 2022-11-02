import { Component, Injectable, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { NgbCalendar, NgbDateAdapter, NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Injectable()
export class CustomAdapter extends NgbDateAdapter<string> {

  readonly DELIMITER = '-';

  fromModel(value: string | null): NgbDateStruct | null {
    if (value) {
      let date = value.split(this.DELIMITER);
      return {
        day : parseInt(date[2], 10),
        month : parseInt(date[1], 10),
        year : parseInt(date[0], 10)
      };
    }
    return null;
  }

  toModel(date: NgbDateStruct | null): string | null {
    return date ?
      date.year + this.DELIMITER +
      date.month.toString().padStart(2, '0') + this.DELIMITER +
      date.day.toString().padStart(2, '0') : null;
  }
}

@Injectable()
export class CustomDateParserFormatter extends NgbDateParserFormatter {

  readonly DELIMITER = '-';

  parse(value: string): NgbDateStruct | null {
    if (value) {
      let date = value.split(this.DELIMITER);
      return {
        day : parseInt(date[0], 10),
        month : parseInt(date[1], 10),
        year : parseInt(date[2], 10)
      };
    }
    return null;
  }

  format(date: NgbDateStruct | null): string {
    return date ? 
      date.year + this.DELIMITER + 
      date.month.toString().padStart(2, '0') + this.DELIMITER + 
      date.day.toString().padStart(2, '0'): '';
  }
}

@Component({
  selector: 'datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss'],

  providers: [
    {provide: NgbDateAdapter, useClass: CustomAdapter},
    {provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter}
  ] 
})
export class DatepickerComponent implements OnChanges {

  @Input() dateIn: string;
  @Output() dateOut = new EventEmitter<string>();
  date: string;

  constructor(
    private ngbCalendar: NgbCalendar, 
    private dateAdapter: NgbDateAdapter<string>
  ) {}

  ngOnChanges() {
    this.date = this.dateIn;
  }  

  onChange() {
    this.dateOut.emit(this.date);
  }
}
