import React from "react";

export interface TableColumn {
  id: string;
  header: string;
  align?: 'left' | 'right' | 'center';
}

export interface TableRow {
  [key: string]: string | number;
}

export interface ReusableTableProps {
  title: string;
  columns: TableColumn[];
  rows: TableRow[];
  className?: string;
}

const ReusableTable: React.FC<ReusableTableProps> = ({ 
  title, 
  columns, 
  rows, 
  className = "" 
}) => {
  return (
    <div className={`w-4/5 mx-auto p-4 md:p-6 rounded-xl shadow-lg bg-white ${className}`}>
      <h2 className="text-blue-600 font-semibold text-xl mb-4">{title}</h2>
      <div className="overflow-x-auto max-w-full">
        <table className="w-full border-collapse text-sm table-auto">
          <thead>
            <tr className="bg-gray-100">
              {columns.map((column) => (
                <th 
                  key={column.id} 
                  className={`px-3 md:px-6 py-3 border-b-2 border-gray-200 text-${column.align || 'left'} font-semibold tracking-wider text-gray-700`}
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {rows.map((row, rowIndex) => (
              <tr key={rowIndex} className="hover:bg-blue-50 transition-colors duration-150">
                {columns.map((column) => (
                  <td 
                    key={`${rowIndex}-${column.id}`} 
                    className={`px-3 md:px-6 py-3 md:py-4 text-${column.align || 'left'} break-words`}
                  >
                    {row[column.id] ?? "-"}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {rows.length === 0 && (
        <div className="text-center py-8 text-gray-500">No data available</div>
      )}
    </div>
  );
};

export default ReusableTable;
