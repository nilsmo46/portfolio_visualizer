"use client"

import * as React from "react"
import { CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis, Label, ResponsiveContainer } from "recharts"

const defaultData = [
  {
    "name": "Page A",
    "uv": 4000,
    "pv": 2400,
    "amt": 2400
  },
  {
    "name": "Page B",
    "uv": 3000,
    "pv": 1398,
    "amt": 2210
  },
  {
    "name": "Page C",
    "uv": 2000,
    "pv": 9800,
    "amt": 2290
  },
  {
    "name": "Page D",
    "uv": 2780,
    "pv": 3908,
    "amt": 2000
  },
  {
    "name": "Page E",
    "uv": 1890,
    "pv": 4800,
    "amt": 2181
  },
  {
    "name": "Page F",
    "uv": 2390,
    "pv": 3800,
    "amt": 2500
  },
  {
    "name": "Page G",
    "uv": 3490,
    "pv": 4300,
    "amt": 2100
  }
];

interface ChartDataItem {
  name: string;
  uv: number;
  pv: number;
  amt?: number;
}

interface ChartBarProps {
  chartData?: ChartDataItem[];
  title?: string;
  xAxisLabel?: string;
  yAxisLabel?: string;
  lineColors?: {
    pv?: string;
    uv?: string;
  };
}

function ChartBar({
  chartData,
  title = "Chart Title",
  xAxisLabel = "Category",
  yAxisLabel = "Value",
  lineColors = { pv: "#50e2b0", uv: "#1200ff" }
}: ChartBarProps) {
  const [hoveredLine, setHoveredLine] = React.useState<string | null>(null);
  const [activeIndex, setActiveIndex] = React.useState<number | null>(null);
  
  const baseStrokeWidth = 2;
  const hoverStrokeWidth = 4;

  const dataToDisplay = (chartData && chartData.length > 0) ? chartData : defaultData;

  const handleMouseEnter = (dataKey: string) => {
    setHoveredLine(dataKey);
  };

  const handleMouseLeave = () => {
    setHoveredLine(null);
  };

  const handleDotClick = (data: any, index: number) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 rounded-md shadow-lg border border-gray-200">
          <p className="font-bold text-gray-800 mb-2">{`${label}`}</p>
          {payload.map((entry: any, index: number) => (
            <div key={`tooltip-${index}`} className="flex items-center mb-1">
              <div
                className="w-3 h-3 rounded-full mr-2"
                style={{ backgroundColor: entry.color }}
              />
              <p className="text-sm">
                <span className="font-medium">{entry.name}: </span>
                <span className="text-gray-700">{entry.value}</span>
              </p>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  const CustomLegend = (props: any) => {
    const { payload } = props;
    return (
      <div className="flex justify-center gap-6 mt-6">
        {payload.map((entry: any, index: number) => (
          <div 
            key={`legend-${index}`}
            className="flex items-center cursor-pointer transition-all duration-200 hover:opacity-80"
            onMouseEnter={() => handleMouseEnter(entry.dataKey)}
            onMouseLeave={handleMouseLeave}
          >
            <div
              className="w-4 h-4 rounded-full mr-2"
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-sm font-medium text-gray-700">
              {entry.value}
            </span>
          </div>
        ))}
      </div>
    );
  };

  const CustomizedDot = (props: any) => {
    const { cx, cy, dataKey, index, stroke } = props;
    const isHovered = hoveredLine === dataKey;
    const isActive = index === activeIndex;
    
    const dotSize = isActive ? 8 : isHovered ? 6 : 4;
    
    return (
      <circle
        cx={cx}
        cy={cy}
        r={dotSize}
        fill={isActive || isHovered ? "white" : stroke}
        stroke={stroke}
        strokeWidth={2}
        onClick={() => handleDotClick(props, index)}
        style={{ cursor: 'pointer', transition: 'all 0.2s ease' }}
      />
    );
  };

  const getGradientOffset = (dataKey: string) => {
    const data = dataToDisplay.map(item => item[dataKey as keyof ChartDataItem] as number);
    const max = Math.max(...data);
    const min = Math.min(...data);
    
    if (max === min) return { stop1: '0%', stop2: '100%' };
    
    return {
      stop1: (min / (max - min)) * 100 + '%',
      stop2: ((max - min) / max) * 100 + '%',
    };
  };

  const pvGradient = getGradientOffset('pv');
  const uvGradient = getGradientOffset('uv');

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">{title}</h2>
      <div className="w-full h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={dataToDisplay}
            margin={{ top: 20, right: 30, left: 20, bottom: 30 }}
          >
            <defs>
              <linearGradient id="gradientPv" x1="0" y1="0" x2="0" y2="1">
                <stop offset={pvGradient.stop1} stopColor={lineColors.pv} stopOpacity={0.8} />
                <stop offset={pvGradient.stop2} stopColor={lineColors.pv} stopOpacity={0.2} />
              </linearGradient>
              <linearGradient id="gradientUv" x1="0" y1="0" x2="0" y2="1">
                <stop offset={uvGradient.stop1} stopColor={lineColors.uv} stopOpacity={0.8} />
                <stop offset={uvGradient.stop2} stopColor={lineColors.uv} stopOpacity={0.2} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} stroke="#e0e0e0" strokeDasharray="3 3" opacity={0.6} />
            <XAxis 
              dataKey="name" 
              tick={{ fill: '#6b7280', fontSize: 12 }}
              tickLine={{ stroke: '#e0e0e0' }}
              axisLine={{ stroke: '#e0e0e0' }}
            >
              <Label 
                value={xAxisLabel} 
                offset={-10} 
                position="insideBottom" 
                style={{ textAnchor: 'middle', fontSize: '14px', fontFamily: 'system-ui', fill: '#4b5563', fontWeight: 500 }} 
              />
            </XAxis>
            <YAxis
              tick={{ fill: '#6b7280', fontSize: 12 }}
              tickLine={{ stroke: '#e0e0e0' }}
              axisLine={{ stroke: '#e0e0e0' }}
            >
              <Label 
                value={yAxisLabel} 
                angle={-90} 
                position="insideLeft" 
                style={{ textAnchor: 'middle', fontSize: '14px', fontFamily: 'system-ui', fill: '#4b5563', fontWeight: 500 }} 
              />
            </YAxis>
            <Tooltip content={<CustomTooltip />} />
            <Legend content={<CustomLegend />} />
            <Line
              type="monotone"
              dataKey="pv"
              name="Page Views"
              stroke={lineColors.pv}
              strokeWidth={hoveredLine === 'pv' ? hoverStrokeWidth : baseStrokeWidth}
              dot={<CustomizedDot />}
              activeDot={{ r: 8, fill: "white", stroke: lineColors.pv, strokeWidth: 2 }}
              onMouseEnter={() => handleMouseEnter('pv')}
              onMouseLeave={handleMouseLeave}
              animationDuration={1000}
              animationEasing="ease-in-out"
              fill="url(#gradientPv)"
            />
            <Line
              type="monotone"
              dataKey="uv"
              name="Unique Visitors"
              stroke={lineColors.uv}
              strokeWidth={hoveredLine === 'uv' ? hoverStrokeWidth : baseStrokeWidth}
              dot={<CustomizedDot />}
              activeDot={{ r: 8, fill: "white", stroke: lineColors.uv, strokeWidth: 2 }}
              onMouseEnter={() => handleMouseEnter('uv')}
              onMouseLeave={handleMouseLeave}
              animationDuration={1000}
              animationEasing="ease-in-out"
              animationBegin={300}
              fill="url(#gradientUv)"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default ChartBar;