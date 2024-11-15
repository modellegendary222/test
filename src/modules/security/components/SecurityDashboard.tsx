import { useState } from 'react';
import { SecurityAlerts } from './SecurityAlerts';
import { SecurityMetrics } from './SecurityMetrics';
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const SecurityDashboard = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Security Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <SecurityMetrics />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Date Range</CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border"
            />
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="alerts" className="w-full">
        <TabsList>
          <TabsTrigger value="alerts">Alerts</TabsTrigger>
          <TabsTrigger value="trends">Trends</TabsTrigger>
        </TabsList>
        <TabsContent value="alerts">
          <SecurityAlerts />
        </TabsContent>
        <TabsContent value="trends">
          <SecurityMetrics />
        </TabsContent>
      </Tabs>
    </div>
  );
};