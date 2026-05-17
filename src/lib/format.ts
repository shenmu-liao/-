export function formatTwd(value: number, maximumFractionDigits = 0) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "TWD",
    maximumFractionDigits,
  }).format(value);
}

export function formatPercent(value: number, digits = 1) {
  return new Intl.NumberFormat("en-US", { style: "percent", maximumFractionDigits: digits }).format(value);
}
