import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {AppComponent} from "./app.component";
// 2nd level component is pages
import {PagesModule} from "./pages/pages.module";
import {routing} from "./app.routing";
import { AuthenticationService, AlertService } from './services/index';
import { LoginComponent } from './login/index';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    PagesModule,
    routing
  ],
  providers: [
    AuthenticationService,
    AlertService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
