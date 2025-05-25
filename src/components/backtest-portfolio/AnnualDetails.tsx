'use client';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';

interface DataItem {
  year: string;
  [key: string]: string;
}

interface ChartConfig {
  dataKey: string;
  name: string;
  color: string;
}

interface AnnualReturnsChartProps {
  data?: DataItem[];
  chartConfigs?: ChartConfig[];
  title?: string;
  subtitle?: string;
  height?: number;
  showGrid?: boolean;
  xAxisLabel?: string;
  yAxisLabel?: string;
  barSize?: number;
  barGap?: number;
  barCategoryGap?: number;
  animationDuration?: number;
  tooltipSuffix?: string;
  yAxisFormatter?: (value: number) => string;
}

const defaultData: DataItem[] = [
  { year: "1997", portfolio1: "17.0", vanguard: "33.4" },
  { year: "1998", portfolio1: "13.2", vanguard: "28.6" },
  { year: "1999", portfolio1: "15.1", vanguard: "21.0" },
  { year: "2000", portfolio1: "-0.5", vanguard: "-9.1" },
  { year: "2001", portfolio1: "-2.7", vanguard: "-11.9" },
  { year: "2002", portfolio1: "-8.3", vanguard: "-22.1" },
  { year: "2003", portfolio1: "25.0", vanguard: "28.7" },
  { year: "2004", portfolio1: "13.1", vanguard: "10.9" },
  { year: "2005", portfolio1: "7.5", vanguard: "4.9" },
  { year: "2006", portfolio1: "16.3", vanguard: "15.8" },
  { year: "2007", portfolio1: "5.7", vanguard: "5.5" },
  { year: "2008", portfolio1: "-25.8", vanguard: "-37.0" },
  { year: "2009", portfolio1: "22.9", vanguard: "26.5" },
  { year: "2010", portfolio1: "14.0", vanguard: "15.1" },
  { year: "2011", portfolio1: "1.3", vanguard: "2.1" },
  { year: "2012", portfolio1: "13.1", vanguard: "16.0" },
  { year: "2013", portfolio1: "16.2", vanguard: "32.4" },
  { year: "2014", portfolio1: "9.7", vanguard: "13.7" },
  { year: "2015", portfolio1: "-0.45", vanguard: "1.25" },
  { year: "2016", portfolio1: "15.3", vanguard: "12.0" },
  { year: "2017", portfolio1: "22.3", vanguard: "21.8" },
  { year: "2018", portfolio1: "12.5", vanguard: "18.4" },
  { year: "2019", portfolio1: "21.8", vanguard: "30.2" },
  { year: "2020", portfolio1: "12.0", vanguard: "16.3" },
  { year: "2021", portfolio1: "15.5", vanguard: "28.7" },
  { year: "2022", portfolio1: "-18.2", vanguard: "-18.1" },
  { year: "2023", portfolio1: "16.2", vanguard: "26.2" },
  { year: "2024", portfolio1: "11.4", vanguard: "24.5" },
  { year: "2025", portfolio1: "11.1", vanguard: "-2.3" },
];

const defaultTwoBarConfigs: ChartConfig[] = [
  { dataKey: 'portfolio1', name: 'Portfolio 1', color: '#6300f9' },
  { dataKey: 'vanguard', name: 'Vanguard S&P 500', color: '#20d530' }
];

const defaultSingleBarData: DataItem[] = [
  { year: "1997", value: "17.0" },
  { year: "1998", value: "13.2" },
  { year: "1999", value: "15.1" },
  { year: "2000", value: "-0.5" },
  { year: "2001", value: "-2.7" },
  { year: "2002", value: "-8.3" },
  { year: "2003", value: "25.0" },
  { year: "2004", value: "13.1" },
  { year: "2005", value: "7.5" },
  { year: "2006", value: "16.3" },
  { year: "2007", value: "5.7" },
  { year: "2008", value: "-25.8" },
  { year: "2009", value: "22.9" },
  { year: "2010", value: "14.0" },
  { year: "2011", value: "1.3" },
  { year: "2012", value: "13.1" },
  { year: "2013", value: "16.2" },
  { year: "2014", value: "9.7" },
  { year: "2015", value: "-0.45" },
  { year: "2016", value: "15.3" },
  { year: "2017", value: "22.3" },
  { year: "2018", value: "12.5" },
  { year: "2019", value: "21.8" },
  { year: "2020", value: "12.0" },
  { year: "2021", value: "15.5" },
  { year: "2022", value: "-18.2" },
  { year: "2023", value: "16.2" },
  { year: "2024", value: "11.4" },
  { year: "2025", value: "11.1" },
];

