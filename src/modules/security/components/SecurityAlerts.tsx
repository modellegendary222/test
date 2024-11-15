import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";

export interface SecurityAlert {
  id: string;
  alertName: string;
  severity: "Low" | "Medium" | "High";
  timestamp: string;
  source: string;
  description: string;
  resourceId?: string;
  region?: string;
}

export const SecurityAlerts = () => {
  const { toast } = useToast();
  const apiUrl = import.meta.env.VITE_API_URL;

  const { data: alerts, error, isLoading } = useQuery({
    queryKey: ["security-alerts"],
    queryFn: async () => {
      try {
        const response = await fetch(`${apiUrl}/security/alerts`);
        if (!response.ok) {
          throw new Error('Failed to fetch security alerts');
        }
        return response.json() as Promise<SecurityAlert[]>;
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to fetch security alerts. Please try again later."
        });
        throw error;
      }
    }
  });

  const getSeverityColor = (severity: SecurityAlert["severity"]) => {
    switch (severity) {
      case "High":
        return "bg-red-500";
      case "Medium":
        return "bg-yellow-500";
      case "Low":
        return "bg-green-500";
    }
  };

  if (isLoading) {
    return <div>Loading security alerts...</div>;
  }

  if (error) {
    return null;
  }

  return (
    <div className="space-y-4">
      {alerts?.map((alert) => (
        <Card key={alert.id}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">{alert.alertName}</CardTitle>
              <Badge className={getSeverityColor(alert.severity)}>
                {alert.severity}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="text-sm text-gray-500">
              Source: {alert.source}
            </p>
            <p className="text-sm">
              {alert.description}
            </p>
            {alert.resourceId && (
              <p className="text-sm text-gray-500">
                Resource: {alert.resourceId}
              </p>
            )}
            {alert.region && (
              <p className="text-sm text-gray-500">
                Region: {alert.region}
              </p>
            )}
            <p className="text-sm text-gray-500">
              Detected at: {new Date(alert.timestamp).toLocaleString()}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};