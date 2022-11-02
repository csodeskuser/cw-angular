import { Component, OnInit } from "@angular/core";
import { GeneralService } from "src/app/services/general.service";
import {
  UntypedFormGroup,
  UntypedFormControl,
  Validators,
} from "@angular/forms";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ApplicationsService } from "src/app/services/applications.service";
import { ToastrService } from "ngx-toastr";
import { UserGroupsService } from "src/app/services/user-groups.service";

@Component({
  selector: "app-applications",
  templateUrl: "./applications.component.html",
  styleUrls: ["./applications.component.scss"],
})
export class ApplicationsComponent implements OnInit {
  error: any;
  enterprises: any;
  orderid = 1;
  loading = false;
  applications: any;
  applicationsmain: any;
  usergroups: any;
  groups:any;
  classification: any;
  //userId:"Group users";
  groupId: "Select groups";
  grpusers:any;
  checked="edab06cd-9869-4b5a-9e72-194c5531b217";
  Appclass:any;
  order_by = [
    { id: 1, name: "More used" },
    { id: 2, name: "Less used" },
    { id: 3, name: "Date of use ASC" },
    { id: 4, name: "Date of use Desc" },
    { id: 5, name: "Name ASC" },
    { id: 6, name: "Name DESC" },
  ];
  apiRoot = "https://app.clowdwork.com/api/v1";

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
 searching=false;

  form = new UntypedFormGroup({
    id: new UntypedFormControl(""),
    name: new UntypedFormControl("", Validators.minLength(4)),
    enterprise_id: new UntypedFormControl(""),
  });

  editForm = new UntypedFormGroup({
    id: new UntypedFormControl(""),
    name: new UntypedFormControl("", Validators.minLength(4)),
    enterprise_id: new UntypedFormControl(""),
  });

  user_admin_id: any;

  modalRefAddGroup: any;

  modalRefEditGroup: any;

  constructor(
    private generalService: GeneralService,
    private modalService: NgbModal,
    private ApplicationsService: ApplicationsService,
    private toastr: ToastrService,
    private usergroupsservice: UserGroupsService
  ) {
    generalService.setTitle("Applications");
  }

  ngOnInit(): void {
    this.load();
    this.form.patchValue({ enterprise_id: 1 });
    
  }

  load() {
    this.ApplicationsService.list(this.pageFilter.page).subscribe((res) => {
      
      var paginate = res.meta;
      
      this.pageFilter.collectionSize = paginate.total;
      this.pageFilter.page = paginate.current_page;
      this.pageFilter.perPage = paginate.per_page;
      
      this.applicationsmain = res.data;
      this.applications = res.data;
      this.Appclass = res.data[0].relationships.application_classification;
      for (var j = 0; j < this.applications.length; j++) {
        var alldata = this.applications[j];
      }
      
    });

    this.ApplicationsService.classification().subscribe((res)=>{
           this.classification = res      
    })

    this.usergroupsservice.groupList().subscribe((res)=>{
         this.groups = res.userGroup;
    })
    
  }

  update(value, Appid){
    
    var data = {
    application_id: Appid,
    user_group_id:this.filter.groupId,
    user_id:this.filter.userId,
    classification_id:value,
    }

this.ApplicationsService.update(data).subscribe((res)=>{
  this.toastr.success('Application category changed')
}
,(error)=>{
  this.toastr.success('Application category changed')
}
)
 }


  setPagination(event) {
    this.pageFilter.page = event.page;
    this.load();
  }

  search() {
    var rulearr = [];
    const search = (<HTMLInputElement>document.getElementById("search")).value;

    const filled = search.replace(/ /g, "%20");
    var data = {
      search: filled,
      user_id: this.filter.userId,
      order_by: this.orderid
    }

    this.ApplicationsService.search(data).subscribe((res) => {
      if(data.user_id !== 0){
        this.searching = true;
      }
      
      this.applications = res.data;

      var paginate = res.meta;

      this.pageFilter.collectionSize = paginate.total;
      this.pageFilter.page = paginate.current_page;
      this.pageFilter.perPage = paginate.per_page;
    });
  }

}
