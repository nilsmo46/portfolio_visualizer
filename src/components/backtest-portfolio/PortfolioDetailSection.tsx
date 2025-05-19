import React from 'react';
// import PortfolioEditModal from './PortfolioEditModal';
// import PortfolioSaveModal from './PortfolioSaveModal';
import { Chart } from "@/components/charts/PieChart";
import YearlyValueChart from "@/components/area-chart/AreaChart";
import ChartBar from "@/components/bar-chart/BarChart";
import RiskReturnTable from '@/components/backtest-portfolio/TableOne';

interface Asset {
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

interface PortfolioLegendProps {
  assets: Asset[];
  colors: Record<string, string>;
}

interface PortfolioDetailSectionProps {
  portfolio: Portfolio;
  metrics: Metrics;
  benchmark: string;
  tickerData: Asset[];
}

const colorMap: Record<string, string> = {
  'VTSMX': 'bg-blue-700',
  'VGTSX': 'bg-green-400',
  'VGSIX': 'bg-gray-400',
  'VBMFX': 'bg-gray-700',
};

const PortfolioLegend: React.FC<PortfolioLegendProps> = ({ assets, colors }) => (
  <div className="mt-4 text-xs flex justify-center align-center gap-2">
    {assets.length > 0 && (
      <>
        <div>
          {assets.slice(0, Math.ceil(assets.length / 2)).map((asset) => (
            <div key={asset.ticker} className="flex items-center mb-1">
              <span className={`inline-block w-3 h-3 ${colors[asset.ticker] || 'bg-gray-300'} mr-2`}></span>
              {asset.name}
            </div>
          ))}
        </div>
        <div>
          {assets.slice(Math.ceil(assets.length / 2)).map((asset) => (
            <div key={asset.ticker} className="flex items-center mb-1">
              <span className={`inline-block w-3 h-3 ${colors[asset.ticker] || 'bg-gray-300'} mr-2`}></span>
              {asset.name}
            </div>
          ))}
        </div>
      </>
    )}
  </div>
);

const PortfolioDetailSection: React.FC<PortfolioDetailSectionProps> = ({ portfolio, metrics, benchmark, tickerData }) => {
  const assets = tickerData;
  const portfolioName = portfolio?.name || 'Portfolio 1';

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start p-6 font-sans">
        <div>
          <h2 className="text-xl font-bold mb-4">{portfolioName}</h2>
          <div className='max-h-96 overflow-y-auto'>
          <table className="border border-gray-300 w-full">
            <thead>
              <tr>
                <th className="border p-2 w-24">Ticker</th>
                <th className="border p-2 w-[400px]">Name</th>
                <th className="border p-2 w-32">Type</th>
              </tr>
            </thead>
            <tbody>
              {assets.map((asset) => (
                <tr key={asset.ticker}>
                  <td className="border p-2">{asset.ticker}</td>
                  <td className="border p-2">{asset.name}</td>
                  <td className="border p-2">{asset.allocation}%</td>
                </tr>
              ))}
            </tbody>
          </table>
            </div>
          {/* <div className="mt-4 flex">
            
            <PortfolioSaveModal />
          </div> */}
        </div>

        <div>
          <Chart apiUrl="" description="">
            <PortfolioLegend assets={assets} colors={colorMap} />
          </Chart>
        </div>
      </div>

      <YearlyValueChart title="Portfolio Growth" modelId={benchmark} api="apiForAnnual" />
      <ChartBar title="Annual Returns"/>
      <RiskReturnTable data={Array.isArray(metrics) ? metrics : []} title='Risk and Return Metrics (Demo Portfolio vs Benchmark)' />
    </div>
  );
};

export default PortfolioDetailSection;