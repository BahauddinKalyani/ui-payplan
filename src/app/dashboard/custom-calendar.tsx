import React, { useRef, useEffect, useState } from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Menubar, MenubarMenu, MenubarTrigger } from "@/components/ui/menubar";
import { useTheme } from "next-themes"
import { TransactionInfoDialog } from '@/app/dashboard/transaction-info-dialog';
import { Payment } from './columns';
import { useIsMobile } from '@/hooks/is-mobile';

interface CustomCalendarProps { 
    opening_balance: number; 
    income_transactions: Payment[]; 
    paid_transactions: Payment[]; 
    unpaid_transactions: Payment[]; 
    closing_balance: number;
  }

const CustomCalendar = (props: { 
      data: {[key: string]: CustomCalendarProps }, 
      transactions: Payment[];
      setTransactions: React.Dispatch<React.SetStateAction<Payment[]>>
    }
  ) => {
  const todayRef = useRef(null);
  const scrollAreaRef = useRef(null);
  const [selectedDateData, setSelectedDateData] = useState< {[key: string]: CustomCalendarProps} | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const isMobile = useIsMobile()
  const data = props.data;

  const isDateBeforeToday = (dateString: string) => {
    const [month, day, year] = dateString.split('-').map(Number);
    const inputDate = new Date(year, month - 1, day);
    const today = new Date();
    const todayCompare = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    return inputDate < todayCompare;
  };

  const isDateToday = (dateString: string) => {
    const [month, day, year] = dateString.split('-').map(Number);
    const inputDate = new Date(year, month - 1, day);
    const today = new Date();
    

    const result = (inputDate.getFullYear() === today.getFullYear() &&
           inputDate.getMonth() === today.getMonth() &&
           inputDate.getDate() === today.getDate());
    return result;
  };

  useEffect(() => {
    const scrollToToday = () => {
        if (todayRef.current && scrollAreaRef.current) {
          const scrollContainer = (scrollAreaRef.current as HTMLElement).querySelector('[data-radix-scroll-area-viewport]');
          if (scrollContainer) {
            const offset = (scrollContainer as HTMLElement).offsetHeight / 4.5; // One third of the viewport height
            const topPos = (todayRef.current as HTMLElement).offsetTop - offset; // Adjust position to show one-third above
    
            scrollContainer.scrollTo({
              top: topPos,
              behavior: 'smooth'
            });
          }
        }
    };
    const timeoutId = setTimeout(scrollToToday, 500);
  
    return () => clearTimeout(timeoutId);
  }, []);

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const dayNamesShort = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  const groupByMonth = (data: { [s: string]: unknown; } | ArrayLike<unknown>) => {
    return Object.entries(data).reduce((acc: { [key: string]: { date: string; info: CustomCalendarProps }[] }, [date, info]) => {
      const [month, , year] = date.split('-');
      const key = `${month}-${year}`;
      if (!acc[key]) acc[key] = [];
      acc[key].push({ date, info: info as CustomCalendarProps });
      return acc;
    }, {});
  };

  const monthData = groupByMonth(data);

  const parseDate = (dateString: string) => {
    const parts = dateString.split('-'); 
    const month = parseInt(parts[0], 10);
    const day = parseInt(parts[1], 10);   
    const year = parseInt(parts[2], 10);

    return new Date(year, month - 1, day);
};

  

  const renderMonthCalendar = (monthYear: string, dates: { date: string; info: CustomCalendarProps }[]) => {
    const [month, year] = monthYear.split('-');

    const handleMoreInfo = (dateString: string, dateInfo: CustomCalendarProps) => {
        const data: { [key: string]: CustomCalendarProps } = {}
        data[dateString] = dateInfo;  
        setSelectedDateData(data);
        setIsDialogOpen(true);
      };
    
    const calendarDays = [];

    const current_day = new Date(parseInt(year), parseInt(month) - 1, getDayNumber(dates as { date: string }[], false)).getDay()
    for (let i = 0; i < current_day; i++) {
      calendarDays.push(<div key={`empty-${i}`} className="h-24"></div>);
    }

    function getDayNumber(dateList: { date: string }[], highest: boolean = false) {
       
        const dayNumbers = dateList.map((item: { date: string }) => {
          const [, day] = item.date.split('-');
          return parseInt(day, 10);
        });

        if(highest){
          return Math.max(...dayNumbers)
        } else {
          return Math.min(...dayNumbers);
        }
    }

    for (let day = getDayNumber(dates as { date: string }[], false); day <= getDayNumber(dates as { date: string }[], true); day++) {
      const dateString = `${month.padStart(2, '0')}-${day.toString().padStart(2, '0')}-${year}`;
      const dateInfo = dates.find((d: { date: string; }) => d.date === dateString)?.info as CustomCalendarProps || {} as CustomCalendarProps;
      const isDisabled = isDateBeforeToday(dateString);
      const isToday = isDateToday(dateString);

      const hasPaidTransactions = dateInfo.paid_transactions && dateInfo.paid_transactions.length > 0;
      const hasUnpaidTransactions = dateInfo.unpaid_transactions && dateInfo.unpaid_transactions.length > 0;
      const hasIncomeTransactions = dateInfo.income_transactions && dateInfo.income_transactions.length > 0;

      const paidTransactionsLength = Math.min(10, dateInfo.paid_transactions.length > 1 ? (dateInfo.paid_transactions.length + 1) : 2);
      const unPaidTransactionsLength =  Math.min(10, dateInfo.unpaid_transactions.length > 1 ? (dateInfo.unpaid_transactions.length + 1) : 2);
      const incomeTransactionsLength = Math.min(10, dateInfo.income_transactions.length > 1 ? (dateInfo.income_transactions.length + 1) : 2);

      calendarDays.push(
        <Card 
            key={dateString} 
            className={`w-full h-auto border-0 border-b-2 rounded-none bg-transparent flex flex-col relative cursor-pointer ${isDisabled ? 'opacity-50' : ''}`}
            ref={isToday ? todayRef : null}
            onClick={() => handleMoreInfo(dateString, dateInfo)}
        >
          
          <CardHeader className="p-2 flex flex-row justify-between items-center">
          <CardTitle className={`text-base`}>
          <div className={isToday ? 'w-7 h-7 rounded-full bg-amber-600 flex items-center justify-center text-white opacity-90': ''}>
            <span>{day}</span>
          </div>
          </CardTitle>
        </CardHeader>
          <CardContent className="p-2 text-xs flex-grow">
            <h4>{isMobile? '': 'Balance:'} ${dateInfo.closing_balance || 0}</h4>
            </CardContent>
            <CardFooter className="p-2 mt-auto">
                {hasIncomeTransactions && <div className={`w-${incomeTransactionsLength} ml-1 h-2 rounded-full bg-blue-500`}></div>}
                  {hasPaidTransactions && <div className={`w-${paidTransactionsLength} ml-1 h-2 rounded-full bg-green-500`}></div>}
                  {hasUnpaidTransactions && <div className={`w-${unPaidTransactionsLength} ml-1 h-2 rounded-full bg-red-500`}></div>}
            </CardFooter>
        </Card>
      );
    }

    return calendarDays;
  };

  return (
    <div className="relative">
      <Menubar className="sticky top-0 z-10 flex justify-between">
        {!isMobile && dayNames.map(day => (
          <MenubarMenu key={day}>
            <MenubarTrigger className="w-full justify-center cursor-default">{day}</MenubarTrigger>
          </MenubarMenu>
        ))}

        {isMobile && dayNamesShort.map(day => (
          <MenubarMenu key={day+Math.random()}>
            <MenubarTrigger className="w-full justify-center cursor-default">{day}</MenubarTrigger>
          </MenubarMenu>
        ))}
      </Menubar>
      <ScrollArea className="h-[calc(100vh-60px)] w-full" ref={scrollAreaRef}>
        {Object.entries(monthData).map(([monthYear, dates]) => (
          <div key={monthYear} className="mb-6">
            <h2 className="text-2xl font-bold mt-4 mb-4">{new Date(parseDate(dates[0].date)).toLocaleString('default', { month: 'long', year: 'numeric' })}</h2>
            <div className="grid grid-cols-7 gap-1">
              {renderMonthCalendar(monthYear, dates)}
            </div>
          </div>
        ))}
        {selectedDateData && (
                <TransactionInfoDialog 
                isDialogOpen={isDialogOpen} 
                setIsDialogOpen={() => setIsDialogOpen(false)} 
                data={selectedDateData}
                transactions={props.transactions}
                setTransactions={props.setTransactions}
                />
            )}
      </ScrollArea>
    </div>
  );
};

export default CustomCalendar;