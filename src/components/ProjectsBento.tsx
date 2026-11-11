import React, { useRef, useState } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { ExternalLink, FolderGit2, Layers, Sparkles } from 'lucide-react';
import { Locale, UI_LABELS } from '../data/profile';
import { PROJECTS_DATA, ProjectItem } from '../data/projects';

interface ProjectsBentoProps {
  locale: Locale;
}

const ProjectVisualPreview: React.FC<{ projectId: ProjectItem['id'] }> = ({
  projectId,
}) => {
  if (projectId === 'deliver-simulator') {
    return (
      <svg
        viewBox="0 0 560 180"
        className="h-full w-full text-folio-ink"
        role="img"
        aria-label="Deliver Simulator preview"
      >
        <defs>
          <linearGradient id="dsGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="var(--google-blue)" />
            <stop offset="50%" stopColor="var(--google-purple)" />
            <stop offset="100%" stopColor="var(--google-coral)" />
          </linearGradient>
        </defs>
        <rect
          x="12"
          y="16"
          width="536"
          height="148"
          rx="8"
          fill="var(--bg-surface)"
          stroke="var(--border-strong)"
          strokeWidth="1.5"
        />
        <text x="28" y="42" fontFamily="var(--font-mono)" fontSize="10" fontWeight="600" fill="var(--text-primary)">
          06:00 → 22:00 / MỤC TIÊU: 100M VND
        </text>
        <text x="412" y="42" fontFamily="var(--font-mono)" fontSize="10" fontWeight="600" fill="var(--text-secondary)">
          PWA OFFLINE
        </text>

        <text x="28" y="74" fontFamily="var(--font-mono)" fontSize="9.5" fill="currentColor">
          STAMINA
        </text>
        <rect x="92" y="64" width="120" height="12" rx="3" fill="var(--bg-elevated)" stroke="var(--border-strong)" strokeWidth="1" />
        <rect x="94" y="66" width="92" height="8" rx="2" fill="var(--google-green)" />

        <text x="28" y="100" fontFamily="var(--font-mono)" fontSize="9.5" fill="currentColor">
          SAVINGS
        </text>
        <rect x="92" y="90" width="120" height="12" rx="3" fill="var(--bg-elevated)" stroke="var(--border-strong)" strokeWidth="1" />
        <rect x="94" y="92" width="76" height="8" rx="2" fill="url(#dsGrad)" />

        <rect
          x="244"
          y="56"
          width="284"
          height="66"
          rx="6"
          fill="var(--bg-elevated)"
          stroke="url(#dsGrad)"
          strokeWidth="1.5"
        />
        <text x="258" y="78" fontFamily="var(--font-mono)" fontSize="10" fontWeight="600" fill="currentColor">
          HTML5 Canvas 2D + Web Audio API
        </text>
        <text x="258" y="98" fontFamily="var(--font-mono)" fontSize="9.5" fill="var(--text-secondary)">
          Python Bundler + Playwright Tests
        </text>

        <text x="28" y="142" fontFamily="var(--font-mono)" fontSize="9" fill="var(--text-secondary)">
          JavaScript · Python · GitHub Pages
        </text>
      </svg>
    );
  }

  if (projectId === 'snaptask-android') {
    return (
      <svg
        viewBox="0 0 360 210"
        className="h-full w-full text-folio-ink"
        role="img"
        aria-label="SnapTask Android preview"
      >
        <defs>
          <linearGradient id="stGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--google-blue)" />
            <stop offset="55%" stopColor="var(--google-purple)" />
            <stop offset="100%" stopColor="var(--google-coral)" />
          </linearGradient>
        </defs>
        <rect
          x="20"
          y="14"
          width="135"
          height="182"
          rx="14"
          fill="var(--bg-surface)"
          stroke="var(--border-strong)"
          strokeWidth="1.5"
        />
        <rect
          x="32"
          y="32"
          width="111"
          height="68"
          rx="8"
          fill="var(--bg-elevated)"
          stroke="url(#stGrad)"
          strokeWidth="1.5"
        />
        <circle cx="87.5" cy="66" r="16" fill="none" stroke="url(#stGrad)" strokeWidth="1.75" />
        <text x="42" y="118" fontFamily="var(--font-mono)" fontSize="9.5" fill="currentColor">
          CameraX Capture
        </text>
        <rect x="32" y="128" width="111" height="22" rx="5" fill="var(--bg-elevated)" />
        <text x="42" y="143" fontFamily="var(--font-mono)" fontSize="9" fill="var(--text-secondary)">
          Room SQLite DB
        </text>
        <text x="38" y="174" fontFamily="var(--font-mono)" fontSize="8.5" fill="var(--text-secondary)">
          Multi-ABI Split APK
        </text>

        <line x1="155" y1="68" x2="192" y2="68" stroke="var(--google-blue)" strokeWidth="1.5" />
        <line x1="155" y1="138" x2="192" y2="138" stroke="var(--google-green)" strokeWidth="1.5" />

        <rect
          x="192"
          y="28"
          width="150"
          height="74"
          rx="8"
          fill="var(--bg-surface)"
          stroke="var(--border-strong)"
          strokeWidth="1.5"
        />
        <text x="206" y="50" fontFamily="var(--font-mono)" fontSize="10" fontWeight="600" fill="var(--text-primary)">
          Jetpack Glance
        </text>
        <text x="206" y="68" fontFamily="var(--font-mono)" fontSize="9" fill="currentColor">
          Focus Widget
        </text>
        <text x="206" y="84" fontFamily="var(--font-mono)" fontSize="9" fill="currentColor">
          Task Stack Widget
        </text>

        <rect
          x="192"
          y="114"
          width="150"
          height="70"
          rx="8"
          fill="var(--bg-surface)"
          stroke="url(#stGrad)"
          strokeWidth="1.5"
        />
        <text x="206" y="136" fontFamily="var(--font-mono)" fontSize="10" fontWeight="600" fill="var(--text-primary)">
          Jetpack Compose
        </text>
        <text x="206" y="154" fontFamily="var(--font-mono)" fontSize="9" fill="currentColor">
          Material 3 UI
        </text>
        <text x="206" y="170" fontFamily="var(--font-mono)" fontSize="9" fill="var(--text-secondary)">
          Kotlin + Coroutines
        </text>
      </svg>
    );
  }

  if (projectId === 'mini-tms-project') {
    return (
      <svg
        viewBox="0 0 420 175"
        className="h-full w-full text-folio-ink"
        role="img"
        aria-label="TMS Mini preview"
      >
        <defs>
          <linearGradient id="tmsGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="var(--google-green)" />
            <stop offset="50%" stopColor="var(--google-blue)" />
            <stop offset="100%" stopColor="var(--google-purple)" />
          </linearGradient>
        </defs>
        <rect
          x="12"
          y="16"
          width="396"
          height="142"
          rx="8"
          fill="var(--bg-surface)"
          stroke="var(--border-strong)"
          strokeWidth="1.5"
        />
        <text x="28" y="38" fontFamily="var(--font-mono)" fontSize="10" fontWeight="600" fill="var(--text-primary)">
          TMS MINI v2.0 · FLEET DISPATCH
        </text>

        <rect x="28" y="52" width="120" height="88" rx="6" fill="var(--bg-elevated)" stroke="var(--border-strong)" strokeWidth="1" />
        <text x="38" y="72" fontFamily="var(--font-mono)" fontSize="9" fill="var(--text-primary)">
          DRIVING
        </text>
        <text x="38" y="90" fontFamily="var(--font-mono)" fontSize="9" fill="var(--text-secondary)">
          PAUSE / ISSUE
        </text>
        <text x="38" y="108" fontFamily="var(--font-mono)" fontSize="9" fill="currentColor">
          WAITING / DONE
        </text>
        <text x="38" y="128" fontFamily="var(--font-mono)" fontSize="8.5" fill="var(--text-secondary)">
          Driver &amp; Manager Role
        </text>

        <rect x="164" y="52" width="228" height="88" rx="6" fill="var(--bg-elevated)" stroke="url(#tmsGrad)" strokeWidth="1.4" />
        <path
          d="M 184 122 C 224 72, 294 128, 368 68"
          fill="none"
          stroke="url(#tmsGrad)"
          strokeWidth="2.2"
          strokeDasharray="4 3"
        />
        <circle cx="184" cy="122" r="4" fill="var(--google-green)" />
        <circle cx="368" cy="68" r="4" fill="var(--google-coral)" />
        <text x="178" y="72" fontFamily="var(--font-mono)" fontSize="9" fill="currentColor">
          Leaflet Interactive Route Map
        </text>
      </svg>
    );
  }

  if (projectId === 'agent-mesh') {
    return (
      <svg
        viewBox="0 0 560 180"
        className="h-full w-full text-folio-ink"
        role="img"
        aria-label="AgentMesh Swarm Visualizer preview"
      >
        <defs>
          <linearGradient id="amGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="var(--google-blue)" />
            <stop offset="50%" stopColor="var(--google-purple)" />
            <stop offset="100%" stopColor="var(--google-coral)" />
          </linearGradient>
        </defs>
        <rect
          x="12"
          y="16"
          width="536"
          height="148"
          rx="8"
          fill="var(--bg-surface)"
          stroke="var(--border-strong)"
          strokeWidth="1.5"
        />
        <rect x="28" y="34" width="132" height="112" rx="6" fill="var(--bg-elevated)" stroke="var(--border-strong)" strokeWidth="1" />
        <text x="38" y="54" fontFamily="var(--font-mono)" fontSize="9.5" fontWeight="600" fill="var(--text-primary)">
          EVENT STREAM
        </text>
        <text x="38" y="74" fontFamily="var(--font-mono)" fontSize="8.5" fill="currentColor">
          AGENT_SPAWN
        </text>
        <text x="38" y="92" fontFamily="var(--font-mono)" fontSize="8.5" fill="var(--text-secondary)">
          TOOL_CALL
        </text>
        <text x="38" y="110" fontFamily="var(--font-mono)" fontSize="8.5" fill="currentColor">
          SUBAGENT_MSG
        </text>
        <text x="38" y="128" fontFamily="var(--font-mono)" fontSize="8.5" fill="var(--text-secondary)">
          APPROVAL_GATE
        </text>

        <rect x="196" y="42" width="110" height="38" rx="6" fill="var(--bg-elevated)" stroke="url(#amGrad)" strokeWidth="1.6" />
        <text x="210" y="65" fontFamily="var(--font-mono)" fontSize="9.5" fontWeight="600" fill="currentColor">
          ORCHESTRATOR
        </text>

        <line x1="251" y1="80" x2="215" y2="110" stroke="var(--google-blue)" strokeWidth="1.5" />
        <line x1="251" y1="80" x2="295" y2="110" stroke="var(--google-purple)" strokeWidth="1.5" />

        <rect x="176" y="110" width="84" height="32" rx="5" fill="var(--bg-elevated)" stroke="var(--border-strong)" strokeWidth="1.2" />
        <text x="192" y="130" fontFamily="var(--font-mono)" fontSize="9" fill="currentColor">
          WORKER
        </text>

        <rect x="272" y="110" width="84" height="32" rx="5" fill="var(--bg-elevated)" stroke="var(--border-strong)" strokeWidth="1.2" />
        <text x="290" y="130" fontFamily="var(--font-mono)" fontSize="9" fill="currentColor">
          CRITIC
        </text>

        <rect x="388" y="34" width="144" height="112" rx="6" fill="var(--bg-elevated)" stroke="url(#amGrad)" strokeWidth="1.2" />
        <text x="400" y="54" fontFamily="var(--font-mono)" fontSize="9.5" fontWeight="600" fill="var(--text-primary)">
          CONTEXT GAUGE
        </text>
        <rect x="400" y="68" width="118" height="10" rx="3" fill="var(--bg-surface)" stroke="var(--border-strong)" strokeWidth="1" />
        <rect x="402" y="70" width="82" height="6" rx="2" fill="url(#amGrad)" />
        <text x="400" y="102" fontFamily="var(--font-mono)" fontSize="8.5" fill="var(--text-secondary)">
          HTML5 Canvas + PWA
        </text>
        <text x="400" y="122" fontFamily="var(--font-mono)" fontSize="8.5" fill="var(--text-secondary)">
          Playwright Verified
        </text>
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 560 180"
      className="h-full w-full text-folio-ink"
      role="img"
      aria-label="Marginal preview"
    >
      <defs>
        <linearGradient id="mgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="var(--google-blue)" />
          <stop offset="50%" stopColor="var(--google-purple)" />
          <stop offset="100%" stopColor="var(--google-coral)" />
        </linearGradient>
      </defs>
      <rect
        x="12"
        y="22"
        width="165"
        height="136"
        rx="8"
        fill="var(--bg-surface)"
        stroke="var(--border-strong)"
        strokeWidth="1.5"
      />
      <text x="26" y="46" fontFamily="var(--font-mono)" fontSize="10" fill="var(--text-primary)">
        ArticleReader.jsx
      </text>
      <line x1="26" y1="62" x2="155" y2="62" stroke="currentColor" strokeWidth="2" />
      <line x1="26" y1="78" x2="140" y2="78" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.6" />
      <rect x="26" y="92" width="135" height="24" rx="4" fill="var(--bg-elevated)" stroke="url(#mgGrad)" strokeWidth="1.2" />
      <text x="34" y="108" fontFamily="var(--font-mono)" fontSize="9.5" fill="currentColor">
        Web Speech API
      </text>
      <text x="26" y="138" fontFamily="var(--font-mono)" fontSize="9" fill="var(--text-secondary)">
        React + Tailwind CSS
      </text>

      <line
        x1="177"
        y1="90"
        x2="228"
        y2="90"
        stroke="var(--google-blue)"
        strokeWidth="1.5"
        strokeDasharray="4 4"
      />
      <circle cx="202" cy="90" r="4" fill="var(--google-blue)" />

      <rect
        x="228"
        y="32"
        width="148"
        height="116"
        rx="8"
        fill="var(--bg-surface)"
        stroke="url(#mgGrad)"
        strokeWidth="1.75"
      />
      <text x="242" y="56" fontFamily="var(--font-mono)" fontSize="10" fontWeight="600" fill="currentColor">
        Cloudflare Worker
      </text>
      <text x="242" y="78" fontFamily="var(--font-mono)" fontSize="9.5" fill="var(--text-secondary)">
        Durable Object:
      </text>
      <text x="242" y="94" fontFamily="var(--font-mono)" fontSize="10" fill="var(--text-primary)">
        GeminiProxy
      </text>
      <text x="242" y="118" fontFamily="var(--font-mono)" fontSize="9" fill="var(--text-secondary)">
        CORS + API Key Proxy
      </text>

      <line
        x1="376"
        y1="90"
        x2="418"
        y2="90"
        stroke="var(--google-purple)"
        strokeWidth="1.5"
        strokeDasharray="4 4"
      />
      <circle cx="397" cy="90" r="4" fill="var(--google-purple)" />

      <rect
        x="418"
        y="40"
        width="130"
        height="100"
        rx="8"
        fill="var(--bg-surface)"
        stroke="var(--border-strong)"
        strokeWidth="1.5"
      />
      <text x="432" y="68" fontFamily="var(--font-mono)" fontSize="10" fontWeight="600" fill="var(--text-primary)">
        GEMINI API
      </text>
      <text x="432" y="88" fontFamily="var(--font-mono)" fontSize="9.5" fill="currentColor">
        Context Translate
      </text>
      <text x="432" y="106" fontFamily="var(--font-mono)" fontSize="9.5" fill="currentColor">
        Writing Grammar
      </text>
    </svg>
  );
};

interface TiltProjectCardProps {
  project: ProjectItem;
  locale: Locale;
  idx: number;
  isFullWidth: boolean;
  gridSpanClass: string;
}

const TiltProjectCard: React.FC<TiltProjectCardProps> = ({
  project,
  locale,
  idx,
  isFullWidth,
  gridSpanClass,
}) => {
  const shouldReduceMotion = useReducedMotion();
  const outerRef = useRef<HTMLDivElement | null>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [spotlight, setSpotlight] = useState({ x: 150, y: 150 });
  const [isHovered, setIsHovered] = useState(false);
  const t = UI_LABELS[locale].projects;

  const { scrollYProgress } = useScroll({
    target: outerRef,
    offset: ['start end', 'end start'],
  });
  const isEvenSlot = idx % 2 === 1;
  const parallaxY = useTransform(
    scrollYProgress,
    [0, 1],
    isEvenSlot ? [20, -16] : [8, -8]
  );

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (shouldReduceMotion || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const normX = (x / rect.width - 0.5) * 2;
    const normY = (y / rect.height - 0.5) * 2;
    setRotation({
      x: -normY * 6.5,
      y: normX * 6.5,
    });
    setSpotlight({ x, y });
  };

  const handleMouseEnter = () => {
    if (!shouldReduceMotion) setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotation({ x: 0, y: 0 });
  };

  return (
    <div ref={outerRef} className={gridSpanClass}>
      <motion.div style={{ y: shouldReduceMotion ? 0 : parallaxY }}>
        <motion.article
          id={`project-${project.id}`}
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5, delay: idx * 0.06, ease: [0.22, 1, 0.36, 1] }}
          className="perspective-1000 scroll-mt-24"
        >
          <div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={{
              transform:
                isHovered && !shouldReduceMotion
                  ? `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) scale3d(1.012, 1.012, 1.012)`
                  : 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
              transition: isHovered
                ? 'transform 90ms ease-out, background-color 360ms ease, box-shadow 300ms ease, border-color 300ms ease'
                : 'transform 450ms cubic-bezier(0.22, 1, 0.36, 1), background-color 360ms ease, box-shadow 300ms ease, border-color 300ms ease',
            }}
            className="google-gradient-hover-border group relative flex h-full flex-col justify-between overflow-hidden rounded-[var(--radius-card)] border border-folio-border bg-folio-surface p-6 shadow-[var(--shadow-soft)] backdrop-blur-xl hover:border-transparent hover:shadow-[var(--shadow-glow)] sm:p-7"
          >
            <span
              aria-hidden="true"
              className="editorial-watermark absolute -right-2 -top-4 z-0 text-[7.5rem] sm:text-[9.5rem] lg:text-[10.5rem]"
            >
              {project.indexNumber}
            </span>

            <div
              className="pointer-events-none absolute -inset-px rounded-[var(--radius-card)] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              style={{
                background: `radial-gradient(460px circle at ${spotlight.x}px ${spotlight.y}px, var(--spotlight-blue), var(--spotlight-purple) 40%, transparent 70%)`,
              }}
              aria-hidden="true"
            />

            <div
              className={
                isFullWidth
                  ? 'relative z-10 grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-center'
                  : 'relative z-10'
              }
            >
              <div className={isFullWidth ? 'lg:col-span-6' : ''}>
                <div className="flex items-center justify-between gap-2 border-b border-folio-border pb-3">
                  <span className="font-mono text-xs font-bold text-folio-ink">
                    {project.indexNumber}
                  </span>
                  <span className="font-mono text-[11px] font-semibold text-folio-muted">
                    {project.technologies[0]?.name}
                  </span>
                </div>

                <div className="mt-4">
                  <h3 className="font-serif text-2xl font-bold leading-snug text-folio-ink sm:text-3xl">
                    {project.title}
                  </h3>
                  <p className="mt-1 font-serif text-sm italic text-folio-muted lg:min-h-[2.5rem]">
                    {project.subtitle[locale]}
                  </p>
                </div>

                {!isFullWidth && (
                  <div className="folio-card-inner my-4 h-44 w-full overflow-hidden !bg-folio-bg/70 p-2 shadow-inner">
                    <ProjectVisualPreview projectId={project.id} />
                  </div>
                )}

                <p className="text-sm leading-relaxed text-folio-muted sm:text-base">
                  {project.description[locale]}
                </p>
              </div>

              {isFullWidth && (
                <div className="folio-card-inner h-48 w-full overflow-hidden !bg-folio-bg/70 p-3 shadow-inner lg:col-span-6">
                  <ProjectVisualPreview projectId={project.id} />
                </div>
              )}
            </div>

            <div className="relative z-10 mt-6">
              <div className="mb-2 flex items-center gap-1.5 font-mono text-[11px] font-semibold text-folio-muted">
                <Layers className="h-3.5 w-3.5" aria-hidden="true" />
                <span>{t.techLabel}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span key={tech.name} className="folio-chip">
                    {tech.name}
                  </span>
                ))}
              </div>

              <div className="mt-5 flex items-center justify-between gap-3 border-t border-folio-border pt-4">
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-w-0 flex-1 truncate font-mono text-xs text-folio-ink underline transition-colors hover:text-folio-muted"
                >
                  {project.repoUrl}
                </a>

                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="google-btn-github group/btn shrink-0"
                >
                  <FolderGit2 className="relative z-10 h-3.5 w-3.5 text-folio-ink transition-colors group-hover/btn:text-white" aria-hidden="true" />
                  <span className="google-btn-github-label">{t.repoLabel}</span>
                  <ExternalLink className="relative z-10 h-3 w-3 text-folio-ink transition-all duration-200 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 group-hover/btn:text-white" aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>
        </motion.article>
      </motion.div>
    </div>
  );
};

