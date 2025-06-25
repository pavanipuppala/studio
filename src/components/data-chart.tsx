"use client"

import { Line, LineChart, CartesianGrid, XAxis, YAxis, Legend } from "recharts"

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
    label: "Temperature",
    color: "hsl(var(--chart-1))",
  },
  humidity: {
    label: "Humidity",
    color: "hsl(var(--chart-3))",
  },
  light: {
    label: "Light",
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
        <ChartContainer config={chartConfig} className="h-64 w-full">
            <LineChart accessibilityLayer data={chartData}>
                <CartesianGrid vertical={false} />
                 <XAxis
                    dataKey="day"
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                    tickFormatter={(value) => value.slice(0, 3)}
                />
                <YAxis yAxisId="left" orientation="left" stroke="hsl(var(--chart-1))" />
                <YAxis yAxisId="right" orientation="right" stroke="hsl(var(--chart-2))" />
                <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent 
                        formatter={(value, name) => {
                            if (name === "temperature") return `${value}°C`
                            if (name === "humidity") return `${value}%`
                            if (name === "light") return `${value} klx`
                            return value
                        }}
                        indicator="dot" 
                    />}
                />
                <Legend content={<ChartLegendContent />} />
                <Line yAxisId="left" dataKey="temperature" type="monotone" stroke="var(--color-temperature)" strokeWidth={2} dot={false} />
                <Line yAxisId="left" dataKey="humidity" type="monotone" stroke="var(--color-humidity)" strokeWidth={2} dot={false} />
                <Line yAxisId="right" dataKey="light" type="monotone" stroke="var(--color-light)" strokeWidth={2} dot={false} />
            </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
