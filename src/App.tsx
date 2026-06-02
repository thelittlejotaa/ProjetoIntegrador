import { RouterProvider, useLocation } from "@/components/Router";
import { AppSidebar } from "@/components/AppSidebar";
import { DashboardHeader } from "@/components/DashboardHeader";
import { Dashboard } from "@/pages/Dashboard";
import { Cameras } from "@/pages/Cameras";
import { Employees } from "@/pages/Employees";
import { EpiControl } from "@/pages/EpiControl";
import { Alerts } from "@/pages/Alerts";
import { Reports } from "@/pages/Reports";

function AppContent() {
  const { pathname } = useLocation();

  const renderPage = () => {
    switch (pathname) {
      case "/dashboard":
        return <Dashboard />;
      case "/dashboard/cameras":
        return <Cameras />;
      case "/dashboard/employees":
        return <Employees />;
      case "/dashboard/epi-control":
        return <EpiControl />;
      case "/dashboard/alerts":
        return <Alerts />;
      case "/dashboard/reports":
        return <Reports />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex min-h-screen bg-background text-foreground antialiased">
      <AppSidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <DashboardHeader />
        <main className="flex-1 p-6 overflow-x-hidden">
          {renderPage()}
        </main>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <RouterProvider>
      <AppContent />
    </RouterProvider>
  );
}
