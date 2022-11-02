import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { GeneralService } from 'src/app/services/general.service';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  form = new UntypedFormGroup({
    id: new UntypedFormControl(''),    
    name: new UntypedFormControl('', Validators.minLength(4)),
    position: new UntypedFormControl(''),
    genre: new UntypedFormControl(''),
    language: new UntypedFormControl('')
  });
  
  languages = [
    {id: 0, name: 'Español'}
  ]
  
  genres = [
    {id: 0, name: 'Masculino'}
  ]

  loading = false;

  constructor(
    private generalService: GeneralService,
    private toastr: ToastrService,
    public translate: TranslateService    
  ) { 
    generalService.setTitle('Perfil');
  }

  ngOnInit(): void {
   
  }

  onSubmit() {

  }   

  onFileChange(event): void {
    console.log('file', event.target.files[0])
    let file = event.target.files[0];
    let ext = file.name.split('.').pop();
    let extensions = ['png', 'jpg', 'jpeg'];
    if(!extensions.find(ex=>ext==ex)) {
      this.toastr.error(this.translate.instant('El archivo debe ser de tipo jpg, png o jpeg'), 'Error');                
    }
    console.log('ext', ext)
    //this.form.patchValue({ banner: event.target.files[0] });
  }   
}
