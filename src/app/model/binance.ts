export class FilterInfo {
  filterType: string;
  minPrice: number;
  maxPrice: number;
  tickSize: number;
  minNotional: number;
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
