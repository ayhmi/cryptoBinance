import {Routes, RouterModule} from "@angular/router";
import {PagesComponent} from "./pages.component";
import {ModuleWithProviders} from "@angular/core";
import {AuthGuard} from '../guards/index';
import {OrderComponent} from './order/order.component';

export const routes: Routes = [
  {
    path: 'pages',
    component: PagesComponent,
    canActivate: [AuthGuard],
    children: [
      {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
      {path: 'order', component: OrderComponent}
    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);

