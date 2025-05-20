import React from 'react';
// import PortfolioEditModal from './PortfolioEditModal';
// import PortfolioSaveModal from './PortfolioSaveModal';
import { Chart } from "@/components/charts/PieChart";
import YearlyValueChart from "@/components/area-chart/AreaChart";
import ChartBar from "@/components/bar-chart/BarChart";
import ReusableTable from './TableOne';
import { AnnualReturnData } from '@/app/backtest-portfolio/page';

export interface Asset {
  ticker: string;
  name: string;
  allocation: string;
}

export interface Portfolio {
  id: string;
  name: string;
  assets: Asset[];
}

interface Metrics {
  [key: string]: any;
}

interface PortfolioDetailSectionProps {
  portfolio: Portfolio;
  metrics: Metrics;
  benchmark: string;
  tickerData: Asset[];
  rollingRetunsData: any;
  annualReturnData: AnnualReturnData[]
}

const PortfolioDetailSection: React.FC<PortfolioDetailSectionProps> = 
  ({ 
    portfolio,
    benchmark, 
    tickerData,
    rollingRetunsData,
    annualReturnData
  }) => {
  const assets = tickerData;
  const portfolioName = portfolio?.name || 'Portfolio 1';

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row gap-6 font-sans">
        <div className="lg:w-4/5 w-full">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">{portfolioName}</h2>
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="max-h-96 overflow-y-auto overflow-x-auto">
              <table className="w-full table-fixed text-sm text-gray-700">
                <thead className="bg-gray-50 sticky top-0 z-10">
                  <tr>
                    <th className="border-b p-3 text-left w-24">Ticker</th>
                    <th className="border-b p-3 text-left w-[400px]">Name</th>
                    <th className="border-b p-3 text-left w-32">Type</th>
                  </tr>
                </thead>
                <tbody>
                  {assets.map((asset) => (
                    <tr key={asset.ticker} className="hover:bg-gray-50">
                      <td className="border-t p-3">{asset.ticker}</td>
                      <td className="border-t p-3">{asset.name}</td>
                      <td className="border-t p-3">{asset.allocation}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="lg:w-1/5 w-full mt-20">
          <Chart apiUrl="" description="" />
        </div>
      </div>
      <YearlyValueChart title="Portfolio Growth" modelId={benchmark} api="apiForAnnual" />
      <ChartBar title="Annual Returns"/>
      <ReusableTable 
        rows={rollingRetunsData} 
        title='Rolling Returns'
        columns={[
          { id: "year", header: "Total Year", align: "left" },
          { id: "return", header: "Returns", align: "right" }
        ]}
      />
      <ReusableTable 
        rows={annualReturnData.map(item => ({ ...item }))} 
        title='Annual Returns'
        columns={[
          { id: "year", header: "Year", align: "left" },
          { id: "value", header: "Value", align: "right" }
        ]}
      />
    </div>
  );
};

export default PortfolioDetailSection;