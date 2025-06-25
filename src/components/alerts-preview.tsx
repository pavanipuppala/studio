import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Thermometer, Droplets } from "lucide-react";
import { Badge } from "./ui/badge";

const alerts = [
  {
    icon: <Thermometer className="h-4 w-4" />,
    title: "High Temperature",
    description: "Greenhouse 1 exceeded 30°C.",
    time: "5m ago",
    severity: "High"
  },
  {
    icon: <Droplets className="h-4 w-4" />,
    title: "Low Humidity",
    description: "Lettuce section humidity dropped to 45%.",
    time: "30m ago",
    severity: "Medium"
  },
  {
    icon: <Thermometer className="h-4 w-4" />,
    title: "Sensor Offline",
    description: "Sensor T-04 in Rack B is offline.",
    time: "1h ago",
    severity: "Low"
  },
];

export function AlertsPreview() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline flex items-center gap-2">
            <AlertTriangle className="h-6 w-6 text-destructive" />
            <span>Recent Alerts</span>
        </CardTitle>
        <CardDescription>Immediate issues that may require your attention.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {alerts.map((alert, index) => (
          <div key={index} className="flex items-start gap-4">
            <div className="flex-shrink-0 text-muted-foreground">{alert.icon}</div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <p className="font-semibold">{alert.title}</p>
                <Badge variant={alert.severity === 'High' ? 'destructive' : alert.severity === 'Medium' ? 'secondary' : 'outline'}>{alert.severity}</Badge>
              </div>
              <p className="text-sm text-muted-foreground">{alert.description}</p>
              <p className="text-xs text-muted-foreground pt-1">{alert.time}</p>
            </div>
          </div>
        ))}
      </CardContent>
      <CardFooter>
        <Button asChild variant="outline" className="w-full">
            <Link href="/dashboard/alerts">View All Alerts</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
