import { MetricCard } from "@/components/metric-card";
import { DataChart } from "@/components/data-chart";
import { AiOptimizer } from "@/components/ai-optimizer";
import { CropStatus } from "@/components/crop-status";
import { Thermometer, Droplets, Sun, Activity } from "lucide-react";

const tempTrend = [ { x: 1, y: 22 }, { x: 2, y: 23 }, { x: 3, y: 22.5 }, { x: 4, y: 24 }, { x: 5, y: 24.5 } ];
const humidityTrend = [ { x: 1, y: 70 }, { x: 2, y: 68 }, { x: 3, y: 69 }, { x: 4, y: 67 }, { x: 5, y: 68 } ];
const lightTrend = [ { x: 1, y: 12 }, { x: 2, y: 12.2 }, { x: 3, y: 12.5 }, { x: 4, y: 12.4 }, { x: 5, y: 12.5 } ];

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight font-headline">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Here's an overview of your vertical farm.</p>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <MetricCard icon={<Thermometer className="h-6 w-6 text-muted-foreground" />} title="Temperature" value="24.5°C" change="+0.2°C" changeType="increase" trendData={tempTrend} />
        <MetricCard icon={<Droplets className="h-6 w-6 text-muted-foreground" />} title="Humidity" value="68%" change="-1%" changeType="decrease" trendData={humidityTrend}/>
        <MetricCard icon={<Sun className="h-6 w-6 text-muted-foreground" />} title="Light Level" value="12.5 klx" change="+0.1 klx" changeType="increase" trendData={lightTrend} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
            <DataChart />
            <AiOptimizer />
        </div>
        <div className="lg:col-span-1 space-y-8">
            <CropStatus />
        </div>
      </div>
    </div>
  );
}
