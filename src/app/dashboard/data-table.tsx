"use client"

import * as React from "react"
import {
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
import { Plus } from "lucide-react"
import ExtendedTableOptions from './columns';
import { Button } from "@/components/ui/button"
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
import { transactionAPI } from "@/api/transactionAPI";
import { useToast } from '@/hooks/use-toast';
import DeleteAlertDialog  from '@/app/dashboard/delete-alert'
// import { set } from "date-fns";


interface DataTableProps {
  transactions: Payment[];
  setTransactions: React.Dispatch<React.SetStateAction<Payment[]>>;
}

export default function DataTable(props: DataTableProps) {

  const [openTransactionForm, setOpenTransactionForm] = React.useState(false)

  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [ showDeleteAlert, setShowDeleteAlert ] = React.useState(false)
  const [rowToDelete, setRowToDelete] = React.useState<{ original: Payment } | null>(null)
  const { toast } = useToast()
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})

  const [initialValues, setInitialValues] = React.useState<object | null>(null)
  
  const handleEditTransaction = (row: any) => {
    setOpenTransactionForm(true)
    setInitialValues(row.original);
  }

  const handleDeleteTransaction = (row: any) => {
    setShowDeleteAlert(true);
    setRowToDelete(row);
  }

  const delete_transaction = () => { 
    try {
      if (rowToDelete) {
        transactionAPI.delete_transaction(rowToDelete.original.id)
        .then(() => {
          props.setTransactions(props.transactions.filter((item) => item.id !== rowToDelete.original.id))
        })
      }
      toast({
        title: "Success",
        description: "Transaction deleted successfully.",
        variant: "success",
      })
    } catch (error) { 
      toast({
        title: "Error",
        description: "Transaction deletion failed. "+error,
        variant: "destructive",
      })
    }
  }

  const table = useReactTable({
    data:props.transactions,
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
    handleEditTransaction,
    handleDeleteTransaction
  }as ExtendedTableOptions<Payment>)

  const handleToggle = () => {
    setInitialValues(null);
    setOpenTransactionForm(!openTransactionForm)
  }

  return (
    <div className="w-full">
      <DeleteAlertDialog showDeleteAlert={showDeleteAlert} setShowDeleteAlert={setShowDeleteAlert} delete_transaction={delete_transaction}/>
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
      <TransactionDialog openTransactionForm={openTransactionForm} setOpenTransactionForm={setOpenTransactionForm} transactions={props.transactions} setTransactions={props.setTransactions} initialValues={initialValues}/>
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
