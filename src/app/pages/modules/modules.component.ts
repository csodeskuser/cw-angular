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
import { ModulesService } from "src/app/services/modules.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-modules",
  templateUrl: "./modules.component.html",
  styleUrls: ["./modules.component.scss"],
})
export class ModulesComponent implements OnInit {
  error: any;
  loading = false;
  modules: any;
  apiRoot = "https://app.clowdwork.com/api/v1";

  filter = {
    page: '',
    perPage: '',
    name: "",
    collectionSize : ''
  };

  submitted = false;
  submitted1 = false;
  modulesmain: any;

  id;
  form = new UntypedFormGroup({
    id: new UntypedFormControl(""),
    name: new UntypedFormControl("", Validators.minLength(4)),
  });

  editForm = new UntypedFormGroup({
    id: new UntypedFormControl(""),
    name: new UntypedFormControl("", Validators.minLength(4)),
  });

  modalRefAddModule: any;

  modalRefEditModule: any;

  constructor(
    private generalService: GeneralService,
    private modalService: NgbModal,
    private ModulesService: ModulesService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService
  ) {
    generalService.setTitle("Modules");
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
    this.ModulesService.list(this.filter.page).subscribe((res) => {
      this.modules = res.data;
      this.modulesmain = res.data;

      
      var paginate = res.meta;
      
      this.filter.collectionSize = paginate.total;
      this.filter.page = paginate.current_page;
      this.filter.perPage = paginate.per_page;
    });
  }

  addModule(content) {
    this.modalRefAddModule = this.modalService.open(content, { size: "md" });
  }

  editModule(content1, id) {
    this.id = id;
    this.ModulesService.show(id).subscribe((res)=>
      this.editForm.patchValue({
        name: res.data.name
  }))
    this.modalRefEditModule = this.modalService.open(content1, { size: "md" });
  }

  onSubmit() {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }

    var data = {
      name: this.form.value.name,
    };

    this.ModulesService.addModule(data).subscribe((res) => {
      this.cancel();
      this.load();
      this.toastr.success('Module Added successfully')
    },(error)=>{
      this.toastr.error(error.error)
    });

  }

  onSubmitEdit() {
    this.submitted1 = true;
    if (this.editForm.invalid) {
      return;
    }
    var data = {
      id: this.id,
      name: this.editForm.value.name,
    };
    this.ModulesService.edit(data).subscribe((res) => {
      this.cancelEdit();
      this.load();
      this.toastr.success('Module edited successfully')
    },(error)=>{
      this.toastr.error(error.error)
    });

  }

  cancel() {
    this.modalRefAddModule.close();
  }

  cancelEdit() {
    this.modalRefEditModule.close();
  }

  delete(id) {
    this.ModulesService.delete(id).subscribe((res) => {
      this.load();
      this.toastr.success('user deleted successfullY')
    },(error)=>{
      this.toastr.error(error.error)
    });
  }

  setPagination(event) {
    this.filter.page = event.page;
    this.load();
  }

  search() {
    var modulearr = [];
    const search = (<HTMLInputElement>document.getElementById("search")).value;

    for (var i = 0; i < this.modulesmain.length; i++) {
      let u = this.modulesmain[i];
      let smallu = u.name.toLowerCase();
      let smalls = search.toLowerCase();
      var hasTest = smallu.includes(smalls);
      if (hasTest == true) {
        modulearr.push(u);
      }
    }
    this.modules = modulearr;
  }
}
