import { Component, OnInit } from '@angular/core';
import { BinanceService } from "../../services/binance.service"
import { ExchangeInfo } from "../../model/binance";

@Component({
  templateUrl: 'order.component.html'
})
export class OrderComponent implements OnInit {
  private exchangeInfo: ExchangeInfo;
  constructor(private binanceService: BinanceService) {}

  ngOnInit() {
    this.binanceService.getExchangeInfo()
      .subscribe(exchangeInfo => {this.exchangeInfo = exchangeInfo; },
    err => {
        console.log(err);
    });
  }
}
