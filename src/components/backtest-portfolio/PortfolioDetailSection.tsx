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

// interface PortfolioLegendProps {
//   assets: Asset[];
//   colors: Record<string, string>;
// }

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

// const PortfolioLegend: React.FC<PortfolioLegendProps> = ({ assets, colors }) => (
//   <div className="mt-4 text-xs flex justify-center align-center gap-2">
//     {assets.length > 0 && (
//       <>
//         <div>
//           {assets.slice(0, Math.ceil(assets.length / 2)).map((asset) => (
//             <div key={asset.ticker} className="flex items-center mb-1">
//               <span className={`inline-block w-3 h-3 ${colors[asset.ticker] || 'bg-gray-300'} mr-2`}></span>
//               {asset.name}
//             </div>
//           ))}
//         </div>
//         <div>
//           {assets.slice(Math.ceil(assets.length / 2)).map((asset) => (
//             <div key={asset.ticker} className="flex items-center mb-1">
//               <span className={`inline-block w-3 h-3 ${colors[asset.ticker] || 'bg-gray-300'} mr-2`}></span>
//               {asset.name}
//             </div>
//           ))}
//         </div>
//       </>
//     )}
//   </div>
// );

const PortfolioDetailSection: React.FC<PortfolioDetailSectionProps> = ({ portfolio, metrics, benchmark, tickerData }) => {
  const assets = tickerData;
  const portfolioName = portfolio?.name || 'Portfolio 1';

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row gap-6 p-6 font-sans">
        <div className="lg:w-4/5 w-full">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">{portfolioName}</h2>
          <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
            <div className="max-h-96 overflow-y-auto">
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
          <div className="bg-white rounded-lg shadow-md p-4 border border-gray-200 flex-1 min-w-[300px] items-center justify-center">
            <Chart apiUrl="" description="" />
          </div>
        </div>
      </div>
      <YearlyValueChart title="Portfolio Growth" modelId={benchmark} api="apiForAnnual" />
      <ChartBar title="Annual Returns"/>
      <RiskReturnTable data={Array.isArray(metrics) ? metrics : []} title='Risk and Return Metrics (Demo Portfolio vs Benchmark)' />
    </div>
  );
};

export default PortfolioDetailSection;