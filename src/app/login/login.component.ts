import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
 
import { AlertService, AuthenticationService } from '../services/index';
 
@Component({
    templateUrl: 'login.component.html',
  styleUrls: ['login.component.css']
})
 
export class LoginComponent implements OnInit {
    model: any = {};
    loading = false;
    returnUrl: string;
 
    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService) { }
 
    ngOnInit() {
        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }
 
//     login() {
//         this.loading = true;
//         this.authenticationService.login(this.model.username, this.model.password)
//             .subscribe(
//                 data => {
//                     // login successful so redirect to return url
//                     this.router.navigateByUrl(this.returnUrl);
//                     this.loading = false;
//                 },
//                 error => {
//                     // login failed so display error
//                     this.alertService.error(error);
//                     this.loading = false;
//                 });
//     }
 
    logout() {
        // reset login status
        this.authenticationService.logout();
    }
    loggedUser(): string {
        return this.authenticationService.loggedUser();
    }
}