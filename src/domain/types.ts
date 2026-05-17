export type Currency = "TWD" | "USD";
export type AssetLayerId = "L1" | "L2" | "L3" | "L4";
export type AllocationBucket = "cash" | "etf" | "crypto";

export interface Money {
  amount: number;
  currency: Currency;
}

export interface ExchangeRates {
  USD_TWD: number;
  USDT_TWD: number;
}

export interface AccountBalance {
  name: string;
  amount: number;
  currency: Currency;
  spendable: boolean;
  note?: string;
}

export interface EtfPosition {
  symbol: "QQQ" | "0050";
  shares: number;
  cost: Money;
  marketValue: Money;
  core: boolean;
}

export interface CryptoHolding {
  symbol: "BTC" | "ETH" | "ADA" | "OP" | "USDT";
  account: "Binance" | "Pionex" | "OKX";
  valueTwd: number;
  isPrimary: boolean;
}

export interface MonthlyExpense {
  label: string;
  amountTwd: number;
  fixed: boolean;
}

export interface UserProfile {
  birthDate: string;
  monthlyNetSalaryTwd: number;
  salaryDay: number;
}

export interface PlanSnapshot {
  asOf: string;
  exchangeRates: ExchangeRates;
  profile: UserProfile;
  l1: AccountBalance[];
  l2: AccountBalance[];
  l3Cash: AccountBalance[];
  etfs: EtfPosition[];
  crypto: CryptoHolding[];
  pionexTwd: number;
  expenses: MonthlyExpense[];
  targetAllocation: Record<AllocationBucket, number>;
}

export interface AllocationDatum {
  bucket: AllocationBucket;
  label: string;
  valueTwd: number;
  currentPct: number;
  targetPct: number;
  gapTwd: number;
}

export interface RuleCheck {
  id: string;
  label: string;
  status: "safe" | "watch" | "danger";
  detail: string;
}

export interface ProjectionPoint {
  month: number;
  label: string;
  netWorth: number;
  etf: number;
  crypto: number;
  cash: number;
}

export interface MilestoneEstimate {
  targetTwd: number;
  months: number | null;
  label: string;
}
