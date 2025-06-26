"use client"

import { Area, AreaChart, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartConfig,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart"

const chartData = [
  { day: "Monday", temperature: 23.1, humidity: 65, light: 12.1 },
  { day: "Tuesday", temperature: 24.5, humidity: 68, light: 12.5 },
  { day: "Wednesday", temperature: 24.8, humidity: 70, light: 12.8 },
  { day: "Thursday", temperature: 25.2, humidity: 67, light: 13.0 },
  { day: "Friday", temperature: 24.9, humidity: 66, light: 12.7 },
  { day: "Saturday", temperature: 23.8, humidity: 64, light: 11.9 },
  { day: "Sunday", temperature: 25.5, humidity: 69, light: 13.2 },
]

const chartConfig = {
  temperature: {
    label: "Temperature (°C)",
    color: "hsl(var(--chart-1))",
  },
  humidity: {
    label: "Humidity (%)",
    color: "hsl(var(--chart-3))",
  },
  light: {
    label: "Light (klx)",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

export function DataChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Weekly Overview</CardTitle>
        <CardDescription>Key environmental metrics for the last 7 days</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-72 w-full">
            <AreaChart accessibilityLayer data={chartData} margin={{ left: 12, right: 12 }}>
                <CartesianGrid vertical={false} strokeDasharray="3 3" />
                <XAxis
                    dataKey="day"
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                    tickFormatter={(value) => value.slice(0, 3)}
                />
                 <YAxis
                    tickLine={false}
                    axisLine={false}
                    tickMargin={10}
                 />
                <ChartTooltip
                    cursor={true}
                    content={<ChartTooltipContent indicator="dot" />}
                />
                <ChartLegend content={<ChartLegendContent />} />
                <defs>
                    <linearGradient id="fillTemperature" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="var(--color-temperature)" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="var(--color-temperature)" stopOpacity={0.1} />
                    </linearGradient>
                    <linearGradient id="fillHumidity" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="var(--color-humidity)" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="var(--color-humidity)" stopOpacity={0.1} />
                    </linearGradient>
                     <linearGradient id="fillLight" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="var(--color-light)" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="var(--color-light)" stopOpacity={0.1} />
                    </linearGradient>
                </defs>
                <Area dataKey="temperature" type="natural" fill="url(#fillTemperature)" fillOpacity={0.4} stroke="var(--color-temperature)" strokeWidth={2} stackId="a" />
                <Area dataKey="humidity" type="natural" fill="url(#fillHumidity)" fillOpacity={0.4} stroke="var(--color-humidity)" strokeWidth={2} stackId="b" />
                <Area dataKey="light" type="natural" fill="url(#fillLight)" fillOpacity={0.4} stroke="var(--color-light)" strokeWidth={2} stackId="c" />
            </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
