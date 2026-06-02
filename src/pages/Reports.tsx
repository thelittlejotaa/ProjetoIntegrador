import { FileText, Download, TrendingUp, Calendar, RefreshCw } from "lucide-react";

export function Reports() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-white flex items-center gap-2">
          <FileText className="w-8 h-8 text-blue-500" />
          Relatórios & Auditoria
        </h1>
        <p className="text-muted-foreground mt-1">
          Geração de relatórios de conformidade de segurança e exportação para auditoria técnica.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-panel p-6 rounded-xl space-y-4">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-blue-400" />
            Relatório de Conformidade Mensal
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Consolidado de todas as detecções da IA em relação ao uso de EPIs. Apresenta o percentual de conformidade por setor, funcionários mais notificados e horários críticos de desvio.
          </p>
          <div className="flex gap-2 pt-2">
            <button className="flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded bg-blue-600 hover:bg-blue-700 text-white transition-all cursor-pointer glow-blue">
              <Download className="w-4 h-4" />
              Download PDF
            </button>
            <button className="flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded glass-panel hover:bg-white/5 text-white transition-all cursor-pointer">
              Visualizar Dados
            </button>
          </div>
        </div>

        <div className="glass-panel p-6 rounded-xl space-y-4">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Calendar className="w-5 h-5 text-indigo-400" />
            Livro de Registro de Ocorrências (SESMT)
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Relatório gerado especificamente para apresentação à equipe de Segurança do Trabalho (SESMT), contendo detalhamento com foto das câmeras nos momentos em que desvios de EPI foram confirmados.
          </p>
          <div className="flex gap-2 pt-2">
            <button className="flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded bg-blue-600 hover:bg-blue-700 text-white transition-all cursor-pointer glow-blue">
              <Download className="w-4 h-4" />
              Download Planilha
            </button>
            <button className="flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded glass-panel hover:bg-white/5 text-white transition-all cursor-pointer">
              Visualizar Ocorrências
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
