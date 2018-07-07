import { Component, OnInit } from '@angular/core';
import { BinanceService } from "../../services/binance.service"
import { ExchangeInfo, SymbolInfo } from "../../model/binance";

@Component({
  templateUrl: 'order.component.html'
})
export class OrderComponent implements OnInit {
  private exchangeInfo: ExchangeInfo;
  private currentSymbol: string;
  constructor(private binanceService: BinanceService) {}

  ngOnInit() {
    this.binanceService.getExchangeInfo()
      .subscribe(exchangeInfo => {
        this.exchangeInfo = exchangeInfo;
        this.currentSymbol = exchangeInfo.symbols[0].symbol;
      },
    err => {
        console.log(err);
    });
  }

  public setCurrentSymbol(symbolName)
  {
    this.currentSymbol = symbolName;
  }

}
