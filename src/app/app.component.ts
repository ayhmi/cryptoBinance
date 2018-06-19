import { Component, OnInit } from '@angular/core';

const Binance = require('node-binance-api');
const binance = new Binance().options({
  APIKEY: '<key>',
  APISECRET: '<secret>',
  useServerTime: true, // If you get timestamp errors, synchronize to server time at startup
  test: true // If you want to use sandbox mode where orders are simulated
});

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
    binance.prices((error, ticker) => {
      console.log("prices()", ticker);
      console.log("Price of BTC: ", ticker.BTCUSDT);
    });
 }
}
