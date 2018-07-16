import { Component, OnInit } from '@angular/core';
import { BinanceService } from "../../services/binance.service"
import { ExchangeInfo, SymbolInfo, OrderInfo } from "../../model/binance";

var trashIcon = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAHGSURBVDhPrVXNSgJRGL1B9SQVbaLCBxAdlcrRjbrwZytu1XkHXRrYI/gIZW40hNTCP4rUTWbQqKCrslBsYffoTI12tTE8cPDyfd89XL/7nTtkER4cjs1ro/Egp9OdgDc63X5Bo9mQ0uqRMZl2SxZL4s5ma9S93q4YCAzAR7pGDLlbjtuRyudjRMha0Ww+q7rd7ddQaNSPRJhEruZytQo8H8Ueafs0xmI8nxCDwXeWCItNQehR0UumaJ6eTBSED9bGRWwGgxCNSjIToGc1j6fN2qCGFY+nlTMYtiU5QspWa/wtHJ4qGsRio2EyORUDEUNOGUNPyxZLfCyGMbi32xvKAnCYSo2Az3T6O4Y1gJyyFsTtj0cqw3GHTz5fd7YAlAXwq1yzajFSmFOS0+uPXwKBPqsIlIWAeWIgNKC1UsEsxx0RWKu+yr+MRtKGPs8W/PtSgCIdm1mrLTs2RXlsABgd3lQWLcOK09nKarVbktwEsA+1kWofy6SvUI++AaeSzA9gcBhd9PtVi0KsxPPnC18cnLTqcv35fKEmT082V0wJ9APexM3RcehgxkD62HYQoxdw8atnanCl1a7TYd2TPwFYIyalGSDkC/PmcxffPnpJAAAAAElFTkSuQmCC";
var sellbase64 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAEwSURBVDhPvdS7SgNRFEbh0UQFI4ogiKWdCAFBH8ALWCgBWystbDTETrCx8YKVoI3Y2HgBsbEQkoCNVongpRDLvIvr39tgMhgcZyALPtjnQELmzEyCdpdCAQ+4wjgStYNTjCKHJ8wido/o99Eaw6WP8Spj0Ecri3Mf41XBgI/WBG58jNcadI71LpDoDHvwCl32JEpIlG5IFcOYxh268e+6cAD9umVtfLeFd+TRoY2oHWIXaVs11ws95Cu2itg93vDSwgeOELkZDPlo6YEe8dHSmzPl499t4gyNZ7SNRR8t3Rjd8QVbtUgHrbuoB1d/Co2Fv1BloFfzFkvaCFfDNeZs1dxvX6g2cIxnW4VaxT46bfVT/fL0wXB6Tk8wb6uI6Q0p4hN92kiaznMP67Zqb0HwBaNZLhYkygg2AAAAAElFTkSuQmCC";
var buybase64 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAEhSURBVDhP1dOhS4NBHMbxd860pmkmLYLFYDHKgmlxgqBF/wKxCOuGwdLSXLAoE+0uTNSylYEmi9kq2BwoCu77vO8Ojntvx6sg4gMfdvfb3Y/3bnuj38giLsYqKkzIKvaTYTjzaOESH1iAL1U8JMNsyeMFe/EsnW83VM5wlQxT+VHDbbzj2uMQW07N6GIZqcziE18eNWiT7zspw5s+7IVv40+7oU7hrinAG92Vu7AB0/ARcziFWXeLiXGPpWZTUL0INVvDK8waPUQwT3Cb5qC4zWQFwTRhb5AjbGJo1eQZOkEw67A3hRwjUw4wwH3ACWbwN9Gv2cM5plWwsgu9hhvxLGN2YO5pSQUrd1D9Jp5ljO6mjTrMX8ZEr1kHpXj2jxJFI81ocDY4x4CbAAAAAElFTkSuQmCC";

@Component({
  templateUrl: 'order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  exchangeInfo: ExchangeInfo;
  orderInfo: OrderInfo;
  currentSymbol: string;
  price: number;
  amount: number;
  total: number;
  stop: number;
  sellPNG: string;
  buyPNG: string;
  trashIcon: string;
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
    this.updateOrderList();
    this.sellPNG = sellbase64;
    this.buyPNG =  buybase64;
    this.trashIcon =  trashIcon;
  }

  puclic updateOrderList() {
    this.binanceService.getOrderInfo()
      .subscribe(orderInfo => {
        this.orderInfo = orderInfo;
      },
    err => {
        console.log(err);
    });
  }

  public setCurrentSymbol(symbolName) {
    symbolName = symbolName.split(' ')
    console.log(symbolName[symbolName.length - 1])
    this.currentSymbol = symbolName[symbolName.length - 1];
    this.updatePrice();
  }

  public cancelSingleOrder(symbol, orderId) {
    this.binanceService.cancelSingleOrder(symbol, orderId)
      .subscribe(resp => {
        this.updateOrderList()
        console.log(resp)
      });
  }

  public updatePrice() {
    this.binanceService.getTicker(this.currentSymbol)
      .subscribe(ticker => {
        this.price = ticker.price;
        this.stop = this.price;
      },
    err => {
        console.log(err);
    });
  }

  public orderLimitBuy() {
    this.binanceService.orderLimit(this.currentSymbol, 'BUY', this.amount, this.price);
  }

  public orderLimitSell() {
    this.binanceService.orderLimit(this.currentSymbol, 'SELL', this.amount, this.price);
  }

  public orderMarketBuy() {
    this.binanceService.orderMarket(this.currentSymbol, 'BUY', this.amount);
  }

  public orderMarketSell() {
    this.binanceService.orderMarket(this.currentSymbol, 'SELL', this.amount);
  }

  public orderStopLimitBuy() {
    this.binanceService.orderStopLimit(this.currentSymbol, 'BUY', this.amount, this.stop, this.price);
  }

  public orderStopLimitSell() {
    this.binanceService.orderStopLimit(this.currentSymbol, 'SELL', this.amount, this.stop, this.price);
  }
}
