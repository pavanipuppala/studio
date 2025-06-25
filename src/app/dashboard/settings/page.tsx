import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Settings as SettingsIcon } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight font-headline flex items-center gap-2">
            <SettingsIcon className="h-8 w-8 text-primary" />
            Settings
        </h1>
        <p className="text-muted-foreground">
          Manage your application and notification settings.
        </p>
      </div>
       <Card>
        <CardHeader>
            <CardTitle>Coming Soon</CardTitle>
        </CardHeader>
        <CardContent>
            <p>This page is under construction. You will soon be able to manage your alert preferences and other settings here.</p>
        </CardContent>
      </Card>
    </div>
  );
}
