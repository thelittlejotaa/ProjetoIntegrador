import { useEffect, useState } from "react";
import { AlertTriangle, RefreshCw, Eye, ShieldAlert, CheckCircle } from "lucide-react";

export function Alerts() {
  const [alerts, setAlerts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const mockAlerts = [
    { alertaId: 1, statusId: 1, deteccao: { usandoEpi: false, dataHora: new Date().toISOString(), camera: { localizacao: "Linha de Montagem A" }, funcionario: { nomeFuncionario: "Lucas Lima" } } },
    { alertaId: 2, statusId: 2, deteccao: { usandoEpi: false, dataHora: new Date(Date.now() - 600000).toISOString(), camera: { localizacao: "Corredor Central B" }, funcionario: { nomeFuncionario: "Carlos Oliveira" } } },
    { alertaId: 3, statusId: 1, deteccao: { usandoEpi: false, dataHora: new Date(Date.now() - 3600000).toISOString(), camera: { localizacao: "Setor de Soldagem 2" }, funcionario: { nomeFuncionario: "Patricia Silva" } } },
  ];

  const fetchAlerts = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:8080/Alerta/listar").then(r => r.json()).catch(() => []);
      if (res && res.length > 0) {
        setAlerts(res);
      } else {
        setAlerts(mockAlerts);
      }
    } catch (e) {
      setAlerts(mockAlerts);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAlerts();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-white flex items-center gap-2">
            <AlertTriangle className="w-8 h-8 text-red-500 animate-pulse" />
            Central de Alertas de Segurança
          </h1>
          <p className="text-muted-foreground mt-1">
            Lista em tempo real de desvios de EPI detectados pela Inteligência Artificial.
          </p>
        </div>
        <button 
          onClick={fetchAlerts}
          disabled={loading}
          className="flex items-center gap-2 px-4 py-2 text-sm rounded-lg glass-panel text-red-400 border-red-500/20 hover:bg-red-500/10 transition-all cursor-pointer glow-red"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          Atualizar Alertas
        </button>
      </div>

      <div className="glass-panel rounded-xl overflow-hidden glow-red">
        <div className="p-4 border-b border-white/5 bg-black/20 flex justify-between items-center">
          <span className="text-sm font-semibold text-white">Desvios de Segurança Registrados</span>
          <span className="text-xs bg-red-500/20 text-red-400 px-2 py-0.5 rounded font-bold border border-red-500/20">
            {alerts.filter(a => a.statusId === 1).length} pendentes
          </span>
        </div>

        <div className="divide-y divide-white/5">
          {alerts.map((al) => {
            const isPending = al.statusId === 1;
            return (
              <div key={al.alertaId} className="p-4 flex flex-wrap items-center justify-between gap-4 hover:bg-white/5 transition-all text-white">
                <div className="flex items-start gap-3">
                  <div className="mt-1">
                    <ShieldAlert className={`w-5 h-5 ${isPending ? "text-red-500 animate-pulse" : "text-emerald-500"}`} />
                  </div>
                  <div>
                    <div className="font-semibold flex items-center gap-2">
                      {al.deteccao?.funcionario?.nomeFuncionario || "Trabalhador Desconhecido"}
                      <span className="text-xs font-normal text-muted-foreground">
                        (Alerta #{al.alertaId})
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Desvio detectado na câmera <strong className="text-white">{al.deteccao?.camera?.localizacao || "Câmera Geral"}</strong>
                    </p>
                    <div className="text-[11px] text-muted-foreground mt-1 flex items-center gap-2">
                      <span>Data: {new Date(al.deteccao?.dataHora).toLocaleDateString()}</span>
                      <span>•</span>
                      <span>Horário: {new Date(al.deteccao?.dataHora).toLocaleTimeString()}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className={`text-xs px-2.5 py-1 rounded-full border font-bold ${
                    isPending 
                      ? "bg-red-500/10 text-red-400 border-red-500/20 animate-pulse" 
                      : "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                  }`}>
                    {isPending ? "Pendente de Inspeção" : "Resolvido"}
                  </span>
                  <button className="p-2 hover:bg-white/5 rounded text-muted-foreground hover:text-white transition-all cursor-pointer">
                    <Eye className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
