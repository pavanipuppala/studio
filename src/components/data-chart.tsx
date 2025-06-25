"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"

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
} from "@/components/ui/chart"

const chartData = [
  { day: "Monday", temperature: 23, humidity: 65 },
  { day: "Tuesday", temperature: 24, humidity: 68 },
  { day: "Wednesday", temperature: 24, humidity: 70 },
  { day: "Thursday", temperature: 25, humidity: 67 },
  { day: "Friday", temperature: 24, humidity: 66 },
  { day: "Saturday", temperature: 23, humidity: 64 },
  { day: "Sunday", temperature: 25, humidity: 69 },
]

const chartConfig = {
  temperature: {
    label: "Temperature (°C)",
    color: "hsl(var(--chart-1))",
  },
  humidity: {
    label: "Humidity (%)",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

export function DataChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Weekly Overview</CardTitle>
        <CardDescription>Temperature and humidity for the last 7 days</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-64 w-full">
            <BarChart accessibilityLayer data={chartData}>
                <CartesianGrid vertical={false} />
                <XAxis
                    dataKey="day"
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                    tickFormatter={(value) => value.slice(0, 3)}
                />
                <YAxis />
                <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent indicator="dot" />}
                />
                <Bar dataKey="temperature" fill="var(--color-temperature)" radius={4} />
                <Bar dataKey="humidity" fill="var(--color-humidity)" radius={4} />
            </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
