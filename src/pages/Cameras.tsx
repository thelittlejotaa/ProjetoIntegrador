import { useEffect, useState, useRef } from "react";
import { 
  Camera as CameraIcon, ShieldAlert, CheckCircle2, Play, Square, Settings, 
  HelpCircle, AlertOctagon, Activity, Radio, RefreshCw
} from "lucide-react";

interface Camera {
  cameraId: number;
  localizacao: string;
  setor?: {
    nomeSetor?: string;
  };
}

export function Cameras() {
  const [cameras, setCameras] = useState<Camera[]>([]);
  const [selectedCamera, setSelectedCamera] = useState<Camera | null>(null);
  const [pythonOnline, setPythonOnline] = useState<boolean | null>(null);
  const [streamActive, setStreamActive] = useState(true);
  const [recentDetections, setRecentDetections] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationRef = useRef<number | null>(null);

  // Mocks
  const mockCameras: Camera[] = [
    { cameraId: 1, localizacao: "Linha de Montagem A", setor: { nomeSetor: "Produção" } },
    { cameraId: 2, localizacao: "Setor de Soldagem 2", setor: { nomeSetor: "Metalurgia" } },
    { cameraId: 3, localizacao: "Galpão de Logística", setor: { nomeSetor: "Almoxarifado" } },
    { cameraId: 4, localizacao: "Corredor Central B", setor: { nomeSetor: "Geral" } },
  ];

  // Check if Python Flask server is running
  const checkPythonStatus = async () => {
    try {
      const res = await fetch("http://localhost:5000/status", { timeout: 1500 } as any);
      if (res.ok) {
        setPythonOnline(true);
      } else {
        setPythonOnline(false);
      }
    } catch (e) {
      setPythonOnline(false);
    }
  };

  const fetchCameras = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:8080/Camera/listar").then(r => r.json()).catch(() => []);
      if (res && res.length > 0) {
        setCameras(res);
        setSelectedCamera(res[0]);
      } else {
        setCameras(mockCameras);
        setSelectedCamera(mockCameras[0]);
      }
    } catch (e) {
      setCameras(mockCameras);
      setSelectedCamera(mockCameras[0]);
    } finally {
      setLoading(false);
    }
  };

  const fetchDetections = async () => {
    try {
      const res = await fetch("http://localhost:8080/Deteccao/listar").then(r => r.json()).catch(() => []);
      if (res && res.length > 0) {
        const sorted = [...res].sort((a: any, b: any) => 
          new Date(b.dataHora).getTime() - new Date(a.dataHora).getTime()
        );
        setRecentDetections(sorted.slice(0, 10));
      } else {
        // Mock detections
        setRecentDetections([
          { DeteccaoId: 201, usandoEpi: false, dataHora: new Date().toISOString(), camera: { localizacao: "Linha de Montagem A" }, funcionario: { nomeFuncionario: "Lucas Lima" } },
          { DeteccaoId: 202, usandoEpi: true, dataHora: new Date(Date.now() - 10000).toISOString(), camera: { localizacao: "Setor de Soldagem 2" }, funcionario: { nomeFuncionario: "Marcio Alves" } },
          { DeteccaoId: 203, usandoEpi: true, dataHora: new Date(Date.now() - 45000).toISOString(), camera: { localizacao: "Galpão de Logística" }, funcionario: { nomeFuncionario: "Eduardo Santos" } },
          { DeteccaoId: 204, usandoEpi: false, dataHora: new Date(Date.now() - 90000).toISOString(), camera: { localizacao: "Linha de Montagem A" }, funcionario: { nomeFuncionario: "Patricia Silva" } },
        ]);
      }
    } catch (e) {
      console.log("Backend offline.");
    }
  };

  useEffect(() => {
    fetchCameras();
    checkPythonStatus();
    fetchDetections();

    const interval = setInterval(() => {
      checkPythonStatus();
      fetchDetections();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Canvas-based simulation for fallback
  useEffect(() => {
    if (pythonOnline === false && streamActive && selectedCamera) {
      let tick = 0;
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const drawSimulation = () => {
        tick++;
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw camera space grid background
        ctx.fillStyle = "#0c111e";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.strokeStyle = "#162238";
        ctx.lineWidth = 1;
        for (let y = 0; y < canvas.height; y += 40) {
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(canvas.width, y);
          ctx.stroke();
        }
        for (let x = 0; x < canvas.width; x += 40) {
          ctx.beginPath();
          ctx.moveTo(x, 0);
          ctx.lineTo(x, canvas.height);
          ctx.stroke();
        }

        // Draw HUD overlay
        ctx.fillStyle = "rgba(59, 130, 246, 0.4)";
        ctx.font = "bold 16px monospace";
        ctx.fillText("SIMULAÇÃO LOCAL (WEBCAM OFFLINE)", 20, 40);
        ctx.font = "12px monospace";
        ctx.fillText(`CAM ID: 00${selectedCamera.cameraId} | SETOR: ${selectedCamera.setor?.nomeSetor || "GERAL"}`, 20, 60);
        
        // Draw REC indicator
        ctx.fillStyle = "#ef4444";
        ctx.beginPath();
        ctx.arc(canvas.width - 40, 35, 6, 0, 2 * Math.PI);
        ctx.fill();
        ctx.fillStyle = "#ffffff";
        ctx.font = "bold 12px monospace";
        ctx.fillText("LIVE REC", canvas.width - 110, 40);

        // Simulate person pathing (sine wave movement)
        const pathX = canvas.width / 2 + Math.sin(tick * 0.03) * 120;
        const pathY = canvas.height / 2 + Math.cos(tick * 0.02) * 50;

        const x1 = pathX - 80;
        const y1 = pathY - 120;
        const width = 160;
        const height = 240;

        // Alternate safety status every 8 seconds
        const isSafe = Math.floor(tick / 240) % 2 === 0;
        const color = isSafe ? "#10b981" : "#ef4444";

        // Draw bounding box
        ctx.strokeStyle = color;
        ctx.lineWidth = 3;
        ctx.strokeRect(x1, y1, width, height);

        // Draw text box
        ctx.fillStyle = color;
        ctx.fillRect(x1, y1 - 25, 120, 25);
        ctx.fillStyle = "#000000";
        ctx.font = "bold 12px sans-serif";
        ctx.fillText(isSafe ? "TRABALHADOR" : "ALERTA: SEM EPI", x1 + 5, y1 - 8);

        // Draw bone skeletal animation inside box
        ctx.strokeStyle = "rgba(255,255,255,0.4)";
        ctx.lineWidth = 2;
        // Head
        ctx.beginPath();
        ctx.arc(pathX, pathY - 80, 15, 0, 2 * Math.PI);
        ctx.stroke();
        
        // Spine
        ctx.beginPath();
        ctx.moveTo(pathX, pathY - 65);
        ctx.lineTo(pathX, pathY + 10);
        ctx.stroke();
        
        // Arms
        ctx.beginPath();
        ctx.moveTo(pathX - 40, pathY - 45);
        ctx.lineTo(pathX + 40, pathY - 45);
        ctx.stroke();

        // Legs
        ctx.beginPath();
        ctx.moveTo(pathX, pathY + 10);
        ctx.lineTo(pathX - 25, pathY + 90);
        ctx.moveTo(pathX, pathY + 10);
        ctx.lineTo(pathX + 25, pathY + 90);
        ctx.stroke();

        // Draw helmet
        if (isSafe) {
          ctx.fillStyle = "#fbbf24";
          ctx.beginPath();
          ctx.arc(pathX, pathY - 85, 18, Math.PI, 2 * Math.PI);
          ctx.fill();
          ctx.fillRect(pathX - 24, pathY - 85, 48, 4);
          ctx.fillStyle = "#ffffff";
          ctx.font = "9px sans-serif";
          ctx.fillText("Capacete 0.98", x1 + 10, y1 + 30);
        } else {
          ctx.fillStyle = "#ef4444";
          ctx.beginPath();
          ctx.arc(pathX, pathY - 80, 15, 0, 2 * Math.PI);
          ctx.stroke();
          ctx.fillStyle = "#ef4444";
          ctx.font = "bold 11px sans-serif";
          ctx.fillText("SEM CAPACETE", x1 + 10, y1 + 30);
        }

        // Draw timestamp
        ctx.fillStyle = "rgba(255,255,255,0.5)";
        ctx.font = "10px monospace";
        ctx.fillText(new Date().toLocaleTimeString(), 20, canvas.height - 20);

        animationRef.current = requestAnimationFrame(drawSimulation);
      };

      drawSimulation();
      return () => {
        if (animationRef.current) cancelAnimationFrame(animationRef.current);
      };
    }
  }, [pythonOnline, streamActive, selectedCamera]);

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-white flex items-center gap-3">
          <Radio className="w-8 h-8 text-blue-500 animate-pulse" />
          Sala de Monitoramento IA
        </h1>
        <p className="text-muted-foreground mt-1">
          Feeds de vídeo de visão computacional em tempo real e detecção de EPIs integrada.
        </p>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* Left column: Camera list */}
        <div className="space-y-4 lg:col-span-1">
          <div className="glass-panel p-4 rounded-xl space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <CameraIcon className="w-5 h-5 text-blue-400" />
                Câmeras ({cameras.length})
              </h2>
              <button 
                onClick={fetchCameras}
                className="p-1 hover:bg-white/5 rounded text-muted-foreground hover:text-white transition-all"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2 max-h-[350px] overflow-y-auto pr-1">
              {cameras.map((cam) => {
                const isSelected = selectedCamera?.cameraId === cam.cameraId;
                return (
                  <button
                    key={cam.cameraId}
                    onClick={() => setSelectedCamera(cam)}
                    className={`w-full text-left p-3.5 rounded-lg border transition-all flex items-center gap-3 cursor-pointer ${
                      isSelected
                        ? "bg-blue-600/15 border-blue-500 text-white glow-blue"
                        : "bg-white/5 border-white/5 text-muted-foreground hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    <div className={`p-2 rounded-lg ${isSelected ? "bg-blue-500/20" : "bg-white/5"}`}>
                      <CameraIcon className={`w-4 h-4 ${isSelected ? "text-blue-400" : "text-muted-foreground"}`} />
                    </div>
                    <div>
                      <div className="font-semibold text-sm leading-tight">{cam.localizacao}</div>
                      <div className="text-xs opacity-75 mt-0.5">{cam.setor?.nomeSetor || "Setor Geral"}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Status of Python CV service */}
          <div className="glass-panel p-4 rounded-xl space-y-3">
            <h3 className="font-semibold text-white flex items-center gap-2">
              <Activity className="w-4 h-4 text-emerald-400" />
              Serviço Visão Computacional
            </h3>
            
            <div className="flex items-center justify-between p-2.5 rounded bg-black/30 border border-white/5">
              <span className="text-xs text-muted-foreground">Status do Script</span>
              <span className={`text-xs font-bold px-2 py-0.5 rounded ${
                pythonOnline
                  ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/20"
                  : "bg-orange-500/15 text-orange-400 border border-orange-500/20 animate-pulse"
              }`}>
                {pythonOnline ? "ONLINE (5000)" : "OFFLINE (FALLBACK)"}
              </span>
            </div>

            {pythonOnline === false && (
              <p className="text-xs text-muted-foreground/80 leading-relaxed bg-orange-500/5 p-2 rounded border border-orange-500/10">
                O script Python <code className="text-orange-400 font-semibold bg-black/45 px-1 rounded">main.py</code> não está rodando localmente na porta 5000. Iniciamos o <strong>simulador integrado no canvas</strong> para demonstração visual!
              </p>
            )}
          </div>
        </div>

        {/* Center column: Main camera view */}
        <div className="lg:col-span-2 space-y-4">
          <div className="glass-panel rounded-xl overflow-hidden flex flex-col glow-blue">
            {/* Viewport Top Bar */}
            <div className="bg-black/45 border-b border-white/5 px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></span>
                <span className="font-semibold text-white text-sm">
                  {selectedCamera ? `${selectedCamera.localizacao} - Feed ao Vivo` : "Carregando..."}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setStreamActive(!streamActive)}
                  className="p-1.5 hover:bg-white/10 rounded text-muted-foreground hover:text-white transition-all cursor-pointer"
                  title={streamActive ? "Pausar Câmera" : "Iniciar Câmera"}
                >
                  {streamActive ? <Square className="w-4 h-4" /> : <Play className="w-4 h-4 text-emerald-400" />}
                </button>
                <button className="p-1.5 hover:bg-white/10 rounded text-muted-foreground hover:text-white transition-all">
                  <Settings className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Video feed container */}
            <div className="relative aspect-video bg-black flex items-center justify-center scanline-effect">
              {streamActive ? (
                pythonOnline ? (
                  // Active streaming MJPEG from Python
                  <img
                    src="http://localhost:5000/video_feed"
                    alt="YOLOv8 Real-time Feed"
                    className="w-full h-full object-cover"
                    onError={() => setPythonOnline(false)}
                  />
                ) : (
                  // Simulated computer vision canvas
                  <canvas
                    ref={canvasRef}
                    width={640}
                    height={480}
                    className="w-full h-full object-cover"
                  />
                )
              ) : (
                <div className="text-center space-y-2">
                  <Square className="w-12 h-12 mx-auto text-muted-foreground" />
                  <p className="text-muted-foreground text-sm font-semibold">Câmera Pausada pelo Operador</p>
                </div>
              )}

              {/* Status Warning overlay */}
              {streamActive && !pythonOnline && (
                <div className="absolute top-4 left-4 bg-orange-600/90 text-white text-[10px] uppercase font-bold tracking-widest px-2.5 py-1 rounded shadow-lg border border-orange-500 flex items-center gap-1.5 backdrop-blur-sm">
                  <AlertOctagon className="w-3.5 h-3.5" />
                  Modo de Demonstração Simulado
                </div>
              )}
            </div>

            {/* Camera Actions Bar */}
            <div className="p-4 bg-black/20 border-t border-white/5 flex flex-wrap items-center justify-between gap-3">
              <div className="text-xs text-muted-foreground">
                Resolução: <span className="text-white font-semibold">640x480</span> | Modelo: <span className="text-blue-400 font-semibold">YOLOv8 (EPI)</span>
              </div>
              <div className="flex items-center gap-2">
                <button className="px-3.5 py-1.5 text-xs font-semibold rounded bg-red-600 hover:bg-red-700 text-white transition-all cursor-pointer glow-red">
                  Acionar Alarme
                </button>
                <button className="px-3.5 py-1.5 text-xs font-semibold rounded glass-panel hover:bg-white/5 text-white transition-all cursor-pointer">
                  Registrar Ocorrência
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right column: Recent Alerts list specific to camera */}
        <div className="lg:col-span-1 space-y-4">
          <div className="glass-panel p-4 rounded-xl flex flex-col h-[525px]">
            <div className="border-b border-white/5 pb-3 mb-3 flex items-center justify-between">
              <h3 className="font-bold text-white flex items-center gap-2 text-md">
                <ShieldAlert className="w-4 h-4 text-orange-400" />
                Histórico de Eventos
              </h3>
              <span className="text-[10px] bg-white/5 px-2 py-0.5 rounded text-muted-foreground uppercase tracking-wider">
                Live
              </span>
            </div>

            <div className="flex-1 overflow-y-auto space-y-2.5 pr-1">
              {recentDetections.map((det, index) => (
                <div 
                  key={det.DeteccaoId || index} 
                  className={`p-3 rounded-lg border flex flex-col gap-1.5 transition-all hover:bg-white/5 ${
                    det.usandoEpi
                      ? "bg-emerald-500/5 border-emerald-500/10"
                      : "bg-red-500/5 border-red-500/10"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-xs text-white">
                      {det.funcionario?.nomeFuncionario || "Trabalhador Geral"}
                    </span>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold ${
                      det.usandoEpi 
                        ? "bg-emerald-500/10 text-emerald-400" 
                        : "bg-red-500/10 text-red-400 animate-pulse"
                    }`}>
                      {det.usandoEpi ? "OK" : "SEM EPI"}
                    </span>
                  </div>
                  <div className="text-[11px] text-muted-foreground flex justify-between">
                    <span>{det.camera?.localizacao || "Linha de Montagem"}</span>
                    <span>{new Date(det.dataHora).toLocaleTimeString()}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
