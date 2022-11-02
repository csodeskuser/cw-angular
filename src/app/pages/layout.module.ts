import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InlineSVGModule } from 'ng-inline-svg';
import { PagesRoutingModule } from './pages-routing.module';
import {
  NgbDropdownModule,
  NgbProgressbarModule,
  NgbModule,
} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslationModule } from '../modules/i18n/translation.module';
import { ConfirmationPopoverModule } from 'angular-confirmation-popover';
import { DataTablesModule } from "angular-datatables";

import { LayoutComponent } from './_layout/layout.component';
import { ScriptsInitComponent } from './_layout/init/scipts-init/scripts-init.component';
import { HeaderMobileComponent } from './_layout/components/header-mobile/header-mobile.component';
import { AsideComponent } from './_layout/components/aside/aside.component';
import { FooterComponent } from './_layout/components/footer/footer.component';
import { HeaderComponent } from './_layout/components/header/header.component';
import { HeaderMenuComponent } from './_layout/components/header/header-menu/header-menu.component';
import { TopbarComponent } from './_layout/components/topbar/topbar.component';
import { ExtrasModule } from '../_metronic/partials/layout/extras/extras.module';
import { LanguageSelectorComponent } from './_layout/components/topbar/language-selector/language-selector.component';
import { CoreModule } from '../_metronic/core';
import { SubheaderModule } from '../_metronic/partials/layout/subheader/subheader.module';
import { AsideDynamicComponent } from './_layout/components/aside-dynamic/aside-dynamic.component';
import { HeaderMenuDynamicComponent } from './_layout/components/header/header-menu-dynamic/header-menu-dynamic.component';
import { SettingsComponent } from './_layout/components/topbar/settings/settings.component';
import { NotificationsComponent } from './_layout/components/topbar/notifications/notifications.component';
import { ManualTimeComponent } from './manual-time/manual-time.component';
import { TimeSheetComponent } from './reports/time-sheet/time-sheet.component';
import { UserActivityComponent } from './reports/user-activity/user-activity.component';
import { DailyProductivityComponent } from './reports/daily-productivity/daily-productivity.component';
import { ApplicationsUseComponent } from './reports/applications-use/applications-use.component';
import { WorkedTimeComponent } from './reports/worked-time/worked-time.component';
import { ScreenshotsComponent } from './reports/screenshots/screenshots.component';
import { ComponentsModule } from '../components/components.module';
import { HighchartsChartModule } from 'highcharts-angular';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { FlatpickrModule } from 'angularx-flatpickr';
//import { TranslateModule } from '@ngx-translate/core';
import { AddManualTimeComponent } from './manual-time/add-manual-time/add-manual-time.component';
//import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { NgSelectModule } from '@ng-select/ng-select';
import { UsersComponent } from './users/users.component';
import { UserGroupsComponent } from './user-groups/user-groups.component';
import { SecuritySettingsComponent } from './security-settings/security-settings.component';
import { EnterprisesComponent } from './enterprises/enterprises.component';
import { UserComponent } from './_layout/components/topbar/user/user.component';
import { PasswordComponent } from './password/password.component';
import { PackageComponent } from './package/package.component';
import { ProfileComponent } from './profile/profile.component';
import { NgxUploadModule } from '@wkoza/ngx-upload';
import { LogCollectorComponent } from './log-collector/log-collector.component';
import { PermissionsComponent } from './permissions/permissions.component';
import { CreatePermissionsComponent } from './create-permissions/create-permissions.component';
import { EditPermissionsComponent } from './edit-permissions/edit-permissions.component';
import { WindowTrackingComponent } from './window-tracking/window-tracking.component';
import { ApplicationsComponent } from './applications/applications.component';
import { RolesComponent } from './roles/roles.component';
//import { ApplicationGroupsComponent } from './application-groups/application-groups.component';
import { ClientConfigurationComponent } from './client-configuration/client-configuration.component';
import { ModulesComponent } from './modules/modules.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSliderModule } from '@angular/material/slider';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatTreeModule } from '@angular/material/tree';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatChipsModule } from '@angular/material/chips';
import { MatStepperModule } from '@angular/material/stepper';
import { MatSortModule } from '@angular/material/sort';
import { MatToolbarModule } from '@angular/material/toolbar';
import {
  MatBottomSheetModule,
  MatBottomSheetRef,
  MAT_BOTTOM_SHEET_DATA,
} from '@angular/material/bottom-sheet';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDividerModule } from '@angular/material/divider';
import { MatRadioModule } from '@angular/material/radio';
import { RouterModule, Routes } from '@angular/router';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {
  MatRippleModule,
  MatNativeDateModule,
  MAT_DATE_LOCALE,
} from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconRegistry, MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {DragDropModule} from '@angular/cdk/drag-drop';



@NgModule({
  declarations: [
    LayoutComponent,
    ScriptsInitComponent,
    HeaderMobileComponent,
    AsideComponent,
    FooterComponent,
    HeaderComponent,
    HeaderMenuComponent,
    TopbarComponent,
    LanguageSelectorComponent,
    AsideDynamicComponent,
    HeaderMenuDynamicComponent,
    SettingsComponent,
    NotificationsComponent,
    ProfileComponent,
    ManualTimeComponent,
    TimeSheetComponent,
    UserActivityComponent,
    DailyProductivityComponent,
    ApplicationsUseComponent,
    WorkedTimeComponent,
    ScreenshotsComponent,
    AddManualTimeComponent,
    UsersComponent,
    UserGroupsComponent,
    SecuritySettingsComponent,
    EnterprisesComponent,
    UserComponent,
    PasswordComponent,
    PackageComponent,
    LogCollectorComponent,
    PermissionsComponent,
    CreatePermissionsComponent,
    EditPermissionsComponent,
    WindowTrackingComponent,
    ApplicationsComponent,
    RolesComponent,
   // ApplicationGroupsComponent,
    ClientConfigurationComponent,
    ModulesComponent,
  ],
  imports: [
    CommonModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    PagesRoutingModule,
    TranslationModule,
    InlineSVGModule,
    ExtrasModule,
    NgbDropdownModule,
    NgbProgressbarModule,
    CoreModule,
    SubheaderModule,
    ComponentsModule,
    HighchartsChartModule,
    FlatpickrModule.forRoot(),
    NgSelectModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }), 
    //BrowserAnimationsModule,
    ToastrModule.forRoot(), // ToastrModule added 
    ConfirmationPopoverModule.forRoot(),
    DataTablesModule ,
    NgxUploadModule,
    MatInputModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatSelectModule,
    CommonModule,
    MatAutocompleteModule,
    MatListModule,
    MatSliderModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatNativeDateModule,
    MatSlideToggleModule,
    MatCheckboxModule,
    MatMenuModule,
    MatTabsModule,
    MatTooltipModule,
    MatSidenavModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatTableModule,
    MatGridListModule,
    MatToolbarModule,
    MatBottomSheetModule,
    MatExpansionModule,
    MatDividerModule,
    MatSortModule,
    MatStepperModule,
    MatChipsModule,
    MatPaginatorModule,
    MatDialogModule,
    MatRippleModule,
    CoreModule,
    MatRadioModule,
    MatTreeModule,
    MatButtonToggleModule,
    FormsModule,
    ReactiveFormsModule,
    DragDropModule
  ],
  exports: [
    //TranslateModule
  ],
  

})
export class LayoutModule { }
