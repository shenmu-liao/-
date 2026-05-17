# PLAN-A26

PLAN-A26 is a safety-first personal financial operating system. It is designed as a long-term asset allocation and financial control dashboard, not a toy budgeting app.

## Principles

- Never interrupt cash flow.
- Never interrupt investing.
- Never be forced to sell assets.
- Rebalance with new cash flow only.

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Recharts
- Zustand-ready state layer

## Current Modules

- Four-layer asset model: spendable cash, emergency fund, investment assets, crypto assets.
- Rules engine for emergency fund stage, crypto level, DAWHO spendability guardrails, and allocation gaps.
- Monthly simulation engine for ETF growth, crypto volatility, cash reserve growth, and milestone estimates.
- Dark, dashboard-oriented UI with allocation, cash-flow, rule, and projection visualizations.

## Commands

```bash
npm run dev
npm run typecheck
npm run lint
npm run build
```
