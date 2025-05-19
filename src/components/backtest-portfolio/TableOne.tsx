import React from "react";

interface MetricData {
  metric: string;
  portfolio: string;
  benchmark: string;
}

interface RiskReturnTableProps {
  data: MetricData[];
  title: string;
}

export const metrics = [
  { metric: "Arithmetic Mean (monthly)", portfolio: "0.64%", benchmark: "0.84%" },
  { metric: "Arithmetic Mean (annualized)", portfolio: "7.92%", benchmark: "10.56%" },
  { metric: "Geometric Mean (monthly)", portfolio: "0.59%", benchmark: "0.74%" },
  { metric: "Geometric Mean (annualized)", portfolio: "7.27%", benchmark: "9.24%" },
  { metric: "Standard Deviation (monthly)", portfolio: "3.17%", benchmark: "4.47%" },
  { metric: "Standard Deviation (annualized)", portfolio: "10.98%", benchmark: "15.50%" },
  { metric: "Downside Deviation (monthly)", portfolio: "2.13%", benchmark: "2.98%" },
  { metric: "Maximum Drawdown", portfolio: "-39.59%", benchmark: "-50.97%" },
  { metric: "Benchmark Correlation", portfolio: "0.95", benchmark: "1.00" },
  { metric: "Beta", portfolio: "0.67", benchmark: "1.00" },
  { metric: "Alpha (annualized)", portfolio: "0.86%", benchmark: "-0.00%" },
  { metric: "R²", portfolio: "90.03%", benchmark: "100.00%" },
  { metric: "Sharpe Ratio", portfolio: "0.50", benchmark: "0.51" },
  { metric: "Sortino Ratio", portfolio: "0.71", benchmark: "0.74" },
  { metric: "Treynor Ratio (%)", portfolio: "8.14", benchmark: "7.91" },
  { metric: "Calmar Ratio", portfolio: "0.55", benchmark: "0.93" },
  { metric: "Modigliani–Modigliani Measure", portfolio: "9.89%", benchmark: "10.08%" },
  { metric: "Active Return", portfolio: "-1.97%", benchmark: "N/A" },
  { metric: "Tracking Error", portfolio: "6.15%", benchmark: "N/A" },
  { metric: "Information Ratio", portfolio: "-0.32", benchmark: "N/A" },
  { metric: "Skewness", portfolio: "-0.73", benchmark: "-0.56" },
  { metric: "Excess Kurtosis", portfolio: "1.89", benchmark: "0.80" },
  { metric: "Historical Value-at-Risk (5%)", portfolio: "5.08%", benchmark: "7.73%" },
  { metric: "Analytical Value-at-Risk (5%)", portfolio: "4.67%", benchmark: "6.52%" },
  { metric: "Conditional Value-at-Risk (5%)", portfolio: "7.18%", benchmark: "9.86%" },
  { metric: "Upside Capture Ratio (%)", portfolio: "68.22", benchmark: "100.00" },
  { metric: "Downside Capture Ratio (%)", portfolio: "68.24", benchmark: "100.00" },
  { metric: "Safe Withdrawal Rate", portfolio: "6.77%", benchmark: "7.13%" },
  { metric: "Perpetual Withdrawal Rate", portfolio: "4.49%", benchmark: "6.23%" },
  { metric: "Positive Periods", portfolio: "220 out of 340 (64.71%)", benchmark: "219 out of 340 (64.41%)" },
  { metric: "Gain/Loss Ratio", portfolio: "0.91", benchmark: "0.88" },
];



const RiskReturnTable: React.FC<RiskReturnTableProps> = ({ data, title }) => {
  return (
    <div className="p-4 rounded-lg shadow-md bg-white">
      <h2 className="text-blue-600 font-semibold text-lg mb-4">{title}</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-black text-sm">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="border px-4 py-2 text-left">Metric</th>
              <th className="border px-4 py-2 text-right">Portfolio 1</th>
              <th className="border px-4 py-2 text-right">Vanguard 500 Index Investor</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, idx) => (
              <tr key={idx} className="hover:bg-gray-50">
                <td className="border px-4 py-2 font-semibold">{item.metric}</td>
                <td className="border px-4 py-2 text-right">{item.portfolio}</td>
                <td className="border px-4 py-2 text-right">{item.benchmark}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RiskReturnTable;
