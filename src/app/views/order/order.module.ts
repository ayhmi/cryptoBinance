import { NgModule } from '@angular/core';

import { OrderComponent } from './order.component';
import { OrderRoutingModule } from './order-routing.module';

import {CommonModule} from '@angular/common';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AmountButtonsComponent } from './amount-buttons/amount-buttons.component';

@NgModule({
  imports: [
    OrderRoutingModule,
    CommonModule,
    TabsModule,
    FormsModule
  ],
  declarations: [ OrderComponent, AmountButtonsComponent ]
})
export class OrderModule { }
