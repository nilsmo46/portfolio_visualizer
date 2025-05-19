import Link from 'next/link';

interface AnalysisCardProps {
    name: string;
    details: string;
    link: string;
    daysToRefresh?: number;
    benchmark?: string;
    niceName: string;
    quantile_threshold: string
}

const AnalysisCard: React.FC<AnalysisCardProps> = ({ name, details, link, daysToRefresh, benchmark, niceName, quantile_threshold }) => {
    return (
        <div className="bg-white p-8 rounded-xl shadow-lg max-w-md border border-gray-200">
            <h2 className="text-2xl font-semibold text-gray-800 mb-3">{name}</h2>
            <hr className="border-gray-200" />
            
            <p className="text-gray-600 mb-2 text-sm leading-relaxed">{details}</p>
            
            {daysToRefresh !== undefined && (
                <p className="text-sm text-gray-500">Days to Refresh: {daysToRefresh}</p>
            )}
            {benchmark && (
                <p className="text-sm text-gray-500 mt-1">Benchmark: {benchmark}</p>
            )}
            {niceName && (
                <p className="text-sm text-gray-500 mt-1">niceName: {niceName}</p>
            )}
            {quantile_threshold && (
                <p className="text-sm text-gray-500 mt-1">Quantile_Thresold: {quantile_threshold}</p>
            )}
            
            <div className="mt-2">
                <Link 
                    href={`backtest-portfolio?model_id=${link}`}
                    className="inline-block px-6 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 transition-colors duration-150 ease-in-out"
                >
                    View Details &raquo; 
                </Link>
            </div>
        </div>
    );
};

export default AnalysisCard;