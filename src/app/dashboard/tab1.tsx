'use client'
import React from 'react';
import  DataTable  from "@/app/dashboard/data-table"
import CustomCalendar from "@/app/dashboard/custom-calendar"
import { Payment } from './columns';

interface Tab1Props {
    calendarData: any;
    transactions: any[];
    setTransactions: React.Dispatch<React.SetStateAction<Payment[]>>;
}

export default function Tab1(props: Tab1Props) {
    return (
        <div className="flex h-screen">
            <div className="w-3/5 pt-4">
                <CustomCalendar  data={props.calendarData}/>
            </div>
            <div className="w-2/5 pt-4 pl-4">
                <DataTable transactions={props.transactions} setTransactions={props.setTransactions} />
            </div>
        </div>
    )
}