'use client'
import React from 'react';
import { withAuth } from "@/components/withAuth";
import { DashboardSkeleton } from "@/components/dashboard-skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CustomNavigation from "@/app/dashboard/navigation"
import Tab1 from './tab1';
import Tab2 from './tab2';

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-background">
        <CustomNavigation />
      <main className="p-6">
        <h1 className="text-3xl font-bold mb-6">Welcome to the Dashboard</h1>
        
        <Tabs defaultValue="tab1">
          <TabsList>
            <TabsTrigger value="tab1">Overview</TabsTrigger>
            <TabsTrigger value="tab2">Transactions</TabsTrigger>
          </TabsList>
          <TabsContent value="tab1">
            <Tab1 />
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