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
import { RolesService } from "src/app/services/roles.service";
import { AuthService } from "src/app/services/auth.service";
import { ToastrService } from "ngx-toastr";


@Component({
  selector: "app-roles",
  templateUrl: "./roles.component.html",
  styleUrls: ["./roles.component.scss"],
})
export class RolesComponent implements OnInit {
  roleid: any;
  perdata: any;
  selected: any;
  editselected: any;
  enterprises: any;
  enterpriseId = 1;
  loading = false;
  roles: any;
  rolesmain: any;
  permission: any;
  apiRoot = "https://app.clowdwork.com/api/v1";

  filter = {
    page: '',
    perPage: '',
    name: "",
    collectionSize : ''
  };


  submitted = false;
  submitted1 = false;

  form = new UntypedFormGroup({
    name: new UntypedFormControl("", Validators.minLength(4)),
    permission: new UntypedFormControl("", Validators.required),
  });

  editForm = new UntypedFormGroup({
    name: new UntypedFormControl("", Validators.minLength(3)),
    permission: new UntypedFormControl("", Validators.required),
  });

  user_admin_id: any;

  modalRefAddRole: any;

  modalRefSuccessMsg: any;

  modalRefEditRole: any;

  constructor(
    private generalService: GeneralService,
    private modalService: NgbModal,
    private Rolesservice: RolesService,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    
    private toastr: ToastrService,
  ) {
    generalService.setTitle("Roles");
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
      permission: ["", Validators.required],
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
      permission: ["", Validators.required],
    });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  get f1(): { [key: string]: AbstractControl } {
    return this.editForm.controls;
  }

  load() {
    this.Rolesservice.list(this.filter.page).subscribe((res) => {
   
      var paginate = res.meta;
      
      this.filter.collectionSize = paginate.total;
      this.filter.page = paginate.current_page;
      this.filter.perPage = paginate.per_page;
      
      this.user_admin_id = res.data[0].user_admin_id;
      this.rolesmain =res.data;
      this.roles = res.data;
      this.enterprises = res.data;
      for (var j = 0; j < this.roles.length; j++) {
        var alldata = this.roles[j];
      }
      this.authService.getPermissions().subscribe((res) => {
        this.perdata = res.data;
        var permissionarr = [];
        for (var j = 0; j < this.perdata.length; j++) {
          permissionarr.push(this.perdata[j].name);
        }
        this.permission = permissionarr;
        
      });
    });
  }

  addRole(content) {
    this.modalRefAddRole = this.modalService.open(content, { size: "md" });
  }

  editRole(content1, id) {
    this.roleid = id;
    this.Rolesservice.show(id).subscribe((res=>{
      this.editForm.patchValue({
        name:res.role.name,
      })
      var selarr = [];
      for(var i=0; i<res.role.permissions.length; i++){
            var persel = res.role.permissions[i].name;
             
          selarr.push(persel)
      }
      this.editselected = selarr   
   
    }))
    this.modalRefEditRole = this.modalService.open(content1, { size: "md" });
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
    for (var j = 0; j < this.selected.length; j++) {
      const perid = this.perdata.find(({ name }) => name === this.selected[j]);
      idarr.push(perid.id);
    }

    var data = {
      name: this.form.value.name,
      permission: idarr,
    };

    this.Rolesservice.store(data).subscribe((res) => {
      this.modalRefAddRole.close();
      this.load();
      this.toastr.success('Role Added succesfully');
    },(error)=>{
        this.toastr.error(error.error.name[0]);
    });

  }

  onSubmitEdit() {
    this.submitted1 = true;
    if (this.editForm.invalid) {
      return;
    }

    var idarr = [];
    for (var j = 0; j < this.editselected.length; j++) {
      const perid = this.perdata.find(
        ({ name }) => name === this.editselected[j]
      );
      idarr.push(perid.id);
    }

    var data = {
      id: this.roleid,
      name: this.editForm.value.name,
      permission: idarr,
    };

    this.Rolesservice.update(data).subscribe(() => {
      this.modalRefEditRole.close();
      this.load();
      this.toastr.success('Role Updated succesfully');
    },(error)=>{
      this.toastr.error(error.error.name[0]);
    });

  }

  cancel() {
    this.modalRefAddRole.close();
  }

  cancelEdit() {
    this.modalRefEditRole.close();
  }

  delete(id) {
    this.Rolesservice.delete(id).subscribe(() => {
      this.load();
      this.toastr.success('Role Deleted succesfully')
    });
  }

  setPagination(event) {
    this.filter.page = event.page;
    this.load();
  }

  search() {
    const search = (<HTMLInputElement>document.getElementById("search")).value;

    
    const filled = search.replace(/ /g, "%20");

    this.Rolesservice.search(filled).subscribe((res) => {
      this.roles = res.data;

      var paginate = res.meta;

      this.filter.collectionSize = paginate.total;
      this.filter.page = paginate.current_page;
      this.filter.perPage = paginate.per_page;
    });

    // for (var i = 0; i < this.rolesmain.length; i++) {
    //   let u = this.rolesmain[i];
    //   let smallu = u.name.toLowerCase();
    //   let smalls = search.toLowerCase();
    //   var hasTest = smallu.includes(smalls);
    //   if (hasTest == true) {
    //     rolearr.push(u);
    //   }
    // }
    // this.roles = rolearr;
  }
}
