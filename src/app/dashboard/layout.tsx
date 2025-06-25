import { SidebarProvider, Sidebar, SidebarInset } from "@/components/ui/sidebar";
import { DashboardNav } from "@/components/dashboard-nav";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider>
        <div className="min-h-screen">
            <Sidebar>
                <DashboardNav />
            </Sidebar>
            <main>
                <SidebarInset>
                    <div className="p-4 sm:p-6 lg:p-8">
                        {children}
                    </div>
                </SidebarInset>
            </main>
        </div>
    </SidebarProvider>
  )
}
