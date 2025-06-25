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

const alerts = [
  { id: 1, severity: "High", component: "Greenhouse 1", message: "Temperature exceeded 30°C. Cooling system activated.", timestamp: "2024-07-29 10:05 AM", status: "Resolved" },
  { id: 2, severity: "Medium", component: "Lettuce Section", message: "Humidity dropped to 45%. Misters activated.", timestamp: "2024-07-29 09:30 AM", status: "Active" },
  { id: 3, severity: "Low", component: "Sensor T-04", message: "Sensor in Rack B is offline. Please check connection.", timestamp: "2024-07-29 08:55 AM", status: "Active" },
  { id: 4, severity: "Medium", component: "Nutrient Tank A", message: "pH level at 7.5, which is above the optimal range.", timestamp: "2024-07-28 04:20 PM", status: "Active" },
  { id: 5, severity: "High", component: "Main Water Pump", message: "Pump pressure is critically low. Potential leak detected.", timestamp: "2024-07-28 01:10 PM", status: "Resolved" },
  { id: 6, severity: "Low", component: "Light System", message: "LED panel #12 is not responding. Reset required.", timestamp: "2024-07-27 11:00 AM", status: "Active" },
];

export default function AlertsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight font-headline flex items-center gap-2">
            <AlertTriangle className="h-8 w-8 text-destructive" />
            Alerts
        </h1>
        <p className="text-muted-foreground">
          A log of all system alerts and notifications.
        </p>
      </div>
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
          {alerts.map((alert) => (
            <TableRow key={alert.id}>
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
    </div>
  );
}
