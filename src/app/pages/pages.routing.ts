import {Routes, RouterModule} from "@angular/router";
import {PagesComponent} from "./pages.component";
import {ModuleWithProviders} from "@angular/core";
import {AuthGuard} from '../guards/index';
import {DashboardComponent} from './dashboard/dashboard.component'
import {ChartsComponent} from './charts/charts.component'
import {ProfileComponent} from './profile/profile.component'

export const routes: Routes = [
  {
    path: 'pages',
    component: PagesComponent,
    canActivate: [AuthGuard],
    children: [
      {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
      {path: 'dashboard', component: DashboardComponent},
      {path: 'charts', component: ChartsComponent},
      {path: 'profile', component: ProfileComponent},
      {path: 'product', loadChildren: 'app/pages/product/product.module#ProductModule'}
    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);

