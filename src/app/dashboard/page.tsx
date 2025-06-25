import { MetricCard } from "@/components/metric-card";
import { DataChart } from "@/components/data-chart";
import { AiOptimizer } from "@/components/ai-optimizer";
import { CropStatus } from "@/components/crop-status";
import { Thermometer, Droplets, Sun } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight font-headline">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Here's an overview of your vertical farm.</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
            <DataChart />
            <AiOptimizer />
        </div>
        <div className="lg:col-span-1 space-y-8">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
                <MetricCard icon={<Thermometer className="h-6 w-6 text-muted-foreground" />} title="Temperature" value="24.5°C" change="+0.2°C" changeType="increase" />
                <MetricCard icon={<Droplets className="h-6 w-6 text-muted-foreground" />} title="Humidity" value="68%" change="-1%" changeType="decrease" />
                <MetricCard icon={<Sun className="h-6 w-6 text-muted-foreground" />} title="Light Level" value="12.5 klx" change="+0.1 klx" changeType="increase" />
            </div>
            <CropStatus />
        </div>
      </div>
    </div>
  );
}
