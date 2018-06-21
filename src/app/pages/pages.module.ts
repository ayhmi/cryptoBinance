import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule}   from '@angular/forms';

import {PagesComponent} from './index';
import {routing} from "./pages.routing";
import {AuthGuard} from '../guards/index';

import {HeaderComponent} from './header/header.component';
import {NavigationComponent} from './navigation/navigation.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {ChartsComponent} from './charts/charts.component';
import {ProfileComponent} from './profile/profile.component';

import {UserReportService} from "../services/userreport.service";
import {UserFiltersService} from "../services/userfilters.service";
import {UserProfileService} from "../services/userprofile.service";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    routing
  ],
  declarations: [
    PagesComponent,
    DashboardComponent,
    ChartsComponent,
    ProfileComponent,
    HeaderComponent,
    NavigationComponent
  ],
  providers: [
    AuthGuard,
    UserReportService,
    UserFiltersService,
    UserProfileService
  ]
})
export class PagesModule {
}
