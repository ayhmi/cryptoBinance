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
