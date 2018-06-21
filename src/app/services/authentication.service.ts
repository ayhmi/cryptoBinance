import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable, Subscription, timer } from 'rxjs';
import { Router } from '@angular/router';
import { GlobalVariable } from '../shared/globals';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthenticationService {
    public token: string;
    public expireDate: number;
    private authenticationUrl = GlobalVariable.BASE_API_URL + 'api/token';
    private timer;
    private sub: Subscription;
    constructor(private http: Http, private router: Router) {
        // set token if saved in local storage
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.token = currentUser && currentUser.token;
    }

    login(username: string, password: string): Observable<boolean> {
        var content = "username="+username+"&"+"password="+password;
        var headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        var response = this.http.post(this.authenticationUrl, content, { headers: headers })
        .map((response: Response) => {
            let token = response.json() && response.json().access_token;
            let expireSeconds = response.json() && response.json().expires_in;
            
            if (token)
            {
                // set token property
                this.token = token;
                this.expireDate = Date.now() + expireSeconds*1000;

                // store username and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentUser', JSON.stringify({ username: username, token: token, expire: this.expireDate }));

                this.logoutTimerInit();

                // return true to indicate successful login
                return true;
            } else {
                // return false to indicate failed login
                return false;
            }
        })
        .catch(AuthenticationService.handleError);

    return response;
  }

  private static handleError(error: Response) {
    console.log("ERROR OCCURED:" + error.statusText);
    return Observable.throw(error.statusText);
  }
  createAuthorizationHeader(headers:Headers) {
    headers.append('Authorization', 'Bearer ' + this.token); 
  }
  
    logout(): void {
        // clear token remove user from local storage to log user out
        this.token = null;
        localStorage.removeItem('currentUser');
        this.sub.unsubscribe();
        this.timer = null;
        this.router.navigate(['/login']);
    }
    
    loggedUser(): string {
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser)
        {
            var username = currentUser && currentUser.username;
            // check if authentication timed out
            var expire = currentUser && currentUser.expire;
            var now = Date.now();
            if (now > expire)
            {
                this.logout();
                return null;
            }
            else
            {
                this.logoutTimerInit();
                return username;
            }
        }
    }

    logoutTimerInit() {
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        var expire = currentUser && currentUser.expire;
        var now = Date.now();
        if (now < expire && !this.timer)
        {
            this.timer = timer(expire - now);
            this.sub = this.timer.subscribe(() => this.logout());
        }
    }
}