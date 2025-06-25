import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PageHeader } from "@/components/page-header";
import { PageFooter } from "@/components/page-footer";
import { BarChart, Bot, Layers, Leaf, Lightbulb, Smartphone, Sun, Thermometer, Droplets, ShieldAlert } from "lucide-react";

const features = [
  {
    icon: <Layers className="size-8 text-primary" />,
    title: "Vertical Farming Structure",
    description: "Crops are grown in vertically stacked layers using hydroponics, aeroponics, or aquaponics.",
  },
  {
    icon: <Lightbulb className="size-8 text-primary" />,
    title: "LED Lighting",
    description: "Energy-efficient LEDs provide the optimal light spectrum for photosynthesis, tunable for different crops.",
  },
  {
    icon: <Thermometer className="size-8 text-primary" />,
    title: "IoT Sensors",
    description: "Real-time monitoring of temperature, humidity, CO2, light, and nutrient levels for precise control.",
  },
  {
    icon: <Bot className="size-8 text-primary" />,
    title: "Automation Systems",
    description: "Automated watering, nutrient delivery, and climate control triggered by sensor data to optimize growth.",
  },
  {
    icon: <BarChart className="size-8 text-primary" />,
    title: "Data Analytics",
    description: "AI and machine learning algorithms analyze data to predict optimal conditions and prevent issues.",
  },
  {
    icon: <Smartphone className="size-8 text-primary" />,
    title: "Remote Management",
    description: "Monitor and control your farm from anywhere using a smartphone or computer for real-time adjustments.",
  },
];

const benefits = [
    {
        icon: <Leaf className="h-10 w-10 text-accent-foreground" />,
        title: "Space Efficiency",
        description: "Produce more food per square foot, which is ideal for urban areas with limited space.",
    },
    {
        icon: <Droplets className="h-10 w-10 text-accent-foreground" />,
        title: "Resource Optimization",
        description: "Efficiently use water, nutrients, and energy, leading to cost savings and reduced environmental impact.",
    },
    {
        icon: <Sun className="h-10 w-10 text-accent-foreground" />,
        title: "Year-Round Production",
        description: "Grow crops throughout the year, regardless of external weather, ensuring a stable food supply.",
    },
    {
        icon: <ShieldAlert className="h-10 w-10 text-accent-foreground" />,
        title: "Sustainability",
        description: "Reduce pesticide use, conserve water, and minimize waste for a more sustainable agricultural future.",
    },
];

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <PageHeader />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_500px] lg:gap-12 xl:grid-cols-[1fr_700px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter font-headline sm:text-5xl xl:text-6xl/none">
                    The Future of Farming is Here
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Andhra Pradesh Agri-Tech Portal: Revolutionizing urban agriculture with IoT-powered vertical farming.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button asChild size="lg">
                    <Link href="/register">Register Your Farm</Link>
                  </Button>
                  <Button asChild variant="secondary" size="lg">
                     <Link href="/login">View Demo Dashboard</Link>
                  </Button>
                </div>
              </div>
              <Image
                src="https://images.unsplash.com/photo-1616786947253-108244838b99?w=700&h=500&fit=crop&q=80"
                width="700"
                height="500"
                alt="Hero"
                data-ai-hint="modern hydroponics"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last"
              />
            </div>
          </div>
        </section>

        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-card">
            <div className="container px-4 md:px-6">
                <div className="flex flex-col items-center justify-center space-y-4 text-center">
                    <div className="space-y-2">
                        <div className="inline-block rounded-lg bg-secondary px-3 py-1 text-sm">Key Features</div>
                        <h2 className="text-3xl font-bold tracking-tighter font-headline sm:text-5xl">Smarter, Not Harder Farming</h2>
                        <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                            Our platform integrates cutting-edge technology to give you unprecedented control and insight into your vertical farm.
                        </p>
                    </div>
                </div>
                <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:gap-12 lg:max-w-none lg:grid-cols-3 pt-12">
                    {features.map((feature) => (
                        <div key={feature.title} className="grid gap-2 text-center">
                            <div className="flex justify-center items-center">{feature.icon}</div>
                            <h3 className="text-lg font-bold">{feature.title}</h3>
                            <p className="text-sm text-muted-foreground">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>

        <section id="benefits" className="w-full py-12 md:py-24 lg:py-32">
            <div className="container px-4 md:px-6">
                <div className="grid items-center gap-6 lg:grid-cols-2 lg:gap-12">
                    <div className="flex flex-col justify-center space-y-4">
                         <div className="inline-block rounded-lg bg-secondary px-3 py-1 text-sm self-start">Benefits</div>
                        <h2 className="text-3xl font-bold tracking-tighter font-headline sm:text-4xl md:text-5xl">Why Choose Vertical Farming?</h2>
                        <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                          Embrace a sustainable and efficient solution to modern agricultural challenges.
                        </p>
                        <div className="grid gap-6 pt-6">
                            {benefits.map((benefit) => (
                                <div key={benefit.title} className="flex items-start gap-4">
                                    <div className="bg-accent rounded-full p-3 flex items-center justify-center">
                                      {benefit.icon}
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold">{benefit.title}</h3>
                                        <p className="text-muted-foreground">{benefit.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <Image
                        src="https://images.unsplash.com/photo-1587322849294-883906a14357?w=600&h=550&fit=crop&q=80"
                        width="600"
                        height="550"
                        alt="Benefits"
                        data-ai-hint="glowing plants"
                        className="mx-auto aspect-[1/1] overflow-hidden rounded-xl object-cover"
                    />
                </div>
            </div>
        </section>

        <section id="dashboard-preview" className="w-full py-12 md:py-24 lg:py-32 bg-card">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter font-headline sm:text-5xl">A Glimpse of Your Control Center</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our interactive dashboard provides all the data you need at a glance. Monitor, analyze, and optimize with ease.
                </p>
              </div>
              <div className="w-full max-w-4xl pt-8">
                <Card className="overflow-hidden">
                  <CardContent className="p-0">
                    <Image
                      src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1024&h=640&fit=crop&q=80"
                      width="1024"
                      height="640"
                      alt="Dashboard Preview"
                      data-ai-hint="data visualization"
                      className="w-full"
                    />
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>
      <PageFooter />
    </div>
  );
}
