"use client";

import { motion } from "framer-motion";
import { MetricCard } from "@/components/metric-card";
import { DataChart } from "@/components/data-chart";
import { AiOptimizer } from "@/components/ai-optimizer";
import { CropStatus } from "@/components/crop-status";
import { Thermometer, Droplets, Sun } from "lucide-react";
import { AlertsPreview } from "@/components/alerts-preview";

const tempTrend = [ { x: 1, y: 22 }, { x: 2, y: 23 }, { x: 3, y: 22.5 }, { x: 4, y: 24 }, { x: 5, y: 24.5 } ];
const humidityTrend = [ { x: 1, y: 70 }, { x: 2, y: 68 }, { x: 3, y: 69 }, { x: 4, y: 67 }, { x: 5, y: 68 } ];
const lightTrend = [ { x: 1, y: 12 }, { x: 2, y: 12.2 }, { x: 3, y: 12.5 }, { x: 4, y: 12.4 }, { x: 5, y: 12.5 } ];

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


export default function DashboardPage() {
  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="space-y-8"
    >
      <motion.div variants={itemVariants}>
        <h1 className="text-3xl font-bold tracking-tight font-headline">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Here's an overview of your vertical farm.</p>
      </motion.div>
      
      <motion.div variants={containerVariants} className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <MetricCard icon={<Thermometer className="h-6 w-6 text-muted-foreground" />} title="Temperature" value="24.5°C" change="+0.2°C" changeType="increase" trendData={tempTrend} />
        <MetricCard icon={<Droplets className="h-6 w-6 text-muted-foreground" />} title="Humidity" value="68%" change="-1%" changeType="decrease" trendData={humidityTrend}/>
        <MetricCard icon={<Sun className="h-6 w-6 text-muted-foreground" />} title="Light Level" value="12.5 klx" change="+0.1 klx" changeType="increase" trendData={lightTrend} />
      </motion.div>

      <motion.div variants={containerVariants} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <motion.div variants={itemVariants} className="lg:col-span-2 space-y-8">
            <DataChart />
            <AiOptimizer />
        </motion.div>
        <motion.div variants={itemVariants} className="lg:col-span-1 space-y-8">
            <CropStatus />
            <AlertsPreview />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
