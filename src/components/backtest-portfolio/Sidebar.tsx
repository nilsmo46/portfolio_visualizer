"use client"
import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; 
import { 
  Eye, Calendar, BarChart2, TrendingUp, PieChart, ArrowDown, Briefcase
} from 'lucide-react';

const menuItems = [
    { id: 1, name: 'Summary', icon: Eye, path: '#summary' }, 
    { id: 2, name: 'Exposures', icon: PieChart, path: '#exposures' }, 
    { id: 3, name: 'Active Returns', icon: TrendingUp, path: '#active-returns' }, 
    { id: 4, name: 'Metrics', icon: BarChart2, path: '#metrics' }, 
    { id: 5, name: 'Annual Returns', icon: Calendar, path: '#annual-returns' }, 
    { id: 6, name: 'Monthly Returns', icon: Calendar, path: '#monthly-returns' }, 
    { id: 7, name: 'Drawdowns', icon: ArrowDown, path: '#drawdowns' }, 
    { id: 8, name: 'Assets', icon: Briefcase, path: '#assets' }, 
    { id: 9, name: 'Rolling Returns', icon: TrendingUp, path: '#rolling-returns' }, 
  ];

const Sidebar = () => {
  const [activeItem, setActiveItem] = useState('Summary');
  const router = useRouter();

  const handleItemClick = (itemName: string, itemPath: string) => {
    setActiveItem(itemName);
    router.push(itemPath); 
  };

  return (
    <div className="h-screen flex items-start mt-4">
      <div className="bg-white w-full rounded-xl py-4 h-[705px] shadow-lg"> 
        <div className="flex items-center justify-between px-4 mb-6">
          <span className="text-slate-600 font-medium text-sm">Minimize Menu</span>
          <button 
            className="p-1.5 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 transition-all duration-150 ease-in-out"
            aria-label="Minimize menu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>
        </div>
        
        <div className="space-y-1.5 px-2"> 
          {menuItems.map((item) => {
            const IconComponent = item.icon;
            const isActive = activeItem === item.name;
            
            return (
              <div
                key={item.id}
                className={`
                  flex items-center px-3 py-2.5 
                  cursor-pointer transition-all duration-200 ease-in-out
                  rounded-lg whitespace-nowrap grou
                  ${
                    isActive 
                      ? 'bg-indigo-50 text-indigo-700 font-medium'
                      : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900 font-normal' 
                  }
                `}
                onClick={() => handleItemClick(item.name, item.path)} 
              >
                <IconComponent 
                  size={18} 
                  className={`
                    mr-3 transition-colors duration-200 ease-in-out
                    ${
                      isActive 
                        ? 'text-indigo-600' // Active icon color harmonized with text
                        : 'text-slate-400 group-hover:text-slate-500'
                    }
                  `} 
                />
                <span> 
                  {item.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;