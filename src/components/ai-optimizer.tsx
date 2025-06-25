"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState } from "react";
import { Wand2, Loader2, Lightbulb, Bot, Check, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AiOptimizerSchema } from "@/lib/schemas";
import { getAiOptimization } from "@/lib/actions";
import type { OptimizeCropYieldOutput } from "@/ai/flows/optimize-crop-yield";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";

export function AiOptimizer() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<OptimizeCropYieldOutput | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof AiOptimizerSchema>>({
    resolver: zodResolver(AiOptimizerSchema),
    defaultValues: {
      cropType: "Lettuce",
      temperature: 24.5,
      humidity: 68,
      lightLevel: 12500,
    },
  });

  async function onSubmit(values: z.infer<typeof AiOptimizerSchema>) {
    setIsLoading(true);
    setResult(null);
    setError(null);
    const response = await getAiOptimization(values);
    if (response.data) {
      setResult(response.data);
    } else if (response.error) {
      setError(response.error);
    }
    setIsLoading(false);
  }
  
  const handleRecommendationAction = (action: 'Accepted' | 'Rejected') => {
    toast({
        title: `Recommendation ${action}`,
        description: `The AI's suggestion has been marked as ${action.toLowerCase()}.`,
    });
    setResult(null);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline flex items-center gap-2">
            <Wand2 className="h-6 w-6 text-primary" />
            <span>AI-Powered Optimization</span>
        </CardTitle>
        <CardDescription>
          Enter your current farm data to get AI-powered recommendations for optimizing crop yield.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <FormField
                control={form.control}
                name="cropType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Crop Type</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Lettuce" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="temperature"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Temperature (°C)</FormLabel>
                    <FormControl>
                      <Input type="number" step="0.1" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="humidity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Humidity (%)</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lightLevel"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Light Level (Lux)</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Optimizing...
                </>
              ) : (
                "Get Recommendations"
              )}
            </Button>
          </form>
        </Form>
        
        <div className="mt-6">
          {error && (
             <Alert variant="destructive">
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          {result && (
            <Alert>
                <Bot className="h-4 w-4" />
                <AlertTitle className="font-headline flex items-center justify-between">
                    <span>AI Recommendation</span>
                </AlertTitle>
                <AlertDescription>
                   <p className="font-semibold mt-4 mb-2">Summary:</p>
                   <p className="mb-4">{result.summary}</p>
                   <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                       <Card className="p-4">
                           <p className="text-sm font-medium text-muted-foreground">Temperature</p>
                           <p className="font-semibold">{result.temperatureAdjustment}</p>
                       </Card>
                       <Card className="p-4">
                           <p className="text-sm font-medium text-muted-foreground">Humidity</p>
                           <p className="font-semibold">{result.humidityAdjustment}</p>
                       </Card>
                       <Card className="p-4">
                           <p className="text-sm font-medium text-muted-foreground">Light Level</p>
                           <p className="font-semibold">{result.lightLevelAdjustment}</p>
                       </Card>
                   </div>
                   <div className="flex gap-2 justify-end">
                       <Button variant="outline" size="sm" onClick={() => handleRecommendationAction('Rejected')}>
                           <X className="mr-2 h-4 w-4" /> Reject
                       </Button>
                       <Button size="sm" onClick={() => handleRecommendationAction('Accepted')} className="bg-green-600 hover:bg-green-700">
                           <Check className="mr-2 h-4 w-4" /> Accept
                       </Button>
                   </div>
                </AlertDescription>
            </Alert>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
