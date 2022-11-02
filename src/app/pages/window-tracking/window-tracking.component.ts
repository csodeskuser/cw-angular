import { Component, OnInit } from "@angular/core";
import { GeneralService } from "src/app/services/general.service";
import {
  AbstractControl,
  FormBuilder,
  UntypedFormGroup,
  UntypedFormControl,
  Validators,
} from "@angular/forms";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { UserGroupsService } from "src/app/services/user-groups.service";
import { UserService } from "src/app/services/user.service";
import * as moment from "moment";
import { RulesService } from "src/app/services/rules.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-window-tracking",
  templateUrl: "./window-tracking.component.html",
  styleUrls: ["./window-tracking.component.scss"],
})
export class WindowTrackingComponent implements OnInit {
  date: any;
  dtype: any;
  error: any;
  loading = false;
  groups: any;
  userGroup: any;
  userlist:any;
  ugarr=[];
  uarr=[];
  apiRoot = "https://app.clowdwork.com/api/v1";
  grpusers;
  data1 = {
    log_date: null,
  };

  data2 = {
    log_date: null,
  };
  filter = {
    userId:0,
    groupId: 0,
    enterpriseId:1,
  };

  pageFilter = {
    page: 1,
    perPage: "",
    name: "",
    collectionSize: "",
  }

  uid:any;
  ugid:any;
  disabled=true;
  submitted = false;
  submitted1 = false;
  
  ruleid:any;
  type: any;
  ddata = [];
  days:any;

  form = new UntypedFormGroup({
    id: new UntypedFormControl(""),
    rulename: new UntypedFormControl("", Validators.minLength(3)),
    description: new UntypedFormControl("", Validators.minLength(3)),
    starttime: new UntypedFormControl(""),
    endtime: new UntypedFormControl(""),
    mtype: new UntypedFormControl(""),
    date: new UntypedFormControl(""),
    group_id: new UntypedFormControl(""),
    wday: new UntypedFormControl(""),
  });

  editForm = new UntypedFormGroup({
    id: new UntypedFormControl(""),
    rulename: new UntypedFormControl("", Validators.minLength(3)),
    description: new UntypedFormControl("", Validators.minLength(3)),
    starttime: new UntypedFormControl(""),
    endtime: new UntypedFormControl(""),
    mtype: new UntypedFormControl(""),
    date: new UntypedFormControl(""),
    group_id: new UntypedFormControl(""),
    wday: new UntypedFormControl(""),
    usergroup_id: new UntypedFormControl(""),
    user_id: new UntypedFormControl(""),
  });

  viewForm = new UntypedFormGroup({
    id: new UntypedFormControl(""),
    rulename: new UntypedFormControl({value: '', disabled: true}),
    description: new UntypedFormControl({value: '', disabled: true}),
    starttime: new UntypedFormControl({value: '', disabled: true}),
    endtime: new UntypedFormControl({value: '', disabled: true}),
    mtype: new UntypedFormControl({value: '', disabled: true}),
    date: new UntypedFormControl({value: '', disabled: true}),
    group_id: new UntypedFormControl({value: '', disabled: true}),
    wday: new UntypedFormControl({value: '', disabled: true}),
  });

  modalRefAddRule: any;

  modalRefEditRule: any;

  modalRefViewRule: any;
  selectedug:any;
  ruleslist: any;
  rulesmain: any;
  selectedValue:any;

  constructor(
    private generalService: GeneralService,
    private modalService: NgbModal,
    private UserGroupsService: UserGroupsService,
    private UserService: UserService,
    private rules: RulesService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService
  ) {
    generalService.setTitle("Window Tracking");
  }

