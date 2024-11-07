"use client"

import * as React from "react"
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { ArrowUpDown, ChevronDown, MoreHorizontal, Plus } from "lucide-react"
import ExtendedTableOptions from './columns';
import { Button } from "@/components/ui/button"
// import { Checkbox } from "@/components/ui/checkbox"
// import {
//   DropdownMenu,
//   DropdownMenuCheckboxItem,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Payment, columns } from "./columns"
import TransactionDialog from '@/app/dashboard/transaction-dailog';
// import { set } from "date-fns";

const data: Payment[] = [
  {
    id: "t1",
    type: "income",
    name: "Salary",
    amount: 3500,
    frequency: "monthly",
    day: "1"
  },
  {
    id: "t2",
    type: "expense",
    name: "Rent",
    amount: 1200,
    frequency: "monthly",
    day: "1"
  },
  {
    id: "t3",
    type: "transfer",
    name: "Savings",
    amount: 500,
    frequency: "bi-weekly",
    day: "1"
  },
  {
    id: "t4",
    type: "expense",
    name: "Groceries",
    amount: 150,
    frequency: "weekly",
    day: "1"
  },
  {
    id: "t5",
    type: "income",
    name: "Freelance Work",
    amount: 800,
    frequency: "one-time",
    day: "1"
  },
  {
    id: "t6",
    type: "expense",
    name: "Utilities",
    amount: 200,
    frequency: "monthly",
    day: "1"
  },
  {
    id: "t7",
    type: "income",
    name: "Dividend",
    amount: 100,
    frequency: "semi-monthly",
    day: "1" 
  },
  {
    id: "t8",
    type: "expense",
    name: "Car Payment",
    amount: 350,
    frequency: "monthly",
    day: "1"
  },
  {
    id: "t9",
    type: "transfer",
    name: "Investment",
    amount: 1000,
    frequency: "monthly",
    day: "1"
  },
  {
    id: "t10",
    type: "expense",
    name: "Subscription",
    amount: 15,
    frequency: "monthly",
    day: "1"
  }
];


export default function DataTable() {
  const [open, setOpen] = React.useState(false)
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})


  const handleEditTransaction = (row) => {
    console.log(row)
    setOpen(true)
  }

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
    initialState: {
      pagination: {
        pageSize: 5,
      },
    },
    handleEditTransaction: handleEditTransaction
  }as ExtendedTableOptions<Payment>)

  const handleToggle = () => {
    setOpen(!open)
  }

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter transactions..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <TooltipProvider delayDuration={300}>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button className="ml-auto" variant="default" onClick={handleToggle}>
              <Plus />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Create Transaction</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <TransactionDialog open={open} setOpen={setOpen}/>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}
