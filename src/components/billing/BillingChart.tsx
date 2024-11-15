import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface BillingChartProps {
  data: Array<{
    service: string;
    cost: number;
  }>;
}

export const BillingChart = ({ data }: BillingChartProps) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="service" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="cost" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
};