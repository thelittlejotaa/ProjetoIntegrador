import { useEffect, useState } from "react";
import { ShieldAlert, RefreshCw, BarChart2, ShieldCheck, Hammer } from "lucide-react";

export function EpiControl() {
  const [epis, setEpis] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const mockEpis = [
    { epiId: 1, nome: "Capacete de Proteção Classe B", categoria: "Cabeça", quantidadeTotal: 50, quantidadeDisponnivel: 38 },
    { epiId: 2, nome: "Óculos de Proteção Antiembaçante", categoria: "Visual", quantidadeTotal: 80, quantidadeDisponnivel: 54 },
    { epiId: 3, nome: "Luva Nitrílica Pro", categoria: "Mãos", quantidadeTotal: 150, quantidadeDisponnivel: 110 },
    { epiId: 4, nome: "Bota de PVC com Bico de Aço", categoria: "Pés", quantidadeTotal: 60, quantidadeDisponnivel: 42 },
  ];

  const fetchEpis = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:8080/Epi/listar").then(r => r.json()).catch(() => []);
      if (res && res.length > 0) {
        setEpis(res);
      } else {
        setEpis(mockEpis);
      }
    } catch (e) {
      setEpis(mockEpis);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEpis();
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-white flex items-center gap-2">
          <ShieldCheck className="w-8 h-8 text-blue-500" />
          Controle de Estoque de EPIs
        </h1>
        <p className="text-muted-foreground mt-1">
          Inventário, distribuição e controle de conformidade de Equipamentos de Proteção.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-panel p-5 rounded-xl glow-blue flex items-center justify-between col-span-1">
          <div>
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">Total em Inventário</span>
            <div className="text-2xl font-bold text-white mt-1">340 unidades</div>
          </div>
          <Hammer className="w-8 h-8 text-blue-400" />
        </div>
        <div className="glass-panel p-5 rounded-xl glow-green flex items-center justify-between col-span-1">
          <div>
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">Disponível em Almoxarifado</span>
            <div className="text-2xl font-bold text-emerald-400 mt-1">244 unidades</div>
          </div>
          <ShieldCheck className="w-8 h-8 text-emerald-400" />
        </div>
        <div className="glass-panel p-5 rounded-xl glow-orange flex items-center justify-between col-span-1">
          <div>
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">Taxa de Utilização</span>
            <div className="text-2xl font-bold text-orange-400 mt-1">71.7%</div>
          </div>
          <BarChart2 className="w-8 h-8 text-orange-400" />
        </div>
      </div>

      <div className="glass-panel rounded-xl overflow-hidden glow-blue">
        <div className="p-4 border-b border-white/5 flex items-center justify-between bg-black/20">
          <span className="text-sm font-semibold text-white">Inventário Detalhado</span>
          <button 
            onClick={fetchEpis}
            disabled={loading}
            className="p-1.5 hover:bg-white/5 rounded text-muted-foreground hover:text-white transition-all cursor-pointer"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="border-b border-white/5 text-muted-foreground bg-white/5">
                <th className="p-4 font-semibold">Cód</th>
                <th className="p-4 font-semibold">Nome do Equipamento</th>
                <th className="p-4 font-semibold">Categoria</th>
                <th className="p-4 font-semibold">Qtde Total</th>
                <th className="p-4 font-semibold">Disponível</th>
                <th className="p-4 font-semibold">Status de Abastecimento</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {epis.map((epi) => {
                const percent = Math.round((epi.quantidadeDisponnivel / epi.quantidadeTotal) * 100);
                const isLow = percent < 30;
                return (
                  <tr key={epi.epiId} className="hover:bg-white/5 text-white transition-all">
                    <td className="p-4 text-muted-foreground">#EPI{epi.epiId}</td>
                    <td className="p-4 font-semibold">{epi.nome}</td>
                    <td className="p-4 text-muted-foreground">{epi.categoria}</td>
                    <td className="p-4">{epi.quantidadeTotal}</td>
                    <td className="p-4 text-emerald-400 font-semibold">{epi.quantidadeDisponnivel}</td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-1.5 bg-white/5 rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full ${isLow ? "bg-red-500" : "bg-emerald-500"}`} 
                            style={{ width: `${percent}%` }}
                          />
                        </div>
                        <span className={`text-xs ${isLow ? "text-red-400 font-bold" : "text-muted-foreground"}`}>
                          {percent}%
                        </span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
