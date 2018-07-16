export class FilterInfo {
  filterType: string;
  minPrice: number;
  maxPrice: number;
  tickSize: number;
  minNotional: number;
}

export class OrderInfo {
  symbol: string;
  orderId: number;
  clientOrderId: string;
  price: number;
  origQty: number;
  executedQty: number;
  status: string;
  timeInForce: string;
  type: string;
  side: string;
  stopPrice: number;
  icebergQty: number;
  time: number;
  isWorking: string; //boolean??
}

export class SymbolInfo {
  symbol: string;
  status: string;
  baseAsset: string;
  baseAssetPrecision: number;
  quoteAsset: string;
  quotePrecision: number;
  orderTypes: string[];
  icebergAllowed: boolean;
  filters: FilterInfo[];
}

export class RateLimitInfo {
  rateLimitType: string;
  interval: string;
  limit: number;
}

export class ExchangeInfo {
  timezone: string;
  serverTime: number;
  rateLimits: RateLimitInfo[];
  exchangeFilters: FilterInfo[];
  symbols: SymbolInfo[];
}

export class Ticker {
  symbol: string;
  price: number;
}

export class BalanceInfo {
  asset: string;
  free: string;
  locked: string;
}

export class AccountInfo {
  makerCommission: number;
  takerCommission: number;
  buyerCommission: number;
  canTrade: boolean;
  canWithdraw: boolean;
  canDeposit: boolean;
  updateTime: number;
  balances: BalanceInfo[];
}
