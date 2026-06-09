import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { QrCode, X, Check } from "lucide-react";
import confetti from "canvas-confetti";
import { useStore } from "@/lib/store";

export function QRScanModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [scanned, setScanned] = useState(false);
  const completeMission = useStore((s) => s.completeMission);

  useEffect(() => {
    if (!open) return;
    const t = setTimeout(() => {
      setScanned(true);
      completeMission();
      confetti({
        particleCount: 140,
        spread: 90,
        origin: { y: 0.5 },
        colors: ["#FFC83B", "#1E3A5F", "#D4EFDF"],
      });
      setTimeout(() => {
        onClose();
        setScanned(false);
      }, 2200);
    }, 1800);
    return () => clearTimeout(t);
  }, [open, completeMission, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-black/80 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="w-full max-w-sm bg-card rounded-3xl overflow-hidden"
          >
            <div className="flex items-center justify-between px-5 py-4 border-b">
              <h3 className="font-display font-bold">Validar Entrega</h3>
              <button onClick={onClose} className="p-1 rounded-full hover:bg-muted">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6">
              <div className="relative aspect-square bg-neutral-900 rounded-2xl overflow-hidden flex items-center justify-center">
                <QrCode className="w-32 h-32 text-white/30" />
                <div className="absolute top-3 left-3 w-8 h-8 border-t-4 border-l-4 border-gold" />
                <div className="absolute top-3 right-3 w-8 h-8 border-t-4 border-r-4 border-gold" />
                <div className="absolute bottom-3 left-3 w-8 h-8 border-b-4 border-l-4 border-gold" />
                <div className="absolute bottom-3 right-3 w-8 h-8 border-b-4 border-r-4 border-gold" />
                {!scanned && (
                  <motion.div
                    initial={{ top: "10%" }}
                    animate={{ top: "90%" }}
                    transition={{
                      duration: 1.2,
                      repeat: Infinity,
                      repeatType: "reverse",
                      ease: "easeInOut",
                    }}
                    className="absolute left-3 right-3 h-0.5 bg-gold shadow-[0_0_12px_2px_rgba(255,200,59,0.8)]"
                  />
                )}
                {scanned && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute inset-0 bg-risk-approved-bg/95 flex items-center justify-center"
                  >
                    <Check className="w-24 h-24 text-risk-approved-fg" />
                  </motion.div>
                )}
              </div>
              <p className="mt-4 text-sm text-center text-muted-foreground">
                {scanned ? "Entrega validada no topo!" : "Aponte para o QR Code no lar do Guardião"}
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
