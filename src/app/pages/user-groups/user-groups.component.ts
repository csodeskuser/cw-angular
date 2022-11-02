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
import { ToastrService } from "ngx-toastr";
import { TranslationService } from "src/app/modules/i18n/translation.service";
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';


@Component({
  selector: "app-user-groups",
  templateUrl: "./user-groups.component.html",
  styleUrls: ["./user-groups.component.scss"],
})
export class UserGroupsComponent implements OnInit {
  error: any;
  enterprises: any;
  enterpriseId = 1;
  loading = false;
  groups: any;
  groupsmain: any;
  groupid: any;
  users: any;
  groupdata: any;
  apiRoot = "https://app.clowdwork.com/api/v1";
  ids = [];

  filter = {
    page: "",
    per_page: "",
    name: "",
    collectionSize: "",
  };
  seluarr;
  seluarrEdit;
  uarr=[];
  submitted = false;
  submitted1 = false;
  uguser:any;

  form = new UntypedFormGroup({
    id: new UntypedFormControl(""),
    name: new UntypedFormControl("", Validators.minLength(4)),
    user_admin_id: new UntypedFormControl("", Validators.required),
  });

  editForm = new UntypedFormGroup({
    id: new UntypedFormControl(""),
    name: new UntypedFormControl("", Validators.minLength(4)),
    user_admin_id: new UntypedFormControl(""),
  });

  modalRefAddGroup: any;

  modalRefEditGroup: any;

  constructor(
    private generalService: GeneralService,
    private modalService: NgbModal,
    private UserGroupsService: UserGroupsService,
    private UserService: UserService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private translate: TranslationService
  ) {
    generalService.setTitle("Grupos de Usuarios");
  }

  ngOnInit(): void {
    this.load();
    this.form.patchValue({ enterprise_id: 1 });

    this.form = this.formBuilder.group({
      name: [
        "",
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(30),
        ],
      ],
      user_admin_id: ["", Validators.required],
    });

    this.editForm = this.formBuilder.group({
      name: [
        "",
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(30),
        ],
      ],
      user_admin_id: ["", Validators.required],
    });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  get f1(): { [key: string]: AbstractControl } {
    return this.editForm.controls;
  }

  load() {
    this.UserGroupsService.userGroup(this.filter).subscribe((res) => {
      var paginate = res.meta;
      this.filter.collectionSize = paginate.total;
      this.filter.page = paginate.current_page;
      this.filter.per_page = paginate.per_page;

      this.groupsmain = res.data;
      this.groups = res.data;
     
      for(var i=0; i<this.groups.length; i++){
        var name = this.groups[i].id;
      //  const filled = name.replace(/ /g, "");
        this.ids.push(name);
      }
      
    });

    this.UserGroupsService.userList().subscribe((res) => {
      this.users = res.users;
      for(var i=0; i<this.users.length; i++){
         var name = this.users[i].name;
         this.uarr.push(name)
      }
      
    });
  }


  addGroup(content) {
    this.modalRefAddGroup = this.modalService.open(content, { size: "md" });
  }

  editGroup(content1, id) {
    this.groupid = id;
    this.UserGroupsService.show(id).subscribe((res) => {
      this.groupdata = res.data;
       
      var uarr= [];
      if(this.groupdata.relationships.users){
        var users = this.groupdata.relationships.users;
           for(var i=0; i<users.length; i++){
                 uarr.push(users[i].name)
           }
      }
      
      this.seluarrEdit= uarr
      this.editForm.patchValue({
        name: this.groupdata.name,
      });
    });

    this.modalRefEditGroup = this.modalService.open(content1, { size: "md" });
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
    var idarr = [];
    for (var j = 0; j < this.seluarr.length; j++) {
      const perid = this.users.find(({ name }) => name === this.seluarr[j]);
      idarr.push(perid.id);
    }
    
    var data = {
      name: this.form.value.name,
      user_admin_id:idarr, 
    };

    this.UserGroupsService.addGroup(data).subscribe(
      (res) => {
        this.cancel();
        this.load();
        this.toastr.success("Group added successfully")
      },
      (error) => {
        console.log(error.error);
        
        this.toastr.error(error.error.name[0]);
      }
    );

  }

  onSubmitEdit() {
    this.submitted1 = true;
    if (this.editForm.invalid) {
      return;
    }
    var idarr = [];
    for (var j = 0; j < this.seluarrEdit.length; j++) {
      const perid = this.users.find(({ name }) => name === this.seluarrEdit[j]);
      idarr.push(perid.id);
    }

    var data = {
      id: this.groupid,
      name: this.editForm.value.name,
      user_admin_id: idarr,
    };

    this.UserGroupsService.editGroup(data).subscribe(
      (res) => {
        this.cancelEdit();
        this.load();
        this.toastr.success("Group updated successfully");
      },
      (error) => {
        
        this.toastr.error(error.error.name[0]);
      }
    );

    
  }

  cancel() {
    this.modalRefAddGroup.close();
  }

  cancelEdit() {
    this.modalRefEditGroup.close();
  }

  delete(id) {
    this.UserGroupsService.deleteGroup(id).subscribe((res)=>{
      this.load();
      this.toastr.success("Group deleted successfully.");
    },(error)=>{
      var msg = this.translate.instant(error.error.error)
      this.toastr.error(msg)
    });
  }

  setPagination(event) {
    this.filter.page = event.page;
    this.filter.per_page = event.perPage;
    this.load();
  }

  search() {
    const search = (<HTMLInputElement>document.getElementById("search")).value;

    const filled = search.replace(/ /g, "%20");

    this.UserGroupsService.search(filled).subscribe((res) => {
      this.groups = res.data;

      var paginate = res.meta;

      this.filter.collectionSize = paginate.total;
      this.filter.page = paginate.current_page;
      this.filter.per_page = paginate.per_page;
    });

    // for (var i = 0; i < this.groupsmain.length; i++) {
    //   let u = this.groupsmain[i];
    //   let smallu = u.name.toLowerCase();
    //   let smalls = search.toLowerCase();
    //   var hasTest = smallu.includes(smalls);
    //   if (hasTest == true) {
    //     grparr.push(u);
    //   }
    // }
  }

  onExport(value) {
    
    var lang = localStorage.getItem('language');
    
    if(value == "xls"){
      this.UserGroupsService.export(lang).subscribe((data) => {
        data;
  
        const contentType =
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
        const blob = new Blob([data], { type: contentType });
        const url = window.URL.createObjectURL(blob);
        window.open(url);
      });

    }else{
      this.UserGroupsService.export(lang).subscribe((data) => {
        data;
  
        const contentType =
          "application/pdf";
        const blob = new Blob([data], { type: contentType });
        var link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = 'usegroupPDFFile.pdf';
        link.click();
        window.URL.revokeObjectURL(link.href);
        // const url = window.URL.createObjectURL(blob);
        // window.open(url);
      });
    }
    
  }

  drop(event: CdkDragDrop<string[]>){
    
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }

    var user = event.container.data[event.currentIndex];
    var userId = event.container.data[event.currentIndex]['id'];
    var prevGroup = event.previousContainer.id;
    var currGroup = event.container.id;
    var grpData = event.previousContainer.data[event.previousIndex];
    

    if(prevGroup !== currGroup){

      this.UserGroupsService.show(currGroup.toString()).subscribe((res) => {
        
        var data = {
          id: currGroup,
          name: res.data.name,
          user_admin_id: userId.toString(),
        };

     this.UserGroupsService.editGroup(data).subscribe((res) => {
      // console.log('res',res);
      
      //  this.load();
      })

      })

    }
    
  }
}
