import { Activity, Banknote, Landmark, LineChart, ShieldCheck, WalletCards } from "lucide-react";
import { getAllocation, getMonthlyCashFlow, getPlanTotals } from "@/domain/calculations";
import { detectCryptoLevel, detectEmergencyStage, runSafetyFirstRules } from "@/domain/rulesEngine";
import { estimateMilestones, simulatePlan } from "@/domain/simulation";
import type { PlanSnapshot, RuleCheck } from "@/domain/types";
import { formatPercent, formatTwd } from "@/lib/format";
import { AllocationGapChart, AllocationPie, NetWorthArea } from "./Charts";
import { Card, CardHeader } from "./Card";
import { KpiCard } from "./KpiCard";

function statusClass(status: RuleCheck["status"]) {
  if (status === "safe") return "border-emerald-400/20 bg-emerald-400/10 text-emerald-100";
  if (status === "watch") return "border-amber-400/20 bg-amber-400/10 text-amber-100";
  return "border-rose-400/20 bg-rose-400/10 text-rose-100";
}

export function Dashboard({ snapshot }: { snapshot: PlanSnapshot }) {
  const totals = getPlanTotals(snapshot);
  const cashFlow = getMonthlyCashFlow(snapshot);
  const allocation = getAllocation(snapshot);
  const rules = runSafetyFirstRules(snapshot);
  const emergency = detectEmergencyStage(totals.emergencyCash);
  const cryptoLevel = detectCryptoLevel(totals.emergencyCash);
  const projection = simulatePlan(snapshot);
  const milestones = estimateMilestones(projection);

  return (
    <div className="space-y-6">
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <KpiCard label="Total Net Worth" value={formatTwd(totals.netWorth)} detail="All four layers, TWD-normalized" icon={LineChart} tone="cyan" />
        <KpiCard label="Monthly Disposable" value={formatTwd(cashFlow.disposable)} detail={`${formatPercent(cashFlow.safetyRatio)} of net salary remains`} icon={Banknote} tone="emerald" />
        <KpiCard label="Emergency Fund" value={formatPercent(emergency.progress, 0)} detail={`${formatTwd(totals.emergencyCash)} locked in L2`} icon={ShieldCheck} tone="violet" />
        <KpiCard label="Crypto Level" value={`Level ${cryptoLevel.level}`} detail={`${cryptoLevel.range}; BTC 70% / ETH 30%`} icon={Activity} tone="amber" />
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.05fr_.95fr]">
        <Card>
          <CardHeader eyebrow="Command center" title="Net worth forecast" action={<span className="rounded-full bg-cyan-400/10 px-3 py-1 text-xs text-cyan-200">120-month engine</span>} />
          <NetWorthArea data={projection} />
          <div className="mt-4 grid gap-3 sm:grid-cols-4">
            {milestones.map((milestone) => (
              <div key={milestone.targetTwd} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <p className="text-xs text-slate-400">Target</p>
                <p className="mt-1 font-semibold text-white">{formatTwd(milestone.targetTwd)}</p>
                <p className="mt-2 text-xs text-cyan-200">{milestone.months === null ? milestone.label : `${milestone.months} months · ${milestone.label}`}</p>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <CardHeader eyebrow="Allocation" title="Current asset mix" />
          <AllocationPie data={allocation} />
          <div className="space-y-3">
            {allocation.map((item) => (
              <div key={item.bucket}>
                <div className="mb-1 flex justify-between text-sm">
                  <span className="text-slate-300">{item.label}</span>
                  <span className="font-medium text-white">{formatPercent(item.currentPct)}</span>
                </div>
                <div className="h-2 rounded-full bg-white/10">
                  <div className="h-2 rounded-full bg-cyan-300" style={{ width: `${Math.min(item.currentPct * 100, 100)}%` }} />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </section>

      <section className="grid gap-6 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <CardHeader eyebrow="Rebalance by new cash only" title="Distance from target allocation" />
          <AllocationGapChart data={allocation} />
        </Card>

        <Card>
          <CardHeader eyebrow="Monthly progress" title="Investment runway" />
          <div className="space-y-4">
            <ProgressRow label="ETF base" value={10_000} target={22_000} />
            <ProgressRow label="Crypto DCA" value={cryptoLevel.recommendedTwd} target={6_000} />
            <ProgressRow label="Cash reserve" value={4_000} target={4_000} />
          </div>
          <div className="mt-5 rounded-2xl border border-white/10 bg-black/20 p-4 text-sm text-slate-300">
            New cash flow is the only rebalancing tool. No asset sales are required to move toward ETF 40% / Crypto 40% / Cash 20%.
          </div>
        </Card>
      </section>

      <section className="grid gap-6 lg:grid-cols-[.9fr_1.1fr]">
        <Card>
          <CardHeader eyebrow="Cash flow" title="Monthly operating model" />
          <div className="space-y-3">
            {snapshot.expenses.map((expense) => (
              <div key={expense.label} className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3">
                <span className="text-sm text-slate-300">{expense.label}</span>
                <span className="font-mono text-sm text-white">{formatTwd(expense.amountTwd)}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 grid grid-cols-2 gap-3">
            <MiniMetric label="Income" value={formatTwd(cashFlow.income)} icon={WalletCards} />
            <MiniMetric label="Expenses" value={formatTwd(cashFlow.expenses)} icon={Landmark} />
          </div>
        </Card>

        <Card>
          <CardHeader eyebrow="Rules engine" title="Safety-first guardrails" />
          <div className="grid gap-3 md:grid-cols-2">
            {rules.map((rule) => (
              <article key={rule.id} className={`rounded-2xl border p-4 ${statusClass(rule.status)}`}>
                <div className="flex items-center justify-between gap-3">
                  <h3 className="font-semibold">{rule.label}</h3>
                  <span className="rounded-full bg-black/20 px-2 py-1 text-[10px] uppercase tracking-[0.18em]">{rule.status}</span>
                </div>
                <p className="mt-2 text-sm leading-6 opacity-85">{rule.detail}</p>
              </article>
            ))}
          </div>
        </Card>
      </section>
    </div>
  );
}

function ProgressRow({ label, value, target }: { label: string; value: number; target: number }) {
  const pct = target === 0 ? 0 : value / target;
  return (
    <div>
      <div className="mb-2 flex items-center justify-between text-sm">
        <span className="text-slate-300">{label}</span>
        <span className="font-mono text-white">{formatTwd(value)} / {formatTwd(target)}</span>
      </div>
      <div className="h-3 rounded-full bg-white/10">
        <div className="h-3 rounded-full bg-gradient-to-r from-cyan-300 to-emerald-300" style={{ width: `${Math.min(pct * 100, 100)}%` }} />
      </div>
    </div>
  );
}

function MiniMetric({ label, value, icon: Icon }: { label: string; value: string; icon: typeof WalletCards }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
      <Icon className="mb-3 text-cyan-200" size={18} />
      <p className="text-xs text-slate-400">{label}</p>
      <p className="mt-1 font-semibold text-white">{value}</p>
    </div>
  );
}
