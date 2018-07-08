import {Injectable} from "@angular/core";
import {Http, RequestOptions, Response, Headers} from "@angular/http";
import {ExchangeInfo, Ticker} from "../model/binance";
import {Observable} from "rxjs";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import * as crypto from 'crypto-js';

@Injectable()
export class BinanceService {

  private apiUrl = '/api/';
  private apiKey = 'vmPUZE6mv9SD5VNHk4HlWFsOr6aKE2zvsw0MuIgwCIPy6utIco14y7Ju91duEh8A';
  private secretKey = 'NhqPtmdSJYdKjVHjA7PZj4Mge3R5YNiP1e3UZjInClVN65XAbvqqM6A7H5fATj0j';

  constructor(private http: Http) {
  }

  getExchangeInfo(): Observable<ExchangeInfo> {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json;charset=UTF-8');
    return this.http.get(this.apiUrl + 'v1/exchangeInfo', { headers })
      .map(response => response.json())
      .catch(BinanceService.handleError);
  }

  getTicker(symbol:string): Observable<Ticker> {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json;charset=UTF-8');
    return this.http.get(this.apiUrl + 'v3/ticker/price?symbol=' + symbol, { headers })
      .map(response => response.json())
      .catch(BinanceService.handleError);
  }

  orderLimit(symbol:string, side:string, quantity:number, price:number): Observable<Ticker> {
    let headers = new Headers();
    let objDate:number;
    let url:string;
    let parameters:string;
    let encryptedMsg:string;
    headers.append('Content-Type', 'application/json;charset=UTF-8');
    headers.append('X-MBX-APIKEY', this.apiKey);
    objDate = Date.now();
    url = this.apiUrl + 'v3/order/test?'
    parameters = 'symbol=' + symbol;
    parameters = parameters + '&side=' + side;
    parameters = parameters + '&type=' + 'LIMIT';
    parameters = parameters + '&quantity=' + quantity;
    parameters = parameters + '&timestamp=' + objDate;
    parameters = parameters + '&price=' + price;
    parameters = parameters + '&timeInForce=GTC';
    parameters = parameters + '&recvWindow=5000';
    encryptedMsg = crypto.HmacSHA256(parameters, this.secretKey);
    parameters = parameters + '&signature=' + encryptedMsg;

    console.log(url + parameters);
    return this.http.post(url + parameters, { headers })
      .map(response => response.json())
      .catch(BinanceService.handleError);
  }

  private static handleError(error: Response) {
    console.log("ERROR OCCURED:", error);
    return Observable.throw(error.statusText);
  }
}
