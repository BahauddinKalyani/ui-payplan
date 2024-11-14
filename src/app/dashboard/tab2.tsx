'use client'
import React from 'react';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
export default function Tab1() {
    return (
      <Card>
      <CardHeader>
        <CardTitle>Detailed Analytics</CardTitle>
        <CardDescription>In-depth analysis of user behavior</CardDescription>
      </CardHeader>
      <CardContent>
        {/* Insert more complex chart or data visualization here */}
        <div className="h-[400px] bg-muted flex items-center justify-center">
          Complex Analytics Chart Placeholder
        </div>
      </CardContent>
    </Card>
    )
}