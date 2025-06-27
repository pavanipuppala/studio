
"use client";

import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { format, subDays } from "date-fns";
import { MetricCard } from "@/components/metric-card";
import { DataChart } from "@/components/data-chart";
import { AiOptimizer } from "@/components/ai-optimizer";
import { IdealConditions } from "@/components/crop-status";
import { Thermometer, Droplets, Sun, Info } from "lucide-react";
import { AlertsPreview } from "@/components/alerts-preview";
import { CropRecommender } from "@/components/crop-recommender";
import { Skeleton } from "@/components/ui/skeleton";
import { getCityClimate, getRecommendedCrop } from "@/lib/actions";
import type { RecommendCropOutput } from "@/ai/flows/recommend-crop-flow";
import { useToast } from "@/hooks/use-toast";

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

type MetricData = {
  value: string;
  change: string;
  changeType: 'increase' | 'decrease';
  trendData: { x: number; y: number }[];
};

type ChartData = { day: string; temperature: number; humidity: number; light: number };
type AlertData = { icon: JSX.Element; title: string; description: string; time: string; severity: "High" | "Medium" | "Low" };

export default function DashboardPage() {
  const [loading, setLoading] = useState(true);
  const [metrics, setMetrics] = useState<{ temp: MetricData | null; humidity: MetricData | null; light: MetricData | null }>({ temp: null, humidity: null, light: null });
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const [alertData, setAlertData] = useState<AlertData[]>([]);
  const [baseMetrics, setBaseMetrics] = useState<{temp: number, humidity: number} | null>(null);
  const [climateInfo, setClimateInfo] = useState<{ description: string } | null>(null);
  const [farmInfo, setFarmInfo] = useState<{ city: string; state: string; } | null>(null);
  const [recommendedCrop, setRecommendedCrop] = useState<RecommendCropOutput | null>(null);
  const [isRecommenderLoading, setIsRecommenderLoading] = useState(false);
  const [recommenderError, setRecommenderError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const initializeDashboard = async () => {
      let city = "Bengaluru";
      let state = "Karnataka";

      const storedAddress = localStorage.getItem('farm_address');
      if (storedAddress) {
        const address = JSON.parse(storedAddress);
        if (address.city && address.state) {
            city = address.city;
            state = address.state;
        }
      }
      setFarmInfo({ city, state });

      const climateResponse = await getCityClimate({ city, state });
      if (climateResponse.data) {
          setBaseMetrics({
              temp: climateResponse.data.averageTemp,
              humidity: climateResponse.data.averageHumidity
          });
          setClimateInfo({ description: climateResponse.data.climateDescription });
      } else {
          console.error("Could not fetch climate data:", climateResponse.error);
          setBaseMetrics({ temp: 24.5, humidity: 65 });
          setClimateInfo({ description: "Default temperate climate." });
      }
    };
    initializeDashboard();
  }, []);

  const handleFetchRecommendation = useCallback(async () => {
    if (!farmInfo) {
        setRecommenderError("Farm address not found. Please set your location first.");
        return;
    }
    setIsRecommenderLoading(true);
    setRecommenderError(null);
    const response = await getRecommendedCrop(farmInfo);
    if (response.data) {
        setRecommendedCrop(response.data);
        localStorage.setItem('lastValidAlert', JSON.stringify(response.data));
    } else {
        const cachedRecommendationRaw = localStorage.getItem('lastValidAlert');
        if (cachedRecommendationRaw) {
            const cachedRecommendation = JSON.parse(cachedRecommendationRaw);
            setRecommendedCrop(cachedRecommendation);
            toast({
                title: "Using Cached Data",
                description: "Could not fetch a new recommendation. Displaying the last successful one.",
            });
        } else {
            setRecommenderError("System alert: Please monitor manually.");
        }
    }
    setIsRecommenderLoading(false);
  }, [farmInfo, toast]);

  useEffect(() => {
    if (!baseMetrics) return;

    const fetchData = () => {
      const { temp: baseTemp, humidity: baseHumidity } = baseMetrics;
      
      const tempValue = baseTemp + (Math.random() - 0.5) * 2;
      const humidityValue = baseHumidity + (Math.random() * 4 - 2);
      const lightValue = 12.5 + (Math.random() * 0.4 - 0.2);

      setMetrics({
        temp: { value: `${tempValue.toFixed(1)}°C`, change: `${(Math.random() * 0.5).toFixed(1)}°C`, changeType: Math.random() > 0.5 ? 'increase' : 'decrease', trendData: Array.from({ length: 10 }, (_, i) => ({ x: i, y: baseTemp - 1 + Math.random()*2 })) },
        humidity: { value: `${humidityValue.toFixed(0)}%`, change: `${Math.round(Math.random() * 2)}%`, changeType: Math.random() > 0.5 ? 'increase' : 'decrease', trendData: Array.from({ length: 10 }, (_, i) => ({ x: i, y: baseHumidity - 2 + Math.random() * 4 })) },
        light: { value: `${lightValue.toFixed(1)} klx`, change: `${(Math.random() * 0.2).toFixed(1)} klx`, changeType: 'increase', trendData: Array.from({ length: 10 }, (_, i) => ({ x: i, y: 12 + Math.random() * 0.5 })) },
      });

      const today = new Date();
      setChartData(Array.from({ length: 30 }).map((_, i) => {
        const date = subDays(today, 29 - i);
        return {
          day: format(date, 'MMM d'),
          temperature: baseTemp - 2 + Math.random() * 4,
          humidity: baseHumidity - 5 + Math.random() * 10,
          light: 12 + Math.random() * 1.5,
        };
      }));
      
      setAlertData([
          { icon: <Thermometer className="h-4 w-4" />, title: "High Temperature", description: "Greenhouse 1 exceeded 30°C.", time: "5m ago", severity: "High" },
          { icon: <Droplets className="h-4 w-4" />, title: "Low Humidity", description: "Lettuce section humidity dropped to 45%.", time: "30m ago", severity: "Medium" },
      ]);
    };

    const initialLoadTimer = setTimeout(() => {
      fetchData();
      setLoading(false);
    }, 1500);

    const intervalId = setInterval(fetchData, 5000);

    return () => {
      clearTimeout(initialLoadTimer);
      clearInterval(intervalId);
    };
  }, [baseMetrics]);

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
        {farmInfo && !loading ? (
            <p className="text-muted-foreground flex items-center gap-2 pt-1">
                <Info className="h-4 w-4" /> 
                <span>Live overview for your farm in {farmInfo.city}. Climate: {climateInfo?.description}</span>
            </p>
        ) : (
            <p className="text-muted-foreground">Welcome back! Here's a live overview of your vertical farm.</p>
        )}
      </motion.div>
      
      <motion.div variants={containerVariants} className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {metrics.temp && <MetricCard icon={<Thermometer className="h-6 w-6 text-muted-foreground" />} title="Temperature" {...metrics.temp} />}
        {metrics.humidity && <MetricCard icon={<Droplets className="h-6 w-6 text-muted-foreground" />} title="Humidity" {...metrics.humidity} />}
        {metrics.light && <MetricCard icon={<Sun className="h-6 w-6 text-muted-foreground" />} title="Light Level" {...metrics.light} />}
      </motion.div>

      <motion.div variants={containerVariants} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <motion.div variants={itemVariants} className="lg:col-span-2 space-y-8">
            <DataChart data={chartData} />
            <AiOptimizer 
              cropType={recommendedCrop?.cropName}
              temperature={metrics.temp ? parseFloat(metrics.temp.value) : undefined}
              humidity={metrics.humidity ? parseFloat(metrics.humidity.value) : undefined}
              lightLevel={metrics.light ? parseFloat(metrics.light.value) * 1000 : undefined}
            />
        </motion.div>
        <motion.div variants={itemVariants} className="lg:col-span-1 space-y-8">
            <CropRecommender 
              recommendation={recommendedCrop}
              farmInfo={farmInfo}
              isLoading={isRecommenderLoading}
              error={recommenderError}
              onFetchRecommendation={handleFetchRecommendation}
            />
            <IdealConditions />
            <AlertsPreview alerts={alertData} />
        </motion.div>
      </motion.div>

    </motion.div>
  );
}
