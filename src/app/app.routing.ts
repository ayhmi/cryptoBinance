import {Routes, RouterModule, CanActivate} from "@angular/router";
import {ModuleWithProviders} from "@angular/core";
import {LoginComponent} from './login/index';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  // otherwise redirect to home
  { path: '**', redirectTo: 'pages' }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes, {useHash: true});
