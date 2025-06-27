"use client";

import { useEffect, useState } from "react";
import { Bot, Lightbulb, Loader2, MapPin } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import type { RecommendCropOutput } from "@/ai/flows/recommend-crop-flow";
import { getRecommendedCrop } from "@/lib/actions";

export function CropRecommender() {
  const [farmInfo, setFarmInfo] = useState<{ city: string; state: string; farmType: string } | null>(null);
  const [result, setResult] = useState<RecommendCropOutput | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // This component depends on client-side data.
    // To prevent hydration mismatches, we ensure this code runs only on the client.
    const storedAddress = localStorage.getItem('farm_address');
    if (storedAddress) {
      const address = JSON.parse(storedAddress);
      if (address.city && address.state && address.farmType) {
        setFarmInfo({ 
            city: address.city, 
            state: address.state,
            farmType: address.farmType
        });
      } else {
        setError("Farm location or type not fully set. Please update your address information.");
        setIsLoading(false);
      }
    } else {
      setError("Farm address not found. Please set your location first.");
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (farmInfo) {
      const fetchRecommendation = async () => {
        setIsLoading(true);
        setError(null);
        const response = await getRecommendedCrop(farmInfo);
        if (response.data) {
          setResult(response.data);
        } else {
          setError(response.error || "Failed to get recommendation.");
        }
        setIsLoading(false);
      };
      fetchRecommendation();
    }
  }, [farmInfo]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline flex items-center gap-2">
            <Lightbulb className="h-6 w-6 text-primary" />
            <span>AI Crop Recommendation</span>
        </CardTitle>
        {farmInfo && (
             <CardDescription className="flex items-center gap-1 pt-1">
                <MapPin className="h-3 w-3" /> For your {farmInfo.farmType.toLowerCase()} farm in {farmInfo.city}, {farmInfo.state}
            </CardDescription>
        )}
      </CardHeader>
      <CardContent>
        {isLoading && (
          <div className="flex items-center justify-center h-24">
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
            <p className="ml-2 text-muted-foreground">Finding the perfect crop...</p>
          </div>
        )}
        {error && !isLoading && (
          <Alert variant="destructive">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        {result && !isLoading && (
          <div className="space-y-4">
             <div>
                <p className="text-sm text-muted-foreground mb-1">Recommended Crop</p>
                <h3 className="text-2xl font-bold text-primary">{result.cropName}</h3>
             </div>
             <div>
                <p className="text-sm text-muted-foreground mb-1">Suggested Farming Method</p>
                <div className="flex gap-2">
                    {result.farmingMethods.map(method => (
                        <Badge key={method} variant="secondary">{method}</Badge>
                    ))}
                </div>
             </div>
             <div>
                <p className="text-sm text-muted-foreground mb-1">Reasoning</p>
                <p className="text-sm">{result.reason}</p>
             </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
