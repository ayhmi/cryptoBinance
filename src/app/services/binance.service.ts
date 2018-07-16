import {Injectable} from "@angular/core";
import {Http, RequestOptions, Response, Headers} from "@angular/http";
import {ExchangeInfo, Ticker, AccountInfo, OrderInfo} from "../model/binance";
import {Observable} from "rxjs";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import * as crypto from 'crypto-js'
@Injectable()
export class BinanceService {
  private apiGiven:boolean = false;
  private apiUrl = '/api/';
  private apiKey = '';
  private secretKey = '';

  constructor(private http: Http) {
  }

  getExchangeInfo(): Observable<ExchangeInfo> {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json;charset=UTF-8');
    return this.http.get(this.apiUrl + 'v1/exchangeInfo', { headers })
      .map(response => response.json())
      .catch(BinanceService.handleError);
  }

  getOrderInfo(): Observable<OrderInfo>{
    let headers = new Headers();
    let objDate:number;
    let url:string;
    let parameters:string;
    let encryptedMsg:string;

    headers.append('Content-Type', 'application/json;charset=UTF-8');
    headers.append('X-MBX-APIKEY', this.apiKey);
    objDate = Date.now();
    url = this.apiUrl + 'v3/openOrders?'
    parameters = 'timestamp=' + objDate;
    parameters = parameters + '&recvWindow=5000';
    encryptedMsg = crypto.HmacSHA256(parameters, this.secretKey);
    parameters = parameters + '&signature=' + encryptedMsg;
    console.log(url + parameters);
    return this.http.get(url + parameters, { headers })
      .map(response => response.json())
      .catch(BinanceService.handleError);
  }

  cancelSingleOrder(symbol:string, orderId:number): Observable<{}> {
    let headers = new Headers();
    let objDate:number;
    let url:string;
    let parameters:string;
    let encryptedMsg:string;
    headers.append('Content-Type', 'application/json;charset=UTF-8');
    headers.append('X-MBX-APIKEY', this.apiKey);
    objDate = Date.now();
    url = this.apiUrl + 'v3/order?'
    parameters = 'timestamp=' + objDate;
    parameters = parameters + '&symbol='+symbol;
    parameters = parameters + '&orderId='+orderId;
    encryptedMsg = crypto.HmacSHA256(parameters, this.secretKey);
    parameters = parameters + '&signature=' + encryptedMsg;
    console.log(url + parameters);
    return this.http.delete(url + parameters, { headers })
      .map(response => response.json())
  }

  getTicker(symbol:string): Observable<Ticker> {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json;charset=UTF-8');
    return this.http.get(this.apiUrl + 'v3/ticker/price?symbol=' + symbol, { headers })
      .map(response => response.json())
      .catch(BinanceService.handleError);
  }

  setApiKey(apiKey:string, secretKey:string): void {
    this.apiKey = apiKey;
    this.secretKey = secretKey;
    this.apiGiven = true;
  }

  resetApiKey(): void {
    this.apiKey = '';
    this.secretKey = '';
    this.apiGiven = false;
  }

  account(): Observable<AccountInfo> {
    let headers = new Headers();
    let objDate:number;
    let url:string;
    let parameters:string;
    let encryptedMsg:string;
    headers.append('Content-Type', 'application/json;charset=UTF-8');
    headers.append('X-MBX-APIKEY', this.apiKey);
    objDate = Date.now();
    url = this.apiUrl + 'v3/account?'
    parameters = 'timestamp=' + objDate;
    parameters = parameters + '&recvWindow=5000';
    encryptedMsg = crypto.HmacSHA256(parameters, this.secretKey);
    parameters = parameters + '&signature=' + encryptedMsg;
    console.log(url + parameters);
    return this.http.get(url + parameters, { headers })
      .map(response => response.json())
      .catch(BinanceService.handleError);
  }

  orderLimit(symbol:string, side:string, quantity:number, price:number): void {
    //if (this.apiGiven == true)
    {
      let headers = new Headers();
      let objDate:number;
      let url:string;
      let parameters:string;
      let encryptedMsg:string;
      headers.append('Content-Type', 'application/json;charset=UTF-8');
      headers.append('X-MBX-APIKEY', this.apiKey);
      objDate = Date.now();
      url = this.apiUrl + 'v3/order?'
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
      this.http.post(url + parameters, '', { headers }).toPromise()
        .then(response => response.json())
        .catch(BinanceService.handleError);
      }
  }

  orderMarket(symbol:string, side:string, quantity:number): void {
    if (this.apiGiven == true)
    {
      let headers = new Headers();
      let objDate:number;
      let url:string;
      let parameters:string;
      let encryptedMsg:string;
      headers.append('Content-Type', 'application/json;charset=UTF-8');
      headers.append('X-MBX-APIKEY', this.apiKey);
      objDate = Date.now();
      url = this.apiUrl + 'v3/order?'
      parameters = 'symbol=' + symbol;
      parameters = parameters + '&side=' + side;
      parameters = parameters + '&type=' + 'MARKET';
      parameters = parameters + '&quantity=' + quantity;
      parameters = parameters + '&timestamp=' + objDate;
      parameters = parameters + '&recvWindow=5000';
      encryptedMsg = crypto.HmacSHA256(parameters, this.secretKey);
      parameters = parameters + '&signature=' + encryptedMsg;

      console.log(url + parameters);
      this.http.post(url + parameters, { headers }).toPromise()
        .then(response => response.json())
        .catch(BinanceService.handleError);
      }
  }

  orderStopLimit(symbol:string, side:string, quantity:number, stopPrice:number, price:number): void {
    if (this.apiGiven == true)
    {
      let headers = new Headers();
      let objDate:number;
      let url:string;
      let parameters:string;
      let encryptedMsg:string;
      headers.append('Content-Type', 'application/json;charset=UTF-8');
      headers.append('X-MBX-APIKEY', this.apiKey);
      objDate = Date.now();
      url = this.apiUrl + 'v3/order?'
      parameters = 'symbol=' + symbol;
      parameters = parameters + '&side=' + side;
      parameters = parameters + '&type=' + 'STOP_LOSS_LIMIT';
      parameters = parameters + '&quantity=' + quantity;
      parameters = parameters + '&timestamp=' + objDate;
      parameters = parameters + '&price=' + price;
      parameters = parameters + '&stopPrice=' + stopPrice;
      parameters = parameters + '&recvWindow=5000';
      encryptedMsg = crypto.HmacSHA256(parameters, this.secretKey);
      parameters = parameters + '&signature=' + encryptedMsg;

      console.log(url + parameters);
      this.http.post(url + parameters, { headers }).toPromise()
        .then(response => response.json())
        .catch(BinanceService.handleError);
      }
  }

  private static handleError(error: Response) {
    console.log("ERROR OCCURED:", error);
    return Observable.throw(error.statusText);
  }
}
