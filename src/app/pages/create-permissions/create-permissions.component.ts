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
  selector: 'app-create-permissions',
  templateUrl: './create-permissions.component.html',
  styleUrls: ['./create-permissions.component.scss']  
})
export class CreatePermissionsComponent implements OnInit, OnDestroy {
  permissionForm: UntypedFormGroup;
  hasError: boolean;
  returnUrl: string;
  isLoading$: Observable<boolean>;

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
    
    ) {generalService.setTitle('crear Permisos'); }
  // convenience getter for easy access to form fields

  loading = false;
  waiting = false;

  ngOnInit(): void {
    
    this.initForm();
    // get return url from route parameters or default to '/'
    this.returnUrl =
        this.route.snapshot.queryParams['returnUrl'.toString()] || '/';
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

  submit() {
    this.hasError = false;
    this.loader = true;
    this.waiting=true;
   // debugger;
    console.log("this.permissionForm.value", this.permissionForm.value)
    this.authService.createPermissions(this.permissionForm.value).subscribe(
      res => {
      //  debugger;
        if(res.error) {
          
          this.loader = false;          
          this.toastr.error(this.translate.instant('Ocurrio un error, verifica el usuario y el password'), 'Error');          
          return false;
        }
       // debugger;
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
