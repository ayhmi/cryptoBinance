import { NgModule } from '@angular/core';

import { OrderComponent } from './order.component';
import { OrderRoutingModule } from './order-routing.module';

import {CommonModule} from '@angular/common';

@NgModule({
  imports: [
    OrderRoutingModule,
    CommonModule
  ],
  declarations: [ OrderComponent ]
})
export class OrderModule { }
