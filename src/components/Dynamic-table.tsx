"use client"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface ColumnGroup {
  id: string
  title: string
  colspan: number
}

interface Column {
  id: string
  title: string
  groupId?: string
  accessor: string
  format?: (value: any) => string
  align?: "left" | "center" | "right"
}

interface TableData {
  [key: string]: any
}

interface DynamicDataTableProps {
  title?: string
  data: TableData[]
  columnGroups?: ColumnGroup[]
  columns: Column[]
  footerText?: string
  className?: string
}

export default function DynamicDataTable({
  title,
  data,
  columnGroups = [],
  columns,
  footerText,
  className = "",
}: DynamicDataTableProps) {
  // Group columns by their groupId
  const groupedColumns = columns.reduce(
    (acc, column) => {
      if (column.groupId) {
        if (!acc[column.groupId]) {
          acc[column.groupId] = []
        }
        acc[column.groupId].push(column)
      }
      return acc
    },
    {} as Record<string, Column[]>,
  )

  // Get columns that don't belong to any group
  const ungroupedColumns = columns.filter((column) => !column.groupId)

  // Format cell value based on column format function or default to the raw value
  const formatCellValue = (column: Column, rowData: TableData) => {
    const value = getNestedValue(rowData, column.accessor)
    if (column.format) {
      return column.format(value)
    }
    return value
  }

  // Helper function to get nested values using dot notation (e.g., "totalReturn.threeMonth")
  const getNestedValue = (obj: any, path: string) => {
    return path.split(".").reduce((prev, curr) => {
      return prev ? prev[curr] : null
    }, obj)
  }

  // Determine if we need a two-row header (when we have column groups)
  const hasTwoRowHeader = columnGroups.length > 0

  return (
    <Card className={`w-full ${className}`}>
      {title && (
        <CardHeader>
          <CardTitle className="text-xl font-bold text-primary">{title}</CardTitle>
        </CardHeader>
      )}
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              {/* First row of headers (column groups) */}
              {hasTwoRowHeader && (
                <TableRow>
                  {/* Add cells for ungrouped columns that span both rows */}
                  {ungroupedColumns.map((column) => (
                    <TableHead key={column.id} rowSpan={2} className="align-bottom">
                      {column.title}
                    </TableHead>
                  ))}

                  {/* Add column group headers */}
                  {columnGroups.map((group) => (
                    <TableHead key={group.id} colSpan={group.colspan} className="text-center border-b">
                      {group.title}
                    </TableHead>
                  ))}
                </TableRow>
              )}

              {/* Second row of headers (or first row if no column groups) */}
              <TableRow>
                {/* If no column groups, show all columns */}
                {!hasTwoRowHeader &&
                  columns.map((column) => (
                    <TableHead key={column.id} className={`text-${column.align || "left"}`}>
                      {column.title}
                    </TableHead>
                  ))}

                {/* If column groups exist, only show grouped columns in the second row */}
                {hasTwoRowHeader &&
                  columnGroups.map((group) =>
                    groupedColumns[group.id]?.map((column) => (
                      <TableHead key={column.id} className={`text-${column.align || "center"}`}>
                        {column.title}
                      </TableHead>
                    )),
                  )}
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((row, rowIndex) => (
                <TableRow key={rowIndex}>
                  {columns.map((column) => (
                    <TableCell key={`${rowIndex}-${column.id}`} className={`text-${column.align || "left"}`}>
                      {formatCellValue(column, row)}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        {footerText && <p className="text-sm text-muted-foreground mt-4">{footerText}</p>}
      </CardContent>
    </Card>
  )
}
