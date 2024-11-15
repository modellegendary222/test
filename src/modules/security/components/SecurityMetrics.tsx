import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

export const SecurityMetrics = () => {
  const { data: metrics } = useQuery({
    queryKey: ['security-metrics'],
    queryFn: async () => {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/security/metrics`);
      if (!response.ok) throw new Error('Failed to fetch security metrics');
      return response.json();
    }
  });

  return (
    <div className="h-[300px]">
      <ChartContainer
        config={{
          high: { color: "#ef4444" },
          medium: { color: "#f97316" },
          low: { color: "#22c55e" }
        }}
      >
        <BarChart data={metrics?.alertsByType || []}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="type" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="count" fill="var(--color-high)" />
        </BarChart>
      </ChartContainer>
    </div>
  );
};