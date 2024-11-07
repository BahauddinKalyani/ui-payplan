'use client'
import React from 'react';
import { Calendar } from "@/components/ui/calendar";

// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { CCRR } from '@/components/component/ccrr';
import { Payment, columns } from "./columns"
// import { DataTableDemo } from "./data-table-demo"
import  DataTable  from "@/app/dashboard/data-table"

export default function Tab1() {
    const [date, setDate] = React.useState<Date | undefined>(new Date())
    return (
        <div className="flex h-screen">
            <div className="w-3/5 p-4"> {/* 60% width */}
                <CCRR/>
            </div>
            <div className="w-2/5 p-4"> {/* 40% width */}
                <DataTable />
            </div>
        </div>
    )
}