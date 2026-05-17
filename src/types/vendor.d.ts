declare module "next" {
  export interface Metadata {
    title?: string;
    description?: string;
  }
  export interface NextConfig {
    reactStrictMode?: boolean;
  }
}

declare module "next/font/google" {
  export function Geist(options: { variable: string; subsets: string[] }): { variable: string };
  export function Geist_Mono(options: { variable: string; subsets: string[] }): { variable: string };
}

declare module "lucide-react" {
  import type { ComponentType, SVGProps } from "react";
  export type LucideIcon = ComponentType<SVGProps<SVGSVGElement> & { size?: number }>;
  export const Activity: LucideIcon;
  export const ArrowUpRight: LucideIcon;
  export const Banknote: LucideIcon;
  export const Landmark: LucideIcon;
  export const LineChart: LucideIcon;
  export const ShieldCheck: LucideIcon;
  export const WalletCards: LucideIcon;
}

declare module "recharts" {
  import type { ComponentType, ReactNode } from "react";
  type AnyProps = Record<string, unknown> & { children?: ReactNode };
  export const Area: ComponentType<AnyProps>;
  export const AreaChart: ComponentType<AnyProps>;
  export const Bar: ComponentType<AnyProps>;
  export const BarChart: ComponentType<AnyProps>;
  export const CartesianGrid: ComponentType<AnyProps>;
  export const Cell: ComponentType<AnyProps>;
  export const Legend: ComponentType<AnyProps>;
  export const Pie: ComponentType<AnyProps>;
  export const PieChart: ComponentType<AnyProps>;
  export const ResponsiveContainer: ComponentType<AnyProps>;
  export const Tooltip: ComponentType<AnyProps>;
  export const XAxis: ComponentType<AnyProps>;
  export const YAxis: ComponentType<AnyProps>;
}

declare module "zustand" {
  export function create<T>(initializer: (set: (state: Partial<T>) => void) => T): () => T;
}

declare module "*.css";

declare module "react" {
  export type ReactNode = unknown;
  export type SVGProps<T> = Record<string, unknown> & { ref?: T };
  export type ComponentType<P = Record<string, unknown>> = (props: P) => ReactNode;
}

declare namespace React {
  type ReactNode = unknown;
}

declare namespace JSX {
  interface IntrinsicElements {
    [elemName: string]: Record<string, unknown>;
  }
  interface ElementChildrenAttribute {
    children: Record<string, unknown>;
  }
}
