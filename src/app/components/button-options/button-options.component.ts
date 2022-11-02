import { Component, OnInit, Input, OnChanges, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'button-options',
  templateUrl: './button-options.component.html',
  styleUrls: ['./button-options.component.scss']
})
export class ButtonOptionsComponent implements OnChanges {
  @Input() option1Txt: any;
  @Input() option2Txt: any;
  @Input() option1Val: any;
  @Input() option2Val: any;  
  @Input() optionIn: any;
  @Output() optionOut = new EventEmitter<any>();
  option: any;
  optionTxt: any;

  constructor() { }

  ngOnChanges() {
    this.option =this.optionIn;
    if(this.option==this.option1Val) {
      this.optionTxt = this.option1Txt;
    }else{
      this.optionTxt = this.option2Txt;
    }
  }

  change() {
    if(this.option==this.option1Val) {
      this.optionTxt = this.option2Txt;
      this.option = this.option2Val;
    }else{
      this.optionTxt = this.option1Txt;
      this.option = this.option1Val;
    }
  }

}
