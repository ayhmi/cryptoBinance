import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule}   from '@angular/forms';

import {PagesComponent} from './index';
import {routing} from "./pages.routing";
import {AuthGuard} from '../guards/index';

import {HeaderComponent} from './header/header.component';
import {NavigationComponent} from './navigation/navigation.component';
import {OrderComponent} from './order/order.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    routing
  ],
  declarations: [
    PagesComponent,
    OrderComponent,
    HeaderComponent,
    NavigationComponent
  ],
  providers: [
    AuthGuard
  ]
})
export class PagesModule {
}
