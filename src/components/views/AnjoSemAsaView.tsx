import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Package, Zap, ChevronRight, ArrowLeft, QrCode } from "lucide-react";
import { missions, type Mission } from "@/lib/mock-data";
import { LastMileMap } from "@/components/LastMileMap";
import { QRScanModal } from "@/components/QRScanModal";
import { useStore } from "@/lib/store";

export function AnjoSemAsaView() {
  const [active, setActive] = useState<Mission | null>(null);
  const [scan, setScan] = useState(false);
  const completed = useStore((s) => s.completedMissions);
  const level = Math.min(9, Math.floor(completed / 3) + 1);
  const progress = ((completed % 3) / 3) * 100;

  return (
    <div className="max-w-md mx-auto px-4 pb-16">
      {/* Profile */}
      <div className="rounded-3xl bg-ocean text-ocean-foreground p-5 relative overflow-hidden">
        <div className="absolute -right-8 -top-8 w-32 h-32 bg-gold/20 rounded-full blur-2xl" />
        <div className="relative flex items-center gap-3">
          <div className="w-14 h-14 rounded-full bg-gold flex items-center justify-center font-display font-extrabold text-gold-foreground text-xl">
            R
          </div>
          <div className="flex-1">
            <p className="font-display font-bold text-lg">Anjo Rafael</p>
            <span className="inline-flex items-center gap-1 mt-0.5 px-2 py-0.5 rounded-full bg-gold text-gold-foreground text-[11px] font-bold">
              <Zap className="w-3 h-3" /> Nível {level}
            </span>
          </div>
          <div className="text-right">
            <p className="text-2xl font-display font-extrabold text-gold leading-none">
              {completed}
            </p>
            <p className="text-[10px] uppercase tracking-wider opacity-70">Missões</p>
          </div>
        </div>
        <div className="mt-4">
          <div className="flex justify-between text-[11px] mb-1 opacity-80">
            <span>Progresso para Nível {level + 1}</span>
            <span>{3 - (completed % 3)} missões restantes</span>
          </div>
          <div className="h-2 bg-ocean-foreground/15 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.8 }}
              className="h-full bg-gold"
            />
          </div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {!active ? (
          <motion.div
            key="feed"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <h2 className="font-display font-bold text-lg mt-6">Missões Próximas</h2>
            <p className="text-sm text-muted-foreground">Aceite e suba a barreira</p>

            <div className="mt-3 space-y-3">
              {missions.map((m) => (
                <motion.button
                  key={m.id}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => setActive(m)}
                  className="w-full text-left bg-card rounded-2xl border p-4 flex items-center gap-3 hover:border-gold transition"
                >
                  <div className="w-12 h-12 rounded-xl bg-risk-med-bg text-risk-med-fg flex items-center justify-center shrink-0">
                    <Package className="w-6 h-6" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold truncate">{m.title}</p>
                    <p className="text-xs text-muted-foreground flex items-center gap-2 mt-1">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {m.neighborhood}
                      </span>
                      <span>·</span>
                      <span>{m.distanceKm} km</span>
                      <span>·</span>
                      <span>{m.weightKg} kg</span>
                    </p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-muted-foreground" />
                </motion.button>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="active"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="mt-6"
          >
            <button
              onClick={() => setActive(null)}
              className="flex items-center gap-1 text-sm font-semibold text-ocean mb-3"
            >
              <ArrowLeft className="w-4 h-4" /> Voltar
            </button>
            <div className="bg-card rounded-2xl border p-4 mb-3">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Missão aceita
              </p>
              <p className="font-display font-bold text-lg mt-1">{active.title}</p>
              <p className="text-sm text-muted-foreground mt-1">
                Para <span className="font-semibold text-foreground">{active.resident}</span> ·{" "}
                {active.neighborhood}
              </p>
            </div>

            <LastMileMap />

            <motion.button
              whileTap={{ scale: 0.98 }}
              onClick={() => setScan(true)}
              className="mt-4 w-full py-4 rounded-2xl bg-gold text-gold-foreground font-bold text-lg flex items-center justify-center gap-2 shadow-lg shadow-gold/30"
            >
              <QrCode className="w-5 h-5" />
              Validar no Topo
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      <QRScanModal
        open={scan}
        onClose={() => {
          setScan(false);
          setActive(null);
        }}
      />
    </div>
  );
}