  ngOnInit(): void {
    this.load();
    this.form.patchValue({ enterprise_id: 1 });

    this.form = this.formBuilder.group({
      rulename: [
        "",
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(30),
        ],
      ],
      description: [
        "",
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(30),
        ],
      ],
      starttime: [""],
      endtime: [""],
      mtype: [""],
      date: [""],
      group_id: [""],
      wday: [""],
    });

    this.editForm = this.formBuilder.group({
      rulename: [
        "",
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(30),
        ],
      ],
      description: [
        "",
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(30),
        ],
      ],
      starttime: [""],
      endtime: [""],
      mtype: [""],
      date: [""],
      group_id: [""],
      wday: [""],
      usergroup_id: [""],
      user_id: [""],
    });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  get f1(): { [key: string]: AbstractControl } {
    return this.editForm.controls;
  }

  load() {

    this.UserGroupsService.groupList().subscribe((res) => {
            this.userGroup = res.userGroup;
            this.days = res.days;
                  
    });
    this.UserGroupsService.userList().subscribe((res) => {
      this.userlist = res.users;
      
    });
    console.log('oooo',this.filter)
    this.ugid = this.filter.groupId;
    this.uid = this.filter.userId;

    var allFilter = {
       page: this.pageFilter.page,
       userId: this.filter.userId,
       groupId: this.filter.groupId
    }
    this.rules.list(allFilter).subscribe((res) => {
      this.rulesmain = res.data;
      this.ruleslist = res.data;
        
      var paginate = res.meta;

      this.pageFilter.collectionSize = paginate.total;
      this.pageFilter.page = paginate.current_page;
      this.pageFilter.perPage = paginate.per_page;
    });
  }

  addRule(content) {
    this.modalRefAddRule = this.modalService.open(content, { size: "md" });
  }
  viewRule(content2,id){
    this.rules.show(id).subscribe((res)=>{
      this.viewForm.patchValue({
       rulename: res.data.name,
       description: res.data.description,
       starttime: res.data.start_time,
       endtime: res.data.end_time,
       mtype: res.data.period,
       weekdays: res.data.weekday,
       weekend: res.data.weekend,
       date: res.data.date,
       group_id: null,

      }) 
}) 

    this.modalRefViewRule = this.modalService.open(content2, { size: "md" });
  }

  editRule(content1, id) {
    this.ruleid =id;
    this.rules.show(id).subscribe((res)=>{
      var fdays = res.data.relationships.days;
       var fdarr = [];
      for (var j = 0; j < fdays.length; j++) {
        const drr = this.days.find(({ name }) => name === fdays[j].name);
        fdarr.push(drr);
      }
      this.ddata= fdarr;
      if(res.data.start_time != null){
         var st=  res.data.start_time.slice(0,5);  
      }
      if(res.data.end_time != null){
       var et =  res.data.end_time.slice(0,5);
      }

         var wd = 0;
         if(res.data.weekday == 1){
          wd = 1;
          }
          var we = 0;
         if(res.data.weekend == 1){
          we = 1;
         }
           this.editForm.patchValue({
            rulename: res.data.name,
            description: res.data.description,
            starttime: st,
            endtime: et,
            mtype: res.data.period,
            weekdays: wd,
            weekend: we,
            date: res.data.date,
            user_id: res.data.relationships.user.id,
            group_id: null,
           })
    })    
    this.modalRefEditRule = this.modalService.open(content1, { size: "md" });
  }

  getAvatar(userId) {
    return `${this.apiRoot}/profile/${userId}/avatar`;
  }

  /**
   * Modal crear/editar funciones
   */
  onSubmit() {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    
    var id = [];
    for (var i = 0; i < this.ddata.length; i++) {
      id.push(this.ddata[i].id);
    }
    if(this.form.value.mtype !== "dates"){
      this.data1.log_date = null;
    }
    if(this.form.value.mtype !== "week"){
      this.form.value.week = null;
    }
    if(this.form.value.mtype !== "days"){
         id = [];
    }

    var weekday= 0;
    var weekend= 0;
    if(this.form.value.wday == "Weekdays"){
         weekday = 1
    }
    if(this.form.value.wday == "weekend"){
         weekend = 1
 }
    var data = {
      name: this.form.value.rulename,
      period: this.form.value.mtype,
      user_id: this.uid,
      user_group_id: this.ugid,
      description: this.form.value.description,
      start_time: this.form.value.starttime + ":00",
      end_time: this.form.value.endtime + ":00",
      weekday: weekday,
      weekend: weekend,
      date:  new Date('2022-09-15').toISOString,
      days: id,
    };
    

    this.rules.addRule(data).subscribe(() => {
      this.cancel();
      this.load();
      this.form.reset();
      this.toastr.success('Tracker added successfully')
    },(error)=>{
        this.toastr.error(error.error)
    });
      
  }

  onSubmitEdit() {
    this.submitted1 = true;
    if (this.editForm.invalid) {
      return;
    }
    
    var id = [];
    for (var i = 0; i < this.ddata.length; i++) {
      id.push(this.ddata[i].id);
    }
    if(this.editForm.value.mtype !== "dates"){
      this.data1.log_date = null;
    }
    if(this.editForm.value.mtype !== "week"){
      this.form.value.week = null;
    }
    if(this.editForm.value.mtype !== "days"){
         id = [];
    }
    var weekday= 0;
    var weekend= 0;
    if(this.editForm.value.wday == "Weekdays"){
         weekday = 1
    }
    if(this.editForm.value.wday == "weekend"){
         weekend = 1
 }
   // console.log(this.editForm.value.wday,  "weekday:",weekday,"weekend:",weekend);
    
    var data = {
      name: this.editForm.value.rulename,
      period: this.editForm.value.mtype,
      user_id: this.editForm.value.user_id,
      user_group_id: this.editForm.value.usergroup_id,
      description: this.editForm.value.description,
      start_time: this.editForm.value.starttime+":00",
      end_time: this.editForm.value.endtime+":00",
      weekday: weekday,
      weekend: weekend,
      date: this.data2.log_date,
      days: id,

    };
   //console.log(data);
   
    this.rules.update(this.ruleid,data).subscribe((res)=>{
         this.cancelEdit();
         this.load();
         this.toastr.success('tracking Updated successfully')
    },(error)=>{
      this.toastr.error(error.error.user_id[0])
    })

  }

  cancel() {
    this.modalRefAddRule.close();
  }

  cancelEdit() {
    this.modalRefEditRule.close();
  }

  cancelView(){
    this.modalRefViewRule.close();
  }

  delete(id) {
    this.rules.delete(id).subscribe((res)=>{
      this.load();
      this.toastr.success('Deleted successfully');
    },(error)=>{
      this.toastr.error(error.error)
    })
  }

  setPagination(event) {
    this.pageFilter.page = event.page;
    this.load();
  }

  options = ["check 1", "check 2", "check3"];

  onChange(day: string, checked: boolean) {
    if (checked && this.ddata.indexOf(day) < 0) {
      this.ddata = [...this.ddata, day].sort((a, b) =>
        this.options.indexOf(a) > this.options.indexOf(b) ? 1 : -1
      );
      //we can also not sort the array
      //this.ddata=[...this.ddata,option]
      
    }

    if (!checked) this.ddata = this.ddata.filter((x) => x != day);
    
  }

  search() {
    var rulearr = [];
    const search = (<HTMLInputElement>document.getElementById("search")).value;

    for (var i = 0; i < this.rulesmain.length; i++) {
      let u = this.rulesmain[i];
      let smallu = u.name.toLowerCase();
      let smalls = search.toLowerCase();
      var hasTest = smallu.includes(smalls);
      if (hasTest == true) {
        rulearr.push(u);
      }
    }
    this.ruleslist = rulearr;
  }

  // selectgrp(event) {
  //    this.ugid = event.uuid;
  //    this.UserService.userbygrpid(event.uuid).subscribe((res)=>{
  //     this.grpusers = res.data.relationships.users;
  //    })
  // }
  // groupusers(event){
  //    this.uid = event.id;
     
  // }
}
