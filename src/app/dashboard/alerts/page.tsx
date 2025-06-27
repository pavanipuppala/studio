"use client";

import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { getGeneratedAlerts, getRecommendedCrop } from "@/lib/actions";
import { Skeleton } from "@/components/ui/skeleton";

type Alert = {
  severity: "High" | "Medium" | "Low";
  component: string;
  message: string;
  timestamp: string;
  status: "Active" | "Resolved";
};

export default function AlertsPage() {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAlerts = async () => {
      setLoading(true);
      setError(null);

      const storedAddress = localStorage.getItem('farm_address');
      if (!storedAddress) {
        setError("Farm address not set. Please set your location first.");
        setLoading(false);
        return;
      }
      const address = JSON.parse(storedAddress);
      const { city, state } = address;

      if (!city || !state) {
        setError("Invalid farm address in storage.");
        setLoading(false);
        return;
      }

      // First, get the recommended crop to make the alerts more context-aware
      const cropResponse = await getRecommendedCrop({ city, state });
      if (cropResponse.error || !cropResponse.data) {
        setError(cropResponse.error || "Could not retrieve farm context.");
        setLoading(false);
        return;
      }

      const { cropName, predictedFarmType } = cropResponse.data;

      // Now, generate alerts based on location and farm context
      const alertsResponse = await getGeneratedAlerts({
        city,
        state,
        cropName,
        farmType: predictedFarmType,
      });

      if (alertsResponse.data) {
        setAlerts(alertsResponse.data.alerts);
      } else {
        setError(alertsResponse.error || "Failed to generate alerts.");
      }
      setLoading(false);
    };

    fetchAlerts();
  }, []);

  const renderLoadingSkeleton = () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Severity</TableHead>
          <TableHead>Component</TableHead>
          <TableHead>Message</TableHead>
          <TableHead>Timestamp</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {Array.from({ length: 6 }).map((_, index) => (
          <TableRow key={index} className="even:bg-card/50">
            <TableCell><Skeleton className="h-6 w-20" /></TableCell>
            <TableCell><Skeleton className="h-6 w-32" /></TableCell>
            <TableCell><Skeleton className="h-6 w-full" /></TableCell>
            <TableCell><Skeleton className="h-6 w-28" /></TableCell>
            <TableCell><Skeleton className="h-6 w-24" /></TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight font-headline flex items-center gap-2">
            <AlertTriangle className="h-8 w-8 text-destructive" />
            Alerts
        </h1>
        <p className="text-muted-foreground">
          A log of all system alerts and notifications, generated based on your farm's context.
        </p>
      </div>
      <Card>
        <CardContent className="p-0">
            {loading ? (
              renderLoadingSkeleton()
            ) : error ? (
              <div className="p-6 text-center text-destructive">{error}</div>
            ) : (
              <Table>
                  <TableHeader>
                  <TableRow>
                      <TableHead>Severity</TableHead>
                      <TableHead>Component</TableHead>
                      <TableHead>Message</TableHead>
                      <TableHead>Timestamp</TableHead>
                      <TableHead>Status</TableHead>
                  </TableRow>
                  </TableHeader>
                  <TableBody>
                  {alerts.map((alert, index) => (
                      <TableRow key={index} className="even:bg-card/50">
                      <TableCell>
                          <Badge variant={alert.severity === 'High' ? 'destructive' : alert.severity === 'Medium' ? 'secondary' : 'outline'}>
                          {alert.severity}
                          </Badge>
                      </TableCell>
                      <TableCell className="font-medium">{alert.component}</TableCell>
                      <TableCell>{alert.message}</TableCell>
                      <TableCell>{alert.timestamp}</TableCell>
                      <TableCell>
                          <Badge variant={alert.status === 'Active' ? 'default' : 'outline'} className={alert.status === 'Active' ? 'bg-amber-500' : ''}>
                              {alert.status}
                          </Badge>
                      </TableCell>
                      </TableRow>
                  ))}
                  </TableBody>
              </Table>
            )}
        </CardContent>
      </Card>
    </div>
  );
}
