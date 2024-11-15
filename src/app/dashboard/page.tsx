'use client'
import React, { useEffect } from 'react';
import { withAuth } from "@/components/withAuth";
import { DashboardSkeleton } from "@/components/dashboard-skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CustomNavigation from "@/app/dashboard/navigation"
import Tab1 from './tab1';
import Tab2 from './tab2';
import { transactionAPI } from '@/api/transactionAPI';
import { useTransactionsWithCalendar } from '@/hooks/user-transactions-with-calendar';
import { Payment } from '@/app/dashboard/columns';

const Dashboard = () => {
  const { transactions, setTransactions, calendarData } = useTransactionsWithCalendar([]);
  
  
  const [loading, setLoading] = React.useState(true);

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

  function toTitleCase(username: string | null) {
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
            <Tab1 transactions={transactions} setTransactions={setTransactions as React.Dispatch<React.SetStateAction<Payment[]>>} calendarData={calendarData}/>
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