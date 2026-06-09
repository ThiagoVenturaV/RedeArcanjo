import { motion } from "framer-motion";
import { Crown, Sparkles } from "lucide-react";
import { ranking, CURRENT_USER_RANK } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export function EscadaDeJacoView() {
  const top3 = ranking.slice(0, 3);
  const rest = ranking.slice(3);

  return (
    <div className="max-w-4xl mx-auto px-4 pb-32">
      <header className="text-center mt-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/15 text-gold-foreground">
          <Sparkles className="w-4 h-4" />
          <span className="text-xs font-bold uppercase tracking-wider">Ranking</span>
        </div>
        <h1 className="mt-3 font-display font-extrabold text-4xl sm:text-5xl text-gold drop-shadow-sm">
          Escada de Jacó
        </h1>
        <p className="mt-2 text-sm text-ocean/70 italic">
          "Subindo os degraus da solidariedade no Recife."
        </p>
      </header>

      {/* Podium */}
      <div className="mt-10 relative">
        <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-gold via-gold/60 to-gold/20 rounded-full" />
        <div className="relative space-y-4">
          {top3.map((u, i) => (
            <motion.div
              key={u.rank}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15 }}
              className={cn(
                "relative mx-auto bg-card rounded-3xl border-2 p-5 flex items-center gap-4 shadow-lg",
                i === 0 ? "max-w-md border-gold shadow-gold/20" : "max-w-sm border-border",
                i === 1 && "ml-auto mr-[10%]",
                i === 2 && "ml-[10%] mr-auto",
              )}
            >
              <div
                className={cn(
                  "relative shrink-0 rounded-full flex items-center justify-center font-display font-extrabold text-ocean-foreground",
                  i === 0
                    ? "w-20 h-20 text-2xl bg-ocean ring-4 ring-gold"
                    : "w-16 h-16 text-xl bg-ocean ring-2 ring-gold/60",
                )}
              >
                {u.name.split(" ").slice(-1)[0][0]}
                {i === 0 && (
                  <Crown className="absolute -top-4 -right-2 w-7 h-7 text-gold fill-gold rotate-12" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-display font-extrabold text-2xl text-gold">#{u.rank}</span>
                  <span className="font-display font-bold truncate">{u.name}</span>
                </div>
                <p className="text-xs text-muted-foreground">{u.neighborhood}</p>
                <p className="mt-1 text-[11px] font-bold uppercase tracking-wider text-gold-foreground bg-gold/20 inline-block px-2 py-0.5 rounded-full">
                  {u.tier}
                </p>
              </div>
              <div className="text-right shrink-0">
                <p className="font-display font-extrabold text-2xl text-ocean">{u.missions}</p>
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
                  Missões
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Full list */}
      <div className="mt-10 bg-card rounded-2xl border overflow-hidden">
        <div className="px-4 py-3 border-b flex items-center justify-between">
          <h2 className="font-display font-bold">Demais Degraus</h2>
          <span className="text-xs text-muted-foreground">{rest.length} anjos</span>
        </div>
        <div className="divide-y max-h-[420px] overflow-y-auto">
          {rest.map((u) => {
            const isYou = u.rank === CURRENT_USER_RANK;
            return (
              <div
                key={u.rank}
                className={cn(
                  "px-4 py-3 flex items-center gap-3 hover:bg-muted/50 transition",
                  isYou && "bg-gold/10",
                )}
              >
                <span className="font-display font-bold text-muted-foreground w-8 tabular-nums">
                  {u.rank}º
                </span>
                <div className="w-9 h-9 rounded-full bg-ocean text-ocean-foreground flex items-center justify-center font-bold text-sm shrink-0">
                  {u.name.split(" ").slice(-1)[0][0]}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold truncate flex items-center gap-2">
                    {u.name}
                    {isYou && (
                      <span className="text-[10px] font-bold uppercase bg-gold text-gold-foreground px-1.5 py-0.5 rounded">
                        Você
                      </span>
                    )}
                  </p>
                  <p className="text-xs text-muted-foreground">{u.neighborhood}</p>
                </div>
                <div className="text-right">
                  <p className="font-display font-bold tabular-nums">{u.missions}</p>
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
                    missões
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Fixed user context */}
      <div className="fixed bottom-3 left-1/2 -translate-x-1/2 z-40 w-[calc(100%-1.5rem)] max-w-2xl">
        <div className="bg-ocean text-ocean-foreground rounded-2xl p-4 shadow-2xl shadow-ocean/40 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-gold text-gold-foreground flex items-center justify-center font-display font-extrabold shrink-0">
            14º
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold">
              Você está no <span className="text-gold">14º degrau</span>.
            </p>
            <p className="text-xs opacity-80">Complete mais 1 missão para se tornar um Serafim!</p>
            <div className="mt-2 h-1.5 bg-ocean-foreground/15 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "75%" }}
                transition={{ duration: 1 }}
                className="h-full bg-gold"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
