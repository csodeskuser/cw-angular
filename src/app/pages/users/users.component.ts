import { Component, OnInit } from "@angular/core";
import { GeneralService } from "src/app/services/general.service";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import {
  AbstractControl,
  FormBuilder,
  UntypedFormGroup,
  UntypedFormControl,
  Validators,
  FormGroup,
  FormControl,
  ValidatorFn,
} from "@angular/forms";
import { UserService } from "src/app/services/user.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-users",
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.scss"],
})
export class UsersComponent implements OnInit {
  status = 1; //item.status
  usermode = 1; //item.usermode
  screenshots_enabled = 1; //item.screenshots_enabled
  userGroup: any;
  loading = false;
  enterpriseId = 1;
  filter = {
    page: "",
    perPage: "",
    name: "",
    collectionSize: "",
  };
  grupos: any;
  selectedgrupos: any;
  submitted = false;
  submitted1 = false;
  submitted2 = false;
  optionNResults = [100, 200, 300, 400, 500, 600];
  nResults = 100;
  users: any;
  usersmain: any;
  userrole = [];
  udata: any;
  userarr: any;
  userid: any;
  fileName: any;
  response;
  user_group_access:any;

  searchForm = new UntypedFormGroup({
    name: new UntypedFormControl(""),
  });
  form = new UntypedFormGroup({
    id: new UntypedFormControl(""),
    email: new UntypedFormControl("", Validators.required),
    name: new UntypedFormControl("", Validators.minLength(4)),
    usergroup_id: new UntypedFormControl(""),
    role_id: new UntypedFormControl(""),
    status: new UntypedFormControl(""),
    productionHr: new UntypedFormControl(""),
    sid: new UntypedFormControl(""),
    password: new UntypedFormControl("", Validators.minLength(4)),
    rpassword: new UntypedFormControl(""),
    Weeklylimit: new UntypedFormControl(""),
  });

  editForm = new UntypedFormGroup({
    id: new UntypedFormControl(""),
    email: new UntypedFormControl({value: '', disabled: true}),
    name: new UntypedFormControl("", Validators.minLength(4)),
    usergroup_id: new UntypedFormControl("",Validators.required),
    role_id: new UntypedFormControl("",Validators.required),
    status: new UntypedFormControl(""),
    productionHr: new UntypedFormControl("", Validators.required),
    sid: new UntypedFormControl(""),
    password: new UntypedFormControl(""),
 //   Weeklylimit: new UntypedFormControl("", Validators.minLength(1)),
  });

  excelFile = new FormGroup({
    file: new FormControl("", [Validators.required]),
    fileSource: new FormControl("", [Validators.required]),
  });

  grpForm = new FormGroup({
    groups: new FormControl("", [Validators.required]),
  });

  modalRefAddUser: any;
  modalRefImportExcel: any;
  modalRefGrpForm: any;
  roles: any;
  showpassword = false;

  modalRefEditUser: any;
  helpModel: any;
  expanded = false;

  constructor(
    private generalService: GeneralService,
    private modalService: NgbModal,
    private UserService: UserService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService
  ) {
    generalService.setTitle("Usuarios");
  }

  ngOnInit(): void {
    this.load();
    let defaultRole = 2; //this.roles[1].id
    this.form.patchValue({ role_id: defaultRole, usergroup_id: 1 });
    this.grpForm = this.formBuilder.group({
      groups: ["", Validators.required],
    });

    this.form = this.formBuilder.group(
      {
        email: ["", [Validators.required, Validators.email]],
        name: [
          "",
          [
            Validators.required,
            Validators.minLength(2),
            Validators.maxLength(30),
          ],
        ],
        usergroup_id: ["", [Validators.required]],
        role_id: [""],
        productionHr: [""],
        sid:[""],
        Weeklylimit: [""],
        password: [
          "",
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(20),
          ],
        ],
        rpassword: ["", [Validators.required]],
      },
      {
        validators: [this.match("password", "rpassword")],
      }
    );
  
