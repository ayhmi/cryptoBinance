import { Component, OnInit } from '@angular/core';
import { BinanceService } from "../../services/binance.service"
import { AccountInfo } from "../../model/binance";

@Component({
  templateUrl: 'account.component.html'
})
export class AccountComponent implements OnInit {
  accountInfo: AccountInfo;
  apiKey: string;
  secretKey: string;
  constructor(private binanceService: BinanceService) {}

  ngOnInit() {
    this.binanceService.account()
      .subscribe(accountInfo => {
        this.accountInfo = accountInfo;
      },
    err => {
      //console.log(err);
    });
  }
  setApiKey(): void {
    this.binanceService.setApiKey(this.apiKey, this.secretKey);
    this.binanceService.account()
      .subscribe(accountInfo => {
        this.accountInfo = accountInfo;
      },
    err => {
      //console.log(err);
    });
  }
  
  resetApiKey(): void {
    this.binanceService.resetApiKey();
  }
}
