import { NgModule } from '@angular/core';

import { OrderComponent } from './order.component';
import { OrderRoutingModule } from './order-routing.module';

import {CommonModule} from '@angular/common';
import { TabsModule } from 'ngx-bootstrap/tabs';

@NgModule({
  imports: [
    OrderRoutingModule,
    CommonModule,
    TabsModule,
  ],
  declarations: [ OrderComponent ]
})
export class OrderModule { }
