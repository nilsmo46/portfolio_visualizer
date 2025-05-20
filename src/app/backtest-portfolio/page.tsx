/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"
import { useSearchParams } from 'next/navigation';
import Sidebar from "@/components/backtest-portfolio/Sidebar"
import { Button } from "@/components/ui/button"
import { ExternalLink, FileText, FileSpreadsheet } from "lucide-react";
import React, { Suspense, useEffect, useState } from 'react'; 
import axios from '@/lib/axios';
import Loader from '@/components/Loader';
import PortfolioDetailSection, { Asset, Portfolio } from '@/components/backtest-portfolio/PortfolioDetailSection';
import PortfolioEditModal from '@/components/backtest-portfolio/PortfolioEditModal';
import { baseURL } from '@/constants';
import ProtectedRoute from '@/components/Protected-Route';

// Sample metrics data
const metrics = [
  { metric: 'CAGR', portfolio: '9.42%', benchmark: '8.86%' },
  { metric: 'Standard Deviation', portfolio: '9.42%', benchmark: '14.72%' },
  { metric: 'Sharpe Ratio', portfolio: '0.73', benchmark: '0.51' },
  { metric: 'Sortino Ratio', portfolio: '1.06', benchmark: '0.72' },
  { metric: 'Max Drawdown', portfolio: '-30.27%', benchmark: '-50.89%' },
  { metric: 'US Market Correlation', portfolio: '0.96', benchmark: '1.00' },
  { metric: 'Excess Return (Annual)', portfolio: '0.56%', benchmark: '0.00%' },
  { metric: 'Tracking Error', portfolio: '5.91%', benchmark: '0.00%' },
  { metric: 'Information Ratio', portfolio: '0.09', benchmark: 'N/A' },
  { metric: 'Best Year', portfolio: '28.31%', benchmark: '33.35%' },
  { metric: 'Worst Year', portfolio: '-22.24%', benchmark: '-37.04%' }
];

interface RollingReturnData {
  year: string;
  return: unknown;
}

export interface AnnualReturnData {
  year: string;
  value: string;
}

const BacktestPortfolioContent = () => {
  const searchParams = useSearchParams();
  const modelIdFromUrl = searchParams.get('model_id');
  const [loading, setLoading] = useState(true);
  const [portfolioData, setPortfolioData] = useState<Portfolio[]>([]);
  const [tickerData, setTickerData] = useState<Asset[]>([]);

  const [rollingReturn, setRollingReturn] = useState<RollingReturnData[]>([])
  const [annualReturn, setAnnualReturn] = useState<AnnualReturnData[]>([])
  const [portfolioGrowth, setPortfolioGrowth] = useState<any[]>([]) 
  const [stats, setStats] = useState<any[]>([])

  useEffect(() => {
    const makeApiCall = async () => {
      console.log("Hello world");
      try {
        const res = await axios.get(`${baseURL}`);
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    };
    makeApiCall();
    const intervalId = setInterval(makeApiCall, 3000);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const fetchPortfolioData = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${baseURL}/monthly-stats/all?sort={"year":"asc"}&limit=100&offset=0&filter={"model_id": "${modelIdFromUrl}"}`);
        setPortfolioData(res.data);
        const res1 = await axios.get(`${baseURL}/strategy/${modelIdFromUrl}`);
        const rollingReturnFormattedData = Object.entries(res1.data.rolling_returns.returns.returns).map(([key, value]) => ({
          year: key.replace(/_/g, " ").replace("year", "Year"),
          return: value
        }));
        setRollingReturn(rollingReturnFormattedData)

        const annualReturnFormattedData = res1.data.annual_return.map((val: any) => {
          return {
            year: val.year,
            value: val.value
          }
        })
        console.log("okkkk: ", annualReturnFormattedData);
        setAnnualReturn(annualReturnFormattedData)
        setPortfolioGrowth(res1.data.portfolio_growth)
        setStats(res1.data.stats)

        const tickerVal = res1.data.strategy.ticker_strategy_map.map((val: { [x: string]: any; }) => (
          val["ticker"]
        ));
        
        setTickerData(tickerVal);

      } catch (error) {
        console.error("Error fetching portfolio data:", error);
      } finally {
        setLoading(false);
      }
    };
    
    if (modelIdFromUrl) {
      fetchPortfolioData();
    }
  }, [modelIdFromUrl]);

  if (loading) {
    return <Loader customMessage="Loading portfolio data..." />;
  }

  return (
    <div className="flex overflow-hidden">
      <Sidebar />
      <div className="flex flex-col w-full relative overflow-hidden">
        {/* Fixed navbar */}
        <div className="flex justify-end sticky top-0 bg-[#e9ecf3] p-2 items-center border-b rounded-md z-10">
          <PortfolioEditModal />
        </div>
        
        {/* Main content with padding to account for fixed navbar */}
        <div className="p-6 space-y-6 overflow-y-auto">
          <h1 className="text-3xl font-bold">Backtest Portfolio Asset Allocation</h1>
          <div className="flex-col justify-center">
            <div>
              <h2 className="text-2xl font-semibold">Portfolio Backtesting Overview</h2>
              <p className="mt-4 text-base text-gray-700">
                This portfolio backtesting tool allows you to construct one or more portfolios based on the selected mutual funds, ETFs, and stocks. You can analyze and backtest portfolio returns, risk characteristics, style exposures, and drawdowns. The results cover both returns and fund fundamentals based portfolio style analysis along with risk and return decomposition by each portfolio asset. You can compare up to three different portfolios against the selected benchmark, and you can also specify any periodic contribution or withdrawal cashflows and the preferred portfolio rebalancing strategy.
              </p>
              <p className="mt-4 text-base text-gray-700">
                The related <a className="text-blue-600 underline" href="#">asset class level portfolio modeling tool</a> allows you to analyze and compare asset class level portfolios with a longer time horizon starting from 1972, and you can use the <a className="text-blue-600 underline" href="#">dynamic allocation backtest tool</a> to analyze portfolios where assets or their weights have been adjusted over time.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold">
                Portfolio Analysis Results <span className="text-lg">(Jan 1997 - Mar 2025)</span>
              </h2>
              <div className="flex items-center space-x-4 mt-4">
                <Button variant="outline" className="flex items-center space-x-2">
                  <ExternalLink className="w-4 h-4" />
                  <span>Link</span>
                </Button>
                <Button variant="outline" className="flex items-center space-x-2">
                  <FileText className="w-4 h-4" />
                  <span>PDF</span>
                </Button>
                <Button variant="outline" className="flex items-center space-x-2">
                  <FileSpreadsheet className="w-4 h-4" />
                  <span>Excel</span>
                </Button>
              </div>
            </div>

            <div>
              <p className="text-sm mt-6">
                <strong>Note:</strong> The time period was constrained by the available data for Vanguard Real Estate Index Investor (VGSIX) [Jun 1996 - Mar 2025].
              </p>
            </div>
          </div>
          
          {/* Portfolio Detail Section */}
          <PortfolioDetailSection 
            portfolio={portfolioData[0]} 
            metrics={metrics} 
            benchmark={modelIdFromUrl as string}
            tickerData={tickerData}
            rollingRetunsData={rollingReturn}
            annualReturnData={annualReturn}
          />
        </div>
      </div>
    </div>
  );
};

const Page = () => {
  return (
    <ProtectedRoute>
      <Suspense fallback={<div>Loading...</div>}>
        <BacktestPortfolioContent />
      </Suspense>
    </ProtectedRoute>
  );
};

export default Page;