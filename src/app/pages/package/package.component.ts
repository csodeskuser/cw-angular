import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GeneralService } from 'src/app/services/general.service';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-package',
  templateUrl: './package.component.html',
  styleUrls: ['./package.component.scss']
})
export class PackageComponent implements OnInit {
  loading = false;

  constructor(
    private generalService: GeneralService,
    private toastr: ToastrService,
    public translate: TranslateService   
  ) {
    generalService.setTitle('Descargas');    
  }

  ngOnInit(): void {
  }


}
