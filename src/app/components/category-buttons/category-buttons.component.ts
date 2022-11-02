import { Component, OnInit, Input, Output, EventEmitter, OnChanges, ɵɵtrustConstantResourceUrl } from '@angular/core';

@Component({
  selector: 'category-buttons',
  templateUrl: './category-buttons.component.html',
  styleUrls: ['./category-buttons.component.scss']
})
export class CategoryButtonsComponent implements OnChanges {

  constructor() { }

  @Input() categories: any;
  @Input() selectedsIn: any;
  @Input() mode = 1;
  @Output() selectedsOut = new EventEmitter<any>();
  selecteds: any;  

  ngOnInit(): void {

  }

  ngOnChanges() {
    this.selecteds = this.selectedsIn;
  }

  isSelected(categoryId) {
  
    if(!this.selecteds.find(value=>value==categoryId)) {
      return 'background-color: white!important; color: #aaa; border: #999;'
    }

    let category = this.categories.find(value=>value.category_id==categoryId);
    return 'color: white; background-color:'+category.color+';';
  }

  toSelected(categoryId) {

    if(this.selecteds.length==1 && this.selecteds.find(value=>value==categoryId)) {
      return false;
    }

    let index = this.selecteds.indexOf(categoryId);

    if(index!=-1) {
      this.selecteds.splice(index, 1);
    }else{
      this.selecteds.push(categoryId);
    }

    this.selectedsOut = this.selecteds;
    
    this.isSelected(categoryId);

    return true;
  }

  //custome buttons

  custIsSelected(categoryId) {
    if(!this.selecteds.find(value=>value==categoryId)) {
      return 'background-color: white!important; color: #aaa; border: #999;'
    }

    let category = this.categories.find(value=>value.id==categoryId);
    
    if(category.id == 'edab06cd-9869-4b5a-9e72-194c5531b217'){
    return "color: white; background-color:#4eb14d";
    }
    if(category.id == '97754efc-d85c-44cd-ac4f-fadda5f3216c'){
      return "color: white; background-color:#fb8039";
    }
    if(category.id == 'edab06cd-9869-4b5a-9e72-194c5531b218'){
      return "color: white; background-color:#fce93e";
    }
    if(category.id == '97754efc-d85c-44cd-ac4f-fadda5f3216d'){
      return "color: white; background-color:#00a2e8";
    }
  }

  custToSelected(categoryId) {

    if(this.selecteds.length==1 && this.selecteds.find(value=>value==categoryId)) {
      return false;
    }

    let index = this.selecteds.indexOf(categoryId);

    if(index!=-1) {
      this.selecteds.splice(index, 1);
    }else{
      this.selecteds.push(categoryId);
    }

    this.selectedsOut = this.selecteds;
    
    this.custIsSelected(categoryId);

    return true;
  }

}
