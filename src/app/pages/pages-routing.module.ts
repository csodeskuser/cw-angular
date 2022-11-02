import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './_layout/layout.component';
import { ManualTimeComponent } from './manual-time/manual-time.component';
import { TimeSheetComponent } from './reports/time-sheet/time-sheet.component';
import { ApplicationsUseComponent } from './reports/applications-use/applications-use.component';
import { DailyProductivityComponent } from './reports/daily-productivity/daily-productivity.component';
import { ScreenshotsComponent } from './reports/screenshots/screenshots.component';
import { UserActivityComponent } from './reports/user-activity/user-activity.component';
import { WorkedTimeComponent } from './reports/worked-time/worked-time.component';
import { UsersComponent } from './users/users.component';
import { UserGroupsComponent } from './user-groups/user-groups.component';
import { SecuritySettingsComponent } from './security-settings/security-settings.component';
import { EnterprisesComponent } from './enterprises/enterprises.component';
import { ProfileComponent } from './profile/profile.component';
import { PasswordComponent } from './password/password.component';
import { PackageComponent } from './package/package.component';
import { LogCollectorComponent } from './log-collector/log-collector.component';
import { PermissionsComponent } from './permissions/permissions.component';  
import {CreatePermissionsComponent} from './create-permissions/create-permissions.component'; 
import {EditPermissionsComponent} from './edit-permissions/edit-permissions.component';
import { WindowTrackingComponent } from './window-tracking/window-tracking.component';
import { ApplicationsComponent } from './applications/applications.component';
import { RolesComponent } from './roles/roles.component';
//import { ApplicationGroupsComponent } from './application-groups/application-groups.component';
import { ClientConfigurationComponent } from './client-configuration/client-configuration.component';
import { ModulesComponent } from './modules/modules.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: '**', redirectTo: 'error/404' },  
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'manual-time',
        component: ManualTimeComponent
      },
      {
        path: 'time-sheet',
        component: TimeSheetComponent
      },
      {
        path: 'application-use',
        component: ApplicationsUseComponent
      },
      {
        path: 'daily-productivity',
        component: DailyProductivityComponent
      },
      {
        path: 'screenshots',
        component: ScreenshotsComponent
      },
      {
        path: 'user-activity',
        component: UserActivityComponent
      },
      {
        path: 'worked-time',
        component: WorkedTimeComponent
      }, 
      {
        path: 'users',
        component: UsersComponent
      },
      {
        path: 'user-groups',
        component: UserGroupsComponent
      },  
      {
        path: 'security-settings',
        component: SecuritySettingsComponent
      },
      {
        path: 'enterprises',
        component: EnterprisesComponent
      },       
      {
        path: 'profile',
        component: ProfileComponent
      },
      {
        path: 'password',
        component: PasswordComponent
      },
      {
        path: 'package',
        component: PackageComponent
      },   
      {
        path: 'collector',
        component: LogCollectorComponent
      },    
      {
        path: 'permissions',
        component: PermissionsComponent
      },                
      {
        path: 'create-permissions',
        component: CreatePermissionsComponent
      },             
      {
        path: 'edit-permissions/:id',
        component: EditPermissionsComponent
      },                                                       
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
      },
      {
        path: 'builder',
        loadChildren: () =>
          import('./builder/builder.module').then((m) => m.BuilderModule),
      },
      {
        path: 'ecommerce',
        loadChildren: () =>
          import('../modules/e-commerce/e-commerce.module').then(
            (m) => m.ECommerceModule
          ),
      },
      {
        path: 'user-management',
        loadChildren: () =>
          import('../modules/user-management/user-management.module').then(
            (m) => m.UserManagementModule
          ),
      },
      {
        path: 'user-profile',
        loadChildren: () =>
          import('../modules/user-profile/user-profile.module').then(
            (m) => m.UserProfileModule
          ),
      },
      {
        path: 'ngbootstrap',
        loadChildren: () =>
          import('../modules/ngbootstrap/ngbootstrap.module').then(
            (m) => m.NgbootstrapModule
          ),
      },
      {
        path: 'wizards',
        loadChildren: () =>
          import('../modules/wizards/wizards.module').then(
            (m) => m.WizardsModule
          ),
      },
      {
        path: 'material',
        loadChildren: () =>
          import('../modules/material/material.module').then(
            (m) => m.MaterialModule
          ),
      },
      {
        path: 'window_tracking',
        component: WindowTrackingComponent
      },
      {
        path: 'applications',
        component: ApplicationsComponent
      },
      {
        path: 'roles',
        component: RolesComponent
      },
      // {
      //   path: 'application-groups',
      //   component: ApplicationGroupsComponent
      // },
      {
        path: 'client-configuration',
        component: ClientConfigurationComponent
      },
      {
        path: 'modules',
        component: ModulesComponent
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule { }
