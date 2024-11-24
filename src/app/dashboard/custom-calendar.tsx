import React, { useRef, useEffect, useState } from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Menubar, MenubarMenu, MenubarTrigger } from "@/components/ui/menubar";
import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge"
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

const CustomCalendar = (props: { data: {[key: string]: CustomCalendarProps }}) => {
  const todayRef = useRef(null);
  const scrollAreaRef = useRef(null);
  const [selectedDateData, setSelectedDateData] = useState< {[key: string]: CustomCalendarProps} | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { theme } = useTheme()
  const isMobile = useIsMobile()
  const data = props.data;

  // const formatDate = (dateString) => {
  //   const [month, day, year] = dateString.split('-');
  //   return new Date(year, month - 1, day);
  // };

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
  // const today = new Date().toLocaleDateString('en-US', {
  //   month: '2-digit',
  //   day: '2-digit',
  //   year: 'numeric'
  // }).replace(/\//g, '-');


  useEffect(() => {
    const scrollToToday = () => {
        if (todayRef.current && scrollAreaRef.current) {
          const scrollContainer = (scrollAreaRef.current as HTMLElement).querySelector('[data-radix-scroll-area-viewport]');
          if (scrollContainer) {
            // Calculate the position to scroll to
            const offset = (scrollContainer as HTMLElement).offsetHeight / 4.5; // One third of the viewport height
            const topPos = (todayRef.current as HTMLElement).offsetTop - offset; // Adjust position to show one-third above
    
            // Scroll to the calculated position
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
    // Split the date string into parts
    const parts = dateString.split('-'); // Assuming MM-DD-YYYY format
    const month = parseInt(parts[0], 10); // Get month (MM)
    const day = parseInt(parts[1], 10);   // Get day (DD)
    const year = parseInt(parts[2], 10);  // Get year (YYYY)

    // Create a new Date object
    return new Date(year, month - 1, day); // Month is zero-indexed
};

  

  const renderMonthCalendar = (monthYear: string, dates: { date: string; info: CustomCalendarProps }[]) => {
    const [month, year] = monthYear.split('-');
    // const firstDay = new Date(parseInt(year), parseInt(month) - 1, 1).getDay();
    // const daysInMonth = new Date(parseInt(year), parseInt(month), 0).getDate();

    const handleMoreInfo = (dateString: string, dateInfo: CustomCalendarProps) => {
        const data: { [key: string]: CustomCalendarProps } = {}
        data[dateString] = dateInfo;  
        setSelectedDateData(data);
        setIsDialogOpen(true);
      };
    
    const calendarDays = [];

    const current_day = new Date(parseInt(year), parseInt(month) - 1, getDayNumber(dates as { date: string }[], false)).getDay()
    // Add padding for days before the 1st of the month
    for (let i = 0; i < current_day; i++) {
      calendarDays.push(<div key={`empty-${i}`} className="h-24"></div>);
    }

    function getDayNumber(dateList: { date: string }[], highest: boolean = false) {
        // Extract day numbers and convert to integers
        const dayNumbers = dateList.map((item: { date: string }) => {
          const [, day] = item.date.split('-');
          return parseInt(day, 10);
        });
      
        // Find the smallest day number
        if(highest){
          return Math.max(...dayNumbers)
        } else {
          return Math.min(...dayNumbers);
        }
    }

    // Add the actual days of the month
    for (let day = getDayNumber(dates as { date: string }[], false); day <= getDayNumber(dates as { date: string }[], true); day++) {
      const dateString = `${month.padStart(2, '0')}-${day.toString().padStart(2, '0')}-${year}`;
      const dateInfo = dates.find((d: { date: string; }) => d.date === dateString)?.info as CustomCalendarProps || {} as CustomCalendarProps;
      const isDisabled = isDateBeforeToday(dateString);
      const isToday = isDateToday(dateString);

      const hasPaidTransactions = dateInfo.paid_transactions && dateInfo.paid_transactions.length > 0;
      const hasUnpaidTransactions = dateInfo.unpaid_transactions && dateInfo.unpaid_transactions.length > 0;
      const hasIncomeTransactions = dateInfo.income_transactions && dateInfo.income_transactions.length > 0;

      // const hasPaidTransactions = true
      // const hasUnpaidTransactions = true
      // const hasIncomeTransactions = true
      // const incomeTransactionsLength = 10
      // const paidTransactionsLength = 10
      // const unPaidTransactionsLength =  10

      const paidTransactionsLength = Math.min(10, dateInfo.paid_transactions.length > 1 ? (dateInfo.paid_transactions.length + 1) : 2);
      const unPaidTransactionsLength =  Math.min(10, dateInfo.unpaid_transactions.length > 1 ? (dateInfo.unpaid_transactions.length + 1) : 2);
      const incomeTransactionsLength = Math.min(10, dateInfo.income_transactions.length > 1 ? (dateInfo.income_transactions.length + 1) : 2);

      calendarDays.push(
        <Card 
            key={dateString} 
            // className={`w-full h-auto border-0 border-b-2 rounded-none bg-transparent flex flex-col relative cursor-pointer ${isDisabled ? 'opacity-50' : ''} ${isToday? 'bg-blue-500/30 backdrop-blur-md border border-blue-200/50 shadow-lg' : ''} ${hasUnpaidTransactions ? 'bg-red-500/30 backdrop-blur-md border border-red-200/50 shadow-lg': ''} ${hasPaidTransactions ? 'bg-green-500/30 backdrop-blur-md border border-green-200/50 shadow-lg': ''}`}
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
          <div className="absolute top-2 right-2 flex space-x-1">
            {/* {hasPaidTransactions && (
              <svg className="w-4 h-4 text-green-500" viewBox="0 0 24 24" fill="currentColor">
                <circle cx="12" cy="12" r="10" fill="currentColor" />
                <path d="M9 12l2 2 4-4" stroke="white" strokeWidth="2" fill="none" />
              </svg>
            )}
            {hasUnpaidTransactions && (
              <svg className="w-4 h-4 text-red-500" viewBox="0 0 24 24" fill="currentColor">
                <circle cx="12" cy="12" r="10" fill="currentColor" />
                <path d="M12 8v5M12 16v.01" stroke="white" strokeWidth="2" strokeLinecap="round" />
              </svg>
            )} */}
          </div>
        </CardHeader>
          <CardContent className="p-2 text-xs flex-grow">
            <h4>{isMobile? '': 'Balance:'} ${dateInfo.closing_balance || 0}</h4>
            </CardContent>
            <CardFooter className="p-2 mt-auto">
                {/* <Button 
                    variant="link" 
                    className="p-0 mr-1 h-auto text-xs hover:underline"
                    onClick={() => {handleMoreInfo(dateString, dateInfo)}}
                >
                       
                    
                    {isMobile ? 'More..':'More Info'}
                </Button> */}
                {hasIncomeTransactions && <div className={`w-${incomeTransactionsLength} ml-1 h-2 rounded-full bg-blue-500`}></div>}
                  {hasPaidTransactions && <div className={`w-${paidTransactionsLength} ml-1 h-2 rounded-full bg-green-500`}></div>}
                  {hasUnpaidTransactions && <div className={`w-${unPaidTransactionsLength} ml-1 h-2 rounded-full bg-red-500`}></div>}
                {/* {!isMobile && <> */}
                  {/* {theme === 'dark' && 
                        <svg className="w-3 h-3 text-black" viewBox="0 0 24 24" fill="currentColor">
                            <circle cx="12" cy="12" r="10" fill="currentColor" />
                            <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="1.5" fill="none" />
                            <path d="M12 8v2M12 12v6" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                        </svg>
                    }
                    {theme === 'light' && 
                        <svg className="w-3 h-3 text-white" viewBox="0 0 24 24" fill="currentColor">
                            <circle cx="12" cy="12" r="10" fill="currentColor" />
                            <circle cx="12" cy="12" r="10" stroke="black" strokeWidth="1.5" fill="none" />
                            <path d="M12 8v2M12 12v6" stroke="black" strokeWidth="1.5" strokeLinecap="round" />
                        </svg>
                  } */}
                  {/* {hasPaidTransactions && (
                    <svg className="w-4 h-4 text-green-500" viewBox="0 0 24 24" fill="currentColor">
                      <circle cx="12" cy="12" r="10" fill="currentColor" />
                      <path d="M9 12l2 2 4-4" stroke="white" strokeWidth="2" fill="none" />
                    </svg>
                  )}
                  {hasUnpaidTransactions && (
                    <svg className="w-4 h-4 text-red-500" viewBox="0 0 24 24" fill="currentColor">
                      <circle cx="12" cy="12" r="10" fill="currentColor" />
                      <path d="M12 8v5M12 16v.01" stroke="white" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  )} */}
                {/* </>} */}
            </CardFooter>
        </Card>
      );
    // }
    // let weekCount = 0;
    // if ((current_day + day) % 7 === 0 && day !== getDayNumber(dates as { date: string }[], true)) {
    //   weekCount++;
    //   calendarDays.push(
    //     <Separator key={`separator-${weekCount}`} className='col-span-7' />
    //     // <div key={`separator-${weekCount}`} className="col-span-7 border-b border-gray-200 my-2"></div>
    //   );
    // }
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
            {/* <Separator /> */}
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
                />
            )}
      </ScrollArea>
    </div>
  );
};

export default CustomCalendar;