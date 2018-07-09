import { NgModule } from '@angular/core';

import { AccountComponent } from './account.component';
import { AccountRoutingModule } from './account-routing.module';

import {CommonModule} from '@angular/common';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    AccountRoutingModule,
    CommonModule,
    TabsModule,
    FormsModule
  ],
  declarations: [ AccountComponent ]
})
export class AccountModule { }
