import { useState } from "react";
import { motion } from "framer-motion";
import { Home, ClipboardList, Feather, ArrowRight, Mail, Lock, User, Check } from "lucide-react";
import { useStore, type View } from "@/lib/store";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

type Role = "lar" | "tecnico" | "anjo";

const roles: { id: Role; label: string; desc: string; icon: typeof Home; view: View }[] = [
  {
    id: "lar",
    label: "Guardião do Lar",
    desc: "Moro numa área de risco e quero pedir ajuda para a minha casa.",
    icon: Home,
    view: "lar",
  },
  {
    id: "tecnico",
    label: "Guardião Técnico",
    desc: "Estudo Engenharia ou Arquitetura e quero assinar laudos com responsabilidade.",
    icon: ClipboardList,
    view: "tecnico",
  },
  {
    id: "anjo",
    label: "Anjo sem Asa",
    desc: "Tenho tempo, perna e disposição para levar o material até o último degrau.",
    icon: Feather,
    view: "anjo",
  },
];

export function AuthView({ mode }: { mode: "login" | "signup" }) {
  const setActiveView = useStore((s) => s.setActiveView);
  const [role, setRole] = useState<Role>("lar");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const isSignup = mode === "signup";

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const selected = roles.find((r) => r.id === role)!;
    toast.success(
      isSignup ? `Que bom ter você na Rede, ${name || "guardião(ã)"}.` : `Bem-vindo(a) de volta.`,
      { description: `Abrindo o painel ${selected.label}…` },
    );
    setTimeout(() => setActiveView(selected.view), 500);
  };

  return (
    <div className="min-h-[calc(100vh-6rem)] px-4 sm:px-8 pb-16">
      <div className="max-w-5xl mx-auto grid lg:grid-cols-[1.1fr_1fr] gap-6 mt-2">
        {/* Left — branding */}
        <div className="hidden lg:flex flex-col justify-between bg-ocean text-ocean-foreground rounded-3xl p-10 relative overflow-hidden">
          <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-gold/30 blur-3xl" />
          <div className="relative">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gold text-ocean text-xs font-semibold">
              Rede Arcanjo · Recife
            </div>
            <h2 className="font-display font-extrabold text-4xl mt-6 leading-tight">
              {isSignup
                ? "Toda casa de pé começa com alguém que aceitou ajudar."
                : "Sua barreira ainda precisa de você."}
            </h2>
            <p className="mt-4 text-ocean-foreground/85">
              Aqui ninguém sobe a ladeira sozinho — a rede caminha junto.
            </p>
          </div>
          <div className="relative space-y-3 mt-10">
            {[
              "Cadastro em 1 minuto, sem custo",
              "Validado por quem mora na comunidade",
              "Feito por e para o Recife",
            ].map((t) => (
              <div key={t} className="flex items-center gap-2 text-sm text-ocean-foreground/90">
                <span className="w-5 h-5 rounded-full bg-gold text-ocean flex items-center justify-center">
                  <Check className="w-3 h-3" />
                </span>
                {t}
              </div>
            ))}
          </div>
        </div>

        {/* Right — form */}
        <motion.form
          onSubmit={submit}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-card border border-border rounded-3xl p-6 sm:p-8 shadow-sm"
        >
          <h1 className="font-display font-bold text-2xl sm:text-3xl text-foreground">
            {isSignup ? "Criar minha conta" : "Entrar na Rede"}
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            {isSignup
              ? "Como você quer servir a Rede Arcanjo?"
              : "Escolha o painel que você quer abrir agora."}
          </p>

          {/* Role selector */}
          <div className="mt-5 space-y-2">
            {roles.map((r) => {
              const Icon = r.icon;
              const active = role === r.id;
              return (
                <button
                  type="button"
                  key={r.id}
                  onClick={() => setRole(r.id)}
                  className={cn(
                    "w-full text-left flex items-start gap-3 p-3.5 rounded-xl border-2 transition-all",
                    active
                      ? "border-ocean bg-ocean/[0.04]"
                      : "border-border hover:border-ocean/40 hover:bg-muted",
                  )}
                >
                  <span
                    className={cn(
                      "w-10 h-10 rounded-lg flex items-center justify-center shrink-0",
                      active ? "bg-ocean text-ocean-foreground" : "bg-muted text-foreground",
                    )}
                  >
                    <Icon className="w-5 h-5" />
                  </span>
                  <span className="flex-1">
                    <span className="flex items-center gap-2">
                      <span className="font-semibold text-sm text-foreground">{r.label}</span>
                      {active && (
                        <span className="text-[10px] font-bold tracking-wider uppercase px-1.5 py-0.5 rounded bg-gold text-ocean">
                          Selecionado
                        </span>
                      )}
                    </span>
                    <span className="block text-xs text-muted-foreground mt-0.5">{r.desc}</span>
                  </span>
                </button>
              );
            })}
          </div>

          {/* Fields */}
          <div className="mt-5 space-y-3">
            {isSignup && (
              <Field icon={User} placeholder="Nome completo" value={name} onChange={setName} />
            )}
            <Field
              icon={Mail}
              type="email"
              placeholder="seu@email.com"
              value={email}
              onChange={setEmail}
            />
            <Field
              icon={Lock}
              type="password"
              placeholder="Senha"
              value={password}
              onChange={setPassword}
            />
          </div>

          <button
            type="submit"
            className="mt-5 w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-ocean text-ocean-foreground font-semibold hover:bg-ocean/90 transition"
          >
            {isSignup ? "Entrar na Rede" : "Abrir meu painel"}
            <ArrowRight className="w-4 h-4" />
          </button>

          <p className="mt-4 text-center text-sm text-muted-foreground">
            {isSignup ? "Já é da Rede? " : "Primeira vez por aqui? "}
            <button
              type="button"
              onClick={() => setActiveView(isSignup ? "login" : "signup")}
              className="text-ocean font-semibold hover:underline"
            >
              {isSignup ? "Entrar" : "Criar conta"}
            </button>
          </p>
        </motion.form>
      </div>
    </div>
  );
}

function Field({
  icon: Icon,
  type = "text",
  placeholder,
  value,
  onChange,
}: {
  icon: typeof Home;
  type?: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <label className="flex items-center gap-2 px-3.5 h-12 rounded-xl border border-border bg-background focus-within:border-ocean transition">
      <Icon className="w-4 h-4 text-muted-foreground" />
      <input
        type={type}
        required
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="flex-1 bg-transparent outline-none text-sm text-foreground placeholder:text-muted-foreground"
      />
    </label>
  );
}
