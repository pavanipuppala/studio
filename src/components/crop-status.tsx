import Image from "next/image";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Leaf } from "lucide-react";

const crops = [
  {
    name: "Leafy Greens",
    health: 92,
    stage: "Mid Growth",
    image: "https://images.unsplash.com/photo-1631195463533-5b85891630b3?q=80&w=400&h=300&auto=format&fit=crop",
    hint: "green lettuce"
  },
  {
    name: "Strawberries",
    health: 78,
    stage: "Flowering",
    image: "https://images.unsplash.com/photo-1599454101498-3dc6f82cc847?q=80&w=400&h=300&auto=format&fit=crop",
    hint: "ripe strawberries"
  },
  {
    name: "Herbs",
    health: 85,
    stage: "Harvest Ready",
    image: "https://images.unsplash.com/photo-1604803799222-7f51159b3d22?q=80&w=400&h=300&auto=format&fit=crop",
    hint: "fresh herbs"
  },
];

export function CropStatus() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline flex items-center gap-2">
            <Leaf className="h-6 w-6 text-primary" />
            <span>Crop Status</span>
        </CardTitle>
        <CardDescription>Health and growth stage of your current crops.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {crops.map((crop) => (
          <div key={crop.name} className="space-y-3">
            <div className="flex items-center gap-4">
              <Image
                src={crop.image}
                alt={crop.name}
                width={80}
                height={60}
                data-ai-hint={crop.hint}
                className="rounded-md object-cover aspect-[4/3]"
              />
              <div className="w-full">
                <div className="flex justify-between items-center mb-1">
                  <p className="font-semibold">{crop.name}</p>
                  <p className="text-sm text-muted-foreground">{crop.stage}</p>
                </div>
                <div className="flex items-center gap-2">
                    <Progress value={crop.health} className="h-2" />
                    <span className="text-sm font-medium text-muted-foreground w-12 text-right">{crop.health}%</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
