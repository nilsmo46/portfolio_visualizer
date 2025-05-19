"use client"

import { useEffect, useState } from "react"
import { Bar, BarChart, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { cn } from "@/lib/utils"

const defaultChartData = [
  { month: "January", desktop: 186 },
  { month: "February", desktop: 305 },
  { month: "March", desktop: 237 },
  { month: "April", desktop: 73 },
  { month: "May", desktop: 209 },
  { month: "June", desktop: 214 },
];

const defaultChartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

const defaultTitle = "Bar Chart - Horizontal";
const defaultShowXAxis = true;

interface ApiChartData {
  chartData: Array<{ month: string; [key: string]: any }>;
  chartConfig: ChartConfig;
  title: string;
  showXAxis: boolean;
}

export interface ChartBarHorizontalProps {
  apiUrl?: string;
  description?: string;
  footerTrend?: string;
  footerDescription?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizeMap = {
  sm: "h-[200px]",
  md: "h-[300px]",
  lg: "h-[400px]",
}

export function HorizontalBarChart({
  apiUrl,
  size = 'md',
  className,
}: ChartBarHorizontalProps) {

  const [chartProps, setChartProps] = useState<ApiChartData | null>(null);
  const [isLoading, setIsLoading] = useState(!!apiUrl);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!apiUrl) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data: ApiChartData) => {
        if (!data || !data.chartData || !data.chartConfig || !data.title) {
          throw new Error("Invalid data structure received from API.");
        }
        setChartProps(data);
      })
      .catch(fetchError => {
        console.error("Failed to fetch chart data:", fetchError);
        setError("Failed to load chart data.");
        setChartProps(null);
      })
      .finally(() => {
        setIsLoading(false);
      });

  }, [apiUrl]);

  const useApiData = apiUrl && chartProps && !error;
  const finalChartData = useApiData ? chartProps.chartData : defaultChartData;
  const finalChartConfig = useApiData ? chartProps.chartConfig : defaultChartConfig;
  const finalTitle = useApiData ? chartProps.title : defaultTitle;
  const finalShowXAxis = useApiData ? chartProps.showXAxis : defaultShowXAxis;

  const heightClass = sizeMap[size];

  if (isLoading) {
    return (
      <Card className={cn("flex items-center justify-center", heightClass, className)}>
        <CardContent>
          <p>Loading chart...</p>
        </CardContent>
      </Card>
    );
  }

  if (error && apiUrl) {
    return (
      <Card className={cn("flex items-center justify-center", heightClass, className)}>
        <CardContent>
          <p className="text-red-600">{error}</p>
          <p className="text-sm text-muted-foreground">Displaying default data.</p>
        </CardContent>
      </Card>
    );
  }

  const configKeys = Object.keys(finalChartConfig);
  const primaryDataKey = configKeys.length > 0 ? configKeys[0] : 'desktop';

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>{finalTitle}</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={finalChartConfig} className={cn("w-full", heightClass)}>
          <BarChart
            accessibilityLayer
            data={finalChartData}
            layout="vertical"
            margin={{
              left: -20,
              right: 20,
              bottom: finalShowXAxis ? 20 : 0,
              top: 5,
            }}
          >
            <XAxis
              type="number"
              dataKey={primaryDataKey}
              hide={!finalShowXAxis}
              tickLine={finalShowXAxis}
              axisLine={finalShowXAxis}
              tickMargin={5}
              fontSize={12}
            />
            <YAxis
              dataKey="month"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => typeof value === 'string' ? value.slice(0, 3) : ''}
              fontSize={12}
              width={80}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            {configKeys.map((key) => (
              <Bar
                key={key}
                dataKey={key}
                fill={`var(--color-${key})`}
                radius={5}
              />
            ))}
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
