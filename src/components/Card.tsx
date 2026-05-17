import type { ReactNode } from "react";
export function Card({ children, className }: { children: ReactNode; className?: string }) {
  return <section className={["rounded-[1.75rem] border border-white/10 bg-slate-950/55 p-5 shadow-xl shadow-black/20 backdrop-blur", className].filter(Boolean).join(" ")}>{children}</section>;
}

export function CardHeader({ eyebrow, title, action }: { eyebrow?: string; title: string; action?: ReactNode }) {
  return (
    <div className="mb-5 flex items-start justify-between gap-4">
      <div>
        {eyebrow ? <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-300/80">{eyebrow}</p> : null}
        <h2 className="mt-1 text-xl font-semibold text-white">{title}</h2>
      </div>
      {action}
    </div>
  );
}
