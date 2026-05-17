import type { AccountBalance, AllocationDatum, Money, PlanSnapshot } from "./types";

export function toTwd(money: Money, usdTwd: number): number {
  return money.currency === "USD" ? money.amount * usdTwd : money.amount;
}

export function accountTotalTwd(accounts: AccountBalance[], usdTwd: number): number {
  return accounts.reduce((sum, account) => sum + toTwd(account, usdTwd), 0);
}

export function getPlanTotals(snapshot: PlanSnapshot) {
  const usdTwd = snapshot.exchangeRates.USD_TWD;
  const spendableCash = accountTotalTwd(snapshot.l1, usdTwd);
  const emergencyCash = accountTotalTwd(snapshot.l2, usdTwd);
  const investmentCash = accountTotalTwd(snapshot.l3Cash, usdTwd);
  const etfValue = snapshot.etfs.reduce((sum, etf) => sum + toTwd(etf.marketValue, usdTwd), 0);
  const cryptoValue = snapshot.crypto.reduce((sum, holding) => sum + holding.valueTwd, 0);
  const cryptoCash = snapshot.pionexTwd;
  const cash = spendableCash + emergencyCash + investmentCash + cryptoCash;
  const netWorth = cash + etfValue + cryptoValue;

  return {
    spendableCash,
    emergencyCash,
    investmentCash,
    etfValue,
    cryptoValue,
    cryptoCash,
    cash,
    netWorth,
  };
}

export function getMonthlyCashFlow(snapshot: PlanSnapshot) {
  const monthlyExpenses = snapshot.expenses.reduce((sum, expense) => sum + expense.amountTwd, 0);
  const disposable = snapshot.profile.monthlyNetSalaryTwd - monthlyExpenses;

  return {
    income: snapshot.profile.monthlyNetSalaryTwd,
    expenses: monthlyExpenses,
    disposable,
    safetyRatio: disposable / snapshot.profile.monthlyNetSalaryTwd,
  };
}

export function getAllocation(snapshot: PlanSnapshot): AllocationDatum[] {
  const totals = getPlanTotals(snapshot);
  const buckets = [
    { bucket: "cash" as const, label: "Cash Layer", valueTwd: totals.cash },
    { bucket: "etf" as const, label: "ETF Engine", valueTwd: totals.etfValue },
    { bucket: "crypto" as const, label: "Crypto Growth", valueTwd: totals.cryptoValue },
  ];

  return buckets.map((item) => {
    const targetPct = snapshot.targetAllocation[item.bucket];
    const targetValue = totals.netWorth * targetPct;
    return {
      ...item,
      currentPct: item.valueTwd / totals.netWorth,
      targetPct,
      gapTwd: targetValue - item.valueTwd,
    };
  });
}
