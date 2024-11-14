'use client'
import React, { use, useEffect } from 'react';
import { withAuth } from "@/components/withAuth";
import { DashboardSkeleton } from "@/components/dashboard-skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CustomNavigation from "@/app/dashboard/navigation"
import Tab1 from './tab1';
import Tab2 from './tab2';
import { transactionAPI } from '@/api/transactionAPI';
import { useTransactionsWithCalendar } from '@/hooks/user-transactions-with-calendar';

const Dashboard = () => {

  // const [transactions, setTransactions] = React.useState([]);
  // const [calendarData, setCalendarData] = React.useState({});
  const [transactions, setTransactions, calendarData] = useTransactionsWithCalendar([]);
  
  
  const [loading, setLoading] = React.useState(true);
  // useEffect(() => {
  //   async function fetchData() {
      
  //     try {
  //       const [transactionData, calendarData] = await Promise.all([
  //         transactionAPI.get_user_transactions(localStorage.getItem('user_id')),
  //         transactionAPI.get_calendar_data(localStorage.getItem('user_id'))
  //       ]);
  
  //       setTransactions(transactionData.data);
  //       setCalendarData(calendarData.data);
  //     } catch (error) {
  //       console.error('Error fetching data:', error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   }
  
  //   fetchData();
  // }, []);

  useEffect(() => {
    async function fetchTransactionData() {
      try {
        setLoading(true);
        const userId = localStorage.getItem('user_id');
        const tdata = await transactionAPI.get_user_transactions(userId);
        setTransactions(tdata.data); // This will also trigger fetching calendar data
      } catch (error) {
        console.error('Error fetching transaction data:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchTransactionData();
  }, [setTransactions]);
  
  if (loading) {
    return <DashboardSkeleton />;
  }

  function toTitleCase(username) {
    if (!username) return '';
    return username.charAt(0).toUpperCase() + username.slice(1).toLowerCase();
  }

  return (
    <div className="min-h-screen bg-background">
        <CustomNavigation />
      <main className="p-6">
        <h1 className="text-3xl font-bold mb-6">Hey {toTitleCase(localStorage.getItem('username'))}! 💸</h1>
        
        <Tabs defaultValue="tab1">
          <TabsList>
            <TabsTrigger value="tab1">Overview</TabsTrigger>
            <TabsTrigger value="tab2">Transactions</TabsTrigger>
          </TabsList>
          <TabsContent value="tab1">
            <Tab1 transactions={transactions} setTransactions={setTransactions} calendarData={calendarData}/>
          </TabsContent>
          <TabsContent value="tab2">
            <Tab2 />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default withAuth(Dashboard, DashboardSkeleton, '/login');