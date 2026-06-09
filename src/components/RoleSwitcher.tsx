import { useState } from "react";
import { motion } from "framer-motion";
import {
  Home,
  ClipboardList,
  Feather,
  Trophy,
  Menu,
  Sparkles,
  LogIn,
  UserPlus,
} from "lucide-react";
import logoArcanjo from "@/assets/logo-arcanjo.png";
import { useStore, type View } from "@/lib/store";
import { cn } from "@/lib/utils";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

const items: { id: View; label: string; sub: string; icon: typeof Home }[] = [
  { id: "hero", label: "Início", sub: "Conheça a Rede", icon: Sparkles },
  { id: "lar", label: "Guardião do Lar", sub: "Para quem mora na encosta", icon: Home },
  {
    id: "tecnico",
    label: "Guardião Técnico",
    sub: "Para estudantes que avaliam laudos",
    icon: ClipboardList,
  },
  {
    id: "anjo",
    label: "Anjo sem Asa",
    sub: "Para quem leva o material até em cima",
    icon: Feather,
  },
  { id: "escada", label: "Escada de Jacó", sub: "Ranking dos guardiões", icon: Trophy },
];

const authItems: { id: View; label: string; icon: typeof Home }[] = [
  { id: "login", label: "Entrar", icon: LogIn },
  { id: "signup", label: "Cadastrar", icon: UserPlus },
];

export function RoleSwitcher() {
  const { activeView, setActiveView } = useStore();
  const [open, setOpen] = useState(false);

  const current =
    items.find((i) => i.id === activeView) ?? authItems.find((i) => i.id === activeView);

  const go = (v: View) => {
    setActiveView(v);
    setOpen(false);
  };

  return (
    <div className="fixed top-3 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-1.5rem)] max-w-3xl">
      <div className="rounded-2xl bg-ocean text-ocean-foreground shadow-2xl shadow-ocean/30 backdrop-blur px-3 py-2.5 flex items-center justify-between gap-3">
        <button
          onClick={() => go("hero")}
          className="flex items-center gap-2 font-display font-bold tracking-tight"
        >
          <span className="w-9 h-9 flex items-center justify-center">
            <img
              src={logoArcanjo}
              alt="Logo Rede Arcanjo"
              width={36}
              height={36}
              className="w-full h-full object-contain brightness-0 invert"
            />
          </span>
          <span className="text-sm sm:text-base">Rede Arcanjo</span>
        </button>

        <div className="flex items-center gap-2">
          {current && current.id !== "hero" && (
            <span className="hidden sm:inline text-xs text-ocean-foreground/70">
              {current.label}
            </span>
          )}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <button
                aria-label="Abrir menu"
                className="w-10 h-10 rounded-xl bg-gold text-ocean flex items-center justify-center hover:brightness-105 transition"
              >
                <Menu className="w-5 h-5" />
              </button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-[88%] sm:max-w-sm p-0 flex flex-col bg-background"
            >
              <SheetHeader className="p-6 pb-2">
                <SheetTitle className="font-display text-2xl text-foreground">
                  Rede Arcanjo
                </SheetTitle>
                <p className="text-sm text-muted-foreground">Escolha um painel para navegar.</p>
              </SheetHeader>

              <div className="px-3 pb-2">
                <p className="px-3 pt-3 pb-2 text-[11px] font-semibold tracking-widest uppercase text-muted-foreground">
                  Painéis
                </p>
                <nav className="flex flex-col gap-1">
                  {items.map((it) => {
                    const active = activeView === it.id;
                    const Icon = it.icon;
                    return (
                      <button
                        key={it.id}
                        onClick={() => go(it.id)}
                        className={cn(
                          "relative flex items-center gap-3 px-3 py-3 rounded-xl text-left transition-colors",
                          active
                            ? "bg-ocean text-ocean-foreground"
                            : "hover:bg-muted text-foreground",
                        )}
                      >
                        <span
                          className={cn(
                            "w-9 h-9 rounded-lg flex items-center justify-center shrink-0",
                            active ? "bg-gold text-ocean" : "bg-muted text-foreground",
                          )}
                        >
                          <Icon className="w-4 h-4" />
                        </span>
                        <span className="flex flex-col">
                          <span className="text-sm font-semibold leading-tight">{it.label}</span>
                          <span
                            className={cn(
                              "text-xs",
                              active ? "text-ocean-foreground/70" : "text-muted-foreground",
                            )}
                          >
                            {it.sub}
                          </span>
                        </span>
                        {active && (
                          <motion.span
                            layoutId="menu-dot"
                            className="ml-auto w-2 h-2 rounded-full bg-gold"
                          />
                        )}
                      </button>
                    );
                  })}
                </nav>

                <p className="px-3 pt-5 pb-2 text-[11px] font-semibold tracking-widest uppercase text-muted-foreground">
                  Conta
                </p>
                <nav className="flex flex-col gap-1 pb-6">
                  {authItems.map((it) => {
                    const active = activeView === it.id;
                    const Icon = it.icon;
                    return (
                      <button
                        key={it.id}
                        onClick={() => go(it.id)}
                        className={cn(
                          "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-left transition-colors",
                          active
                            ? "bg-ocean text-ocean-foreground"
                            : "hover:bg-muted text-foreground",
                        )}
                      >
                        <Icon className="w-4 h-4" />
                        {it.label}
                      </button>
                    );
                  })}
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
  );
}
