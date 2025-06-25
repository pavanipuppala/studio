import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User } from "lucide-react";

export default function ProfilePage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight font-headline flex items-center gap-2">
            <User className="h-8 w-8 text-primary" />
            Profile
        </h1>
        <p className="text-muted-foreground">
          View and manage your account details.
        </p>
      </div>
       <Card>
        <CardHeader>
            <CardTitle>Coming Soon</CardTitle>
        </CardHeader>
        <CardContent>
            <p>This page is under construction. You will soon be able to manage your profile information here.</p>
        </CardContent>
      </Card>
    </div>
  );
}
