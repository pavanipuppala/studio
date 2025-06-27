"use client";

import { Lightbulb, Loader2, MapPin, RefreshCw } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { RecommendCropOutput } from "@/ai/flows/recommend-crop-flow";

interface CropRecommenderProps {
  recommendation: RecommendCropOutput | null;
  farmInfo: { city: string; state: string; } | null;
  isLoading: boolean;
  error: string | null;
  onFetchRecommendation: () => void;
}

export function CropRecommender({ recommendation, farmInfo, isLoading, error, onFetchRecommendation }: CropRecommenderProps) {
  
  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex items-center justify-center h-40">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          <p className="ml-2 text-muted-foreground">Finding the perfect crop...</p>
        </div>
      );
    }

    if (error) {
        return null;
    }

    if (recommendation) {
      return (
        <div className="space-y-4">
          <div>
            <p className="text-sm text-muted-foreground mb-1">Recommended Crop</p>
            <h3 className="text-2xl font-bold text-primary">{recommendation.cropName}</h3>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-1">Predicted Farm Type</p>
            <div className="flex gap-2">
              <Badge variant="secondary">{recommendation.predictedFarmType}</Badge>
            </div>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-1">Reasoning</p>
            <p className="text-sm">{recommendation.reason}</p>
          </div>
           <Button onClick={onFetchRecommendation} variant="outline" size="sm" className="w-full">
            <RefreshCw className="mr-2 h-4 w-4" />
            Get Another Suggestion
          </Button>
        </div>
      );
    }

    return (
        <div className="text-center space-y-4 flex flex-col items-center justify-center h-40">
            <p className="text-sm text-muted-foreground max-w-xs">
                Click the button to get a personalized crop recommendation for your farm, powered by AI.
            </p>
            <Button onClick={onFetchRecommendation} disabled={!farmInfo}>
                <Lightbulb className="mr-2 h-4 w-4" />
                Get Recommendation
            </Button>
        </div>
    );
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline flex items-center gap-2">
          <Lightbulb className="h-6 w-6 text-primary" />
          <span>AI Crop Recommendation</span>
        </CardTitle>
        {farmInfo && (
          <CardDescription className="flex items-center gap-1 pt-1">
            <MapPin className="h-3 w-3" /> For your location in {farmInfo.city}, {farmInfo.state}
          </CardDescription>
        )}
      </CardHeader>
      <CardContent>
        {renderContent()}
      </CardContent>
    </Card>
  );
}