    this.editForm = this.formBuilder.group({
      email: [{value: '', disabled: true}],
      name: [
        "",
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(30),
        ],
      ],
      usergroup_id: ["", Validators.required],
      role_id: ["", Validators.required],
      productionHr: ["", Validators.required],
      sid:[""],
    //  Weeklylimit: ["", Validators.required],
      password: [""],
    });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  get f1(): { [key: string]: AbstractControl } {
    return this.editForm.controls;
  }

  get f2() {
    return this.excelFile.controls;
  }

  get f3() {
    return this.grpForm.controls;
  }

  match(controlName: string, checkControlName: string): ValidatorFn {
    return (controls: AbstractControl) => {
      const control = controls.get(controlName);
      const checkControl = controls.get(checkControlName);
      if (checkControl?.errors && !checkControl.errors["matching"]) {
        return null;
      }
      if (control?.value !== checkControl?.value) {
        controls.get(checkControlName)?.setErrors({ matching: true });
        return { matching: true };
      } else {
        return null;
      }
    };
  }

  setPagination(event) {
    this.filter.page = event.page;
    this.load();
  }

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.excelFile.patchValue({
        fileSource: file,
      });
    }
  }

  load() {
    this.user_group_access = JSON.parse(localStorage.getItem('permissions'));
  

    this.UserService.create().subscribe((res) => {
      this.userGroup = res.userGroup;
      
      this.roles = res.roles;
      var grparr = [];
      for (var j = 0; j < res.userGroup.length; j++) {
        grparr.push(res.userGroup[j].name);
      }
      this.grupos = grparr;
    });
    this.UserService.list(this.filter.page).subscribe((res) => {
      var paginate = res.meta;

      this.filter.collectionSize = paginate.total;
      this.filter.page = paginate.current_page;
      this.filter.perPage = paginate.per_page;

      for (var i = 0; i < res.data.length; i++) {
        var uu = [];
        for (var u = 0; u < res.data[i].relationships.role.length; u++) {
          var rolename = res.data[i].relationships.role[u].name;

          uu.push(rolename);
          res.data[i].rolename = uu.join("/").toString();
        }
      }
      this.usersmain = res.data;
      this.users = res.data;
    });
  }


  addUser(content) {
    this.modalRefAddUser = this.modalService.open(content, { size: "md" });
  }

  importexcel(content2) {
    this.modalRefImportExcel = this.modalService.open(content2, { size: "md" });
  }

  addGroup(content4, id) {
    this.modalRefGrpForm = this.modalService.open(content4, { size: "md" });
  }

  editUser(content1, id) {
    this.userid = id;
    this.UserService.show(id).subscribe((res) => {
      
      this.udata = res.data;
      this.editForm.patchValue({
        email: this.udata.email,
        name: this.udata.name,
        usergroup_id: this.udata.relationships.group.id,
        // role_id: [""],
        productionHr: this.udata.cost_per_hour,
      //  Weeklylimit: this.udata.limit_per_week,
      });
    });
    this.modalRefEditUser = this.modalService.open(content1, { size: "md" });
  }

  delete(id) {
    this.UserService.delete(id).subscribe((res) => {
      this.load();
      this.toastr.success( "User deleted succesfully")
    });
  }

  testLoad() {
    this.loading = true;
  }

  onSubmit() {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    var data = {
      name: this.form.value.name,
      email: this.form.value.email,
      group_user_id: this.form.value.usergroup_id,
      auth_key: null,
      limit_per_week: this.form.value.Weeklylimit,
      cost_per_hour: this.form.value.productionHr,
      sid:null,
      password: this.form.value.password,
      roles: this.form.value.role_id,
      status: 1,
    };

    this.UserService.addUser(data).subscribe(
      (res) => {
        this.modalRefAddUser.close();
        this.load();
        this.toastr.success("User added succesfully");
      },
      (error) => {
        this.toastr.error(error.error.email[0])
      }
    );

  }

  onSubmitEdit() {
    this.submitted1 = true;
    if (this.editForm.invalid) {
      return;
    }
    var data = {
      id: this.userid,
      name: this.editForm.value.name,
      email: this.editForm.value.email,
      group_user_id: this.editForm.value.usergroup_id,
      auth_key: null,
    //  limit_per_week: this.form.value.Weeklylimit,
      cost_per_hour: this.editForm.value.productionHr,
      sid:null,
      roles: this.editForm.value.role_id,
      status: 1,
    };
  
     var data1 = {
      id: this.userid,
      name: this.editForm.value.name,
      email: this.editForm.value.email,
      group_user_id: this.editForm.value.usergroup_id,
      auth_key: null,
  //    limit_per_week: this.form.value.Weeklylimit,
      cost_per_hour: this.editForm.value.productionHr,
      sid:null,
      password: this.editForm.value.password,
      roles: this.editForm.value.role_id,
      status: 1,
    };
   
     
if(this.editForm.value.password == ""){
    this.UserService.edit(data).subscribe(
      (res) => {
        this.modalRefEditUser.close();
        this.load();
        this.toastr.success("User updated succesfully");
      },
      (error) => {
        console.log(error);
        this.toastr.error(error.error);
      }
    );
  }else{
    this.UserService.edit(data1).subscribe(
      (res) => {
        this.modalRefEditUser.close();
        this.load();
        this.toastr.success("User updated succesfully");
      },
      (error) => {
        this.toastr.error(error.error.email[0]);
      }
    );
  }
  }

  onSubmitGroup() {
    this.submitted2 = true;
    if (this.grpForm.invalid) {
      return;
    }
    var grparr = [];
    // for (var j = 0; j < this.selectedgrupos.length; j++) {
    //   const perid = this.userGroup.find(({ name }) => name === this.selectedgrupos[j]);
    //   grparr.push(perid.id);
    // }
    var data = {
      groups: grparr,
    };
    this.toastr.warning("Api not found to add user groups");

    this.modalRefGrpForm.close();
  }

  onImport() {
    const formData = new FormData();
    formData.append("file", this.excelFile.get("fileSource")?.value);

    this.modalRefImportExcel.close();
  }

  closegroup() {
    this.modalRefGrpForm.close();
  }

  cancel() {
    this.modalRefAddUser.close();
  }

  cancelimport() {
    this.modalRefImportExcel.close();
  }

  editCancel() {
    this.modalRefEditUser.close();
  }

  search() {
    const search = (<HTMLInputElement>document.getElementById("search")).value;

    const filled = search.replace(/ /g, "%20");

    this.UserService.search(filled).subscribe((res) => {
      var paginate = res.meta;

      this.filter.collectionSize = paginate.total;
      this.filter.page = paginate.current_page;
      this.filter.perPage = paginate.per_page;

      for (var i = 0; i < res.data.length; i++) {
        var uu = [];
        for (var u = 0; u < res.data[i].relationships.role.length; u++) {
          var rolename = res.data[i].relationships.role[u].name;

          uu.push(rolename);
          res.data[i].rolename = uu.join("/").toString();
        }
      }
      this.usersmain = res.data;
      this.users = res.data;
    });

    // for (var i = 0; i < this.usersmain.length; i++) {
    //   let u = this.usersmain[i];
    //   let smallu = u.name.toLowerCase();
    //   let smalls = search.toLowerCase();
    //   var hasTest = smallu.includes(smalls);
    //   if (hasTest == true) {
    //     userarr.push(u);
    //   }
    // }
  }

  statusChange(id) {
    this.UserService.status(id).subscribe(() => {});
  }

  screenStatus(id) {
    this.UserService.screenshots(id).subscribe(() => {});
  }

  silentStatus(id) {
    this.UserService.silentmode(id).subscribe(() => {});
  }

  help(helpContent){
    this.helpModel = this.modalService.open(helpContent, { size: "lg" });
  }

  expand() {
    if(this.expanded){
       this.expanded = false
    }else{
      this.expanded = true;
    }
    
  }
}
