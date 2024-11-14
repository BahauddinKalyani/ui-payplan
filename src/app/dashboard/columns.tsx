"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Trash2, SquarePen } from "lucide-react"
import { TableOptions } from '@tanstack/react-table';

export type Payment = {
    id: string
    // user_id: string
    type: "income" | "expense" | "transfer"
    name: string
    amount: number
    frequency: "one-time" | "weekly" | "bi-weekly" | "monthly" | "semi-monthly"
    start_date: string
    end_date: string
    due_date: string
    auto_deduct: string
    day: string
    next_pay_date: string
  }

export const columns: ColumnDef<Payment>[] = [
    {
      accessorKey: "type",
      header: "Transaction Type",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("type")}</div>
      ),
    },
    {
        accessorKey: "name",
        header: "Transaction Name",
        cell: ({ row }) => (
          <div className="capitalize">{row.getValue("name")}</div>
        ),
    },
    {
        accessorKey: "amount",
        header: "Amount",
        cell: ({ row }) => (
          <div className="capitalize">{row.getValue("amount")}</div>
        ),
    },
    {
        accessorKey: "frequency",
        header: "Frequency",
        cell: ({ row }) => (
          <div className="capitalize">{row.getValue("frequency")}</div>
        ),
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ table ,row }) => {
  
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {/* <DropdownMenuLabel>Actions</DropdownMenuLabel> */}
              <DropdownMenuItem onClick={()=> table.options.handleEditTransaction(row)} ><SquarePen /> Edit</DropdownMenuItem>
              <DropdownMenuItem onClick={()=> table.options.handleDeleteTransaction(row)}><Trash2 /> Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ]

interface ExtendedTableOptions<T> extends TableOptions<T> {
    handleEditTransaction?: (value: object) => void;
    handleDeleteTransaction?: (value: string) => void;
}

export default ExtendedTableOptions