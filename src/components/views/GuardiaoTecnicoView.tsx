import { useState } from "react";
import { motion } from "framer-motion";
import {
  AlertTriangle,
  ClipboardList,
  CheckCircle2,
  Plus,
  Send,
  Trash2,
  MapPin,
} from "lucide-react";
import { requests, type Request } from "@/lib/mock-data";
import { useStore, type Task } from "@/lib/store";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const riskClasses: Record<Request["risk"], string> = {
  Alto: "bg-risk-high-bg text-risk-high-fg",
  Médio: "bg-risk-med-bg text-risk-med-fg",
  Baixo: "bg-risk-approved-bg text-risk-approved-fg",
};

export function GuardiaoTecnicoView() {
  const [selectedId, setSelectedId] = useState(requests[0].id);
  const selected = requests.find((r) => r.id === selectedId)!;
  const [risk, setRisk] = useState<Request["risk"]>(selected.risk);
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: "t1",
      type: "Logística",
      description: "Transportar 5 sacos de cimento do Armazém do Seu Zé (base) até o lar (topo).",
    },
    {
      id: "t2",
      type: "Execução",
      description: "Aplicação de calha de drenagem pluvial na lateral da casa.",
    },
  ]);
  const publishTasks = useStore((s) => s.publishTasks);
  const setActiveView = useStore((s) => s.setActiveView);

  const addTask = () =>
    setTasks([...tasks, { id: crypto.randomUUID(), type: "Logística", description: "" }]);
  const removeTask = (id: string) => setTasks(tasks.filter((t) => t.id !== id));
  const updateTask = (id: string, patch: Partial<Task>) =>
    setTasks(tasks.map((t) => (t.id === id ? { ...t, ...patch } : t)));

  const publish = () => {
    publishTasks(tasks);
    toast.success("Tarefas publicadas na Rede Arcanjo!", {
      description: "Os Anjos já podem aceitar a missão.",
      action: { label: "Ver Anjos", onClick: () => setActiveView("anjo") },
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 pb-12 grid lg:grid-cols-[260px_1fr] gap-6">
      {/* Sidebar */}
      <aside className="space-y-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Painel Técnico
          </p>
          <h2 className="font-display font-bold text-xl mt-0.5">Lucas Eng.</h2>
          <p className="text-xs text-muted-foreground">FICR · Eng. Civil</p>
        </div>
        <div className="grid grid-cols-3 lg:grid-cols-1 gap-3">
          <MetricCard
            icon={AlertTriangle}
            label="Pendentes em Ibura"
            value="12"
            tint="risk-high-bg"
            fg="risk-high-fg"
          />
          <MetricCard
            icon={ClipboardList}
            label="Em análise"
            value="5"
            tint="risk-med-bg"
            fg="risk-med-fg"
          />
          <MetricCard
            icon={CheckCircle2}
            label="Concluídos"
            value="23"
            tint="risk-approved-bg"
            fg="risk-approved-fg"
          />
        </div>
      </aside>

      {/* Main */}
      <div className="grid lg:grid-cols-[340px_1fr] gap-4">
        <div className="bg-card rounded-2xl border overflow-hidden">
          <div className="px-4 py-3 border-b">
            <h3 className="font-display font-bold">Solicitações</h3>
            <p className="text-xs text-muted-foreground">{requests.length} aguardando análise</p>
          </div>
          <div className="divide-y max-h-[640px] overflow-y-auto">
            {requests.map((r) => (
              <button
                key={r.id}
                onClick={() => {
                  setSelectedId(r.id);
                  setRisk(r.risk);
                }}
                className={cn(
                  "w-full text-left p-3 flex gap-3 hover:bg-muted/60 transition",
                  selectedId === r.id && "bg-muted",
                )}
              >
                <img
                  src={r.thumbnail}
                  alt=""
                  className="w-16 h-16 rounded-xl object-cover shrink-0"
                />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p className="font-semibold truncate">{r.resident}</p>
                    <span
                      className={cn(
                        "px-1.5 py-0.5 rounded text-[10px] font-bold",
                        riskClasses[r.risk],
                      )}
                    >
                      {r.risk}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3 h-3" />
                    {r.neighborhood}
                  </p>
                  <p className="text-xs text-muted-foreground line-clamp-2 mt-1">{r.description}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        <motion.div
          key={selected.id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card rounded-2xl border overflow-hidden"
        >
          <div className="relative">
            <img src={selected.thumbnail} alt="" className="w-full h-48 object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-3 left-4 right-4 text-white">
              <p className="text-xs opacity-80 flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                {selected.neighborhood}
              </p>
              <p className="font-display font-bold text-xl">{selected.resident}</p>
            </div>
          </div>

          <div className="p-5 space-y-5">
            <p className="text-sm text-muted-foreground">{selected.description}</p>

            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                Nível de Risco
              </p>
              <div className="flex gap-2">
                {(["Baixo", "Médio", "Alto"] as const).map((r) => (
                  <button
                    key={r}
                    onClick={() => setRisk(r)}
                    className={cn(
                      "flex-1 py-2 rounded-xl text-sm font-bold border-2 transition",
                      risk === r
                        ? r === "Alto"
                          ? "bg-risk-high-bg text-risk-high-fg border-risk-high-fg"
                          : r === "Médio"
                            ? "bg-risk-med-bg text-risk-med-fg border-risk-med-fg"
                            : "bg-risk-approved-bg text-risk-approved-fg border-risk-approved-fg"
                        : "border-border text-muted-foreground hover:bg-muted",
                    )}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Tarefas Angelicais
                </p>
                <button
                  onClick={addTask}
                  className="flex items-center gap-1 text-xs font-semibold text-ocean hover:text-gold-foreground"
                >
                  <Plus className="w-4 h-4" /> Adicionar
                </button>
              </div>
              <div className="space-y-2">
                {tasks.map((t) => (
                  <div key={t.id} className="flex gap-2 p-3 bg-muted/60 rounded-xl">
                    <select
                      value={t.type}
                      onChange={(e) => updateTask(t.id, { type: e.target.value as Task["type"] })}
                      className="text-xs font-semibold bg-card border rounded-lg px-2 py-1 self-start"
                    >
                      <option>Logística</option>
                      <option>Execução</option>
                    </select>
                    <input
                      value={t.description}
                      onChange={(e) => updateTask(t.id, { description: e.target.value })}
                      className="flex-1 bg-card border rounded-lg px-2 py-1 text-sm"
                    />
                    <button
                      onClick={() => removeTask(t.id)}
                      className="p-1 text-muted-foreground hover:text-destructive"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              onClick={publish}
              className="w-full py-3.5 rounded-2xl bg-ocean text-ocean-foreground font-bold flex items-center justify-center gap-2 hover:bg-gold hover:text-gold-foreground transition-colors shadow-lg shadow-ocean/20"
            >
              <Send className="w-5 h-5" />
              Publicar na Rede Arcanjo
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function MetricCard({
  icon: Icon,
  label,
  value,
  tint,
  fg,
}: {
  icon: typeof AlertTriangle;
  label: string;
  value: string;
  tint: string;
  fg: string;
}) {
  return (
    <div className="bg-card rounded-2xl border p-3">
      <div
        className="w-8 h-8 rounded-lg flex items-center justify-center"
        style={{ backgroundColor: `var(--${tint})` }}
      >
        <Icon className="w-4 h-4" style={{ color: `var(--${fg})` }} />
      </div>
      <p className="font-display font-bold text-2xl mt-2 leading-none">{value}</p>
      <p className="text-[11px] text-muted-foreground mt-1 leading-tight">{label}</p>
    </div>
  );
}
