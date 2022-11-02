import { Component, OnChanges, Output, EventEmitter, Input } from '@angular/core';
import { NgSelectConfig } from '@ng-select/ng-select';
import { UserGroupsService } from 'src/app/services/user-groups.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'filter-report',
  templateUrl: './filter-report.component.html',
  styleUrls: ['./filter-report.component.scss']
})
export class FilterReportComponent implements OnChanges {

  constructor(
     private usergroupService: UserGroupsService,
     private userService: UserService
  ) {}

  @Output() filter = new EventEmitter<object>();
  @Input() mode = 1;

  enterpriseId = null;
  groupId = null;
  userId=null;
  selected = {
    enterpriseId: this.enterpriseId, 
    groupId: this.groupId, 
    userId: this.userId
  };  

  enterprises = [
    { id: 1, name: 'Clowdwork' },
    { id: 2, name: 'Alcomex' },
    { id: 3, name: 'UCV' },
  ];  

  groups = [];    

  users = [];
  users1 = [];

ngOnInit(){
  this.usergroupService.groupList().subscribe((res)=>{
    this.groups = res.userGroup;
})

this.usergroupService.userList().subscribe((res)=>{
     this.users = res.users;
     this.users1 = res.users;
})




}

  ngOnChanges(): void {

  }

  select() {
    this.filter.emit({
      enterpriseId: this.enterpriseId,
      groupId: this.groupId,
      userId: this.userId
    });
    if(this.groupId !== null){
      
      this.userService.userbygrpid(this.groupId).subscribe((res)=>{
        this.users = res.data.relationships.users;
       })
    }

  }

  select1() {
    this.filter.emit({
      enterpriseId: this.enterpriseId,
      groupId: this.groupId,
      userId: this.userId
    });
  }
}
