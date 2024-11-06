'use client'
import React from 'react';
import { Calendar } from "@/components/ui/calendar";

// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";




import { ColumnDef } from "@tanstack/react-table"
 
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
  id: string
  amount: number
  status: "pending" | "processing" | "success" | "failed"
  email: string
}
 
export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "amount",
    header: "Amount",
  },
]
export default function Tab1() {
    const [date, setDate] = React.useState<Date | undefined>(new Date())
    return (
        <div className="flex h-screen">
            <div className="w-3/5 p-4"> {/* 60% width */}
                <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="rounded-md border"
                />
            </div>
            <div className="w-2/5 p-4"> {/* 40% width */}
            <div className="w-full h-full overflow-auto">
                <Table>
                    <TableCaption>A list of your recent invoices.</TableCaption>
                    <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">Invoice</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Method</TableHead>
                        <TableHead className="text-right">Amount</TableHead>
                    </TableRow>
                    </TableHeader>
                    <TableBody>
                    <TableRow>
                        <TableCell className="font-medium">INV001</TableCell>
                        <TableCell>Paid</TableCell>
                        <TableCell>Credit Card</TableCell>
                        <TableCell className="text-right">$250.00</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className="font-medium">INV002</TableCell>
                        <TableCell>Pending</TableCell>
                        <TableCell>PayPal</TableCell>
                        <TableCell className="text-right">$150.00</TableCell>
                    </TableRow>
                    {/* Add more rows as needed */}
                    </TableBody>
                </Table>
                </div>
            </div>
        </div>



        // <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        //       <Card>
        //         <CardHeader>
        //           <CardTitle>Total Users</CardTitle>
        //           <CardDescription>User growth over time</CardDescription>
        //         </CardHeader>
        //         <CardContent>
        //           {/* Insert chart component here */}
        //           <div className="h-[200px] bg-muted flex items-center justify-center">
        //             Chart Placeholder
        //           </div>
        //         </CardContent>
        //       </Card>
        //       <Card>
        //         <CardHeader>
        //           <CardTitle>Revenue</CardTitle>
        //           <CardDescription>Monthly revenue statistics</CardDescription>
        //         </CardHeader>
        //         <CardContent>
        //           {/* Insert chart component here */}
        //           <div className="h-[200px] bg-muted flex items-center justify-center">
        //             Chart Placeholder
        //           </div>
        //         </CardContent>
        //       </Card>
        //       <Card>
        //         <CardHeader>
        //           <CardTitle>Active Sessions</CardTitle>
        //           <CardDescription>Current active user sessions</CardDescription>
        //         </CardHeader>
        //         <CardContent>
        //           {/* Insert chart component here */}
        //           <div className="h-[200px] bg-muted flex items-center justify-center">
        //             Chart Placeholder
        //           </div>
        //         </CardContent>
        //       </Card>
        //     </div>
    )
}