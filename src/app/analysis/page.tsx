"use client"
import React, { Suspense, useEffect, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { analysisFunction } from '@/constants/Analysis';
import Link from 'next/link';
import AnalysisCard from '@/components/analysis/Card';
import axios from '@/lib/axios';
import Loader from '@/components/Loader';
import { baseURL } from '@/constants';
import ProtectedRoute from '@/components/Protected-Route';

interface AnalysisFunction {
    name: string;
    href: string;
}

interface Service {
    id: string;
    name: string;
    desc: string;
    daysToRefresh?: number;
    benchmark?: string;
    niceName?: string;
    quantile_threshold?: string;
    max_wt?: string;
    wt_scheme?: string;
    opt_objective?: string;
    default_model?: string;
}

const Analysis: React.FC = () => {
    const pathname = usePathname();
    
    return (
        <ProtectedRoute>
            <Suspense fallback={<div className="flex justify-center items-center h-screen">Loading...</div>}>
                <Content pathname={pathname} />
            </Suspense>
        </ProtectedRoute>
    );
};

const Content: React.FC<{ pathname: string }> = ({ pathname }) => {
    const searchParams = useSearchParams();
    const [serviceAnalysis, setServiceAnalysis] = useState<Service[]>([]);
    const [loading, setLoading] = useState(false);

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

    const fetchAllStrategy = async() => {
        try {
            const res = await axios.get<{ strategies: Service[] }>(`${baseURL}/strategy/all`);
            console.log(res.data);
            if (Array.isArray(res.data)) {
                setServiceAnalysis(res.data.map((strategy: Service) => ({
                    id: strategy.id,
                    name: strategy.name,
                    desc: strategy.desc || "No description available",
                    daysToRefresh: strategy.daysToRefresh || 0,
                    benchmark: strategy.benchmark || "N/A",
                    niceName: strategy.niceName,
                    quantile_threshold: strategy.quantile_threshold  || "N/A"  
                })));
            }
        } catch (error) {
            console.error("Failed to fetch strategies:", error);
        }
    }

    useEffect(() => {
        setLoading(true);
        fetchAllStrategy()
          .finally(() => setLoading(false));
    }, []);

    if (loading) {
        return <Loader customMessage="Loading analysis data..." />;
    }

    return (
        <div className="min-h-screen bg-gray-50 p-6 md:p-10">
            <header className="mb-8">
                <h1 className="text-3xl font-bold text-gray-800">Analysis Dashboard</h1>
                <p className="text-gray-600">Explore various analysis models and solutions.</p>
            </header>

            <div className='flex flex-col md:flex-row gap-8'>
                <aside className="md:w-1/4 lg:w-1/5 bg-white p-6 rounded-lg shadow">
                    <h3 className="text-xl font-semibold text-gray-700 mb-4">Select Solutions For</h3>
                    <nav className="space-y-2">
                        {analysisFunction.map((analysis: AnalysisFunction, index) => {
                            const isActive = pathname === '/analysis'+analysis.href || searchParams.get('page') === analysis.href.substring(1);
                            return (
                                <Link
                                    key={index}
                                    href={`/analysis${analysis.href}`}
                                    className={`block w-full py-2.5 px-4 text-left rounded-md font-medium text-base transition-colors duration-150
                                        ${isActive 
                                            ? "bg-blue-600 text-white shadow-sm" 
                                            : "bg-gray-100 text-gray-700 hover:bg-gray-200 hover:text-gray-900"}`}
                                >
                                    {analysis.name}
                                </Link>
                            );
                        })}
                    </nav>
                </aside>

                <main className="flex-1">
                    <h2 className="text-2xl font-semibold text-gray-700 mb-6">Available Models</h2>
                    {serviceAnalysis.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {serviceAnalysis.map((service, index) => (
                                <AnalysisCard 
                                    key={service.id || index}
                                    name={service.name} 
                                    details={service.desc} 
                                    link={service.name} 
                                    daysToRefresh={service.daysToRefresh}
                                    benchmark={service.benchmark}
                                    niceName={service.niceName as string}
                                    quantile_threshold={service.quantile_threshold as string}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-10">
                            <p className="text-gray-500 text-lg">No analysis models available at the moment.</p>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
};

export default Analysis;