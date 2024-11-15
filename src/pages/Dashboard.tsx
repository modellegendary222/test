import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BillingChart } from "@/components/billing/BillingChart";
import { useToast } from "@/components/ui/use-toast";
import { ModuleConfig } from "@/modules/types";

// Import all available modules
import SecurityModule from "@/modules/security";

const Dashboard = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const { toast } = useToast();
  const apiUrl = import.meta.env.VITE_API_URL;

  const { data: modules } = useQuery({
    queryKey: ["modules"],
    queryFn: async () => {
      const response = await fetch(`${apiUrl}${import.meta.env.VITE_MODULES_ENDPOINT}`);
      if (!response.ok) {
        throw new Error('Failed to fetch modules');
      }
      const enabledModules = await response.json();
      return [SecurityModule].filter(mod => 
        enabledModules.some((enabled: { id: string }) => enabled.id === mod.id)
      );
    }
  });

  const { data: billingData, isLoading: isBillingLoading } = useQuery({
    queryKey: ["billing", date?.toISOString()],
    queryFn: async () => {
      try {
        const response = await fetch(`${apiUrl}${import.meta.env.VITE_BILLING_COSTS_ENDPOINT}?date=${date?.toISOString()}`);
        if (!response.ok) {
          throw new Error('Failed to fetch billing data');
        }
        return response.json();
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to fetch billing data. Please try again later."
        });
        throw error;
      }
    }
  });

  return (
    <div className="container mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold">AWS Management Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Cost Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              {!isBillingLoading && billingData && (
                <BillingChart data={billingData.usage} />
              )}
            </div>
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

      <Tabs defaultValue="billing" className="w-full">
        <TabsList>
          <TabsTrigger value="billing">Billing</TabsTrigger>
          {modules?.map(module => (
            <TabsTrigger key={module.id} value={module.id}>
              {module.name}
            </TabsTrigger>
          ))}
        </TabsList>
        <TabsContent value="billing">
          <Card>
            <CardHeader>
              <CardTitle>Service Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              {billingData?.usage.map((item: any) => (
                <div key={item.service} className="flex justify-between py-2">
                  <span>{item.service}</span>
                  <span>${item.cost.toFixed(2)}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
        {modules?.map(module => (
          <TabsContent key={module.id} value={module.id}>
            <module.component />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default Dashboard;