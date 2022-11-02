import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { FilterReportComponent } from './filter-report/filter-report.component';
import { DatepickerComponent } from './datepicker/datepicker.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoadingComponent } from './loading/loading.component';
import { NgxLoadingModule, ngxLoadingAnimationTypes } from 'ngx-loading';
import {TranslationModule} from '../modules/i18n/translation.module';
import { CategoryButtonsComponent } from './category-buttons/category-buttons.component';
import { TimePeriodsComponent } from './time-periods/time-periods.component';
import { ButtonOptionsComponent } from './button-options/button-options.component';
import { PaginationComponent } from './pagination/pagination.component';
import { ButtonLoaderComponent } from './button-loader/button-loader.component';
import { PermissionDirective } from './permission/permission.directive';


@NgModule({
  declarations: [
    FilterReportComponent,
    DatepickerComponent,
    LoadingComponent,
    CategoryButtonsComponent,
    TimePeriodsComponent,
    ButtonOptionsComponent,
    PaginationComponent,
    ButtonLoaderComponent,
    PermissionDirective
  ],
  imports: [
    TranslationModule,
    CommonModule,
    NgSelectModule,
    FormsModule,
    NgbModule,
    NgxLoadingModule.forRoot({
      animationType: ngxLoadingAnimationTypes.none,
      backdropBackgroundColour: 'rgba(0,0,0,0.1)',
      primaryColour: '#1a1a27',
      secondaryColour: '#1a1a27', 
      tertiaryColour: '#29adb8',       
      backdropBorderRadius: '4px'
    })       
  ],
  exports: [
    FilterReportComponent,
    DatepickerComponent,
    LoadingComponent,
    CategoryButtonsComponent,
    TimePeriodsComponent,
    ButtonOptionsComponent,
    PaginationComponent,
    ButtonLoaderComponent,
    PermissionDirective
  ]
})
export class ComponentsModule { }
