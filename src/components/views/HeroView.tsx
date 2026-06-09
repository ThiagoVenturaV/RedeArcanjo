import { useState, useEffect } from "react";
import {
  Sparkles,
  Home,
  Heart,
  Wrench,
  Camera,
  Search,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Send,
  Map,
  Clipboard,
  BarChart3,
  User,
  Zap,
  Star,
  Trophy,
  MessageSquare,
  Instagram,
  Linkedin,
  ChevronDown,
  Bell,
  Lock,
} from "lucide-react";
import { useStore } from "@/lib/store";
import logoArcanjo from "@/assets/logo-arcanjo.png";
import heroArcanjoLight from "@/assets/hero_arcanjo_light.png";

export function HeroView() {
  const setActiveView = useStore((s) => s.setActiveView);
  const [activeTab, setActiveTab] = useState<"lar" | "tec" | "anjo">("lar");
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Intersection Observer for scroll animations
  useEffect(() => {
    const animEls = document.querySelectorAll(".animate-on-scroll");
    const animObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            animObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );
    animEls.forEach((el) => animObserver.observe(el));
    return () => animObserver.disconnect();
  }, []);

  // Count-up stats observer
  useEffect(() => {
    const countUp = (el: HTMLElement, target: number, duration: number) => {
      const start = performance.now();
      const update = (now: number) => {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.round(eased * target).toLocaleString("pt-BR");
        if (progress < 1) requestAnimationFrame(update);
      };
      requestAnimationFrame(update);
    };

    const statsBar = document.querySelector(".stats-bar");
    let statsDone = false;
    const statsObserver = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !statsDone) {
          statsDone = true;
          document.querySelectorAll("[data-count]").forEach((el) => {
            const target = parseInt((el as HTMLElement).dataset.count || "0", 10);
            countUp(el as HTMLElement, target, 1800);
          });
          statsObserver.disconnect();
        }
      },
      { threshold: 0.5 },
    );
    if (statsBar) statsObserver.observe(statsBar);
    return () => statsObserver.disconnect();
  }, []);

  return (
    <div className="landing-page-wrapper">
      {/* ===== NAVEGAÇÃO ===== */}
      <nav
        className={`nav ${isScrolled ? "scrolled" : ""}`}
        id="nav"
        role="navigation"
        aria-label="Navegação principal"
      >
        <a href="#" className="nav__logo" aria-label="Rede Arcanjo - Página inicial">
          <img src={logoArcanjo} alt="Rede Arcanjo Logo" className="nav__logo-img" />
          Rede Arcanjo
        </a>
        <ul className="nav__links" role="list">
          <li>
            <a href="#quem-somos" className="nav__link">
              Quem Somos
            </a>
          </li>
          <li>
            <a href="#perfis" className="nav__link">
              Perfis
            </a>
          </li>
          <li>
            <a href="#como-funciona" className="nav__link">
              Como Funciona
            </a>
          </li>
          <li>
            <a href="#plataforma" className="nav__link">
              A Plataforma
            </a>
          </li>
        </ul>
        <button
          onClick={() => setActiveView("signup")}
          id="nav-cta"
          className="nav__cta"
          role="button"
          aria-label="Fazer parte da rede"
        >
          Fazer Parte
        </button>
        <button
          className="nav__hamburger"
          id="nav-hamburger"
          aria-label="Menu"
          aria-expanded="false"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </nav>

      {/* ===== HERO ===== */}
      <section className="hero" id="inicio" aria-labelledby="hero-title">
        <div className="hero__container">
          {/* Conteúdo textual */}
          <div className="hero__text">
            <h1 className="hero__title" id="hero-title">
              Cada Lar Merece
              <br />
              Um <span className="hero__title-accent">Anjo</span> ao Lado
            </h1>
            <p className="hero__description">
              A Rede Arcanjo conecta famílias em situação de vulnerabilidade habitacional com
              voluntários solidários e especialistas técnicos. Juntos, transformamos risco em
              proteção.
            </p>
            <div className="hero__actions">
              <button
                onClick={() => setActiveView("signup")}
                className="btn btn--primary"
                aria-label="Sou Guardião do Lar e preciso de ajuda"
              >
                <Home className="lucide" /> Preciso de Ajuda
              </button>
              <button
                onClick={() => setActiveView("signup")}
                className="btn btn--gold"
                aria-label="Quero ser um Anjo e ajudar"
              >
                <Heart className="lucide" /> Quero Ajudar
              </button>
              <a href="#como-funciona" className="btn btn--outline">
                Saiba Mais →
              </a>
            </div>
          </div>
          {/* Imagem hero */}
          <div className="hero__image">
            <img
              src={heroArcanjoLight}
              alt="Ilustração da rede de conexão da Rede Arcanjo: famílias, voluntários e técnicos unidos por laços dourados"
              loading="eager"
            />
          </div>
        </div>
        {/* Scroll indicator */}
        <div className="hero__scroll" aria-hidden="true">
          <span>Rolar</span>
          <span className="hero__scroll-arrow">
            <ChevronDown className="lucide" />
          </span>
        </div>
      </section>

      {/* ===== MÉTRICAS ===== */}
      <div className="stats-bar" role="region" aria-label="Impacto da Rede Arcanjo">
        <div className="stats-bar__grid">
          <div className="stat-item">
            <div className="stat-item__number" data-count="1240" id="stat-lares">
              0
            </div>
            <div className="stat-item__label">Lares cadastrados</div>
          </div>
          <div className="stat-item">
            <div className="stat-item__number" data-count="380" id="stat-anjos">
              0
            </div>
            <div className="stat-item__label">Anjos voluntários</div>
          </div>
          <div className="stat-item">
            <div className="stat-item__number" data-count="94" id="stat-tecnicos">
              0
            </div>
            <div className="stat-item__label">Guardiões técnicos</div>
          </div>
          <div className="stat-item">
            <div className="stat-item__number" data-count="2800" id="stat-horas">
              0
            </div>
            <div className="stat-item__label">Horas solidárias</div>
          </div>
        </div>
      </div>

      {/* ===== QUEM SOMOS ===== */}
      <section className="section" id="quem-somos" aria-labelledby="quem-somos-title">
        <div className="section__header section__header--center animate-on-scroll">
          <p className="section__eyebrow">Nossa missão</p>
          <h2 className="section__title" id="quem-somos-title">
            A rede que transforma
            <br />
            vulnerabilidade em segurança
          </h2>
          <p className="section__subtitle">
            Inspirados no espírito dos arcanjos — mensageiros que protegem e conectam — criamos uma
            plataforma digital para unir quem precisa, quem pode e quem sabe.
          </p>
        </div>
      </section>

      {/* ===== OS 3 PERFIS ===== */}
      <section className="section section--alt" id="perfis" aria-labelledby="perfis-title">
        <div className="section__header section__header--center animate-on-scroll">
          <p className="section__eyebrow">Os três pilares</p>
          <h2 className="section__title" id="perfis-title">
            Escolha o seu papel na rede
          </h2>
          <p className="section__subtitle">
            Cada pessoa tem um lugar nessa corrente de solidariedade. Encontre o seu perfil e comece
            a transformar vidas.
          </p>
        </div>

        <div className="pillars__grid">
          {/* Guardião do Lar */}
          <article
            className="pillar-card pillar-card--lar animate-on-scroll"
            aria-label="Perfil: Guardião do Lar"
          >
            <div className="pillar-card__icon-wrap" aria-hidden="true">
              <Home className="lucide" />
            </div>
            <span className="pillar-card__tag">Guardião do Lar</span>
            <h3 className="pillar-card__title">Minha casa precisa de proteção</h3>
            <p className="pillar-card__desc">
              Mora em área de risco ou tem problemas estruturais no lar? A Rede Arcanjo conecta você
              com voluntários e profissionais para avaliar, planejar e executar as melhorias
              necessárias.
            </p>
            <ul className="pillar-card__features" role="list">
              <li className="pillar-card__feature">
                <span className="pillar-card__check" aria-hidden="true">
                  ✓
                </span>
                Registre o risco com uma foto
              </li>
              <li className="pillar-card__feature">
                <span className="pillar-card__check" aria-hidden="true">
                  ✓
                </span>
                Receba diagnóstico técnico gratuito
              </li>
              <li className="pillar-card__feature">
                <span className="pillar-card__check" aria-hidden="true">
                  ✓
                </span>
                Acompanhe o status em tempo real
              </li>
              <li className="pillar-card__feature">
                <span className="pillar-card__check" aria-hidden="true">
                  ✓
                </span>
                Sem burocracia, sem custo
              </li>
            </ul>
            <button
              onClick={() => setActiveView("signup")}
              className="pillar-card__cta"
              id="btn-lar-perfil"
              aria-label="Cadastrar como Guardião do Lar"
            >
              Quero Proteger meu Lar →
            </button>
          </article>

          {/* Anjo sem Asa */}
          <article
            className="pillar-card pillar-card--anjo animate-on-scroll delay-1"
            aria-label="Perfil: Anjo sem Asa"
          >
            <div className="pillar-card__icon-wrap" aria-hidden="true">
              <Heart className="lucide" />
            </div>
            <span className="pillar-card__tag">Anjo sem Asa</span>
            <h3 className="pillar-card__title">Quero ser um agente de mudança</h3>
            <p className="pillar-card__desc">
              Tem tempo, disposição e vontade de ajudar? Como Anjo sem Asa, você realiza missões
              logísticas e comunitárias — e acumula horas de extensão e impacto real na sua cidade.
            </p>
            <ul className="pillar-card__features" role="list">
              <li className="pillar-card__feature">
                <span className="pillar-card__check" aria-hidden="true">
                  ✓
                </span>
                Missões próximas ao seu bairro
              </li>
              <li className="pillar-card__feature">
                <span className="pillar-card__check" aria-hidden="true">
                  ✓
                </span>
                Horas complementares FICR
              </li>
              <li className="pillar-card__feature">
                <span className="pillar-card__check" aria-hidden="true">
                  ✓
                </span>
                Sistema de gamificação e conquistas
              </li>
              <li className="pillar-card__feature">
                <span className="pillar-card__check" aria-hidden="true">
                  ✓
                </span>
                Rota da "última milha" no app
              </li>
            </ul>
            <button
              onClick={() => setActiveView("signup")}
              className="pillar-card__cta"
              id="btn-anjo-perfil"
              aria-label="Cadastrar como Anjo sem Asa"
            >
              Quero ser um Anjo →
            </button>
          </article>

          {/* Guardião Técnico */}
          <article
            className="pillar-card pillar-card--tec animate-on-scroll delay-2"
            aria-label="Perfil: Guardião Técnico"
          >
            <div className="pillar-card__icon-wrap" aria-hidden="true">
              <Wrench className="lucide" />
            </div>
            <span className="pillar-card__tag">Guardião Técnico</span>
            <h3 className="pillar-card__title">Meu conhecimento pode salvar lares</h3>
            <p className="pillar-card__desc">
              Engenheiro, arquiteto, estudante ou técnico? Use sua expertise para analisar
              diagnósticos estruturais, criar planos de ação e guiar voluntários em cada missão de
              reparo.
            </p>
            <ul className="pillar-card__features" role="list">
              <li className="pillar-card__feature">
                <span className="pillar-card__check" aria-hidden="true">
                  ✓
                </span>
                Painel técnico de triagem
              </li>
              <li className="pillar-card__feature">
                <span className="pillar-card__check" aria-hidden="true">
                  ✓
                </span>
                Criação de missões comunitárias
              </li>
              <li className="pillar-card__feature">
                <span className="pillar-card__check" aria-hidden="true">
                  ✓
                </span>
                Relatórios de impacto
              </li>
              <li className="pillar-card__feature">
                <span className="pillar-card__check" aria-hidden="true">
                  ✓
                </span>
                Certificação de atuação social
              </li>
            </ul>
            <button
              onClick={() => setActiveView("signup")}
              className="pillar-card__cta"
              id="btn-tec-perfil"
              aria-label="Cadastrar como Guardião Técnico"
            >
              Aplicar como Técnico →
            </button>
          </article>
        </div>
      </section>

      {/* ===== COMO FUNCIONA ===== */}
      <section className="section" id="como-funciona" aria-labelledby="como-title">
        <div className="section__header section__header--center animate-on-scroll">
          <p className="section__eyebrow">O processo</p>
          <h2 className="section__title" id="como-title">
            Do chamado à proteção em 4 passos
          </h2>
          <p className="section__subtitle">
            Nossa plataforma conecta as três pontas da rede de forma simples, rápida e sem
            burocracia.
          </p>
        </div>
        <div className="how__container">
          <div className="how__steps">
            <div className="how-step animate-on-scroll">
              <div className="how-step__bubble" aria-hidden="true">
                <Camera className="lucide" />
              </div>
              <h3 className="how-step__title">Guardião registra</h3>
              <p className="how-step__desc">
                O morador tira uma foto do problema estrutural e envia pelo app.
              </p>
            </div>
            <div className="how-step animate-on-scroll delay-1">
              <div className="how-step__bubble" aria-hidden="true">
                <Search className="lucide" />
              </div>
              <h3 className="how-step__title">Técnico avalia</h3>
              <p className="how-step__desc">
                Um Guardião Técnico analisa a imagem, define o risco e cria as missões.
              </p>
            </div>
            <div className="how-step animate-on-scroll delay-2">
              <div className="how-step__bubble" aria-hidden="true">
                <Heart className="lucide" />
              </div>
              <h3 className="how-step__title">Anjo executa</h3>
              <p className="how-step__desc">
                O Anjo sem Asa recebe a missão, segue a rota e entrega os insumos.
              </p>
            </div>
            <div className="how-step animate-on-scroll delay-3">
              <div className="how-step__bubble" aria-hidden="true">
                <CheckCircle2 className="lucide" />
              </div>
              <h3 className="how-step__title">Lar protegido</h3>
              <p className="how-step__desc">
                Missão cumprida, horas registradas e um lar mais seguro.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== A PLATAFORMA (MOCKUPS) ===== */}
      <section
        className="section section--alt screens"
        id="plataforma"
        aria-labelledby="plataforma-title"
      >
        <div className="screens__container">
          <div className="section__header animate-on-scroll">
            <p className="section__eyebrow">A plataforma</p>
            <h2 className="section__title" id="plataforma-title">
              Três visões, uma missão
            </h2>
            <p className="section__subtitle">
              Cada perfil tem sua própria experiência — simples para quem precisa, poderosa para
              quem ajuda.
            </p>
          </div>

          {/* Tabs */}
          <div className="screens__tabs" role="tablist" aria-label="Visões da plataforma">
            <button
              className={`screen-tab ${activeTab === "lar" ? "active" : ""}`}
              onClick={() => setActiveTab("lar")}
              role="tab"
              aria-selected={activeTab === "lar"}
              aria-controls="panel-lar"
            >
              <Home className="lucide" /> Guardião do Lar
            </button>
            <button
              className={`screen-tab ${activeTab === "tec" ? "active" : ""}`}
              onClick={() => setActiveTab("tec")}
              role="tab"
              aria-selected={activeTab === "tec"}
              aria-controls="panel-tec"
            >
              <Wrench className="lucide" /> Guardião Técnico
            </button>
            <button
              className={`screen-tab ${activeTab === "anjo" ? "active" : ""}`}
              onClick={() => setActiveTab("anjo")}
              role="tab"
              aria-selected={activeTab === "anjo"}
              aria-controls="panel-anjo"
            >
              <Heart className="lucide" /> Anjo sem Asa
            </button>
          </div>

          {/* PAINEL 1: Guardião do Lar */}
          {activeTab === "lar" && (
            <div
              className="screen-panel active animate-fade-in"
              id="panel-lar"
              role="tabpanel"
              aria-labelledby="tab-lar"
            >
              {/* Mockup celular */}
              <div className="phone-mockup" aria-hidden="true">
                <div className="phone-mockup__frame">
                  <div className="phone-mockup__notch"></div>
                  <div className="phone-mockup__screen">
                    <div className="app-screen">
                      <p className="app-screen__header-tag">Rede Arcanjo</p>
                      <p className="app-screen__greeting">Olá, Dona Maria.</p>
                      <p className="app-screen__subgreeting">Vamos proteger o seu lar hoje?</p>
                      {/* Botão central de captura */}
                      <div className="capture-btn" role="presentation">
                        <div className="capture-btn__icon">
                          <Camera className="lucide" style={{ width: "32px", height: "32px" }} />
                        </div>
                        <div className="capture-btn__title">Sinalizar Risco no Meu Lar</div>
                        <div className="capture-btn__hint">
                          Tire uma foto da rachadura, infiltração ou barreira
                        </div>
                      </div>
                      {/* Status */}
                      <div className="app-status-card">
                        <div className="app-status-card__label">Acompanhamento da sua casa</div>
                        <span className="app-status-tag app-status-tag--waiting">
                          <Clock className="lucide" /> Aguardando Guardião Técnico
                        </span>
                        <p className="app-status-card__text">
                          Sua foto foi enviada. Um engenheiro voluntário vai analisar em breve.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Descrição */}
              <div className="screen-info">
                <p className="screen-info__eyebrow">Tela 1 — Guardião do Lar</p>
                <h3 className="screen-info__title">O Chamado de Amparo</h3>
                <p className="screen-info__desc">
                  Uma interface acolhedora, sem jargões técnicos. O morador fotografa o problema e
                  envia com um toque — sem formulários longos, sem burocracia.
                </p>
                <ul className="screen-info__features" role="list">
                  <li className="screen-feature">
                    <div className="screen-feature__icon" aria-hidden="true">
                      <Camera className="lucide" />
                    </div>
                    <div>
                      <div className="screen-feature__title">Registro por foto</div>
                      <div className="screen-feature__text">
                        Um clique para sinalizar rachadura, infiltração ou deslizamento.
                      </div>
                    </div>
                  </li>
                  <li className="screen-feature">
                    <div className="screen-feature__icon" aria-hidden="true">
                      <Bell className="lucide" />
                    </div>
                    <div>
                      <div className="screen-feature__title">Acompanhamento em tempo real</div>
                      <div className="screen-feature__text">
                        Status visual do pedido: Análise Pendente → Materiais a Caminho → Lar
                        Seguro.
                      </div>
                    </div>
                  </li>
                  <li className="screen-feature">
                    <div className="screen-feature__icon" aria-hidden="true">
                      <Lock className="lucide" />
                    </div>
                    <div>
                      <div className="screen-feature__title">Privacidade garantida</div>
                      <div className="screen-feature__text">
                        Dados compartilhados apenas com voluntários verificados.
                      </div>
                    </div>
                  </li>
                </ul>
                <button onClick={() => setActiveView("lar")} className="btn btn--primary">
                  Experimente como Guardião →
                </button>
              </div>
            </div>
          )}

          {/* PAINEL 2: Guardião Técnico */}
          {activeTab === "tec" && (
            <div
              className="screen-panel active animate-fade-in"
              id="panel-tec"
              role="tabpanel"
              aria-labelledby="tab-tec"
            >
              <div className="phone-mockup" aria-hidden="true">
                <div className="phone-mockup__frame">
                  <div className="phone-mockup__notch"></div>
                  <div className="phone-mockup__screen">
                    <div className="app-screen">
                      <p className="tech-panel__header">Painel Arcanjo Técnico</p>
                      <p className="tech-panel__sub">Mapeamento de Vulnerabilidades — Recife</p>
                      {/* Caso ativo */}
                      <div className="diag-form">
                        <p className="diag-form__label">📍 Caso Ativo — Dona Maria, Ibura</p>
                        <span className="app-status-tag app-status-tag--waiting">
                          <AlertTriangle className="lucide" /> Risco Médio
                        </span>
                      </div>
                      {/* Diagnóstico */}
                      <div className="diag-form" style={{ marginBottom: "0.5rem" }}>
                        <p className="diag-form__label">Diagnóstico Estrutural</p>
                        <p className="diag-form__value">
                          Necessidade de impermeabilização e instalação de calha para desvio de água
                          pluvial da encosta.
                        </p>
                      </div>
                      {/* Missões */}
                      <div className="mission-item">
                        <strong>Missão 1 — Logística</strong>
                        Retirar 4 sacos de cimento no Armazém do Seu Zé e entregar no topo.
                      </div>
                      <div className="mission-item">
                        <strong>Missão 2 — Mão de obra</strong>
                        Aplicar camada impermeabilizante na base interna da parede.
                      </div>
                      <button
                        className="mission-done-btn"
                        style={{
                          background: "var(--clr-ocean)",
                          color: "var(--clr-gold)",
                          marginTop: "0.5rem",
                        }}
                      >
                        <Send className="lucide" /> Publicar na Rede Arcanjo
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="screen-info">
                <p className="screen-info__eyebrow">Tela 2 — Guardião Técnico</p>
                <h3 className="screen-info__title">Painel de Engenharia Social</h3>
                <p className="screen-info__desc">
                  Um painel profissional para análise de vulnerabilidades, diagnóstico estrutural e
                  criação de missões executáveis por qualquer voluntário.
                </p>
                <ul className="screen-info__features" role="list">
                  <li className="screen-feature">
                    <div className="screen-feature__icon" aria-hidden="true">
                      <Map className="lucide" />
                    </div>
                    <div>
                      <div className="screen-feature__title">Triagem por localização</div>
                      <div className="screen-feature__text">
                        Casos ordenados por bairro, gravidade e urgência.
                      </div>
                    </div>
                  </li>
                  <li className="screen-feature">
                    <div className="screen-feature__icon" aria-hidden="true">
                      <Clipboard className="lucide" />
                    </div>
                    <div>
                      <div className="screen-feature__title">Criação de missões simples</div>
                      <div className="screen-feature__text">
                        Traduz diagnóstico técnico em tarefas que leigos podem executar.
                      </div>
                    </div>
                  </li>
                  <li className="screen-feature">
                    <div className="screen-feature__icon" aria-hidden="true">
                      <BarChart3 className="lucide" />
                    </div>
                    <div>
                      <div className="screen-feature__title">Relatório de impacto</div>
                      <div className="screen-feature__text">
                        Acompanhe cada intervenção da abertura à conclusão.
                      </div>
                    </div>
                  </li>
                </ul>
                <button onClick={() => setActiveView("tecnico")} className="btn btn--primary">
                  Entrar como Técnico →
                </button>
              </div>
            </div>
          )}

          {/* PAINEL 3: Anjo sem Asa */}
          {activeTab === "anjo" && (
            <div
              className="screen-panel active animate-fade-in"
              id="panel-anjo"
              role="tabpanel"
              aria-labelledby="tab-anjo"
            >
              <div className="phone-mockup" aria-hidden="true">
                <div className="phone-mockup__frame">
                  <div className="phone-mockup__notch"></div>
                  <div className="phone-mockup__screen">
                    <div className="app-screen">
                      {/* Perfil gamificado */}
                      <div className="angel-profile">
                        <div className="angel-avatar">
                          <User className="lucide" />
                        </div>
                        <div>
                          <div className="angel-name">Carlos Silva</div>
                          <div className="angel-badge">
                            <Zap className="lucide" /> Anjo Nível 3
                          </div>
                        </div>
                      </div>
                      <p className="angel-hours">
                        <Zap className="lucide" /> 120 Horas Solidárias Acumuladas
                      </p>
                      {/* Feed de missão */}
                      <div className="mission-card-feed">
                        <div className="mission-card-feed__title">
                          Missão Logística: Última Milha
                        </div>
                        <div className="mission-card-feed__desc">
                          Transportar insumos do Armazém parceiro até a residência da Guardiã —
                          Ibura.
                        </div>
                        <span className="reward-tag">
                          <Star className="lucide" /> +5 Horas de Extensão FICR
                        </span>
                      </div>
                      {/* Mapa 2D */}
                      <div className="mini-map" aria-label="Mapa da rota da missão">
                        <div className="mini-map__label">
                          Atenção: acesso por escadaria. Use carrinho de mão.
                        </div>
                        <div className="mini-map__path"></div>
                      </div>
                      {/* Botão conclusão */}
                      <button className="mission-done-btn">
                        Missão Cumprida{" "}
                        <CheckCircle2
                          className="lucide"
                          style={{
                            display: "inline-block",
                            verticalAlign: "middle",
                            marginLeft: "4px",
                            width: "14px",
                            height: "14px",
                          }}
                        />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="screen-info">
                <p className="screen-info__eyebrow">Tela 3 — Anjo sem Asa</p>
                <h3 className="screen-info__title">O "Uber da Barreira" com Gamificação</h3>
                <p className="screen-info__desc">
                  Uma experiência que motiva e recompensa. O voluntário vê missões próximas, segue a
                  rota no mapa comunitário e acumula horas complementares e conquistas.
                </p>
                <ul className="screen-info__features" role="list">
                  <li className="screen-feature">
                    <div className="screen-feature__icon" aria-hidden="true">
                      <Map className="lucide" />
                    </div>
                    <div>
                      <div className="screen-feature__title">Mapa da última milha</div>
                      <div className="screen-feature__text">
                        Rota desenhada considerando escadarias e vielas do morro.
                      </div>
                    </div>
                  </li>
                  <li className="screen-feature">
                    <div className="screen-feature__icon" aria-hidden="true">
                      <Trophy className="lucide" />
                    </div>
                    <div>
                      <div className="screen-feature__title">Gamificação com propósito</div>
                      <div className="screen-feature__text">
                        Badges, níveis e horas complementares validadas pela FICR.
                      </div>
                    </div>
                  </li>
                  <li className="screen-feature">
                    <div className="screen-feature__icon" aria-hidden="true">
                      <Zap className="lucide" />
                    </div>
                    <div>
                      <div className="screen-feature__title">Feed de missões ao vivo</div>
                      <div className="screen-feature__text">
                        Veja missões disponíveis perto de você em tempo real.
                      </div>
                    </div>
                  </li>
                </ul>
                <button onClick={() => setActiveView("anjo")} className="btn btn--gold">
                  Virar um Anjo →
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ===== DEPOIMENTOS ===== */}
      <section className="section" id="depoimentos" aria-labelledby="dep-title">
        <div className="section__header section__header--center animate-on-scroll">
          <p className="section__eyebrow">Histórias reais</p>
          <h2 className="section__title" id="dep-title">
            A rede em ação
          </h2>
        </div>
        <div className="stories__grid">
          <article
            className="story-card animate-on-scroll"
            aria-label="Depoimento de Maria do Carmo"
          >
            <div className="story-card__stars" aria-label="5 estrelas">
              ★★★★★
            </div>
            <p className="story-card__text">
              "Tinha uma rachadura enorme na parede do meu quarto. Em dois dias, o técnico já tinha
              enviado o diagnóstico e o Anjo trouxe o cimento. Nunca pensei que uma coisa dessas
              seria possível."
            </p>
            <div className="story-card__author">
              <div
                className="story-card__avatar"
                aria-hidden="true"
                style={{ background: "rgba(230,126,34,0.15)", color: "#A04000", fontWeight: 700 }}
              >
                MC
              </div>
              <div>
                <div className="story-card__name">Maria do Carmo</div>
                <div className="story-card__role">Guardiã do Lar · Ibura, Recife</div>
              </div>
            </div>
          </article>
          <article
            className="story-card animate-on-scroll delay-1"
            aria-label="Depoimento de Carlos Eduardo"
          >
            <div className="story-card__stars" aria-label="5 estrelas">
              ★★★★★
            </div>
            <p className="story-card__text">
              "Como estudante de engenharia, sempre quis aplicar o que aprendo de forma real. Aqui
              eu analiso casos, crio planos e vejo a diferença acontecer. É a melhor extensão
              universitária que já vi."
            </p>
            <div className="story-card__author">
              <div
                className="story-card__avatar"
                aria-hidden="true"
                style={{
                  background: "rgba(30,58,95,0.1)",
                  color: "var(--clr-ocean)",
                  fontWeight: 700,
                }}
              >
                CE
              </div>
              <div>
                <div className="story-card__name">Carlos Eduardo</div>
                <div className="story-card__role">Guardião Técnico · FICR — Engenharia Civil</div>
              </div>
            </div>
          </article>
          <article
            className="story-card animate-on-scroll delay-2"
            aria-label="Depoimento de Fernanda Lima"
          >
            <div className="story-card__stars" aria-label="5 estrelas">
              ★★★★★
            </div>
            <p className="story-card__text">
              "Fiz 3 missões esse mês e já tenho 15 horas complementares na FICR. Mas o que mais me
              move é ver o sorriso das famílias quando a gente chega com os materiais. Isso não tem
              preço."
            </p>
            <div className="story-card__author">
              <div
                className="story-card__avatar"
                aria-hidden="true"
                style={{ background: "rgba(255,200,59,0.2)", color: "#7E5109", fontWeight: 700 }}
              >
                FL
              </div>
              <div>
                <div className="story-card__name">Fernanda Lima</div>
                <div className="story-card__role">Anjo sem Asa · Nível 4 · Peixinhos</div>
              </div>
            </div>
          </article>
        </div>
      </section>

      {/* ===== CTA FINAL ===== */}
      <section className="cta-band" id="cadastro" aria-labelledby="cta-title">
        <div className="cta-band__bg" aria-hidden="true"></div>
        <div className="cta-band__content">
          <h2 className="cta-band__title" id="cta-title">
            Pronto para ser
            <br />
            um Arcanjo?
          </h2>
          <p className="cta-band__subtitle">
            Junte-se a centenas de pessoas que já estão transformando suas comunidades. Cada gesto
            importa. Cada missão salva um lar.
          </p>
          <div className="cta-band__actions">
            <button
              onClick={() => setActiveView("signup")}
              className="btn btn--gold"
              aria-label="Preciso de ajuda — cadastrar como Guardião do Lar"
            >
              <Home className="lucide" /> Preciso de Ajuda
            </button>
            <button
              onClick={() => setActiveView("signup")}
              className="btn"
              style={{
                background: "rgba(255,255,255,0.12)",
                color: "#F8F9FA",
                border: "1.5px solid rgba(255,255,255,0.25)",
              }}
              aria-label="Quero ajudar — cadastrar como Anjo"
            >
              <Heart className="lucide" /> Quero Ajudar
            </button>
            <button
              onClick={() => setActiveView("signup")}
              className="btn"
              style={{
                background: "transparent",
                color: "rgba(248,249,250,0.7)",
                border: "1.5px solid rgba(255,255,255,0.15)",
              }}
              aria-label="Sou técnico — cadastrar como Guardião Técnico"
            >
              <Wrench className="lucide" /> Sou Técnico
            </button>
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="footer" role="contentinfo">
        <div className="footer__grid">
          <div>
            <a href="#" className="nav__logo" aria-label="Rede Arcanjo — Início">
              <img src={logoArcanjo} alt="Rede Arcanjo Logo" className="nav__logo-img" />
              Rede Arcanjo
            </a>
            <p className="footer__brand-desc">
              Uma plataforma solidária que conecta famílias vulneráveis, voluntários e especialistas
              técnicos para proteger lares e transformar comunidades em Recife e região.
            </p>
          </div>
          <div>
            <p className="footer__col-title">Plataforma</p>
            <ul className="footer__links" role="list">
              <li>
                <button
                  onClick={() => setActiveView("lar")}
                  className="footer__link bg-transparent text-left border-none p-0"
                >
                  Guardiões do Lar
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveView("anjo")}
                  className="footer__link bg-transparent text-left border-none p-0"
                >
                  Anjos sem Asa
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveView("tecnico")}
                  className="footer__link bg-transparent text-left border-none p-0"
                >
                  Guardiões Técnicos
                </button>
              </li>
              <li>
                <a href="#como-funciona" className="footer__link">
                  Como Funciona
                </a>
              </li>
            </ul>
          </div>
          <div>
            <p className="footer__col-title">Instituição</p>
            <ul className="footer__links" role="list">
              <li>
                <a href="#" className="footer__link">
                  Sobre o Projeto
                </a>
              </li>
              <li>
                <a href="#" className="footer__link">
                  FICR Parceria
                </a>
              </li>
              <li>
                <a href="#" className="footer__link">
                  Impacto Social
                </a>
              </li>
              <li>
                <a href="#" className="footer__link">
                  Imprensa
                </a>
              </li>
            </ul>
          </div>
          <div>
            <p className="footer__col-title">Legal</p>
            <ul className="footer__links" role="list">
              <li>
                <a href="#" className="footer__link">
                  Privacidade
                </a>
              </li>
              <li>
                <a href="#" className="footer__link">
                  Termos de Uso
                </a>
              </li>
              <li>
                <a href="#" className="footer__link">
                  Acessibilidade
                </a>
              </li>
              <li>
                <a href="#" className="footer__link">
                  LGPD
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer__bottom">
          <p className="footer__copy">
            © 2026 Rede Arcanjo. Feito com{" "}
            <Heart
              className="lucide"
              style={{
                fill: "#E6A800",
                color: "#E6A800",
                width: "12px",
                height: "12px",
                display: "inline-block",
                verticalAlign: "middle",
              }}
            />{" "}
            em Recife, PE.
          </p>
          <div className="footer__socials" aria-label="Redes sociais">
            <a href="#" className="footer__social" aria-label="Instagram">
              <Instagram className="lucide" />
            </a>
            <a href="#" className="footer__social" aria-label="LinkedIn">
              <Linkedin className="lucide" />
            </a>
            <a href="#" className="footer__social" aria-label="WhatsApp">
              <MessageSquare className="lucide" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
