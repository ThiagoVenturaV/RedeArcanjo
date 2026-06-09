import { useState } from "react";
import { motion } from "framer-motion";
import { Camera, Check, Shield } from "lucide-react";
import { SignalRiskModal } from "@/components/SignalRiskModal";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/utils";

export function GuardiaoLarView() {
  const [open, setOpen] = useState(false);
  const status = useStore((s) => s.residentStatus);

  const steps = [
    { id: "enviado", label: "Chamado Enviado", sub: "Recebido pela Rede Arcanjo", done: true },
    {
      id: "analise",
      label: "Análise Técnica",
      sub: "Lucas Eng. está analisando",
      done: status !== "enviado",
      current: status === "analise",
    },
    {
      id: "publicado",
      label: "Missão Publicada",
      sub: "Anjos foram acionados",
      done: status === "publicado" || status === "entregue",
      current: status === "publicado",
    },
    {
      id: "entregue",
      label: "Materiais Entregues",
      sub: "Validado no topo",
      done: status === "entregue",
      current: status === "entregue",
    },
  ];

  return (
    <div className="max-w-md mx-auto px-4 pb-16">
      <header className="pt-4">
        <div className="flex items-center gap-2 text-ocean">
          <Shield className="w-6 h-6 fill-gold/30 stroke-ocean" />
          <span className="font-display font-extrabold tracking-tight">Rede Arcanjo</span>
        </div>
        <h1 className="mt-6 text-2xl font-display font-bold leading-snug">
          Olá, Dona Maria.
          <br />
          <span className="text-ocean/70 font-semibold">Vamos proteger o seu lar hoje?</span>
        </h1>
      </header>

      <motion.button
        whileTap={{ scale: 0.98 }}
        onClick={() => setOpen(true)}
        className="mt-6 w-full rounded-3xl bg-ocean text-ocean-foreground p-6 text-left shadow-xl shadow-ocean/20 relative overflow-hidden"
      >
        <div className="absolute -right-6 -top-6 w-32 h-32 bg-gold/20 rounded-full blur-2xl" />
        <div className="relative flex items-start gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gold flex items-center justify-center shrink-0 shadow-lg shadow-gold/30">
            <Camera className="w-8 h-8 text-gold-foreground" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-gold">
              Sinalize agora
            </p>
            <p className="mt-1 font-display font-bold text-xl leading-tight">
              Sinalizar Risco
              <br />
              no Meu Lar
            </p>
            <p className="mt-2 text-sm text-ocean-foreground/70">
              Tire uma foto da trinca, do muro ou da barreira.
            </p>
          </div>
        </div>
      </motion.button>

      <section className="mt-8">
        <h2 className="font-display font-bold text-lg">Meu Chamado</h2>
        <p className="text-sm text-muted-foreground">Ibura · há 2h</p>

        <div className="mt-4 bg-card rounded-3xl border p-5">
          <div className="relative">
            {steps.map((s, i) => (
              <div key={s.id} className="flex gap-4 pb-6 last:pb-0 relative">
                {i < steps.length - 1 && (
                  <div
                    className={cn(
                      "absolute left-[15px] top-8 bottom-0 w-0.5",
                      s.done ? "bg-risk-approved-fg/40" : "bg-border",
                    )}
                  />
                )}
                <div className="relative shrink-0">
                  {s.done && !s.current ? (
                    <div className="w-8 h-8 rounded-full bg-risk-approved-bg flex items-center justify-center">
                      <Check className="w-4 h-4 text-risk-approved-fg" />
                    </div>
                  ) : s.current ? (
                    <div className="w-8 h-8 rounded-full bg-gold flex items-center justify-center relative">
                      <motion.div
                        animate={{ scale: [1, 1.6], opacity: [0.6, 0] }}
                        transition={{ duration: 1.4, repeat: Infinity }}
                        className="absolute inset-0 rounded-full bg-gold"
                      />
                      <div className="w-2 h-2 rounded-full bg-gold-foreground relative" />
                    </div>
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-muted border-2 border-border" />
                  )}
                </div>
                <div className="flex-1 pt-0.5">
                  <p
                    className={cn(
                      "font-semibold",
                      !s.done && !s.current && "text-muted-foreground",
                    )}
                  >
                    {s.label}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">{s.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SignalRiskModal open={open} onClose={() => setOpen(false)} />
    </div>
  );
}
