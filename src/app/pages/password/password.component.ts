import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder,UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Subscription, Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { UserModel } from '../../modules/auth/_models/user.model';
import { GeneralService } from 'src/app/services/general.service';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss']
})
export class PasswordComponent implements OnInit {
  form: UntypedFormGroup;
  oldpassword: UntypedFormControl;
  newpassword: UntypedFormControl;
  repassword: UntypedFormControl;
  passmsg: string;
  // form = new FormGroup({
  //   oldpassword: new FormControl(''),    
  //   newpassword: new FormControl('', Validators.minLength(4)),
  //   repassword: new FormControl('')
  // });

  loading = false;
  hasError: boolean;
  returnUrl: string;
  isLoading$: Observable<boolean>;

 
  private unsubscribe: Subscription[] = []; // Read more: => https://brianflove.com/2016/12/11/anguar-2-unsubscribe-observables/
  loader: boolean;

  constructor(
    private fb: UntypedFormBuilder,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private generalService: GeneralService,
    private toastr: ToastrService,
    public translate: TranslateService   
  ) {
    generalService.setTitle('Cambiar contraseña');    
   }

   //loading = false;
   waiting = false;

  ngOnInit(): void {
    this.createFormGroup();
  }

    createFormGroup() {    
      this.form = new UntypedFormGroup({
        oldpassword: new UntypedFormControl('', [Validators.required]),
        newpassword: new UntypedFormControl('', [Validators.required]),
        repassword:  new UntypedFormControl('', [Validators.required]),
      })
    }


    checkPassSame() {
      let pass = this.form.value.newpassword;
      let passConf = this.form.value.repassword;
      console.log("pass",pass);
      console.log("passConf",passConf);
      if(pass == passConf && this.form.valid === true) {
        this.passmsg = "";
        return false;
      }else {
        this.passmsg = "Password did not match.";
        return true;
      }
    }


  onSubmit() {
    this.hasError = false;
    //this.loader = true;
    this.waiting=true;
    //debugger;
    this.authService.changepassword(this.form.value).subscribe(
      res => {
        console.log("=======",this.form.value)
     //   debugger;
        if(res.error) {
          
          this.loader = false;          
          this.toastr.error(this.translate.instant('Ocurrio un error, verifica el usuario y el password'), 'Error');          
          return false;
        }
      //  debugger;
        this.loader = false;
        //Se guarda el token en el localstorage
        //localStorage.setItem('token', res.access_token);
        //Se guardan los permisos en el localstorage
        console.log("success");
        this.authService.getPermissions().subscribe(resP=>localStorage.setItem('permissions', JSON.stringify(resP.data)));      
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
  }  
}
