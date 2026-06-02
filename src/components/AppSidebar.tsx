import { Link, useLocation } from "@/components/Router";
import { motion } from "framer-motion";
import {
  LayoutDashboard, Users, Shield, AlertTriangle, Camera, FileText, LogOut, ChevronLeft, ChevronRight, HardHat,
} from "lucide-react";
import { useState } from "react";
import { logout } from "@/lib/auth";

const menuItems = [
  { label: "Dashboard", icon: LayoutDashboard, to: "/dashboard" },
  { label: "Funcionários", icon: Users, to: "/dashboard/employees" },
  { label: "Controle de EPI", icon: Shield, to: "/dashboard/epi-control" },
  { label: "Alertas", icon: AlertTriangle, to: "/dashboard/alerts" },
  { label: "Câmeras", icon: Camera, to: "/dashboard/cameras" },
  { label: "Relatórios", icon: FileText, to: "/dashboard/reports" },
];

export function AppSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  const handleLogout = () => {
    logout();
    window.location.href = "/";
  };

  return (
    <motion.aside
      animate={{ width: collapsed ? 72 : 260 }}
      transition={{ duration: 0.2 }}
      className="h-screen flex flex-col bg-sidebar border-r border-sidebar-border sticky top-0 z-30"
    >
      <div className="flex items-center gap-3 px-4 h-16 border-b border-sidebar-border">
        <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center shrink-0">
          <HardHat className="w-5 h-5 text-primary-foreground" />
        </div>
        {!collapsed && (
          <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="font-bold text-lg text-foreground tracking-tight">
            ATL's EPI
          </motion.span>
        )}
      </div>

      <nav className="flex-1 py-4 px-2 space-y-1 overflow-y-auto">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.to || (item.to !== "/dashboard" && location.pathname.startsWith(item.to));
          const isExactDashboard = item.to === "/dashboard" && location.pathname === "/dashboard";
          const active = isExactDashboard || (item.to !== "/dashboard" && isActive);

          return (
            <Link
              key={item.to}
              to={item.to}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group ${
                active
                  ? "bg-primary/15 text-primary glow-blue"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              }`}
            >
              <item.icon className={`w-5 h-5 shrink-0 ${active ? "text-primary" : "text-muted-foreground group-hover:text-accent-foreground"}`} />
              {!collapsed && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      <div className="p-2 border-t border-sidebar-border space-y-1">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-all w-full"
        >
          <LogOut className="w-5 h-5 shrink-0" />
          {!collapsed && <span>Sair</span>}
        </button>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="flex items-center justify-center w-full py-2 rounded-lg text-muted-foreground hover:bg-accent transition-all"
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>
    </motion.aside>
  );
}
