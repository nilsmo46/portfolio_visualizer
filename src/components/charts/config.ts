import { type ChartConfig } from "../ui/chart"

export const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  chrome: {
    label: "Chrome",
    color: "var(--chart-1)",
  },
  safari: {
    label: "Safari",
    color: "var(--chart-2)",
  },
  firefox: {
    label: "Firefox",
    color: "var(--chart-3)",
  },
  edge: {
    label: "Edge",
    color: "var(--chart-4)",
  },
  other: {
    label: "Other",
    color: "var(--chart-5)",
  },
} satisfies ChartConfig

export const chartData = [
    { browser: "chrome", visitors: 40, fill: "var(--color-chrome)" },
    { browser: "edge", visitors: 30, fill: "var(--color-edge)" },
    { browser: "firefox", visitors: 10, fill: "var(--color-firefox)" },
    { browser: "safari", visitors: 20, fill: "var(--color-safari)" },
]
  