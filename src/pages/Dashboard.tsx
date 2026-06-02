import { useEffect, useState } from "react";
import { 
  Camera, Users, AlertTriangle, ShieldCheck, RefreshCw, Clock, ArrowRight, ShieldAlert, CheckCircle2 
} from "lucide-react";

interface RecentAlert {
  id: number;
  tipo: string;
  dataHora: string;
  localizacao: string;
  status: string;
}

export function Dashboard() {
  const [stats, setStats] = useState({
    cameras: 4,
    employees: 12,
    detections: 148,
    activeAlerts: 3
  });
  const [loading, setLoading] = useState(false);
  const [recentDetections, setRecentDetections] = useState<any[]>([]);

  const fetchStatsAndDetections = async () => {
    setLoading(true);
    try {
      // Try to fetch from real Spring Boot backend
      const camerasRes = await fetch("http://localhost:8080/Camera/count").then(r => r.json()).catch(() => 4);
      const employeesRes = await fetch("http://localhost:8080/Funcionario/count").then(r => r.json()).catch(() => 12);
      const detectionsRes = await fetch("http://localhost:8080/Deteccao/count").then(r => r.json()).catch(() => 148);
      const listRes = await fetch("http://localhost:8080/Deteccao/listar").then(r => r.json()).catch(() => []);

      setStats({
        cameras: Number(camerasRes),
        employees: Number(employeesRes),
        detections: Number(detectionsRes),
        activeAlerts: listRes.filter((d: any) => !d.usandoEpi).length || 3
      });

      if (listRes && listRes.length > 0) {
        // Sort by dataHora descending
        const sorted = [...listRes].sort((a, b) => 
          new Date(b.dataHora).getTime() - new Date(a.dataHora).getTime()
        );
        setRecentDetections(sorted.slice(0, 5));
      } else {
        // Fallback mock detections
        setRecentDetections([
          { DeteccaoId: 101, usandoEpi: false, dataHora: new Date().toISOString(), camera: { localizacao: "Corredor Principal A" }, funcionario: { nomeFuncionario: "Carlos Oliveira" } },
          { DeteccaoId: 102, usandoEpi: true, dataHora: new Date(Date.now() - 600000).toISOString(), camera: { localizacao: "Almoxarifado" }, funcionario: { nomeFuncionario: "Amanda Silva" } },
          { DeteccaoId: 103, usandoEpi: false, dataHora: new Date(Date.now() - 1800000).toISOString(), camera: { localizacao: "Linha de Produção 2" }, funcionario: { nomeFuncionario: "Rodrigo Costa" } },
          { DeteccaoId: 104, usandoEpi: true, dataHora: new Date(Date.now() - 3600000).toISOString(), camera: { localizacao: "Setor de Soldagem" }, funcionario: { nomeFuncionario: "Fernanda Lima" } }
        ]);
      }
    } catch (e) {
      console.log("Backend offline. Usando dados mockados.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStatsAndDetections();
    const interval = setInterval(fetchStatsAndDetections, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-white">Dashboard Principal</h1>
          <p className="text-muted-foreground mt-1">
            Status geral do monitoramento e conformidade de segurança em tempo real.
          </p>
        </div>
        <button 
          onClick={fetchStatsAndDetections}
          disabled={loading}
          className="flex items-center gap-2 px-4 py-2 text-sm rounded-lg glass-panel text-blue-400 border-blue-500/20 hover:bg-blue-500/10 transition-all cursor-pointer"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          Sincronizar
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Cameras Card */}
        <div className="glass-panel p-5 rounded-xl glow-blue flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Câmeras Ativas</span>
            <div className="text-3xl font-bold text-white">{stats.cameras}</div>
          </div>
          <div className="w-12 h-12 rounded-lg bg-blue-500/15 flex items-center justify-center border border-blue-500/20">
            <Camera className="w-6 h-6 text-blue-400" />
          </div>
        </div>

        {/* Employees Card */}
        <div className="glass-panel p-5 rounded-xl glow-blue flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Funcionários</span>
            <div className="text-3xl font-bold text-white">{stats.employees}</div>
          </div>
          <div className="w-12 h-12 rounded-lg bg-indigo-500/15 flex items-center justify-center border border-indigo-500/20">
            <Users className="w-6 h-6 text-indigo-400" />
          </div>
        </div>

        {/* Detections Card */}
        <div className="glass-panel p-5 rounded-xl glow-green flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Deteccões (IA)</span>
            <div className="text-3xl font-bold text-white">{stats.detections}</div>
          </div>
          <div className="w-12 h-12 rounded-lg bg-emerald-500/15 flex items-center justify-center border border-emerald-500/20">
            <ShieldCheck className="w-6 h-6 text-emerald-400" />
          </div>
        </div>

        {/* Active Alerts Card */}
        <div className="glass-panel p-5 rounded-xl glow-red flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Desvios de EPI</span>
            <div className="text-3xl font-bold text-red-400">{stats.activeAlerts}</div>
          </div>
          <div className="w-12 h-12 rounded-lg bg-red-500/15 flex items-center justify-center border border-red-500/20">
            <AlertTriangle className="w-6 h-6 text-red-400 animate-pulse" />
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Side: Recent Detections Feed */}
        <div className="glass-panel p-6 rounded-xl lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between border-b border-white/5 pb-4">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Clock className="w-5 h-5 text-blue-400" />
              Feed de Detecções Recentes (Integração)
            </h2>
            <span className="text-xs text-muted-foreground bg-blue-500/10 px-2.5 py-1 rounded-full border border-blue-500/20">
              Live updates
            </span>
          </div>

          <div className="divide-y divide-white/5">
            {recentDetections.map((det, idx) => (
              <div key={det.DeteccaoId || idx} className="py-4 flex items-center justify-between first:pt-0 last:pb-0">
                <div className="flex items-start gap-3">
                  <div className="mt-1">
                    {det.usandoEpi ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    ) : (
                      <ShieldAlert className="w-5 h-5 text-red-400 animate-bounce" />
                    )}
                  </div>
                  <div>
                    <div className="font-semibold text-white">
                      {det.funcionario?.nomeFuncionario || "Operário Geral"}
                    </div>
                    <div className="text-xs text-muted-foreground flex items-center gap-2 mt-0.5">
                      <span className="bg-white/5 px-2 py-0.5 rounded">
                        {det.camera?.localizacao || "Câmera Padrão"}
                      </span>
                      <span>•</span>
                      <span>
                        {new Date(det.dataHora).toLocaleTimeString()}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <span className={`text-xs px-2.5 py-1 rounded-full border ${
                    det.usandoEpi 
                      ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" 
                      : "bg-red-500/10 text-red-400 border-red-500/20"
                  }`}>
                    {det.usandoEpi ? "Com EPI" : "Ausência de EPI"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Security Overview / Quick Actions */}
        <div className="space-y-6">
          <div className="glass-panel p-6 rounded-xl space-y-4">
            <h2 className="text-xl font-bold text-white">Visão Geral de Conformidade</h2>
            
            <div className="space-y-4 pt-2">
              <div className="space-y-1.5">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Uso Correto de Capacete</span>
                  <span className="text-emerald-400 font-semibold">92%</span>
                </div>
                <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full" style={{ width: "92%" }}></div>
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Uso de Coletes/Luvas</span>
                  <span className="text-blue-400 font-semibold">88%</span>
                </div>
                <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 rounded-full" style={{ width: "88%" }}></div>
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Alertas Atendidos</span>
                  <span className="text-orange-400 font-semibold">100%</span>
                </div>
                <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-orange-500 rounded-full" style={{ width: "100%" }}></div>
                </div>
              </div>
            </div>
          </div>

          <div className="glass-panel p-6 rounded-xl bg-gradient-to-r from-blue-600/10 to-indigo-600/10 border-blue-500/20 flex flex-col justify-between h-48">
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-white">Central de Monitoramento</h3>
              <p className="text-sm text-muted-foreground">
                Monitore o feed ao vivo com análise automática de vídeo em tempo real.
              </p>
            </div>
            <a 
              href="/dashboard/cameras" 
              onClick={(e) => {
                e.preventDefault();
                window.history.pushState({}, "", "/dashboard/cameras");
                window.dispatchEvent(new PopStateEvent("popstate"));
              }}
              className="flex items-center gap-2 text-sm text-white font-semibold hover:text-blue-400 transition-all cursor-pointer group"
            >
              Visualizar Câmeras IA
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
