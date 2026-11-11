import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ExternalLink, FolderGit2, Layers } from 'lucide-react';
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
        <rect
          x="12"
          y="16"
          width="536"
          height="148"
          rx="4"
          fill="var(--bg-surface)"
          stroke="currentColor"
          strokeWidth="1.75"
        />
        <text x="28" y="42" fontFamily="var(--font-mono)" fontSize="10" fontWeight="600" fill="var(--accent-primary)">
          06:00 → 22:00 / MỤC TIÊU: 100M VND
        </text>
        <text x="412" y="42" fontFamily="var(--font-mono)" fontSize="10" fill="var(--accent-secondary)">
          PWA OFFLINE
        </text>

        <text x="28" y="74" fontFamily="var(--font-mono)" fontSize="9.5" fill="currentColor">
          STAMINA
        </text>
        <rect x="92" y="64" width="120" height="12" fill="var(--bg-elevated)" stroke="currentColor" strokeWidth="1" />
        <rect x="94" y="66" width="92" height="8" fill="var(--accent-secondary)" />

        <text x="28" y="100" fontFamily="var(--font-mono)" fontSize="9.5" fill="currentColor">
          SAVINGS
        </text>
        <rect x="92" y="90" width="120" height="12" fill="var(--bg-elevated)" stroke="currentColor" strokeWidth="1" />
        <rect x="94" y="92" width="76" height="8" fill="var(--accent-primary)" />

        <rect
          x="244"
          y="56"
          width="284"
          height="66"
          rx="3"
          fill="var(--bg-elevated)"
          stroke="var(--accent-primary)"
          strokeWidth="1.25"
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
        <rect
          x="20"
          y="14"
          width="135"
          height="182"
          rx="10"
          fill="var(--bg-surface)"
          stroke="currentColor"
          strokeWidth="1.75"
        />
        <rect
          x="32"
          y="32"
          width="111"
          height="68"
          rx="4"
          fill="var(--bg-elevated)"
          stroke="var(--accent-primary)"
          strokeWidth="1.5"
        />
        <circle cx="87.5" cy="66" r="16" fill="none" stroke="var(--accent-primary)" strokeWidth="1.5" />
        <text x="42" y="118" fontFamily="var(--font-mono)" fontSize="9.5" fill="currentColor">
          CameraX Capture
        </text>
        <rect x="32" y="128" width="111" height="22" rx="3" fill="var(--bg-elevated)" />
        <text x="42" y="143" fontFamily="var(--font-mono)" fontSize="9" fill="var(--accent-secondary)">
          Room SQLite DB
        </text>
        <text x="38" y="174" fontFamily="var(--font-mono)" fontSize="8.5" fill="var(--text-secondary)">
          Multi-ABI Split APK
        </text>

        <line x1="155" y1="68" x2="192" y2="68" stroke="var(--accent-primary)" strokeWidth="1.5" />
        <line x1="155" y1="138" x2="192" y2="138" stroke="var(--accent-secondary)" strokeWidth="1.5" />

        <rect
          x="192"
          y="28"
          width="150"
          height="74"
          rx="6"
          fill="var(--bg-surface)"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <text x="206" y="50" fontFamily="var(--font-mono)" fontSize="10" fontWeight="600" fill="var(--accent-primary)">
          Jetpack Glance
        </text>
        <text x="206" y="68" fontFamily="var(--font-mono)" fontSize="9" fill="currentColor">
          • Focus Widget
        </text>
        <text x="206" y="84" fontFamily="var(--font-mono)" fontSize="9" fill="currentColor">
          • Task Stack Widget
        </text>

        <rect
          x="192"
          y="114"
          width="150"
          height="70"
          rx="6"
          fill="var(--bg-surface)"
          stroke="var(--accent-secondary)"
          strokeWidth="1.5"
        />
        <text x="206" y="136" fontFamily="var(--font-mono)" fontSize="10" fontWeight="600" fill="var(--accent-secondary)">
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
        <rect
          x="12"
          y="16"
          width="396"
          height="142"
          rx="6"
          fill="var(--bg-surface)"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <text x="28" y="38" fontFamily="var(--font-mono)" fontSize="10" fontWeight="600" fill="var(--accent-primary)">
          TMS MINI v2.0 · FLEET DISPATCH
        </text>

        <rect x="28" y="52" width="120" height="88" rx="4" fill="var(--bg-elevated)" stroke="currentColor" strokeWidth="1" />
        <text x="38" y="72" fontFamily="var(--font-mono)" fontSize="9" fill="var(--accent-secondary)">
          ● DRIVING
        </text>
        <text x="38" y="90" fontFamily="var(--font-mono)" fontSize="9" fill="var(--accent-primary)">
          ● PAUSE / ISSUE
        </text>
        <text x="38" y="108" fontFamily="var(--font-mono)" fontSize="9" fill="currentColor">
          ● WAITING / DONE
        </text>
        <text x="38" y="128" fontFamily="var(--font-mono)" fontSize="8.5" fill="var(--text-secondary)">
          Driver &amp; Manager Role
        </text>

        <rect x="164" y="52" width="228" height="88" rx="4" fill="var(--bg-elevated)" stroke="var(--accent-secondary)" strokeWidth="1.25" />
        <path
          d="M 184 122 C 224 72, 294 128, 368 68"
          fill="none"
          stroke="var(--accent-primary)"
          strokeWidth="2"
          strokeDasharray="4 3"
        />
        <circle cx="184" cy="122" r="4" fill="var(--accent-secondary)" />
        <circle cx="368" cy="68" r="4" fill="var(--accent-primary)" />
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
        <rect
          x="12"
          y="16"
          width="536"
          height="148"
          rx="4"
          fill="var(--bg-surface)"
          stroke="currentColor"
          strokeWidth="1.75"
        />
        <rect x="28" y="34" width="132" height="112" rx="3" fill="var(--bg-elevated)" stroke="currentColor" strokeWidth="1" />
        <text x="38" y="54" fontFamily="var(--font-mono)" fontSize="9.5" fontWeight="600" fill="var(--accent-primary)">
          EVENT STREAM
        </text>
        <text x="38" y="74" fontFamily="var(--font-mono)" fontSize="8.5" fill="currentColor">
          AGENT_SPAWN
        </text>
        <text x="38" y="92" fontFamily="var(--font-mono)" fontSize="8.5" fill="var(--accent-secondary)">
          TOOL_CALL
        </text>
        <text x="38" y="110" fontFamily="var(--font-mono)" fontSize="8.5" fill="currentColor">
          SUBAGENT_MSG
        </text>
        <text x="38" y="128" fontFamily="var(--font-mono)" fontSize="8.5" fill="var(--accent-primary)">
          APPROVAL_GATE
        </text>

        <rect x="196" y="42" width="110" height="38" rx="2" fill="var(--bg-elevated)" stroke="var(--accent-primary)" strokeWidth="1.5" />
        <text x="210" y="65" fontFamily="var(--font-mono)" fontSize="9.5" fontWeight="600" fill="currentColor">
          ORCHESTRATOR
        </text>

        <line x1="251" y1="80" x2="215" y2="110" stroke="var(--accent-secondary)" strokeWidth="1.5" />
        <line x1="251" y1="80" x2="295" y2="110" stroke="var(--accent-primary)" strokeWidth="1.5" />

        <rect x="176" y="110" width="84" height="32" rx="2" fill="var(--bg-elevated)" stroke="currentColor" strokeWidth="1.2" />
        <text x="192" y="130" fontFamily="var(--font-mono)" fontSize="9" fill="currentColor">
          WORKER
        </text>

        <rect x="272" y="110" width="84" height="32" rx="2" fill="var(--bg-elevated)" stroke="currentColor" strokeWidth="1.2" />
        <text x="290" y="130" fontFamily="var(--font-mono)" fontSize="9" fill="currentColor">
          CRITIC
        </text>

        <rect x="388" y="34" width="144" height="112" rx="3" fill="var(--bg-elevated)" stroke="var(--accent-secondary)" strokeWidth="1.2" />
        <text x="400" y="54" fontFamily="var(--font-mono)" fontSize="9.5" fontWeight="600" fill="var(--accent-secondary)">
          CONTEXT GAUGE
        </text>
        <rect x="400" y="68" width="118" height="10" fill="var(--bg-surface)" stroke="currentColor" strokeWidth="1" />
        <rect x="402" y="70" width="82" height="6" fill="var(--accent-primary)" />
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
      <rect
        x="12"
        y="22"
        width="165"
        height="136"
        rx="4"
        fill="var(--bg-surface)"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <text x="26" y="46" fontFamily="var(--font-mono)" fontSize="10" fill="var(--accent-primary)">
        ArticleReader.jsx
      </text>
      <line x1="26" y1="62" x2="155" y2="62" stroke="currentColor" strokeWidth="2" />
      <line x1="26" y1="78" x2="140" y2="78" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.6" />
      <rect x="26" y="92" width="135" height="24" rx="2" fill="var(--bg-elevated)" stroke="var(--accent-primary)" strokeWidth="1" />
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
        stroke="var(--accent-primary)"
        strokeWidth="1.5"
        strokeDasharray="4 4"
      />
      <circle cx="202" cy="90" r="4" fill="var(--accent-primary)" />

      <rect
        x="228"
        y="32"
        width="148"
        height="116"
        rx="4"
        fill="var(--bg-surface)"
        stroke="var(--accent-primary)"
        strokeWidth="1.75"
      />
      <text x="242" y="56" fontFamily="var(--font-mono)" fontSize="10" fontWeight="600" fill="currentColor">
        Cloudflare Worker
      </text>
      <text x="242" y="78" fontFamily="var(--font-mono)" fontSize="9.5" fill="var(--text-secondary)">
        Durable Object:
      </text>
      <text x="242" y="94" fontFamily="var(--font-mono)" fontSize="10" fill="var(--accent-secondary)">
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
        stroke="var(--accent-secondary)"
        strokeWidth="1.5"
        strokeDasharray="4 4"
      />
      <circle cx="397" cy="90" r="4" fill="var(--accent-secondary)" />

      <rect
        x="418"
        y="40"
        width="130"
        height="100"
        rx="4"
        fill="var(--bg-surface)"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <text x="432" y="68" fontFamily="var(--font-mono)" fontSize="10" fontWeight="600" fill="var(--accent-secondary)">
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

