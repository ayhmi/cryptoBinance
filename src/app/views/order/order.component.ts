import { Component, OnInit } from '@angular/core';
import { BinanceService } from "../../services/binance.service"
import { ExchangeInfo, SymbolInfo } from "../../model/binance";

@Component({
  templateUrl: 'order.component.html'
})
export class OrderComponent implements OnInit {
  private exchangeInfo: ExchangeInfo;
  private currentSymbol: string;
  private price: number;
  constructor(private binanceService: BinanceService) {}

  ngOnInit() {
    this.price = 0.0;
    this.binanceService.getExchangeInfo()
      .subscribe(exchangeInfo => {
        this.exchangeInfo = exchangeInfo;
        this.currentSymbol = exchangeInfo.symbols[0].symbol;
        this.updatePrice();
      },
    err => {
        console.log(err);
    });
  }

  public setCurrentSymbol(symbolName)
  {
    this.currentSymbol = symbolName;
    this.updatePrice();
  }

  public updatePrice()
  {
    this.binanceService.getTicker(this.currentSymbol)
      .subscribe(ticker => {
        this.price = ticker.price;
      },
    err => {
        console.log(err);
    });
  }
}
