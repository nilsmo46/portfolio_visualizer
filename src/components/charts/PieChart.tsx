"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import axios from "axios"
import { Pie, PieChart, Sector } from "recharts"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { ChartContainer, type ChartConfig } from "@/components/ui/chart"
import { chartConfig as defaultConfig } from "./config"
import { chartData as defaultData } from "./config"
import { cn } from "@/lib/utils"

// --- Interface for expected API response ---
interface ApiPieData {
  chartData: typeof defaultData
  chartConfig: ChartConfig
}

// Custom active shape component
const renderActiveShape = (props: any) => {
  const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill } = props

  return (
    <g>
      {/* Original sector */}
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />

      {/* Duplicate sector with lower opacity */}
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius + 10}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
        opacity={0.3}
      />
    </g>
  )
}

// --- Updated Component Props ---
export interface ChartProps {
  children?: React.ReactNode
  description?: string
  apiUrl?: string
  className?: string
}

export function Chart({ children, description = "", apiUrl, className }: ChartProps) {
  // --- State Management ---
  const [activeIndex, setActiveIndex] = useState<number | undefined>(undefined)
  const [tooltipData, setTooltipData] = useState<any>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const chartContainerRef = useRef<HTMLDivElement>(null)

  const [chartData, setChartData] = useState(defaultData)
  const [chartConfig, setChartConfig] = useState<ChartConfig>(defaultConfig)
  const [isLoading, setIsLoading] = useState(!!apiUrl)
  const [error, setError] = useState<string | null>(null)

  // --- Data Fetching Effect ---
  useEffect(() => {
    if (!apiUrl) {
      setChartData(defaultData)
      setChartConfig(defaultConfig)
      setIsLoading(false)
      setError(null)
      return
    }

    setIsLoading(true)
    setError(null)

    axios
      .get<ApiPieData>(apiUrl)
      .then((response) => {
        if (response.data && response.data.chartData && response.data.chartConfig) {
          setChartData(response.data.chartData)
          setChartConfig(response.data.chartConfig)
        } else {
          throw new Error("Invalid data structure received from API.")
        }
      })
      .catch((fetchError) => {
        console.error("Failed to fetch pie chart data:", fetchError)
        setError("Failed to load chart data. Displaying default data.")
        setChartData(defaultData)
        setChartConfig(defaultConfig)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [apiUrl])

  // --- Event Handlers ---
  const onPieEnter = (_: unknown, index: number) => {
    setActiveIndex(index)
    setTooltipData(chartData[index])
  }

  const onPieLeave = () => {
    setActiveIndex(undefined)
    setTooltipData(null)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (chartContainerRef.current) {
      const rect = chartContainerRef.current.getBoundingClientRect()
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      })
    }
  }

  // --- Render Logic ---
  if (isLoading) {
    return (
      <Card className={cn("flex flex-col items-center justify-center min-h-[300px]", className)}>
        <CardContent>
          <p>Loading chart...</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className={cn("flex flex-col", className)}>
      <CardContent className="flex-1 pb-0">
        {error && <p className="text-red-600 text-center text-sm mb-2">{error}</p>}
        {description && <p className="text-sm text-muted-foreground mb-2">{description}</p>}
        <div
          ref={chartContainerRef}
          className="relative mx-auto aspect-square max-h-[250px]"
          onMouseMove={handleMouseMove}
        >
          <ChartContainer config={chartConfig} className="h-full w-full">
            <PieChart>
              <Pie
                data={chartData}
                dataKey="visitors"
                nameKey="browser"
                innerRadius={60}
                activeIndex={activeIndex}
                activeShape={renderActiveShape}
                onMouseEnter={onPieEnter}
                onMouseLeave={onPieLeave}
              >
                {chartData.map((entry, index) => (
                  <Sector
                    key={`cell-${index}`}
                    fill={
                      chartConfig[entry.browser as keyof typeof chartConfig]?.color ||
                      `hsl(var(--chart-${index + 1}))`
                    }
                  />
                ))}
              </Pie>
            </PieChart>
          </ChartContainer>

          {tooltipData && chartConfig[tooltipData.browser as keyof typeof chartConfig] && (
            <div
              className="absolute pointer-events-none z-10 rounded-lg p-2 shadow-md border bg-background text-foreground"
              style={{
                left: `${mousePosition.x + 15}px`,
                top: `${mousePosition.y}px`,
                transform: "translateY(-100%)",
              }}
            >
              <div className="font-medium mb-1">
                {chartConfig[tooltipData.browser as keyof typeof chartConfig]?.label}
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span
                  className="h-3 w-3 rounded-full"
                  style={{
                    backgroundColor: chartConfig[tooltipData.browser as keyof typeof chartConfig]?.color,
                  }}
                />
                {tooltipData.visitors} visitors
              </div>
            </div>
          )}
        </div>
      </CardContent>
      {children && <CardFooter className="flex-col gap-1 text-sm mt-4">{children}</CardFooter>}
    </Card>
  )
}