const defaultSingleBarConfigs: ChartConfig[] = [
  { dataKey: 'value', name: 'Annual Return', color: '#6300f9' }
];

const CustomTooltip = ({ 
  active, 
  payload, 
  label, 
  chartConfigs, 
  tooltipSuffix 
}: any) => {
  if (active && payload && payload.length && chartConfigs) {
    return (
      <div className="bg-white/90 p-4 rounded-md shadow-xl border border-gray-200">
        <p className="font-bold text-gray-700 mb-2">Year {label}</p>
        <div className="flex flex-col gap-2">
          {payload.map((entry: any, index: number) => {
            const config = chartConfigs.find((c: ChartConfig) => c.dataKey === entry.dataKey);
            return (
              <div key={index} className="flex items-center gap-3">
                <div 
                  className="w-3 h-3 rounded-sm" 
                  style={{ backgroundColor: config?.color || entry.color }}
                />
                <span className="text-sm font-medium text-gray-600">
                  {config?.name || entry.dataKey}: 
                  <span style={{ color: config?.color || entry.color }}>
                    {entry.value}{tooltipSuffix}
                  </span>
                </span>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
  return null;
};

export default function ReusableBarChart({
  data,
  chartConfigs,
  title = "Annual Performance Comparison",
  subtitle = "Portfolio Performance Over Time",
  height = 550,
  showGrid = true,
  xAxisLabel = "Year",
  yAxisLabel = "Annual Return (%)",
  barSize = 10,
  barGap = 2,
  barCategoryGap = 12,
  animationDuration = 500,
  tooltipSuffix = "%",
  yAxisFormatter = (v: number) => `${v}%`
}: AnnualReturnsChartProps) {
  
  // Determine if we should use single or double bar setup
  const safeChartConfigs = chartConfigs ?? [];
  const finalData = data || (safeChartConfigs.length === 1 ? defaultSingleBarData : defaultData);
  const finalChartConfigs = chartConfigs ?? (safeChartConfigs.length === 1 ? defaultSingleBarConfigs : defaultTwoBarConfigs);

  return (
    <div 
      className="w-full bg-white rounded-xl shadow-lg p-10 border border-gray-100"
      style={{ height: `${height}px` }}
    >
      <div className="mb-6 px-2">
        <h2 className="text-2xl font-bold text-blue-700">{title}</h2>
        <p className="text-gray-500 text-sm mt-1">{subtitle}</p>
      </div>

      <ResponsiveContainer width="100%" height="90%">
        <BarChart
          data={finalData}
          margin={{ top: 5, right: 30, left: 25, bottom: 50 }}
          barCategoryGap={barCategoryGap}
          barGap={barGap}
        >
          {showGrid && (
            <CartesianGrid 
              strokeDasharray="3 3" 
              vertical={false}
              stroke="#e5e7eb"
            />
          )}
          
          <XAxis
            dataKey="year"
            angle={-45}
            tick={{ 
              fill: '#6b7280',
              fontSize: 12,
              fontWeight: 500,
            }}
            tickLine={false}
            axisLine={{ stroke: '#e5e7eb' }}
            tickMargin={20}
            label={{
              value: xAxisLabel,
              position: 'bottom',
              offset: 25,
              fill: '#374151',
              fontSize: 13,
              fontWeight: 600,
            }}
          />
          
          <YAxis
            tickFormatter={yAxisFormatter}
            tick={{ 
              fill: '#6b7280',
              fontSize: 12,
              fontWeight: 500,
            }}
            axisLine={false}
            tickLine={false}
            tickMargin={15}
            label={{
              value: yAxisLabel,
              angle: -90,
              position: 'left',
              fill: '#374151',
              fontSize: 13,
              fontWeight: 600,
            }}
          />
          
          <Tooltip
            content={
              <CustomTooltip 
                chartConfigs={finalChartConfigs} 
                tooltipSuffix={tooltipSuffix}
              />
            }
            cursor={{ fill: 'rgba(229, 231, 235, 0.3)' }}
          />
          
          <Legend
            verticalAlign="top"
            align="right"
            wrapperStyle={{ paddingBottom: 25 }}
            iconSize={14}
            iconType="circle"
            formatter={(value) => (
              <span className="text-sm font-medium text-gray-500 pl-2">
                {value}
              </span>
            )}
          />
          
          {finalChartConfigs.map((config) => (
            <Bar
              key={config.dataKey}
              dataKey={config.dataKey}
              name={config.name}
              fill={config.color}
              radius={[2, 2, 0, 0]}
              animationDuration={animationDuration}
              barSize={barSize}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}