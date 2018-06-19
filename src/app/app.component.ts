import { Component, OnInit } from '@angular/core';
import { Symbol, ExchangeInfo, BinanceApiClient } from 'binance-api-client';

const binanceClient = new BinanceApiClient("", "");

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  symbols: Symbol[];
   
  title = 'CryptoBinance';

  ngOnInit() {
    console.log('Hello world!');
    binanceClient.getExchangeInfo().then((response:ExchangeInfo) => this.symbols = response.symbols);
 }
}