export const ProjectsBento: React.FC<ProjectsBentoProps> = ({ locale }) => {
  const t = UI_LABELS[locale].projects;

  const getGridSpanClass = (idx: number) => {
    if (idx === 0) return 'lg:col-start-1 lg:col-span-6';
    if (idx === 1) return 'lg:col-start-7 lg:col-span-6 lg:mt-16';
    if (idx === 2) return 'lg:col-start-1 lg:col-span-6';
    if (idx === 3) return 'lg:col-start-7 lg:col-span-6 lg:mt-16';
    return 'lg:col-start-1 lg:col-span-8';
  };

  return (
    <section
      id="projects"
      className="folio-section"
      aria-labelledby="projects-heading"
    >
      <div className="folio-container">
        <div className="folio-section-header grid grid-cols-1 gap-4 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <div className="flex items-center gap-2 font-mono text-xs font-semibold text-folio-muted">
              <Sparkles className="h-3.5 w-3.5 text-folio-muted" aria-hidden="true" />
              <span className="folio-index-label">{t.sectionIndex}</span>
            </div>
            <h2 id="projects-heading" className="folio-section-heading">
              {t.heading}
            </h2>
          </div>
          <p className="text-base leading-relaxed text-folio-muted lg:col-span-5">
            {t.subheading}
          </p>
        </div>

        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12 lg:gap-x-10 lg:gap-y-10">
          {PROJECTS_DATA.map((project, idx) => (
            <TiltProjectCard
              key={project.id}
              project={project}
              locale={locale}
              idx={idx}
              isFullWidth={idx === 4}
              gridSpanClass={getGridSpanClass(idx)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
