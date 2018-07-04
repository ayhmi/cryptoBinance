import {Injectable} from "@angular/core";
import {Http, RequestOptions, Response, Headers} from "@angular/http";
import {ExchangeInfo} from "../model/binance";
import {Observable} from "rxjs";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class BinanceService {

  private apiUrl = '/api/v1/';

  constructor(private http: Http) {
  }

  getExchangeInfo(): Observable<ExchangeInfo> {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json;charset=UTF-8');
    return this.http.get(this.apiUrl + 'exchangeInfo', { headers })
      .map(response => response.json())
      .catch(BinanceService.handleError);
  }

  private static handleError(error: Response) {
    console.log("ERROR OCCURED:", error);
    return Observable.throw(error.statusText);
  }
}
