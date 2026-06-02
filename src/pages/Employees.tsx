import { useEffect, useState } from "react";
import { Users, UserPlus, RefreshCw, Mail, Phone, Calendar } from "lucide-react";

export function Employees() {
  const [employees, setEmployees] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const mockEmployees = [
    { funcionarioId: 1, nomeFuncionario: "Carlos Oliveira", setor: { nomeSetor: "Produção" } },
    { funcionarioId: 2, nomeFuncionario: "Amanda Silva", setor: { nomeSetor: "Almoxarifado" } },
    { funcionarioId: 3, nomeFuncionario: "Rodrigo Costa", setor: { nomeSetor: "Produção" } },
    { funcionarioId: 4, nomeFuncionario: "Fernanda Lima", setor: { nomeSetor: "Soldagem" } },
    { funcionarioId: 5, nomeFuncionario: "Lucas Lima", setor: { nomeSetor: "Montagem" } },
    { funcionarioId: 6, nomeFuncionario: "Patricia Silva", setor: { nomeSetor: "Geral" } },
  ];

  const fetchEmployees = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:8080/Funcionario/listar").then(r => r.json()).catch(() => []);
      if (res && res.length > 0) {
        setEmployees(res);
      } else {
        setEmployees(mockEmployees);
      }
    } catch (e) {
      setEmployees(mockEmployees);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-white flex items-center gap-2">
            <Users className="w-8 h-8 text-blue-500" />
            Cadastro de Funcionários
          </h1>
          <p className="text-muted-foreground mt-1">
            Gerenciamento de operários autorizados e vinculação de EPIs individuais.
          </p>
        </div>
        <button 
          className="flex items-center gap-2 px-4 py-2 text-sm rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-all cursor-pointer glow-blue"
        >
          <UserPlus className="w-4 h-4" />
          Adicionar Funcionário
        </button>
      </div>

      <div className="glass-panel rounded-xl overflow-hidden glow-blue">
        <div className="p-4 border-b border-white/5 flex items-center justify-between bg-black/20">
          <span className="text-sm font-semibold text-white">Lista de Colaboradores</span>
          <button 
            onClick={fetchEmployees}
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
                <th className="p-4 font-semibold">ID</th>
                <th className="p-4 font-semibold">Nome</th>
                <th className="p-4 font-semibold">Setor</th>
                <th className="p-4 font-semibold">EPIs Vinculados</th>
                <th className="p-4 font-semibold">Data Admissão</th>
                <th className="p-4 font-semibold text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {employees.map((emp) => (
                <tr key={emp.funcionarioId} className="hover:bg-white/5 text-white transition-all">
                  <td className="p-4 text-muted-foreground">#00{emp.funcionarioId}</td>
                  <td className="p-4 font-semibold">{emp.nomeFuncionario}</td>
                  <td className="p-4">
                    <span className="bg-blue-500/10 text-blue-400 border border-blue-500/20 px-2 py-0.5 rounded text-xs">
                      {emp.setor?.nomeSetor || "Setor Geral"}
                    </span>
                  </td>
                  <td className="p-4 text-muted-foreground">
                    Capacete, Luvas, Óculos
                  </td>
                  <td className="p-4 text-muted-foreground">02/06/2026</td>
                  <td className="p-4 text-right">
                    <button className="text-xs text-blue-400 hover:text-blue-300 font-semibold cursor-pointer">
                      Ver detalhes
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
