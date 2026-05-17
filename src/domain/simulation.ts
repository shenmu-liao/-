import { addMonths, formatMonth } from "@/lib/date";
import { monthlyPlan } from "./planA26Data";
import { getPlanTotals } from "./calculations";
import type { MilestoneEstimate, PlanSnapshot, ProjectionPoint } from "./types";

interface SimulationOptions {
  months: number;
  annualEtfReturn: number;
  annualCryptoReturn: number;
  annualCashReturn: number;
  monthlyEtfContribution: number;
  monthlyCryptoContribution: number;
  monthlyCashContribution: number;
}

const defaultOptions: SimulationOptions = {
  months: 120,
  annualEtfReturn: 0.075,
  annualCryptoReturn: 0.14,
  annualCashReturn: 0.008,
  monthlyEtfContribution: monthlyPlan.recommendedEtfTwd,
  monthlyCryptoContribution: monthlyPlan.recommendedCryptoTwd,
  monthlyCashContribution: monthlyPlan.recommendedCashReserveTwd,
};

function monthlyRate(annualRate: number) {
  return Math.pow(1 + annualRate, 1 / 12) - 1;
}

function volatilityShock(month: number) {
  const cycle = Math.sin(month * 0.85) * 0.055;
  const drawdown = month % 18 === 0 ? -0.18 : 0;
  const recovery = month % 19 === 0 ? 0.16 : 0;
  return cycle + drawdown + recovery;
}

export function simulatePlan(snapshot: PlanSnapshot, options: Partial<SimulationOptions> = {}): ProjectionPoint[] {
  const config = { ...defaultOptions, ...options };
  const totals = getPlanTotals(snapshot);
  const startDate = new Date(`${snapshot.asOf}T00:00:00.000Z`);
  let etf = totals.etfValue;
  let crypto = totals.cryptoValue;
  let cash = totals.cash;
  const etfRate = monthlyRate(config.annualEtfReturn);
  const cryptoBaseRate = monthlyRate(config.annualCryptoReturn);
  const cashRate = monthlyRate(config.annualCashReturn);
  const points: ProjectionPoint[] = [];

  for (let month = 0; month <= config.months; month += 1) {
    points.push({
      month,
      label: formatMonth(addMonths(startDate, month)),
      netWorth: etf + crypto + cash,
      etf,
      crypto,
      cash,
    });

    etf = etf * (1 + etfRate) + config.monthlyEtfContribution;
    crypto = Math.max(0, crypto * (1 + cryptoBaseRate + volatilityShock(month + 1)) + config.monthlyCryptoContribution);
    cash = cash * (1 + cashRate) + config.monthlyCashContribution;
  }

  return points;
}

export function estimateMilestones(points: ProjectionPoint[], milestones = [500_000, 1_000_000, 2_000_000, 5_000_000]): MilestoneEstimate[] {
  return milestones.map((targetTwd) => {
    const hit = points.find((point) => point.netWorth >= targetTwd);
    return {
      targetTwd,
      months: hit?.month ?? null,
      label: hit ? hit.label : "Beyond current projection",
    };
  });
}
