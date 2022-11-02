import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Subscription, Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { UserModel } from '../_models/user.model';
//import { AuthService } from '../_services/auth.service';
import { AuthService } from '../../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {

  defaultAuth: any = {
    email: 'admin@demo.com',
    password: 'demo',
  };
  loginForm: UntypedFormGroup;
  hasError: boolean;
  returnUrl: string;
  isLoading$: Observable<boolean>;

  // private fields
  private unsubscribe: Subscription[] = []; // Read more: => https://brianflove.com/2016/12/11/anguar-2-unsubscribe-observables/
  loader: boolean;

  constructor(
    private fb: UntypedFormBuilder,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    public translate: TranslateService
  ) {
    //this.isLoading$ = this.authService.isLoading$;
    // redirect to home if already logged in
    /*if (this.authService.currentUserValue) {
      this.router.navigate(['/']);
    }*/
  }

  loading = false;
  waiting = false;

  ngOnInit(): void {
    localStorage.clear();
    this.initForm();
    // get return url from route parameters or default to '/'
    this.returnUrl =
        this.route.snapshot.queryParams['returnUrl'.toString()] || '/';
    }

  // convenience getter for easy access to form fields
  get f() {
    return this.loginForm.controls;
  }

  initForm() {
    this.loginForm = this.fb.group({
      email: [
        //this.defaultAuth.email,
        '',
        Validators.compose([
          Validators.required,
          Validators.email,
          Validators.minLength(3),
          Validators.maxLength(320), // https://stackoverflow.com/questions/386294/what-is-the-maximum-length-of-a-valid-email-address
        ]),
      ],
      password: [
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
    this.authService.login(this.loginForm.value).subscribe(
      res => {
       // debugger;
        if(res.error) {
          
          this.loader = false;          
          this.toastr.error(this.translate.instant('Ocurrio un error, verifica el usuario y el password'), 'Error');          
          return false;
        }
       // debugger;
        this.loader = false;
        //Se guarda el token en el localstorage
        localStorage.setItem('token', res.token);
        localStorage.setItem('uuid',res.user.uuid);
        //Se guardan los permisos en el localstorage
        this.authService.getPermissions().subscribe(resP=>localStorage.setItem('permissions', JSON.stringify(resP.data)));   
       // debugger;   
        this.router.navigate([this.returnUrl]); 
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
