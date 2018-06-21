import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/index';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {

  constructor(
        private router: Router,
        private authenticationService: AuthenticationService) { }

  ngOnInit() {
    }

    logout() {
        // reset login status
        this.authenticationService.logout();
        this.router.navigate(['/login']);
    }
    loggedUser(): string {
        return this.authenticationService.loggedUser();
    }
}
