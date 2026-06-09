import { motion } from "framer-motion";
import { Store, Home, AlertTriangle } from "lucide-react";

export function LastMileMap() {
  return (
    <div className="relative bg-gradient-to-b from-sky-50 to-emerald-50 rounded-2xl overflow-hidden border">
      <div className="absolute top-3 left-3 right-3 z-10 flex items-start gap-2 bg-risk-med-bg text-risk-med-fg px-3 py-2 rounded-xl text-xs font-medium">
        <AlertTriangle className="w-4 h-4 mt-0.5 shrink-0" />
        <span>Escadaria íngreme. Use carrinho de mão ou mochila reforçada.</span>
      </div>

      <svg viewBox="0 0 300 560" className="w-full h-[560px]">
        {/* hill silhouette */}
        <path
          d="M0,560 L0,420 Q60,360 100,380 Q160,340 200,300 Q260,260 300,220 L300,560 Z"
          fill="oklch(0.92 0.04 150)"
          opacity="0.6"
        />
        <path
          d="M0,560 L0,480 Q80,440 140,460 Q200,420 260,400 L300,380 L300,560 Z"
          fill="oklch(0.85 0.06 150)"
          opacity="0.5"
        />

        {/* trail */}
        <motion.path
          d="M60,490 Q120,460 110,420 Q90,380 150,360 Q210,340 200,290 Q180,250 230,210 Q260,180 240,140"
          stroke="oklch(0.45 0.12 254)"
          strokeWidth="3"
          strokeDasharray="8 8"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2.2, ease: "easeInOut" }}
        />

        {/* steps marker */}
        <g transform="translate(150,360)">
          <rect
            x="-22"
            y="-10"
            width="44"
            height="20"
            rx="4"
            fill="oklch(0.7 0.02 254)"
            opacity="0.4"
          />
          <text
            x="0"
            y="4"
            textAnchor="middle"
            fontSize="9"
            fill="oklch(0.3 0.05 254)"
            fontWeight="600"
          >
            42 degraus
          </text>
        </g>
      </svg>

      {/* base marker */}
      <div className="absolute" style={{ left: "20px", bottom: "60px" }}>
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 rounded-full bg-ocean text-ocean-foreground flex items-center justify-center shadow-lg">
            <Store className="w-6 h-6" />
          </div>
          <div className="mt-1 px-2 py-0.5 bg-card rounded-md text-[10px] font-semibold shadow border">
            Armazém do Seu Zé
          </div>
        </div>
      </div>

      {/* top marker */}
      <div className="absolute" style={{ right: "30px", top: "70px" }}>
        <div className="flex flex-col items-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1.8, type: "spring", stiffness: 300 }}
            className="w-12 h-12 rounded-full bg-gold text-gold-foreground flex items-center justify-center shadow-lg ring-4 ring-gold/30"
          >
            <Home className="w-6 h-6" />
          </motion.div>
          <div className="mt-1 px-2 py-0.5 bg-card rounded-md text-[10px] font-semibold shadow border">
            Lar da Dona Maria
          </div>
        </div>
      </div>
    </div>
  );
}