export const ProjectsBento: React.FC<ProjectsBentoProps> = ({ locale }) => {
  const shouldReduceMotion = useReducedMotion();
  const t = UI_LABELS[locale].projects;

  const getGridSpanClass = (idx: number) => {
    if (idx === 0) return 'lg:col-span-7';
    if (idx === 1) return 'lg:col-span-5';
    if (idx === 2) return 'lg:col-span-5';
    if (idx === 3) return 'lg:col-span-7';
    return 'lg:col-span-12';
  };

  return (
    <section
      id="projects"
      className="folio-section"
      aria-labelledby="projects-heading"
    >
      <div className="folio-container">
        <div className="folio-section-header">
          <span className="folio-index-label">{t.sectionIndex}</span>
          <h2 id="projects-heading" className="folio-section-heading">
            {t.heading}
          </h2>
          <p className="mt-3 max-w-2xl text-base text-folio-muted">
            {t.subheading}
          </p>
        </div>

        <div className="grid grid-cols-1 items-stretch gap-6 lg:grid-cols-12">
          {PROJECTS_DATA.map((project, idx) => {
            const isFullWidth = idx === 4;

            return (
              <motion.article
                key={project.id}
                id={`project-${project.id}`}
                initial={
                  shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 18 }
                }
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.45, delay: idx * 0.05 }}
                className={`folio-card group flex h-full flex-col justify-between transition-transform duration-200 hover:-translate-y-1 ${getGridSpanClass(
                  idx
                )}`}
              >
                <div
                  className={
                    isFullWidth
                      ? 'grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-center'
                      : ''
                  }
                >
                  <div className={isFullWidth ? 'lg:col-span-6' : ''}>
                    <div className="flex items-center justify-between gap-2 border-b border-folio-border pb-3">
                      <span className="font-mono text-xs font-bold text-folio-vermilion">
                        {project.indexNumber}
                      </span>
                      <span className="font-mono text-[11px] text-folio-spruce">
                        {project.technologies[0]?.name}
                      </span>
                    </div>

                    <div className="mt-4">
                      <h3 className="font-serif text-2xl font-bold leading-snug text-folio-ink group-hover:text-folio-vermilion sm:text-3xl">
                        {project.title}
                      </h3>
                      <p className="mt-1 font-serif text-sm italic text-folio-muted lg:min-h-[2.5rem]">
                        {project.subtitle[locale]}
                      </p>
                    </div>

                    {!isFullWidth && (
                      <div className="folio-card-inner my-4 h-44 w-full overflow-hidden !bg-folio-bg p-2">
                        <ProjectVisualPreview projectId={project.id} />
                      </div>
                    )}

                    <p className="text-sm leading-relaxed text-folio-ink sm:text-base">
                      {project.description[locale]}
                    </p>
                  </div>

                  {isFullWidth && (
                    <div className="folio-card-inner h-48 w-full overflow-hidden !bg-folio-bg p-3 lg:col-span-6">
                      <ProjectVisualPreview projectId={project.id} />
                    </div>
                  )}
                </div>

                <div className="mt-6">
                  <div className="mb-2 flex items-center gap-1.5 font-mono text-[11px] font-semibold text-folio-spruce">
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
                      className="min-w-0 flex-1 truncate font-mono text-xs text-folio-spruce underline hover:text-folio-vermilion"
                    >
                      {project.repoUrl}
                    </a>

                    <a
                      href={project.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="folio-btn-compact shrink-0"
                    >
                      <FolderGit2 className="h-3.5 w-3.5" aria-hidden="true" />
                      <span>{t.repoLabel}</span>
                      <ExternalLink className="h-3 w-3" aria-hidden="true" />
                    </a>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
