import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Camera, X, MapPin, Check } from "lucide-react";
import { useStore } from "@/lib/store";

export function SignalRiskModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [step, setStep] = useState<"camera" | "form" | "done">("camera");
  const [captured, setCaptured] = useState(false);
  const [desc, setDesc] = useState(
    "Apareceu uma trinca grande na parede dos fundos depois da chuva de ontem.",
  );
  const setResidentStatus = useStore((s) => s.setResidentStatus);

  const close = () => {
    onClose();
    setTimeout(() => {
      setStep("camera");
      setCaptured(false);
    }, 300);
  };

  const submit = () => {
    setResidentStatus("analise");
    setStep("done");
    setTimeout(close, 1600);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-black/70 flex items-end sm:items-center justify-center p-0 sm:p-4"
          onClick={close}
        >
          <motion.div
            initial={{ y: 40, opacity: 0, scale: 0.96 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 40, opacity: 0, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="w-full sm:max-w-md bg-card rounded-t-3xl sm:rounded-3xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-5 py-4 border-b">
              <h3 className="font-display font-bold text-lg">
                {step === "camera" ? "Foto do Risco" : step === "form" ? "Detalhes" : "Enviado!"}
              </h3>
              <button onClick={close} className="p-1 rounded-full hover:bg-muted">
                <X className="w-5 h-5" />
              </button>
            </div>

            {step === "camera" && (
              <div className="p-5">
                <div className="relative aspect-[3/4] bg-neutral-900 rounded-2xl overflow-hidden flex items-center justify-center">
                  {!captured ? (
                    <>
                      <div className="absolute inset-4 border-2 border-gold/60 rounded-xl pointer-events-none" />
                      <div className="absolute top-4 left-4 w-6 h-6 border-t-4 border-l-4 border-gold rounded-tl-xl" />
                      <div className="absolute top-4 right-4 w-6 h-6 border-t-4 border-r-4 border-gold rounded-tr-xl" />
                      <div className="absolute bottom-4 left-4 w-6 h-6 border-b-4 border-l-4 border-gold rounded-bl-xl" />
                      <div className="absolute bottom-4 right-4 w-6 h-6 border-b-4 border-r-4 border-gold rounded-br-xl" />
                      <Camera className="w-16 h-16 text-white/30" />
                      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/70 text-xs">
                        Aponte a câmera para o risco
                      </div>
                    </>
                  ) : (
                    <img
                      src="https://images.unsplash.com/photo-1530819568329-97653eafbbfa?w=600&h=800&fit=crop"
                      alt="trinca capturada"
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
                <div className="flex justify-center mt-5">
                  {!captured ? (
                    <button
                      onClick={() => setCaptured(true)}
                      className="w-16 h-16 rounded-full bg-gold ring-4 ring-gold/30 active:scale-95 transition"
                      aria-label="Capturar"
                    />
                  ) : (
                    <button
                      onClick={() => setStep("form")}
                      className="px-6 py-3 rounded-full bg-ocean text-ocean-foreground font-semibold"
                    >
                      Usar esta foto
                    </button>
                  )}
                </div>
              </div>
            )}

            {step === "form" && (
              <div className="p-5 space-y-4">
                <div>
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                    Localização
                  </label>
                  <div className="mt-1 flex items-center gap-2 px-3 py-3 rounded-xl bg-muted">
                    <MapPin className="w-4 h-4 text-ocean" />
                    <span className="font-medium">Ibura, Recife — PE</span>
                  </div>
                </div>
                <div>
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                    Descrição
                  </label>
                  <textarea
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                    rows={4}
                    className="mt-1 w-full px-3 py-3 rounded-xl border bg-card resize-none focus:outline-none focus:ring-2 focus:ring-gold"
                  />
                </div>
                <button
                  onClick={submit}
                  className="w-full py-4 rounded-2xl bg-gold text-gold-foreground font-bold text-lg shadow-lg shadow-gold/30 active:scale-[0.98] transition"
                >
                  Enviar para a Rede Arcanjo
                </button>
              </div>
            )}

            {step === "done" && (
              <div className="p-10 flex flex-col items-center justify-center gap-3">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 260, damping: 18 }}
                  className="w-20 h-20 rounded-full bg-risk-approved-bg flex items-center justify-center"
                >
                  <Check className="w-10 h-10 text-risk-approved-fg" />
                </motion.div>
                <p className="font-display font-bold text-xl text-center">Chamado enviado!</p>
                <p className="text-sm text-muted-foreground text-center">
                  Um Guardião Técnico vai analisar em breve.
                </p>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
