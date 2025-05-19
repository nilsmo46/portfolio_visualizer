import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Info } from 'lucide-react';

const PortfolioEditModal = () => {
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("assets");
  const [allocations, setAllocations] = useState(() => {
    return Array.from({ length: 10 }, (_, rowIdx) => {
      return [0, 1, 2].map(portfolioIdx =>
        getDefaultAllocation({ index: rowIdx + 1, portfolioNumber: portfolioIdx + 1 }) || null
      );
    });
  });
  const [totals, setTotals] = useState([0, 0, 0]);

  useEffect(() => {
    const newTotals = [0, 0, 0];
    allocations.forEach(row => {
      row.forEach((val, idx) => {
        newTotals[idx] += Number(val || 0);
      });
    });
    setTotals(newTotals);
  }, [allocations]);

  const handleAllocationChange = (rowIdx: number, colIdx: number, value: string) => {
    const newAllocations = [...allocations];
    newAllocations[rowIdx] = [...newAllocations[rowIdx]];
    newAllocations[rowIdx][colIdx] = value;
    setAllocations(newAllocations);
  };

  return (
     <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="tertiary" className="mr-2">📝 Edit Portfolio</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[90vw] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl">Portfolio Model Configuration</DialogTitle>
          </DialogHeader>
          
          <Tabs defaultValue="assets" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="w-full grid grid-cols-2">
              <TabsTrigger value="settings">Settings</TabsTrigger>
              <TabsTrigger value="assets">Portfolio Assets</TabsTrigger>
            </TabsList>
            
            <TabsContent value="settings" className="space-y-4 mt-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <span className="text-sm font-medium">Time Period</span>
                  <Info className="w-4 h-4 ml-1 text-gray-500" />
                </div>
                <Select defaultValue="year-to-year">
                  <SelectTrigger className="w-[400px]">
                    <SelectValue placeholder="Select time period" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="year-to-year">Year-to-Year</SelectItem>
                    <SelectItem value="month-to-month">Month-to-Month</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <span className="text-sm font-medium">Start Year</span>
                  <Info className="w-4 h-4 ml-1 text-gray-500" />
                </div>
                <Select defaultValue="1972">
                  <SelectTrigger className="w-[400px]">
                    <SelectValue placeholder="Select start year" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1972">1972</SelectItem>
                    <SelectItem value="1980">1980</SelectItem>
                    <SelectItem value="1990">1990</SelectItem>
                    <SelectItem value="2000">2000</SelectItem>
                    <SelectItem value="2010">2010</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <span className="text-sm font-medium">End Year</span>
                  <Info className="w-4 h-4 ml-1 text-gray-500" />
                </div>
                <Select defaultValue="2025">
                  <SelectTrigger className="w-[400px]">
                    <SelectValue placeholder="Select end year" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2020">2020</SelectItem>
                    <SelectItem value="2021">2021</SelectItem>
                    <SelectItem value="2022">2022</SelectItem>
                    <SelectItem value="2023">2023</SelectItem>
                    <SelectItem value="2024">2024</SelectItem>
                    <SelectItem value="2025">2025</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <span className="text-sm font-medium">Include YTD</span>
                  <Info className="w-4 h-4 ml-1 text-gray-500" />
                </div>
                <Select defaultValue="no">
                  <SelectTrigger className="w-[400px]">
                    <SelectValue placeholder="Include YTD?" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="yes">Yes</SelectItem>
                    <SelectItem value="no">No</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <span className="text-sm font-medium">Initial Amount</span>
                  <Info className="w-4 h-4 ml-1 text-gray-500" />
                </div>
                <div className="flex w-[400px]">
                  <Input type="number" defaultValue="10000" className="flex-grow" />
                  <div className="ml-2 p-2 bg-gray-100 flex items-center justify-center rounded">.00</div>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <span className="text-sm font-medium">Cashflows</span>
                  <Info className="w-4 h-4 ml-1 text-gray-500" />
                </div>
                <Select defaultValue="none">
                  <SelectTrigger className="w-[400px]">
                    <SelectValue placeholder="Select cashflow option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">None</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                    <SelectItem value="quarterly">Quarterly</SelectItem>
                    <SelectItem value="annually">Annually</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <span className="text-sm font-medium">Rebalancing</span>
                  <Info className="w-4 h-4 ml-1 text-gray-500" />
                </div>
                <Select defaultValue="rebalance-annually">
                  <SelectTrigger className="w-[400px]">
                    <SelectValue placeholder="Select rebalancing option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="rebalance-annually">Rebalance annually</SelectItem>
                    <SelectItem value="rebalance-quarterly">Rebalance quarterly</SelectItem>
                    <SelectItem value="rebalance-monthly">Rebalance monthly</SelectItem>
                    <SelectItem value="no-rebalance">No rebalancing</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <span className="text-sm font-medium">Leverage Type</span>
                  <Info className="w-4 h-4 ml-1 text-gray-500" />
                </div>
                <Select defaultValue="none">
                  <SelectTrigger className="w-[400px]">
                    <SelectValue placeholder="Select leverage type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">None</SelectItem>
                    <SelectItem value="fixed">Fixed</SelectItem>
                    <SelectItem value="variable">Variable</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </TabsContent>
            
            <TabsContent value="assets" className="space-y-4 mt-4">
              <div className="mt-6">
                <div className="flex items-center mb-2">
                  <span className="text-sm font-medium mr-2">Asset Allocation</span>
                  <Info className="w-4 h-4 text-gray-500" />
                </div>

                <div className="grid grid-cols-4 gap-4 mb-2 font-medium text-sm">
                  <div>Asset Class</div>
                  <div className="flex items-center">Portfolio #1<Info className="w-4 h-4 ml-1 text-gray-500" /></div>
                  <div className="flex items-center">Portfolio #2<Info className="w-4 h-4 ml-1 text-gray-500" /></div>
                  <div className="flex items-center">Portfolio #3<Info className="w-4 h-4 ml-1 text-gray-500" /></div>
                </div>

                {[...Array(10)].map((_, index) => (
                  <div key={index} className="grid grid-cols-4 gap-4 mb-2">
                    <Select defaultValue={index <= 4 ? getDefaultAssetClass(index + 1) : "select"}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select asset class..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="us-stock">US Stock Market</SelectItem>
                        <SelectItem value="global-stock">Global ex-US Stock Market</SelectItem>
                        <SelectItem value="us-bond">Total US Bond Market</SelectItem>
                        <SelectItem value="reit">REIT</SelectItem>
                        <SelectItem value="select">Select asset class...</SelectItem>
                      </SelectContent>
                    </Select>

                    {[0, 1, 2].map(colIdx => (
                      <div key={colIdx} className="flex">
                        <Input
                          type="number"
                          value={Number(allocations[index][colIdx] ?? getDefaultAllocation({ index: index + 1, portfolioNumber: colIdx + 1 }))}
                          onChange={(e) => handleAllocationChange(index, colIdx, e.target.value)}
                          className="flex-grow"
                        />
                        <div className="ml-2 p-2 bg-gray-100 flex items-center justify-center rounded">%</div>
                      </div>
                    ))}
                  </div>
                ))}

                <div className="grid grid-cols-4 gap-4 mt-4">
                  <div className="font-medium">Total</div>
                  {[0, 1, 2].map((col) => (
                    <div key={col} className="flex">
                      <Input
                        type="number"
                        value={totals[col]}
                        disabled
                        className="flex-grow bg-green-50"
                      />
                      <div className="ml-2 p-2 bg-gray-100 flex items-center justify-center rounded">%</div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
          
          <div className="flex justify-start mt-6 space-x-2">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">Analyze Portfolios</Button>
            <Button variant="outline">Cancel</Button>
          </div>
        </DialogContent>
      </Dialog>
  );
};

// Helper functions to set default values based on index
interface AssetClassParams {
    index: number;
}

function getDefaultAssetClass(index: AssetClassParams['index']): string {
    switch (index) {
        case 1: return "us-stock";
        case 2: return "global-stock";
        case 3: return "us-bond";
        case 4: return "reit";
        default: return "select";
    }
}

interface AllocationParams {
    index: number;
    portfolioNumber: number;
}

function getDefaultAllocation({ index, portfolioNumber }: AllocationParams): string {
    if (portfolioNumber === 1) {
        switch (index) {
            case 1: return "60";
            case 2: return "";
            case 3: return "40";
            case 4: return "";
            default: return "";
        }
    } else if (portfolioNumber === 2) {
        switch (index) {
            case 1: return "40";
            case 2: return "20";
            case 3: return "30";
            case 4: return "10";
            default: return "";
        }
    }
    return "";
}

export default PortfolioEditModal;