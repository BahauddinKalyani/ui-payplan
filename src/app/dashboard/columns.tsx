"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
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
    date_of_transaction: string
    date_of_second_transaction: string
    day: string
    skip_end_date: boolean
    last_day_of_month: boolean
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
        // const payment = row.original
  
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
              <DropdownMenuItem onClick={()=> (table.options as ExtendedTableOptions<Payment>).handleEditTransaction?.(row)} ><SquarePen /> Edit</DropdownMenuItem>
              <DropdownMenuItem onClick={()=> (table.options as ExtendedTableOptions<Payment>).handleDeleteTransaction?.(row)}><Trash2 /> Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ]

interface ExtendedTableOptions<T> extends TableOptions<T> {
    handleEditTransaction?: (value: object) => void;
    handleDeleteTransaction?: (value: object) => void;
}

export default ExtendedTableOptions