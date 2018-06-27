import { NgModule } from '@angular/core';

import { OrderComponent } from './order.component';
import { OrderRoutingModule } from './order-routing.module';

@NgModule({
  imports: [
    OrderRoutingModule
  ],
  declarations: [ OrderComponent ]
})
export class OrderModule { }
