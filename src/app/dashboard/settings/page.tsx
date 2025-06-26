"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Settings as SettingsIcon, Bell, Palette, Globe } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 }
};


export default function SettingsPage() {
  const { toast } = useToast();
  const [theme, setTheme] = useState("dark");

  const handleSave = () => {
    toast({
      title: "Settings Saved",
      description: "Your preferences have been updated.",
    });
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      <motion.div variants={itemVariants} className="flex items-center gap-2">
        <h1 className="text-3xl font-bold tracking-tight font-headline flex items-center gap-2">
            <SettingsIcon className="h-8 w-8 text-primary" />
            Settings
        </h1>
      </motion.div>

      <motion.div variants={itemVariants}>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Bell /> Notifications</CardTitle>
            <CardDescription>Manage how you receive notifications from the system.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between space-x-2 p-4 rounded-lg border">
              <div className='space-y-1'>
                <Label htmlFor="email-notifications">Email Notifications</Label>
                <p className='text-sm text-muted-foreground'>Receive important alerts and summaries via email.</p>
              </div>
              <Switch id="email-notifications" defaultChecked />
            </div>
            <div className="flex items-center justify-between space-x-2 p-4 rounded-lg border">
              <div className='space-y-1'>
                <Label htmlFor="high-severity-alerts">High Severity Alerts</Label>
                 <p className='text-sm text-muted-foreground'>Critical issues requiring immediate attention.</p>
              </div>
              <Switch id="high-severity-alerts" defaultChecked />
            </div>
             <div className="flex items-center justify-between space-x-2 p-4 rounded-lg border">
              <div className='space-y-1'>
                <Label htmlFor="medium-severity-alerts">Medium Severity Alerts</Label>
                 <p className='text-sm text-muted-foreground'>Warnings about potential issues.</p>
              </div>
              <Switch id="medium-severity-alerts" />
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div variants={itemVariants}>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Palette /> Appearance</CardTitle>
            <CardDescription>Customize the look and feel of the application.</CardDescription>
          </CardHeader>
          <CardContent>
            <Label>Theme</Label>
            <RadioGroup value={theme} onValueChange={setTheme} className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-2">
              <div>
                <RadioGroupItem value="light" id="light" className="peer sr-only" />
                <Label htmlFor="light" className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary">
                  Light
                </Label>
              </div>
               <div>
                <RadioGroupItem value="dark" id="dark" className="peer sr-only" />
                <Label htmlFor="dark" className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary">
                  Dark
                </Label>
              </div>
               <div>
                <RadioGroupItem value="system" id="system" className="peer sr-only" />
                <Label htmlFor="system" className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary">
                  System
                </Label>
              </div>
            </RadioGroup>
          </CardContent>
        </Card>
      </motion.div>
      
      <motion.div variants={itemVariants}>
         <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><Globe /> Language & Region</CardTitle>
                <CardDescription>Set your preferred language and region.</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                 <div className="space-y-2">
                    <Label htmlFor="language">Language</Label>
                    <Select defaultValue="en">
                      <SelectTrigger id="language">
                        <SelectValue placeholder="Select language" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">English (United States)</SelectItem>
                        <SelectItem value="es">Español (Spanish)</SelectItem>
                        <SelectItem value="fr">Français (French)</SelectItem>
                      </SelectContent>
                    </Select>
                 </div>
                 <div className="space-y-2">
                    <Label htmlFor="timezone">Timezone</Label>
                    <Select defaultValue="ist">
                      <SelectTrigger id="timezone">
                        <SelectValue placeholder="Select timezone" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pst">Pacific Standard Time (PST)</SelectItem>
                        <SelectItem value="est">Eastern Standard Time (EST)</SelectItem>
                        <SelectItem value="ist">Indian Standard Time (IST)</SelectItem>
                      </SelectContent>
                    </Select>
                 </div>
            </CardContent>
        </Card>
      </motion.div>
      
      <motion.div variants={itemVariants} className="flex justify-end">
          <Button onClick={handleSave}>Save Preferences</Button>
      </motion.div>

    </motion.div>
  );
}
