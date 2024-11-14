'use client'
import React from 'react';
import  DataTable  from "@/app/dashboard/data-table"
import CustomCalendar from "@/app/dashboard/custom-calendar"

export default function Tab1(props) {
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