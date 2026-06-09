import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { Toaster } from "@/components/ui/sonner";
import { RoleSwitcher } from "@/components/RoleSwitcher";
import { HeroView } from "@/components/views/HeroView";
import { AuthView } from "@/components/views/AuthView";
import { GuardiaoLarView } from "@/components/views/GuardiaoLarView";
import { GuardiaoTecnicoView } from "@/components/views/GuardiaoTecnicoView";
import { AnjoSemAsaView } from "@/components/views/AnjoSemAsaView";
import { EscadaDeJacoView } from "@/components/views/EscadaDeJacoView";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Rede Arcanjo — Dignidade Habitacional no Recife" },
      {
        name: "description",
        content:
          "Conectando moradores em áreas de risco, engenheiros voluntários e Anjos da logística.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  const activeView = useStore((s) => s.activeView);

  return (
    <div className={`min-h-screen bg-background ${activeView !== "hero" ? "app-container--padded" : ""}`}>
      <RoleSwitcher />
      <AnimatePresence mode="wait">
        <motion.main
          key={activeView}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
        >
          {activeView === "hero" && <HeroView />}
          {activeView === "login" && <AuthView mode="login" />}
          {activeView === "signup" && <AuthView mode="signup" />}
          {activeView === "lar" && <GuardiaoLarView />}
          {activeView === "tecnico" && <GuardiaoTecnicoView />}
          {activeView === "anjo" && <AnjoSemAsaView />}
          {activeView === "escada" && <EscadaDeJacoView />}
        </motion.main>
      </AnimatePresence>
      <Toaster position="top-center" />
    </div>
  );
}
