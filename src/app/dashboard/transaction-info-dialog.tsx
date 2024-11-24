import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"; // Adjust based on your file structure
import { Payment } from './columns';

import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer"
import { useIsMobile } from '@/hooks/is-mobile';

interface TransactionInfoDialogProps {
  isDialogOpen: boolean;
  setIsDialogOpen: (open: boolean) => void;
  data: { [key: string]: { 
    opening_balance: number; 
    income_transactions: Payment[]; 
    paid_transactions: Payment[]; 
    unpaid_transactions: Payment[]; 
    closing_balance: number; 
  }};
}

export const TransactionInfoDialog = (props: TransactionInfoDialogProps) => {
  // const {date, details} = props.data;
  const date = Object.keys(props.data)[0];
  const data = props.data[date];
  const isMobile = useIsMobile();

  function formatDate(dateString: string) {
    const [month, day, year] = dateString.split('-');
    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    const monthName = monthNames[parseInt(month) - 1];
    return `${monthName} ${day}, ${year}`;
  }

  if(isMobile) {
    return (
      <Drawer open={props.isDialogOpen} onOpenChange={props.setIsDialogOpen}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>{formatDate(date)}</DrawerTitle>
          </DrawerHeader>
          <Timeline data={data}/>
        </DrawerContent>
      </Drawer>
    )
  }

  return (
    <Dialog open={props.isDialogOpen} onOpenChange={props.setIsDialogOpen}>
      <DialogContent className="sm:max-w-[225px] md:max-w-[300px] lg:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{formatDate(date)}</DialogTitle>
        </DialogHeader>
        <Timeline data={data}/>
      </DialogContent>
    </Dialog>
  );
};

function Timeline(props: { data: {
  opening_balance: number;
  income_transactions: Payment[];
  paid_transactions: Payment[];
  unpaid_transactions: Payment[];
  closing_balance: number;
}}
) {
  const data = props.data;
  return (
    <div className="p-6 sm:p-10">
      <div className="after:absolute after:inset-y-0 after:w-px after:bg-gray-500/20 relative pl-6 after:left-0 grid gap-10 dark:after:bg-gray-400/20">
        <div key='opening' className="grid gap-1 text-sm relative">
          <div className="aspect-square w-3 bg-gray-900 rounded-full absolute left-0 translate-x-[-29.5px] z-10 top-1 dark:bg-gray-50" />
          <div className="text-lg font-bold">Opening Balance</div>
          <div className="text-gray-500 dark:text-gray-400">
            ${data.opening_balance}
          </div>
        </div>
        { data && data.income_transactions.length > 0 &&
        <div key="income" className="grid gap-1 text-sm relative">
            {/* <div className="aspect-square w-3 bg-gray-900 rounded-full absolute left-0 translate-x-[-29.5px] z-10 top-1 dark:bg-gray-50" /> */}
            <div className="aspect-square w-3 bg-blue-500 rounded-full absolute left-0 translate-x-[-29.5px] z-10 top-1 dark:bg-blue-500" />
            <div className="text-lg font-bold text-blue-500">Income:</div>
              {data.income_transactions.map((transaction: Payment) => (
                  <div key={transaction.id} className="text-gray-500 dark:text-gray-400">
                    {transaction.name}: ${transaction.amount}
                  </div>
              ))}
          </div>
          }
          { data.paid_transactions.length > 0 &&
          <div key="paid" className="grid gap-1 text-sm relative">
            <div className="aspect-square w-3 bg-green-500 rounded-full absolute left-0 translate-x-[-29.5px] z-10 top-1 dark:bg-green-500" />
            <div className="text-lg font-bold text-green-500">Paid:</div>
              {data.paid_transactions.map((transaction: Payment) => (
                  <div key={transaction.id} className="text-gray-500 dark:text-gray-400">
                    {transaction.name}: ${transaction.amount}
                  </div>
              ))}
          </div>
          }
          { data.unpaid_transactions.length > 0 && 
          <div key="unpaid" className="grid gap-1 text-sm relative">
            <div className="aspect-square w-3 bg-red-500 rounded-full absolute left-0 translate-x-[-29.5px] z-10 top-1 dark:bg-red-500" />
            <div className="text-lg font-bold text-red-500">Unpaid:</div>
              {data.unpaid_transactions.map((transaction: Payment) => (
                  <div key={transaction.id} className="text-gray-500 dark:text-gray-400">
                    {transaction.name}: ${transaction.amount}
                  </div>
              ))}
          </div>
          }
        <div key="closing" className="grid gap-1 text-sm relative">
          <div className="aspect-square w-3 bg-gray-900 rounded-full absolute left-0 translate-x-[-29.5px] z-10 top-1 dark:bg-gray-50" />
          <div className="text-lg font-bold">Closing Balance</div>
          <div className="text-gray-500 dark:text-gray-400">
          ${data.closing_balance}
          </div>
        </div>
      </div>
    </div>
  )
}
