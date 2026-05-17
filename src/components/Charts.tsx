"use client";

import { Cell, Pie, PieChart, ResponsiveContainer, Area, AreaChart, CartesianGrid, Tooltip, XAxis, YAxis, Bar, BarChart, Legend } from "recharts";
import type { AllocationDatum, ProjectionPoint } from "@/domain/types";
import { formatTwd } from "@/lib/format";

const colors = ["#22d3ee", "#a78bfa", "#34d399"];

export function AllocationPie({ data }: { data: AllocationDatum[] }) {
  return (
    <ResponsiveContainer width="100%" height={270}>
      <PieChart>
        <Pie data={data} dataKey="valueTwd" nameKey="label" innerRadius={62} outerRadius={96} paddingAngle={4}>
          {data.map((entry, index) => <Cell key={entry.bucket} fill={colors[index % colors.length]} />)}
        </Pie>
        <Tooltip formatter={(value: number) => formatTwd(value)} contentStyle={{ background: "#020617", border: "1px solid rgba(255,255,255,.12)", borderRadius: 16 }} />
      </PieChart>
    </ResponsiveContainer>
  );
}

export function NetWorthArea({ data }: { data: ProjectionPoint[] }) {
  return (
    <ResponsiveContainer width="100%" height={310}>
      <AreaChart data={data.filter((point) => point.month % 6 === 0)} margin={{ left: 0, right: 10, top: 10, bottom: 0 }}>
        <defs>
          <linearGradient id="netWorth" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.45} />
            <stop offset="95%" stopColor="#22d3ee" stopOpacity={0.02} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,.14)" />
        <XAxis dataKey="label" stroke="#94a3b8" tick={{ fontSize: 11 }} />
        <YAxis stroke="#94a3b8" tick={{ fontSize: 11 }} tickFormatter={(value: number) => `${Math.round(value / 1000)}k`} />
        <Tooltip formatter={(value: number) => formatTwd(value)} contentStyle={{ background: "#020617", border: "1px solid rgba(255,255,255,.12)", borderRadius: 16 }} />
        <Area type="monotone" dataKey="netWorth" stroke="#22d3ee" fill="url(#netWorth)" strokeWidth={3} name="Net Worth" />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export function AllocationGapChart({ data }: { data: AllocationDatum[] }) {
  return (
    <ResponsiveContainer width="100%" height={260}>
      <BarChart data={data} margin={{ left: 0, right: 10, top: 10, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,.14)" />
        <XAxis dataKey="label" stroke="#94a3b8" tick={{ fontSize: 11 }} />
        <YAxis stroke="#94a3b8" tick={{ fontSize: 11 }} tickFormatter={(value: number) => `${Math.round(value / 1000)}k`} />
        <Tooltip formatter={(value: number) => formatTwd(value)} contentStyle={{ background: "#020617", border: "1px solid rgba(255,255,255,.12)", borderRadius: 16 }} />
        <Legend />
        <Bar dataKey="valueTwd" name="Current" fill="#22d3ee" radius={[8, 8, 0, 0]} />
        <Bar dataKey="gapTwd" name="Target Gap" fill="#a78bfa" radius={[8, 8, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
