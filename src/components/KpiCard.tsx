import type { LucideIcon } from "lucide-react";
import { ArrowUpRight } from "lucide-react";
import { Card } from "./Card";

interface KpiCardProps {
  label: string;
  value: string;
  detail: string;
  icon: LucideIcon;
  tone: "cyan" | "emerald" | "violet" | "amber";
}

const toneMap = {
  cyan: "from-cyan-400/20 text-cyan-200",
  emerald: "from-emerald-400/20 text-emerald-200",
  violet: "from-violet-400/20 text-violet-200",
  amber: "from-amber-400/20 text-amber-200",
};

export function KpiCard({ label, value, detail, icon: Icon, tone }: KpiCardProps) {
  return (
    <Card className="relative overflow-hidden">
      <div className={`absolute inset-x-0 top-0 h-24 bg-gradient-to-b ${toneMap[tone]} to-transparent opacity-70`} />
      <div className="relative flex items-start justify-between">
        <div>
          <p className="text-sm text-slate-400">{label}</p>
          <p className="mt-3 text-2xl font-semibold tracking-tight text-white">{value}</p>
          <p className="mt-2 text-sm text-slate-400">{detail}</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/10 p-3 text-white">
          <Icon size={20} />
        </div>
      </div>
      <div className="relative mt-5 flex items-center gap-1 text-xs font-medium text-slate-300">
        <ArrowUpRight size={14} /> Safety-first control metric
      </div>
    </Card>
  );
}
