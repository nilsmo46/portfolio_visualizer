import DynamicDataTable from "../Dynamic-table"

type TableDynamicProps = {
    title: string;
};

const columnGroups = [
    { id: "totalReturn", title: "Total Return", colspan: 2 },
    { id: "annualizedReturn", title: "Annualized Return", colspan: 5 },
    { id: "annualizedStdDev", title: "Annualized Standard Deviation", colspan: 2 },
  ]

  const columns = [
    {
      id: "name",
      title: "Name",
      accessor: "name",
    },
    {
      id: "threeMonth",
      title: "3 Month",
      groupId: "totalReturn",
      accessor: "totalReturn.threeMonth",
      format: (value: number) => `${value.toFixed(2)}%`,
      align: "right" as const,
    },
    {
      id: "ytd",
      title: "Year To Date",
      groupId: "totalReturn",
      accessor: "totalReturn.yearToDate",
      format: (value: number) => `${value.toFixed(2)}%`,
      align: "right" as const,
    },
    {
      id: "oneYear",
      title: "1 year",
      groupId: "annualizedReturn",
      accessor: "annualizedReturn.oneYear",
      format: (value: number) => `${value.toFixed(2)}%`,
      align: "right" as const,
    },
    {
      id: "threeYear",
      title: "3 year",
      groupId: "annualizedReturn",
      accessor: "annualizedReturn.threeYear",
      format: (value: number) => `${value.toFixed(2)}%`,
      align: "right" as const,
    },
    {
      id: "fiveYear",
      title: "5 year",
      groupId: "annualizedReturn",
      accessor: "annualizedReturn.fiveYear",
      format: (value: number) => `${value.toFixed(2)}%`,
      align: "right" as const,
    },
    {
      id: "tenYear",
      title: "10 year",
      groupId: "annualizedReturn",
      accessor: "annualizedReturn.tenYear",
      format: (value: number) => `${value.toFixed(2)}%`,
      align: "right" as const,
    },
    {
      id: "full",
      title: "Full",
      groupId: "annualizedReturn",
      accessor: "annualizedReturn.full",
      format: (value: number) => `${value.toFixed(2)}%`,
      align: "right" as const,
    },
    {
      id: "threeYearStdDev",
      title: "3 year",
      groupId: "annualizedStdDev",
      accessor: "annualizedStandardDeviation.threeYear",
      format: (value: number) => `${value.toFixed(2)}%`,
      align: "right" as const,
    },
    {
      id: "fiveYearStdDev",
      title: "5 year",
      groupId: "annualizedStdDev",
      accessor: "annualizedStandardDeviation.fiveYear",
      format: (value: number) => `${value.toFixed(2)}%`,
      align: "right" as const,
    },
  ]

  const portfolioData = [
    {
      name: "Portfolio 1",
      totalReturn: {
        threeMonth: 0.24,
        yearToDate: 0.24,
      },
      annualizedReturn: {
        oneYear: 6.76,
        threeYear: 4.28,
        fiveYear: 10.18,
        tenYear: 6.76,
        full: 7.28,
      },
      annualizedStandardDeviation: {
        threeYear: 13.77,
        fiveYear: 12.8,
      },
    },
    {
      name: "Vanguard 500 Index Investor",
      totalReturn: {
        threeMonth: -4.31,
        yearToDate: -4.31,
      },
      annualizedReturn: {
        oneYear: 8.1,
        threeYear: 8.91,
        fiveYear: 18.43,
        tenYear: 12.35,
        full: 9.29,
      },
      annualizedStandardDeviation: {
        threeYear: 17.31,
        fiveYear: 16.9,
      },
    },
  ]


export default function TableDynamic({ title }: TableDynamicProps) {

    return (
        <div className="p-6">
            <DynamicDataTable
                title={title}
                data={portfolioData}
                columnGroups={columnGroups}
                columns={columns}
                footerText="Trailing return and volatility are as of last calendar month ending March 2025"
            />
        </div>
    )
}
