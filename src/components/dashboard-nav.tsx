"use client";

import { usePathname, useRouter } from 'next/navigation';
import {
    SidebarHeader,
    SidebarContent,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
    SidebarFooter
} from '@/components/ui/sidebar';
import { Button } from './ui/button';
import { Leaf, LayoutDashboard, AlertTriangle, Settings, User, LogOut } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';


export function DashboardNav() {
    const pathname = usePathname();
    const router = useRouter();

    const menuItems = [
        { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { href: '/dashboard/alerts', label: 'Alerts', icon: AlertTriangle },
        { href: '/dashboard/settings', label: 'Settings', icon: Settings },
        { href: '/dashboard/profile', label: 'Profile', icon: User },
    ];

    const handleLogout = () => {
        // Mock logout
        router.push('/login');
    }

    return (
        <>
            <SidebarHeader className='p-4'>
                <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" className="text-sidebar-foreground">
                        <Leaf className="h-6 w-6" />
                    </Button>
                    <div className="flex flex-col">
                        <span className="text-lg font-semibold font-headline text-sidebar-foreground">AP Agri-Tech</span>
                        <span className="text-xs text-sidebar-foreground/70">Urban Farming Portal</span>
                    </div>
                </div>
            </SidebarHeader>
            <SidebarContent className='p-4'>
                <SidebarMenu>
                    {menuItems.map((item) => (
                        <SidebarMenuItem key={item.href}>
                            <SidebarMenuButton
                                onClick={() => router.push(item.href)}
                                isActive={pathname === item.href}
                            >
                                <item.icon className="size-4" />
                                <span>{item.label}</span>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarContent>
            <SidebarFooter className='p-4'>
                 <div className="flex items-center gap-3">
                    <Avatar>
                        <AvatarImage src="https://placehold.co/40x40.png" alt="@farmer" />
                        <AvatarFallback>AP</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                        <span className="font-semibold text-sm text-sidebar-foreground">Andhra Farmer</span>
                        <span className="text-xs text-sidebar-foreground/70">farmer@ap.gov.in</span>
                    </div>
                    <Button variant="ghost" size="icon" className="ml-auto text-sidebar-foreground" onClick={handleLogout}>
                        <LogOut className="size-4" />
                    </Button>
                </div>
            </SidebarFooter>
        </>
    );
}
