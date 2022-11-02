import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms'; 
//import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'add-manual-time',
  templateUrl: './add-manual-time.component.html',
  styleUrls: ['./add-manual-time.component.scss']
})
export class AddManualTimeComponent implements OnInit {
  @Input() info;
  name = "";
  form = new UntypedFormGroup({
    name: new UntypedFormControl('', Validators.required),
    task_id: new UntypedFormControl('0'),
    date: new UntypedFormControl(''),
    start: new UntypedFormControl(''),
    end: new UntypedFormControl('')
  });  

  constructor(
    public activeModal: NgbActiveModal,
    //public toastr = ToastrService
  ) {}

  ngOnInit(): void {

  }

  onFormSubmit() {}

}
