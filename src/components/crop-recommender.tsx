
"use client";

import { useState, useEffect, useRef } from "react";
import { Lightbulb, Loader2, MapPin, RefreshCw, Edit, Save, X } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { RecommendCropOutput } from "@/ai/flows/recommend-crop-flow";
import { Textarea } from "./ui/textarea";
import { getRecommendedCrop } from "@/lib/actions";

interface CropRecommenderProps {
  recommendation: RecommendCropOutput | null;
  onSaveRecommendation: (newRecommendation: RecommendCropOutput) => void;
  farmInfo: { city: string; state: string; } | null;
  isLoading: boolean;
  error: string | null;
  onFetchRecommendation: () => void;
}

export function CropRecommender({ recommendation, onSaveRecommendation, farmInfo, isLoading, error, onFetchRecommendation }: CropRecommenderProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState<RecommendCropOutput | null>(recommendation);
  const [isReasoningLoading, setIsReasoningLoading] = useState(false);
  const originalCropNameOnEdit = useRef<string | null>(null);

  useEffect(() => {
    // Sync local state with prop change, but only when not in edit mode.
    if (!isEditing) {
      setEditedData(recommendation);
    }
  }, [recommendation, isEditing]);
  
  const handleEdit = () => {
    originalCropNameOnEdit.current = recommendation?.cropName || null;
    setIsEditing(true);
  }

  const handleSave = () => {
    if (editedData) {
      onSaveRecommendation(editedData);
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditedData(recommendation); // Reset changes to original prop value
    setIsEditing(false);
  };
  
  const handleReasoningUpdate = async () => {
    if (!editedData || !farmInfo || !editedData.cropName || isReasoningLoading) return;

    if (editedData.cropName === originalCropNameOnEdit.current) return;

    setIsReasoningLoading(true);
    const response = await getRecommendedCrop({
        ...farmInfo,
        forceCropName: editedData.cropName,
    });
    
    if (response.data) {
        setEditedData(prev => ({
            ...(prev!),
            cropName: response.data.cropName, // Keep the user's entered name which is also returned
            reason: response.data.reason,
            predictedFarmType: response.data.predictedFarmType,
        }));
        originalCropNameOnEdit.current = response.data.cropName;
    } else {
        console.error("Failed to update reasoning:", response.error);
    }
    
    setIsReasoningLoading(false);
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex items-center justify-center h-48">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          <p className="ml-2 text-muted-foreground">Finding the perfect crop...</p>
        </div>
      );
    }

    if (error) {
        return null; // Don't show errors as per user request
    }

    if (isEditing && editedData) {
      return (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="cropName">Recommended Crop</Label>
            <div className="flex items-center gap-2">
                <Input
                    id="cropName"
                    value={editedData.cropName}
                    onChange={(e) => setEditedData({ ...editedData, cropName: e.target.value })}
                    onBlur={handleReasoningUpdate}
                    disabled={isReasoningLoading}
                />
                <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    className="h-9 w-9 flex-shrink-0"
                    onClick={handleReasoningUpdate}
                    disabled={isReasoningLoading}
                >
                    {isReasoningLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
                    <span className="sr-only">Update Reasoning</span>
                </Button>
            </div>
            <p className="text-xs text-muted-foreground">
                Change the crop and click the refresh button to get new AI-powered reasoning.
            </p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="farmType">Predicted Farm Type</Label>
            <Select
              value={editedData.predictedFarmType}
              onValueChange={(value) => setEditedData({ ...editedData, predictedFarmType: value })}
              disabled={isReasoningLoading}
            >
              <SelectTrigger id="farmType">
                <SelectValue placeholder="Select farm type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Hydroponics">Hydroponics</SelectItem>
                <SelectItem value="Aeroponics">Aeroponics</SelectItem>
                <SelectItem value="Aquaponics">Aquaponics</SelectItem>
                <SelectItem value="Traditional Vertical">Traditional Vertical</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2 relative">
            <Label htmlFor="reasoning">Reasoning</Label>
            <Textarea
              id="reasoning"
              value={editedData.reason}
              onChange={(e) => setEditedData({ ...editedData, reason: e.target.value })}
              className="min-h-[120px]"
              disabled={isReasoningLoading}
            />
            {isReasoningLoading && (
                <div className="absolute inset-0 bg-background/80 flex items-center justify-center rounded-md">
                    <Loader2 className="h-5 w-5 animate-spin" />
                </div>
            )}
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <Button variant="ghost" size="sm" onClick={handleCancel}>
              <X className="mr-2 h-4 w-4" /> Cancel
            </Button>
            <Button size="sm" onClick={handleSave} disabled={isReasoningLoading}>
              <Save className="mr-2 h-4 w-4" /> Save Changes
            </Button>
          </div>
        </div>
      );
    }

    if (recommendation) {
      return (
        <div className="space-y-4">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Recommended Crop</p>
              <h3 className="text-2xl font-bold text-primary">{recommendation.cropName}</h3>
            </div>
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handleEdit}>
              <Edit className="h-4 w-4" />
              <span className="sr-only">Edit Recommendation</span>
            </Button>
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
           <Button onClick={onFetchRecommendation} variant="outline" size="sm" className="w-full mt-2">
            <RefreshCw className="mr-2 h-4 w-4" />
            Get Another Suggestion
          </Button>
        </div>
      );
    }

    return (
        <div className="text-center space-y-4 flex flex-col items-center justify-center h-48">
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
      <CardContent className="min-h-[240px] flex flex-col justify-center">
        {renderContent()}
      </CardContent>
    </Card>
  );
}
