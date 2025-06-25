import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  change: string;
  changeType: 'increase' | 'decrease';
}

export function MetricCard({ icon, title, value, change, changeType }: MetricCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className={cn(
          "text-xs text-muted-foreground",
          changeType === 'increase' ? 'text-green-600' : 'text-red-600'
        )}>
          {change} from last hour
        </p>
      </CardContent>
    </Card>
  );
}
