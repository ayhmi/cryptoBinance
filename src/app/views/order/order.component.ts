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
  private amount: number;
  private total: number;
  private stop: number;
  constructor(private binanceService: BinanceService) {}

  ngOnInit() {
    this.price = 0.0;
    this.amount = 0.0;
    this.total = 0.0;
    this.stop = 0.0;
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
        this.stop = this.price;
      },
    err => {
        console.log(err);
    });
  }

  public orderLimitBuy()
  {
    this.binanceService.orderLimit(this.currentSymbol, 'BUY', this.amount, this.price);
  }

  public orderLimitSell()
  {
    this.binanceService.orderLimit(this.currentSymbol, 'SELL', this.amount, this.price);
  }

  public orderMarketBuy()
  {
    this.binanceService.orderMarket(this.currentSymbol, 'BUY', this.amount);
  }

  public orderMarketSell()
  {
    this.binanceService.orderMarket(this.currentSymbol, 'SELL', this.amount);
  }

  public orderStopLimitBuy()
  {
    this.binanceService.orderStopLimit(this.currentSymbol, 'BUY', this.amount, this.stop, this.price);
  }

  public orderStopLimitSell()
  {
    this.binanceService.orderStopLimit(this.currentSymbol, 'SELL', this.amount, this.stop, this.price);
  }
}
