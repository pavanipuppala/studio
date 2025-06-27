"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { MetricCard } from "@/components/metric-card";
import { DataChart } from "@/components/data-chart";
import { AiOptimizer } from "@/components/ai-optimizer";
import { CropStatus } from "@/components/crop-status";
import { Thermometer, Droplets, Sun } from "lucide-react";
import { AlertsPreview } from "@/components/alerts-preview";
import { CropRecommender } from "@/components/crop-recommender";
import { FarmingMethods } from "@/components/farming-methods";
import { Skeleton } from "@/components/ui/skeleton";

const containerVariants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 }
};

// Types for our dynamic data
type MetricData = {
  value: string;
  change: string;
  changeType: 'increase' | 'decrease';
  trendData: { x: number; y: number }[];
};

type ChartData = { day: string; temperature: number; humidity: number; light: number };
type CropData = { name: string; health: number; stage: string };
type AlertData = { icon: JSX.Element; title: string; description: string; time: string; severity: "High" | "Medium" | "Low" };

export default function DashboardPage() {
  const [loading, setLoading] = useState(true);
  const [metrics, setMetrics] = useState<{ temp: MetricData | null; humidity: MetricData | null; light: MetricData | null }>({ temp: null, humidity: null, light: null });
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const [cropData, setCropData] = useState<CropData[]>([]);
  const [alertData, setAlertData] = useState<AlertData[]>([]);

  useEffect(() => {
    // Simulate fetching live data
    const timer = setTimeout(() => {
      // Metrics
      const tempValue = 24.5 + (Math.random() - 0.5);
      const humidityValue = 68 + (Math.random() * 4 - 2);
      const lightValue = 12.5 + (Math.random() * 0.4 - 0.2);

      setMetrics({
        temp: { value: `${tempValue.toFixed(1)}°C`, change: `${(Math.random() * 0.5).toFixed(1)}°C`, changeType: Math.random() > 0.5 ? 'increase' : 'decrease', trendData: Array.from({ length: 5 }, (_, i) => ({ x: i, y: 24 + Math.random() })) },
        humidity: { value: `${humidityValue.toFixed(0)}%`, change: `${Math.round(Math.random() * 2)}%`, changeType: Math.random() > 0.5 ? 'increase' : 'decrease', trendData: Array.from({ length: 5 }, (_, i) => ({ x: i, y: 67 + Math.random() * 2 })) },
        light: { value: `${lightValue.toFixed(1)} klx`, change: `${(Math.random() * 0.2).toFixed(1)} klx`, changeType: 'increase', trendData: Array.from({ length: 5 }, (_, i) => ({ x: i, y: 12 + Math.random() * 0.5 })) },
      });

      // Chart Data
      const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
      setChartData(days.map(day => ({
        day,
        temperature: 23 + Math.random() * 3,
        humidity: 65 + Math.random() * 10,
        light: 12 + Math.random() * 1.5
      })));

      // Crop Data
      setCropData([
        { name: "Leafy Greens", health: Math.floor(85 + Math.random() * 10), stage: "Mid Growth" },
        { name: "Strawberries", health: Math.floor(75 + Math.random() * 10), stage: "Flowering" },
        { name: "Herbs", health: Math.floor(80 + Math.random() * 10), stage: "Harvest Ready" },
      ]);
      
      // Alert Data
      setAlertData([
          { icon: <Thermometer className="h-4 w-4" />, title: "High Temperature", description: "Greenhouse 1 exceeded 30°C.", time: "5m ago", severity: "High" },
          { icon: <Droplets className="h-4 w-4" />, title: "Low Humidity", description: "Lettuce section humidity dropped to 45%.", time: "30m ago", severity: "Medium" },
      ]);

      setLoading(false);
    }, 1500); // Simulate network delay

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="space-y-8">
        <div className="space-y-2">
            <Skeleton className="h-9 w-64" />
            <Skeleton className="h-5 w-96" />
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Skeleton className="h-32" />
            <Skeleton className="h-32" />
            <Skeleton className="h-32" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
                <Skeleton className="h-96" />
                <Skeleton className="h-96" />
            </div>
            <div className="lg:col-span-1 space-y-8">
                <Skeleton className="h-64" />
                <Skeleton className="h-64" />
            </div>
        </div>
      </div>
    );
  }

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="space-y-8"
    >
      <motion.div variants={itemVariants}>
        <h1 className="text-3xl font-bold tracking-tight font-headline">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Here's a live overview of your vertical farm.</p>
      </motion.div>
      
      <motion.div variants={containerVariants} className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {metrics.temp && <MetricCard icon={<Thermometer className="h-6 w-6 text-muted-foreground" />} title="Temperature" {...metrics.temp} />}
        {metrics.humidity && <MetricCard icon={<Droplets className="h-6 w-6 text-muted-foreground" />} title="Humidity" {...metrics.humidity} />}
        {metrics.light && <MetricCard icon={<Sun className="h-6 w-6 text-muted-foreground" />} title="Light Level" {...metrics.light} />}
      </motion.div>

      <motion.div variants={containerVariants} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <motion.div variants={itemVariants} className="lg:col-span-2 space-y-8">
            <DataChart data={chartData} />
            <AiOptimizer />
        </motion.div>
        <motion.div variants={itemVariants} className="lg:col-span-1 space-y-8">
            <CropRecommender />
            <CropStatus crops={cropData} />
            <AlertsPreview alerts={alertData} />
        </motion.div>
      </motion.div>

       <motion.div variants={itemVariants}>
          <FarmingMethods />
       </motion.div>

    </motion.div>
  );
}
