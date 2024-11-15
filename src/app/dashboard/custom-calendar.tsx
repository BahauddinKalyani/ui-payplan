import React, { useRef, useEffect, useState } from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Menubar, MenubarMenu, MenubarTrigger } from "@/components/ui/menubar";
import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge"
import { useTheme } from "next-themes"
import { TransactionInfoDialog } from '@/app/dashboard/transaction-info-dialog'

const CustomCalendar = (props: { data: any; }) => {
  const todayRef = useRef(null);
  const scrollAreaRef = useRef(null);
  const [selectedDateData, setSelectedDateData] = useState<{ [key: string]: any } | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { theme } = useTheme()
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

  const groupByMonth = (data: { [s: string]: unknown; } | ArrayLike<unknown>) => {
    return Object.entries(data).reduce((acc: { [key: string]: any[] }, [date, info]) => {
      const [month, , year] = date.split('-');
      const key = `${month}-${year}`;
      if (!acc[key]) acc[key] = [];
      acc[key].push({ date, info });
      return acc;
    }, {});
  };

  const monthData = groupByMonth(data);

  

  const renderMonthCalendar = (monthYear: string, dates: { date: string; info: any }[]) => {
    const [month, year] = monthYear.split('-');
    const firstDay = new Date(parseInt(year), parseInt(month) - 1, 1).getDay();
    const daysInMonth = new Date(parseInt(year), parseInt(month), 0).getDate();

    const handleMoreInfo = (dateString: string, dateInfo: any) => {
        const data: { [key: string]: any } = {}
        data[dateString] = dateInfo;  
        setSelectedDateData(data);
        setIsDialogOpen(true);
      };
    
    const calendarDays = [];

    
    // Add padding for days before the 1st of the month
    for (let i = 0; i < firstDay; i++) {
      calendarDays.push(<div key={`empty-${i}`} className="h-24"></div>);
    }

    function getSmallestDayNumber(dateList: any[]) {
        // Extract day numbers and convert to integers
        const dayNumbers = dateList.map((item: { date: { split: (arg0: string) => [any, any]; }; }) => {
          const [, day] = item.date.split('-');
          return parseInt(day, 10);
        });
      
        // Find the smallest day number
        const smallestDay = Math.min(...dayNumbers);
      
        return smallestDay;
    }

    // Add the actual days of the month
    for (let day = getSmallestDayNumber(dates as any[]); day <= daysInMonth; day++) {
      const dateString = `${month.padStart(2, '0')}-${day.toString().padStart(2, '0')}-${year}`;
      const dateInfo = dates.find((d: { date: string; }) => d.date === dateString)?.info || {};
      const isDisabled = isDateBeforeToday(dateString);
      const isToday = isDateToday(dateString);

      const hasPaidTransactions = dateInfo.paid_transactions && dateInfo.paid_transactions.length > 0;
      const hasUnpaidTransactions = dateInfo.unpaid_transactions && dateInfo.unpaid_transactions.length > 0;

      calendarDays.push(
        <Card 
            key={dateString} 
            className={`w-full h-36 flex flex-col relative ${isDisabled ? 'opacity-50' : ''} ${isToday? 'bg-blue-500/30 backdrop-blur-md border border-blue-200/50 shadow-lg' : ''} ${hasUnpaidTransactions ? 'bg-red-500/30 backdrop-blur-md border border-red-200/50 shadow-lg': ''} ${hasPaidTransactions ? 'bg-green-500/30 backdrop-blur-md border border-green-200/50 shadow-lg': ''}`}
            ref={isToday ? todayRef : null}
        >
          
          <CardHeader className="p-2 flex flex-row justify-between items-center">
          <CardTitle className="text-sm">{day}</CardTitle>
          <div className="absolute top-2 right-2 flex space-x-1">
            {hasPaidTransactions && (
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
            )}
          </div>
        </CardHeader>
          <CardContent className="p-2 text-xs flex-grow">
            <p>Balance: ${dateInfo.closing_balance || 0}</p>
            </CardContent>
            <CardFooter className="p-2 mt-auto">
                <Button 
                    variant="link" 
                    className="p-0 mr-1 h-auto text-xs hover:underline"
                    onClick={() => {handleMoreInfo(dateString, dateInfo)}}
                >
                       
                    More Info
                </Button>
                {theme === 'dark' && 
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
                    }
            </CardFooter>
        </Card>
      );
    }

    return calendarDays;
  };

  return (
    <div className="relative">
      <Menubar className="sticky top-0 z-10 flex justify-between">
        {dayNames.map(day => (
          <MenubarMenu key={day}>
            <MenubarTrigger className="w-full justify-center cursor-default">{day}</MenubarTrigger>
          </MenubarMenu>
        ))}
      </Menubar>
      <ScrollArea className="h-[calc(100vh-60px)] w-full" ref={scrollAreaRef}>
        {Object.entries(monthData).map(([monthYear, dates]) => (
          <div key={monthYear} className="mb-6">
            <h2 className="text-2xl font-bold mt-4 mb-4">{new Date(dates[0].date).toLocaleString('default', { month: 'long', year: 'numeric' })}</h2>
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