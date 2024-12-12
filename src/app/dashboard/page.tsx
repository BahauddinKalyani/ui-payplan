'use client'
import React, { useEffect } from 'react';
import { withAuth } from "@/components/withAuth";
import { DashboardSkeleton } from "@/components/dashboard-skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CustomNavigation from "@/app/dashboard/navigation"
import Tab1 from './tab1';
// import Tab2 from './tab2';
import { transactionAPI } from '@/api/transactionAPI';
import { useTransactionsWithCalendar } from '@/hooks/user-transactions-with-calendar';
import { Payment } from '@/app/dashboard/columns';
import { useIsMobile } from '@/hooks/is-mobile';
import  DataTable  from "@/app/dashboard/data-table"
import CustomCalendar from "@/app/dashboard/custom-calendar"
import OnboardingDialog from "@/app/dashboard/onboarding-welcome-dailog";

const Dashboard = () => {
  const { transactions, setTransactions, calendarData } = useTransactionsWithCalendar([]);
  const isMobile = useIsMobile()
  const [tab, setActiveTab] = React.useState('tab1');
  const [hasTFetched, setHasTFetched] = React.useState(false);
  const [firstLogin, setFirstLogin] = React.useState(true);
  
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    setFirstLogin((localStorage.getItem('onboardingCompleted') ?? 'false') === 'true' ? false : true);
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
    if (!hasTFetched) {
      setHasTFetched(true);
      fetchTransactionData();
    }
  }, [setTransactions]);
  
  if (loading) {
    return <DashboardSkeleton />;
  }

  function toTitleCase(username: string | null) {
    if (!username) return '';
    return username.charAt(0).toUpperCase() + username.slice(1).toLowerCase();
  }

  return (
    <div className="max-h-screen bg-background">
      <CustomNavigation isMobile={isMobile} />
      <OnboardingDialog isMobile={isMobile} open={firstLogin} setOpen={setFirstLogin} transactions={transactions} setTransactions={setTransactions as React.Dispatch<React.SetStateAction<Payment[]>>} />
      <main className={isMobile? "pb-0 p-2 max-h-screen" :"p-8 pb-0 max-h-screen"}>
        <h1 className="text-3xl font-bold mb-4">Hey {toTitleCase(localStorage.getItem('username'))}! 💸</h1>
          {isMobile ? 
            <Tabs defaultValue="tab1"
              value={tab}
              onValueChange={setActiveTab}
            >
              <TabsList>
                <TabsTrigger value="tab1">Overview</TabsTrigger>
                <TabsTrigger value="tab2">Transactions</TabsTrigger>
              </TabsList>
              <TabsContent value="tab1" forceMount={true} hidden={"tab1" !== tab}>
                <CustomCalendar data={calendarData}
                  transactions={transactions} 
                  setTransactions={setTransactions as React.Dispatch<React.SetStateAction<Payment[]>>}/>
              </TabsContent>
              <TabsContent value="tab2" forceMount={true} hidden={"tab2" !== tab}>
                <DataTable 
                  type='' 
                  isMain={true} 
                  isMobile={isMobile} 
                  transactions={transactions} 
                  setTransactions={setTransactions as React.Dispatch<React.SetStateAction<Payment[]>>} />
              </TabsContent>
            </Tabs>
            :
            <Tab1 
              transactions={transactions} 
              setTransactions={setTransactions as React.Dispatch<React.SetStateAction<Payment[]>>} 
              calendarData={calendarData}
              isMobile={isMobile}
            />
          }
      </main>
    </div>
  )
};

export default withAuth(Dashboard, DashboardSkeleton, '/login');