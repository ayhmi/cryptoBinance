import { Component, OnInit } from '@angular/core';
import { Input, Output, EventEmitter } from '@angular/core';
import { AccountInfo, OrderInfo } from "../../../model/binance";


@Component({
  selector: 'app-amount-buttons',
  templateUrl: './amount-buttons.component.html',
  styleUrls: ['./amount-buttons.component.scss']
})
export class AmountButtonsComponent implements OnInit {
  @Input() symbo: string;
  @Input() acc: AccountInfo;
  @Input() amnt: number;
  @Output() amntChange = new EventEmitter<number>();
  constructor() { }

  ngOnInit() {
  }

  setPercentageAmount(perctg, symbo) {
    this.acc.balances.forEach(
      function(e) {
        if (`${e.asset}BTC` === symbo) {
          let newAmount = parseFloat(e.free) * perctg;
          console.log(e);
          this.amntChange.emit(newAmount);
        }
      }.bind(this)
    )
  }
}
