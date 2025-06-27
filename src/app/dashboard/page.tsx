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

// A simple mapping of states to climate types for more realistic simulation
const climateZones: { [key: string]: 'hot' | 'temperate' | 'cold' | 'humid' } = {
    "Rajasthan": 'hot', "Gujarat": 'hot', "Madhya Pradesh": 'hot', "Telangana": 'hot',
    "Andhra Pradesh": 'hot', "Tamil Nadu": 'hot', "Uttar Pradesh": 'hot', "Bihar": 'hot',
    "Haryana": 'hot', "Delhi": 'hot', "Punjab": 'hot',
    "Maharashtra": 'temperate', "Karnataka": 'temperate', "Chhattisgarh": 'temperate', "Jharkhand": 'temperate',
    "Goa": 'humid', "Kerala": 'humid', "West Bengal": 'humid', "Odisha": 'humid', "Assam": 'humid', "Meghalaya": 'humid', "Tripura": 'humid',
    "Mizoram": 'humid', "Manipur": 'humid', "Nagaland": 'humid', "Andaman and Nicobar Islands": 'humid', "Lakshadweep": 'humid', "Puducherry": 'humid',
    "Jammu and Kashmir": 'cold', "Ladakh": 'cold', "Himachal Pradesh": 'cold', "Uttarakhand": 'cold',
    "Arunachal Pradesh": 'cold', "Sikkim": 'cold',
};


export default function DashboardPage() {
  const [loading, setLoading] = useState(true);
  const [metrics, setMetrics] = useState<{ temp: MetricData | null; humidity: MetricData | null; light: MetricData | null }>({ temp: null, humidity: null, light: null });
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const [cropData, setCropData] = useState<CropData[]>([]);
  const [alertData, setAlertData] = useState<AlertData[]>([]);

  useEffect(() => {
    const fetchData = () => {
      let baseTemp = 24.5; // Default temperate
      let baseHumidity = 65; // Default
      
      const storedAddress = localStorage.getItem('farm_address');
      if (storedAddress) {
          const address = JSON.parse(storedAddress);
          if (address.state) {
              const zone = climateZones[address.state as keyof typeof climateZones] || 'temperate';
            
              switch(zone) {
                case 'hot':
                  baseTemp = 29;
                  baseHumidity = 55;
                  break;
                case 'cold':
                  baseTemp = 18;
                  baseHumidity = 60;
                  break;
                case 'humid':
                  baseTemp = 27;
                  baseHumidity = 75;
                  break;
                case 'temperate':
                default:
                  baseTemp = 24.5;
                  baseHumidity = 65;
                  break;
              }
          }
      }

      // Metrics
      const tempValue = baseTemp + (Math.random() - 0.5) * 2;
      const humidityValue = baseHumidity + (Math.random() * 4 - 2);
      // Light is a controlled variable in a vertical farm, independent of outside location
      const lightValue = 12.5 + (Math.random() * 0.4 - 0.2);

      setMetrics({
        temp: { value: `${tempValue.toFixed(1)}°C`, change: `${(Math.random() * 0.5).toFixed(1)}°C`, changeType: Math.random() > 0.5 ? 'increase' : 'decrease', trendData: Array.from({ length: 10 }, (_, i) => ({ x: i, y: baseTemp - 1 + Math.random()*2 })) },
        humidity: { value: `${humidityValue.toFixed(0)}%`, change: `${Math.round(Math.random() * 2)}%`, changeType: Math.random() > 0.5 ? 'increase' : 'decrease', trendData: Array.from({ length: 10 }, (_, i) => ({ x: i, y: baseHumidity - 2 + Math.random() * 4 })) },
        light: { value: `${lightValue.toFixed(1)} klx`, change: `${(Math.random() * 0.2).toFixed(1)} klx`, changeType: 'increase', trendData: Array.from({ length: 10 }, (_, i) => ({ x: i, y: 12 + Math.random() * 0.5 })) },
      });

      // Chart Data
      const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
      setChartData(days.map(day => ({
        day,
        temperature: baseTemp - 2 + Math.random() * 4,
        humidity: baseHumidity - 5 + Math.random() * 10,
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
    };

    // Simulate initial network delay
    const initialLoadTimer = setTimeout(() => {
      fetchData();
      setLoading(false);
    }, 1500);

    // Set up a recurring update to simulate live data
    const intervalId = setInterval(() => {
      fetchData();
    }, 5000); // Refresh every 5 seconds

    // Cleanup function to clear timers when the component unmounts
    return () => {
      clearTimeout(initialLoadTimer);
      clearInterval(intervalId);
    };
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
