import { monthlyPlan } from "./planA26Data";
import { getAllocation, getMonthlyCashFlow, getPlanTotals } from "./calculations";
import type { PlanSnapshot, RuleCheck } from "./types";

const EMERGENCY_TARGET_TWD = 200_000;
const EMERGENCY_LEVEL_ONE_TWD = 120_000;

export function detectEmergencyStage(emergencyCashTwd: number) {
  if (emergencyCashTwd >= EMERGENCY_TARGET_TWD) {
    return { stage: "Completed / Locked", targetTwd: EMERGENCY_TARGET_TWD, progress: 1, monthlyAllocation: 0 };
  }

  return {
    stage: emergencyCashTwd >= EMERGENCY_LEVEL_ONE_TWD ? "Build Phase — Above Minimum" : "Build Phase — Critical",
    targetTwd: EMERGENCY_TARGET_TWD,
    progress: emergencyCashTwd / EMERGENCY_TARGET_TWD,
    monthlyAllocation: Math.min(10_000, EMERGENCY_TARGET_TWD - emergencyCashTwd),
  };
}

export function detectCryptoLevel(emergencyCashTwd: number) {
  if (emergencyCashTwd >= EMERGENCY_TARGET_TWD) {
    return { level: 2, range: "3k–5k / month", recommendedTwd: monthlyPlan.cryptoDcaTwd };
  }

  if (emergencyCashTwd >= EMERGENCY_LEVEL_ONE_TWD) {
    return { level: 1, range: "2k–3k / month", recommendedTwd: 3_000 };
  }

  return { level: 0, range: "No crypto investment", recommendedTwd: 0 };
}

export function runSafetyFirstRules(snapshot: PlanSnapshot): RuleCheck[] {
  const totals = getPlanTotals(snapshot);
  const cashFlow = getMonthlyCashFlow(snapshot);
  const emergency = detectEmergencyStage(totals.emergencyCash);
  const cryptoLevel = detectCryptoLevel(totals.emergencyCash);
  const allocation = getAllocation(snapshot);
  const investmentBudget = monthlyPlan.baseEtfInvestmentTwd + cryptoLevel.recommendedTwd + emergency.monthlyAllocation;
  const unsafeCashFlow = cashFlow.disposable - investmentBudget < 10_000;
  const dawahoIsSpendable = snapshot.l3Cash.some((account) => account.spendable);
  const altcoinValue = snapshot.crypto.filter((holding) => !holding.isPrimary).reduce((sum, holding) => sum + holding.valueTwd, 0);
  const cryptoValue = totals.cryptoValue || 1;

  return [
    {
      id: "emergency-fund",
      label: "L2 Emergency Fund",
      status: emergency.progress >= 1 ? "safe" : emergency.progress >= 0.6 ? "watch" : "danger",
      detail: `${emergency.stage}. Allocation is ${emergency.monthlyAllocation.toLocaleString()} TWD because L2 is ${Math.round(emergency.progress * 100)}% funded.`,
    },
    {
      id: "crypto-level",
      label: "Crypto DCA Level",
      status: cryptoLevel.level === 2 ? "safe" : cryptoLevel.level === 1 ? "watch" : "danger",
      detail: `Level ${cryptoLevel.level}: ${cryptoLevel.range}. BTC / ETH remain the only expansion assets.`,
    },
    {
      id: "cash-flow",
      label: "Monthly Cash-Flow Safety",
      status: unsafeCashFlow ? "watch" : "safe",
      detail: unsafeCashFlow
        ? "Investment budget leaves less than 10,000 TWD of free buffer; reduce optional risk allocation before touching L2."
        : `Disposable capital is ${cashFlow.disposable.toLocaleString()} TWD and supports the current base ETF + crypto plan.`,
    },
    {
      id: "dawho-boundary",
      label: "DAWHO Cash Boundary",
      status: dawahoIsSpendable ? "danger" : "safe",
      detail: dawahoIsSpendable ? "One or more DAWHO cash accounts are incorrectly marked spendable." : "DAWHO cash is locked as L3 investment capital and excluded from living cash.",
    },
    {
      id: "qqq-continuity",
      label: "QQQ Continuity",
      status: monthlyPlan.baseEtfInvestmentTwd >= monthlyPlan.qqqMinimumTwd ? "safe" : "danger",
      detail: `Base ETF allocation is ${monthlyPlan.baseEtfInvestmentTwd.toLocaleString()} TWD/month; QQQ investment must not stop.`,
    },
    {
      id: "altcoin-expansion",
      label: "Altcoin Expansion Lock",
      status: altcoinValue / cryptoValue <= 0.45 ? "safe" : "watch",
      detail: `Non-primary crypto is ${(altcoinValue / cryptoValue * 100).toFixed(1)}% of L4. New cash flow should only add BTC 70% / ETH 30%.`,
    },
    {
      id: "target-gap",
      label: "Target Allocation Gap",
      status: "watch",
      detail: allocation
        .map((item) => `${item.label}: ${(item.currentPct * 100).toFixed(1)}% vs ${(item.targetPct * 100).toFixed(0)}% target`)
        .join(" · "),
    },
  ];
}
