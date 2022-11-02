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
import { ApplicationsService } from "src/app/services/applications.service";

@Component({
  selector: "app-application-groups",
  templateUrl: "./application-groups.component.html",
  styleUrls: ["./application-groups.component.scss"],
})
export class ApplicationGroupsComponent implements OnInit {
  error: any;
  enterprises: any;
  enterpriseId = "more used";
  loading = false;
  applications: any;
  applicationsmain:any;
  usergroups: any;
  application_category: any;
  apiRoot = "https://app.clowdwork.com/api/v1";

  filter = {
    page: 1,
    perPage: 10,
    name: "",
  };

  submitted = false;
  submitted1 = false;

  collectionSize = 15;

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

  modalRefAddApplication: any;

  modalRefEditApplication: any;
  constructor(
    private generalService: GeneralService,
    private modalService: NgbModal,
    private ApplicationsService: ApplicationsService,
    private formBuilder: FormBuilder
  ) {
    generalService.setTitle("Application groups");
  }

  ngOnInit(): void {
    this.load();
    this.editForm.patchValue({ enterprise_id: 1 });

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

  load() {
    this.ApplicationsService.list(this.filter.page).subscribe((res) => {
      this.applicationsmain = res.data;
      this.applications = res.data;
      for (var j = 0; j < this.applications.length; j++) {
        var alldata = this.applications[j];
      }
    });

    this.ApplicationsService.index().subscribe((res) => {
      this.application_category = res.data;
    });
  }

  editApplications(content1) {
    this.modalRefEditApplication = this.modalService.open(content1, {
      size: "md",
    });
  }

  /**
   * Modal crear/editar funciones
   */
  onSubmit() {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }

    var data = {
      name: this.form.value.name,
    };
    this.ApplicationsService.addcategory(data).subscribe((res) => {
      console.log("category Added:", res);
    });
  }

  onSubmitEdit() {
    this.submitted1 = true;
    if (this.editForm.invalid) {
      return;
    }
  }

  addApplication(content) {
    this.modalRefAddApplication = this.modalService.open(content, {
      size: "md",
    });
  }

  cancel() {
    this.modalRefEditApplication.close();
  }

  cancelEdit() {
    this.modalRefEditApplication.close();
  }

  delete() {}

  setPagination(event) {
    this.filter.page = event.page;
    this.load();
  }

  search() {
    var apparr = [];
    const search = (<HTMLInputElement>document.getElementById("search")).value;

    for (var i = 0; i < this.applicationsmain.length; i++) {
      let u = this.applicationsmain[i];
      let smallu = u.name.toLowerCase();
      let smalls = search.toLowerCase();
      var hasTest = smallu.includes(smalls);
      if (hasTest == true) {
        apparr.push(u);
      }
    }
    this.applications = apparr;
  }
}
