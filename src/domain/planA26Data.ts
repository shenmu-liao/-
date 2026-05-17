import type { PlanSnapshot } from "./types";

export const planA26Snapshot: PlanSnapshot = {
  asOf: "2026-05-17",
  exchangeRates: {
    USD_TWD: 31.2,
    USDT_TWD: 31.2,
  },
  profile: {
    birthDate: "1999-04-23",
    monthlyNetSalaryTwd: 78_780,
    salaryDay: 5,
  },
  l1: [
    { name: "Fubon Bank", amount: 66_213, currency: "TWD", spendable: true, note: "Daily expenses and credit-card settlement" },
    { name: "Wallet Cash", amount: 2, currency: "TWD", spendable: true, note: "Physical cash" },
  ],
  l2: [
    { name: "First Bank", amount: 201_056, currency: "TWD", spendable: false, note: "Emergency only; completed and locked" },
  ],
  l3Cash: [
    { name: "DAWHO TWD Cash", amount: 18_172, currency: "TWD", spendable: false, note: "Investment capital only" },
    { name: "DAWHO USD Cash", amount: 60.32, currency: "USD", spendable: false, note: "Investment capital only" },
  ],
  etfs: [
    { symbol: "QQQ", shares: 1.45, cost: { amount: 2_000.13, currency: "USD" }, marketValue: { amount: 2_311.3, currency: "USD" }, core: true },
    { symbol: "0050", shares: 313, cost: { amount: 24_549, currency: "TWD" }, marketValue: { amount: 30_289, currency: "TWD" }, core: true },
  ],
  crypto: [
    { account: "Binance", symbol: "BTC", valueTwd: 458.39, isPrimary: true },
    { account: "Binance", symbol: "ETH", valueTwd: 1_175.17, isPrimary: true },
    { account: "Binance", symbol: "ADA", valueTwd: 462.47, isPrimary: false },
    { account: "Binance", symbol: "OP", valueTwd: 84.49, isPrimary: false },
    { account: "Binance", symbol: "USDT", valueTwd: 179.05, isPrimary: false },
    { account: "Pionex", symbol: "USDT", valueTwd: 100.19 * 31.2, isPrimary: false },
  ],
  pionexTwd: 9_706.19,
  expenses: [
    { label: "Rent", amountTwd: 10_000, fixed: true },
    { label: "Living Expenses", amountTwd: 18_800, fixed: false },
    { label: "Subscription", amountTwd: 1_200, fixed: true },
    { label: "Insurance + Father", amountTwd: 7_911, fixed: true },
    { label: "Annual Fee Amortization", amountTwd: 28, fixed: true },
    { label: "Family Support", amountTwd: 8_000, fixed: true },
  ],
  targetAllocation: {
    etf: 0.4,
    crypto: 0.4,
    cash: 0.2,
  },
};

export const monthlyPlan = {
  baseEtfInvestmentTwd: 10_000,
  recommendedEtfTwd: 22_000,
  recommendedCryptoTwd: 6_000,
  recommendedCashReserveTwd: 4_000,
  cryptoDcaTwd: 5_000,
  qqqMinimumTwd: 1,
};
