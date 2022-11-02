import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-conditions',
  templateUrl: './conditions.component.html',
  styleUrls: ['./conditions.component.scss']
})
export class ConditionsComponent implements OnInit {

  constructor(
    public activeModal: NgbActiveModal
  ) { }
  @Output() passEntry: EventEmitter<any> = new EventEmitter();

  ngOnInit(): void {
  }

  passBack() {
    this.activeModal.close();
  }

}
