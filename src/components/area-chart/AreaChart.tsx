"use client"

import * as React from "react"
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"
import axios from "axios"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  type ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { baseURL } from "@/constants"

// Updated default data structure
const defaultChartData = [
  { year: 2008, value: 150 },
  { year: 2009, value: 180 },
  { year: 2010, value: 120 },
  { year: 2011, value: 260 },
  { year: 2012, value: 290 },
  { year: 2013, value: 340 },
  { year: 2014, value: 180 },
  { year: 2015, value: 320 },
  { year: 2016, value: 110 },
  { year: 2017, value: 190 },
  { year: 2018, value: 350 },
  { year: 2019, value: 210 },
  { year: 2020, value: 380 },
  { year: 2021, value: 220 },
  { year: 2022, value: 170 },
  { year: 2023, value: 190 },
  { year: 2024, value: 360 },
]

// Updated chart config
const chartConfig = {
  value: {
    label: "Value",
    color: "var(--chart-1)", // Use a single color
  },
} satisfies ChartConfig

// Updated data item interface
interface ChartDataItem {
  year: number
  value: number
}

function YearlyValueChart({ title, modelId, api }: { title: string; modelId: string; api: string; }) { 
  const [chartData, setChartData] = React.useState<ChartDataItem[]>(defaultChartData)
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState<string | null>(null)

  const fetchData = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await axios.get(`${baseURL}/monthly-stats/all?filter={"isYearly": true, "model_id": "0e55675e-24db-4454-a21e-fb2ad8b64ea4"}&sort={"year":"asc"}&limit=100&offset=0`)
      console.log("response", response);
    } catch (err) {
      console.error("Failed to fetch chart data:", err)
      setError("Failed to load data. Displaying default data.")
      // Fallback to default data on API error
      setChartData(defaultChartData)
    } finally {
      setLoading(false)
    }
  }

  React.useEffect(() => {
    if (!modelId) {
      console.warn("Model ID is missing, using default data.")
      setChartData(defaultChartData)
      setLoading(false)
      setError("Model ID is required to fetch data.")
      return
    }



    fetchData()
  }, [api, modelId])

  const description = "Showing values over the years"

  return (
    <Card>
      <button onClick={fetchData}>click api</button>
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1 text-center sm:text-left">
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
          {error && <p className="text-sm text-red-500">{error}</p>} {/* Display error message */}
        </div>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        {loading ? (
          <div className="flex justify-center items-center h-[250px]">Loading chart data...</div> // Show loading indicator
        ) : (
          <ChartContainer config={chartConfig} className="aspect-auto h-[250px] w-full">
            <AreaChart data={chartData}>
              {/* Update defs for single area */}
              <defs>
                <linearGradient id="fillValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--color-value)" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="var(--color-value)" stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} />
              <XAxis
                // Update dataKey and tickFormatter for year
                dataKey="year"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                minTickGap={32}
                tickFormatter={(value) => value.toString()} // Display year directly
              />
              <YAxis tickLine={false} axisLine={false} tickMargin={8} tickFormatter={(value) => value.toLocaleString()} />
              <ChartTooltip
                cursor={false}
                content={
                  <ChartTooltipContent
                    // Update labelFormatter for year
                    labelFormatter={(value) => `Year: ${value}`}
                    indicator="dot"
                  />
                }
              />
              {/* Update Area component for single value */}
              <Area dataKey="value" type="natural" fill="url(#fillValue)" stroke="var(--color-value)" stackId="a" />
              <ChartLegend content={<ChartLegendContent />} />
            </AreaChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  )
}

// Update export name if component name was changed
export default YearlyValueChart
