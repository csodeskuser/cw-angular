import { Component, OnInit, OnDestroy, ChangeDetectorRef } from "@angular/core";
import { GeneralService } from "src/app/services/general.service";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import {
  AbstractControl,
  FormBuilder,
  UntypedFormGroup,
  UntypedFormControl,
  Validators,
} from "@angular/forms";

import { Subscription, Observable } from "rxjs";
import { first } from "rxjs/operators";

//import { AuthService } from '../_services/auth.service';
import { AuthService } from "../../services/auth.service";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { TranslateService } from "@ngx-translate/core";

import dataTest from "../reports/data_test.js";

@Component({
  selector: "app-permissions",
  templateUrl: "./permissions.component.html",
  styleUrls: ["./permissions.component.scss"],
})
export class PermissionsComponent implements OnInit, OnDestroy {
  enterprises: any;
  loading = false;
  enterpriseId = 1;
  filter = {
    page: "",
    perPage: "",
    name: "",
    collectionSize: "",
  };
  optionNResults = [100, 200, 300, 400, 500, 600];
  nResults = 100;
  permissions: any;

  form:any;
  editForm:any;
  perId:any;
  submitted:any;
  submitted1:any;

  modalRefAddPermission: any;
  modalRefEditPermission: any;
  showpassword = false;
  private unsubscribe: Subscription[] = [];

  constructor(
    private generalService: GeneralService,
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    public translate: TranslateService
  ) {
    generalService.setTitle("Permisos");
  }

  ngOnInit(): void {
    this.load();

    this.form = this.formBuilder.group({
      name: [
        "",
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(30),
        ],
      ],
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
    });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  get f1(): { [key: string]: AbstractControl } {
    return this.editForm.controls;
  }

  setPagination(event) {
    this.filter.page = event.page;
    this.load();
  }

  load() {

    this.authService.getPermissionsWithPage(this.filter.page).subscribe(
      (res) => {
        // debugger;
        var paginate = res.meta;

        this.filter.collectionSize = paginate.total;
        this.filter.page = paginate.current_page;
        this.filter.perPage = paginate.per_page;
        if (res.error) {
          this.toastr.error(
            this.translate.instant(
              "Ocurrio un error, verifica el usuario y el password"
            ),
            "Error"
          );
          return false;
        }
        // debugger;
        this.permissions = res.data;
      },
      (err) => {
        console.log("Error Finding", err);

        this.toastr.error(
          this.translate.instant(
            "Ocurrio un error, verifica el usuario y el password"
          ),
          "Error"
        );
      }
    );
  }

  addPermission(content) {
    this.modalRefAddPermission = this.modalService.open(content, { size: "md" });
  }

  editPermissions(content1, id) {
     this.perId = id;
    this.authService.getPermissionsByID(id).subscribe((res)=>{
      this.editForm.patchValue({
        name: res.data.name
      })
    })

    this.modalRefEditPermission = this.modalService.open(content1, { size: "md" });
  }

  delete() {}

  testLoad() {
    this.loading = true;
  }

  cancel() {
    this.modalRefAddPermission.close();
  }

  cancelEdit() {
    this.modalRefEditPermission.close();
  }

  /**
   * Modal crear funciones
   */
  onSubmit() {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }

    var data = {
      name: this.form.value.name
    }
    this.authService.createPermissions(data).subscribe((res)=>{
      this.cancel();
      this.load();
      this.toastr.success('Permission created successfully');
    },(error) => {
      this.toastr.error(error.message);
    })
  }

  // goToCreatePage() {
  //   this.router.navigate(["/create-permissions"]);
  // }

  onSubmitEdit() {
    this.submitted1 = true;
    if (this.editForm.invalid) {
      return;
    }
    
   var data = {
    name: this.editForm.value.name
   }

    this.authService.updatePermissions(this.perId,data).subscribe((res)=>{
        this.cancelEdit();
        this.load();
        this.toastr.success('permission edited successfully');
        
    },(error)=>{
      this.toastr.error(error.message)
    })
   
    // console.log("edit idd", id);
    // this.router.navigate(["/edit-permissions", id]);
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
