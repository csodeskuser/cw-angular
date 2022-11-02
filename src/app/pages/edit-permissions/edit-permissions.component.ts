import { Component, OnDestroy, OnInit ,ChangeDetectorRef} from '@angular/core';
import { UntypedFormBuilder, FormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GeneralService } from 'src/app/services/general.service';
import { Observable, of, Subscription } from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs/operators';

import { first } from 'rxjs/operators';

import { AuthService } from '../../services/auth.service';

import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
// import { Product } from '../../_models/product.model';
// import { ProductsService } from '../../_services';

@Component({
  selector: 'app-edit-permissions',
  templateUrl: './edit-permissions.component.html',
  styleUrls: ['./edit-permissions.component.scss']
})
export class EditPermissionsComponent implements OnInit, OnDestroy {
  permissionForm: UntypedFormGroup;
  hasError: boolean;
  returnUrl: string;
  isLoading$: Observable<boolean>;
  users : any;
  id : any;
  permissionName : any;
  idd :any;

  // private fields
  private unsubscribe: Subscription[] = []; // Read more: => https://brianflove.com/2016/12/11/anguar-2-unsubscribe-observables/
  loader: boolean;
 
  constructor(
    private generalService: GeneralService,
    private fb: UntypedFormBuilder,
    //private productsService: ProductsService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    public translate: TranslateService
    
    ) {generalService.setTitle('editar Permisos'); }
  // convenience getter for easy access to form fields

  loading = false;
  waiting = false;

  ngOnInit(): void {
   
    this.idd = this.route.snapshot.paramMap.get('id');
    this. getPermissionByID(this.idd);
    this.initForm();
    // get return url from route parameters or default to '/'
    // this.returnUrl =
    //     this.route.snapshot.queryParams['returnUrl'.toString()] || '/';
    }
 
  get f() {
    return this.permissionForm.controls;
  }

  initForm() {
    this.permissionForm = this.fb.group({
    
      name: [
        //this.defaultAuth.password,
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100),
        ]),
      ],
    });
  }

  getPermissionByID(idd){
   // debugger;
    this.id = this.idd ;
    console.log("this.id", this.id);
    this.authService.getPermissionsByID(this.id).subscribe(
      res => {
     //   debugger;
        if(res.error) {
               
          this.toastr.error(this.translate.instant('Ocurrio un error, verifica el usuario y el password'), 'Error');          
          return false;
        }
        //debugger;
         this.users = res;
         //this.permissionForm.value.name = this.users.name;
         this.permissionName = this.users.name;
         this.permissionForm.value.name = this.users.name;
         console.log("this.users by id", this.users.id);
       
      },
      err => {
        
        console.log('loading', this.loading)
        console.log('Error Finding', err)
        
        this.toastr.error(this.translate.instant('Ocurrio un error, verifica el usuario y el password'), 'Error');
      }
    );
  }

  submit() {
    this.hasError = false;
    this.loader = true;
    this.waiting=true;
    //debugger;
    console.log("this.permissionForm.value", this.permissionForm.value)
    this.authService.updatePermissions(this.idd,this.permissionForm.value).subscribe(
      res => {
      //  debugger;
        if(res.error) {
          
          this.loader = false;          
          this.toastr.error(this.translate.instant('Ocurrio un error, verifica el usuario y el password'), 'Error');          
          return false;
        }
     //   debugger;
        this.loader = false;          
        this.router.navigate(['/permissions']); 
      },
      err => {
        this.loader = false;
        console.log('loading', this.loading)
        console.log('Error Finding', err)
        this.waiting=false;
        this.toastr.error(this.translate.instant('Ocurrio un error, verifica el usuario y el password'), 'Error');
      }
    );
    /*const loginSubscr = this.authService
      .login(this.f.email.value, this.f.password.value)
      .pipe(first())
      .subscribe((user: UserModel) => {
        if (user) {
          this.router.navigate([this.  returnUrl]);
        } else {
          this.hasError = true;
        }
      });
    this.unsubscribe.push(loginSubscr);*/

  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
 

}
