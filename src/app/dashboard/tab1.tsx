'use client'
import React from 'react';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { CCRR } from '@/components/component/ccrr';
import  DataTable  from "@/app/dashboard/data-table"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import CustomCalendar from "@/app/dashboard/custom-calendar"

export default function Tab1(props) {
    const tags = Array.from({ length: 50 }).map(
        (_, i, a) => `v1.2.0-beta.${a.length - i}`
      )
    return (
        <div className="flex h-screen">
            <div className="w-3/5 p-4">
                <CustomCalendar  data={props.calendarData}/>
            </div>
            <div className="w-2/5 p-4">
                <DataTable transactions={props.transactions} setTransactions={props.setTransactions} />
            </div>
        </div>
    )
}