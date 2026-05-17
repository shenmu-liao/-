import type { ReactNode } from "react";
import { ShieldCheck } from "lucide-react";

export function Shell({ children }: { children: ReactNode }) {
  return (
    <main className="dashboard-grid min-h-screen px-4 py-6 text-slate-100 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <header className="mb-8 flex flex-col gap-5 rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 shadow-2xl shadow-cyan-950/30 backdrop-blur md:flex-row md:items-center md:justify-between">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.28em] text-cyan-200">
              <ShieldCheck size={14} /> Safety-First Financial OS
            </div>
            <h1 className="text-4xl font-semibold tracking-tight text-white md:text-6xl">PLAN-A26</h1>
            <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-300 md:text-base">
              A long-term asset allocation control center designed to preserve cash flow, continue investing, and avoid forced asset sales.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-2 rounded-3xl border border-white/10 bg-black/20 p-3 text-center text-xs text-slate-400">
            <span className="rounded-2xl bg-emerald-400/10 px-4 py-3 text-emerald-200">Cash flow intact</span>
            <span className="rounded-2xl bg-cyan-400/10 px-4 py-3 text-cyan-200">Investing active</span>
            <span className="rounded-2xl bg-violet-400/10 px-4 py-3 text-violet-200">No forced sells</span>
          </div>
        </header>
        {children}
      </div>
    </main>
  );
}
