"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Upload } from 'lucide-react';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from '@/hooks/use-toast';

export default function ProfilePage() {
  const { toast } = useToast();
  const [name, setName] = useState("Urban Farmer");
  const [email, setEmail] = useState("farmer@uvf.com");
  const [farmName, setFarmName] = useState("Main St. Vertical Farm");
  const [avatar, setAvatar] = useState("https://placehold.co/128x128.png");

  const handleSave = () => {
    // Mock save logic
    console.log({ name, email, farmName });
    toast({
      title: "Profile Updated",
      description: "Your profile information has been saved successfully.",
    });
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      <div className="flex items-center gap-2">
        <h1 className="text-3xl font-bold tracking-tight font-headline flex items-center gap-2">
            <User className="h-8 w-8 text-primary" />
            Profile
        </h1>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
          <CardDescription>Update your account details and profile picture.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center space-y-4">
              <Avatar className="h-32 w-32">
                <AvatarImage src={avatar} alt="User Avatar" data-ai-hint="portrait person" />
                <AvatarFallback>UF</AvatarFallback>
              </Avatar>
              <Button variant="outline">
                <Upload className="mr-2 h-4 w-4" />
                Upload Picture
              </Button>
            </div>
            <div className="md:col-span-2 space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="farmName">Farm Name</Label>
                <Input id="farmName" value={farmName} onChange={(e) => setFarmName(e.target.value)} />
              </div>
              <Button onClick={handleSave}>Save Changes</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Security</CardTitle>
          <CardDescription>Manage your password and account security.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
            <div className="space-y-2">
                <Label htmlFor="current-password">Current Password</Label>
                <Input id="current-password" type="password" />
            </div>
            <div className="space-y-2">
                <Label htmlFor="new-password">New Password</Label>
                <Input id="new-password" type="password" />
            </div>
            <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm New Password</Label>
                <Input id="confirm-password" type="password" />
            </div>
            <Button>Update Password</Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}
