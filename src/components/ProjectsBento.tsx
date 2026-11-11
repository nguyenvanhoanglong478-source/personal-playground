import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ExternalLink, FileCheck2, FolderGit2, Layers } from 'lucide-react';
import { Locale, UI_LABELS } from '../data/profile';
import { PROJECTS_DATA, ProjectItem } from '../data/projects';

interface ProjectsBentoProps {
  locale: Locale;
}

/**
 * Mỗi dự án có một hình minh họa sơ đồ vector SVG riêng biệt phản ánh đúng kiến trúc mã nguồn thật (Mục 5 & 6.3).
 */
const ProjectVisualPreview: React.FC<{ projectId: ProjectItem['id'] }> = ({
  projectId,
}) => {
  if (projectId === 'marginal') {
    return (
      <svg
        viewBox="0 0 560 180"
        className="h-full w-full text-folio-ink"
        role="img"
        aria-label="Marginal Architecture: Article Reader, Cloudflare Worker Proxy, Gemini 2.5 Flash & Web Speech API"
      >
        <rect
          x="12"
          y="22"
          width="165"
          height="136"
          rx="4"
          fill="var(--bg-elevated)"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <text x="26" y="46" fontFamily="var(--font-mono)" fontSize="10" fill="var(--accent-primary)">
          ArticleReader.jsx
        </text>
        <line x1="26" y1="62" x2="155" y2="62" stroke="currentColor" strokeWidth="2" />
        <line x1="26" y1="78" x2="140" y2="78" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.6" />
        <rect x="26" y="92" width="135" height="24" rx="2" fill="var(--bg-surface)" stroke="var(--accent-primary)" strokeWidth="1" />
        <text x="34" y="108" fontFamily="var(--font-mono)" fontSize="9.5" fill="currentColor">
          Web Speech STT/TTS
        </text>
        <text x="26" y="138" fontFamily="var(--font-mono)" fontSize="9" fill="var(--text-secondary)">
          React 18 + Tailwind
        </text>

        {/* Connector 1 */}
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

        {/* Middle: Cloudflare Worker + Durable Object */}
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
          worker/src/index.js
        </text>
        <text x="242" y="76" fontFamily="var(--font-mono)" fontSize="9.5" fill="var(--text-secondary)">
          Durable Object:
        </text>
        <text x="242" y="92" fontFamily="var(--font-mono)" fontSize="10" fill="var(--accent-secondary)">
          GeminiProxy (SQLite)
        </text>
        <text x="242" y="114" fontFamily="var(--font-mono)" fontSize="9" fill="var(--text-secondary)">
          CORS Bypass + Key Hide
        </text>

        {/* Connector 2 */}
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

        {/* Right: Gemini 2.5 Flash */}
        <rect
          x="418"
          y="40"
          width="130"
          height="100"
          rx="4"
          fill="var(--bg-elevated)"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <text x="432" y="68" fontFamily="var(--font-mono)" fontSize="10" fontWeight="600" fill="var(--accent-secondary)">
          GEMINI 2.5 FLASH
        </text>
        <text x="432" y="88" fontFamily="var(--font-mono)" fontSize="9.5" fill="currentColor">
          Context Translate
        </text>
        <text x="432" y="106" fontFamily="var(--font-mono)" fontSize="9.5" fill="currentColor">
          Writing Grammar
        </text>
      </svg>
    );
  }

  if (projectId === 'snaptask') {
    return (
      <svg
        viewBox="0 0 360 210"
        className="h-full w-full text-folio-ink"
        role="img"
        aria-label="SnapTask Android Architecture: CameraX, Jetpack Compose, Room DB & Glance Widgets"
      >
        {/* Phone Frame */}
        <rect
          x="20"
          y="14"
          width="135"
          height="182"
          rx="12"
          fill="var(--bg-elevated)"
          stroke="currentColor"
          strokeWidth="1.75"
        />
        <rect
          x="32"
          y="32"
          width="111"
          height="68"
          rx="4"
          fill="var(--bg-surface)"
          stroke="var(--accent-primary)"
          strokeWidth="1.5"
        />
        <circle cx="87.5" cy="66" r="16" fill="none" stroke="var(--accent-primary)" strokeWidth="1.5" />
        <text x="42" y="118" fontFamily="var(--font-mono)" fontSize="9.5" fill="currentColor">
          CameraX 1.3.2
        </text>
        <rect x="32" y="128" width="111" height="22" rx="3" fill="var(--bg-surface)" />
        <text x="40" y="143" fontFamily="var(--font-mono)" fontSize="9" fill="var(--accent-secondary)">
          Room DB (Schema v3)
        </text>
        <text x="36" y="174" fontFamily="var(--font-mono)" fontSize="8.5" fill="var(--text-secondary)">
          APK ~10MB (ABI Split)
        </text>

        {/* Right Side: Glance Widgets Stack */}
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
          Jetpack Glance 1.0
        </text>
        <text x="206" y="68" fontFamily="var(--font-mono)" fontSize="9" fill="currentColor">
          • Locket Focus Widget
        </text>
        <text x="206" y="84" fontFamily="var(--font-mono)" fontSize="9" fill="currentColor">
          • Notion Stack Widget
        </text>

        <rect
          x="192"
          y="114"
          width="150"
          height="70"
          rx="6"
          fill="var(--bg-elevated)"
          stroke="var(--accent-secondary)"
          strokeWidth="1.5"
        />
        <text x="206" y="136" fontFamily="var(--font-mono)" fontSize="10" fontWeight="600" fill="var(--accent-secondary)">
          Compose Material 3
        </text>
        <text x="206" y="154" fontFamily="var(--font-mono)" fontSize="9" fill="currentColor">
          Board + Calendar + Coil
        </text>
        <text x="206" y="170" fontFamily="var(--font-mono)" fontSize="9" fill="var(--text-secondary)">
          Kotlin 1.9.22 + Coroutines
        </text>
      </svg>
    );
  }

  if (projectId === 'quiz-battle') {
    return (
      <svg
        viewBox="0 0 420 175"
        className="h-full w-full text-folio-ink"
        role="img"
        aria-label="Team Quiz Battle: Socket.IO Two-Team Race Track & Express Server"
      >
        <rect
          x="12"
          y="16"
          width="396"
          height="142"
          rx="6"
          fill="var(--bg-elevated)"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <text x="28" y="40" fontFamily="var(--font-mono)" fontSize="10" fontWeight="600" fill="var(--accent-primary)">
          SOCKET.IO REALTIME RACE (ROOM: 6-CHAR CODE)
        </text>

        {/* Team A Track */}
        <text x="28" y="68" fontFamily="var(--font-mono)" fontSize="9.5" fill="currentColor">
          TEAM A (≤30)
        </text>
        <line x1="115" y1="64" x2="365" y2="64" stroke="currentColor" strokeWidth="1.5" strokeDasharray="5 5" />
        <rect x="275" y="54" width="44" height="20" rx="3" fill="var(--accent-primary)" />
        <text x="284" y="68" fontFamily="var(--font-mono)" fontSize="9" fill="var(--accent-primary-contrast)">
          CAR A
        </text>

        {/* Team B Track */}
        <text x="28" y="104" fontFamily="var(--font-mono)" fontSize="9.5" fill="currentColor">
          TEAM B (≤30)
        </text>
        <line x1="115" y1="100" x2="365" y2="100" stroke="currentColor" strokeWidth="1.5" strokeDasharray="5 5" />
        <rect x="215" y="90" width="44" height="20" rx="3" fill="var(--accent-secondary)" />
        <text x="224" y="104" fontFamily="var(--font-mono)" fontSize="9" fill="var(--bg-elevated)">
          CAR B
        </text>

        {/* Finish line */}
        <line x1="372" y1="48" x2="372" y2="116" stroke="var(--accent-primary)" strokeWidth="2.5" />

        <text x="28" y="138" fontFamily="var(--font-mono)" fontSize="9" fill="var(--text-secondary)">
          Express 4 + HMAC HttpOnly Host Cookie + Render /healthz
        </text>
      </svg>
    );
  }

  // be-the-driver
  return (
    <svg
      viewBox="0 0 560 175"
      className="h-full w-full text-folio-ink"
      role="img"
      aria-label="Be The Driver / Shipper Simulator: 8-bit Urban Delivery HUD, Python Bundler & 13 Playwright Suites"
    >
      <rect
        x="12"
        y="16"
        width="536"
        height="142"
        rx="4"
        fill="var(--bg-elevated)"
        stroke="currentColor"
        strokeWidth="1.75"
      />
      {/* Top 8-bit HUD Bar */}
      <text x="28" y="42" fontFamily="var(--font-mono)" fontSize="10" fontWeight="600" fill="var(--accent-primary)">
        [06:00 → 22:00] GOAL: 100,000,000 VND / 24 MONTHS
      </text>
      <text x="412" y="42" fontFamily="var(--font-mono)" fontSize="10" fill="var(--accent-secondary)">
        PWA + sw.js
      </text>

      {/* Pixel-style Stamina / Fuel / Savings Bars */}
      <text x="28" y="72" fontFamily="var(--font-mono)" fontSize="9.5" fill="currentColor">
        STAMINA
      </text>
      <rect x="92" y="62" width="120" height="12" fill="var(--bg-surface)" stroke="currentColor" strokeWidth="1" />
      <rect x="94" y="64" width="92" height="8" fill="var(--accent-secondary)" />

      <text x="28" y="98" fontFamily="var(--font-mono)" fontSize="9.5" fill="currentColor">
        SAVINGS
      </text>
      <rect x="92" y="88" width="120" height="12" fill="var(--bg-surface)" stroke="currentColor" strokeWidth="1" />
      <rect x="94" y="90" width="76" height="8" fill="var(--accent-primary)" />

      {/* Right Delivery Route & Python Bundler Info */}
      <rect
        x="244"
        y="56"
        width="284"
        height="64"
        rx="3"
        fill="var(--bg-surface)"
        stroke="var(--accent-primary)"
        strokeWidth="1.25"
      />
      <text x="258" y="78" fontFamily="var(--font-mono)" fontSize="10" fontWeight="600" fill="currentColor">
        src/loop.js + Web Audio 8-Bit Synth
      </text>
      <text x="258" y="96" fontFamily="var(--font-mono)" fontSize="9.5" fill="var(--text-secondary)">
        build.py → Single-File HTML + 13 Playwright Tests
      </text>

      <text x="28" y="138" fontFamily="var(--font-mono)" fontSize="9" fill="var(--text-secondary)">
        Commit a0a4ea8: Be The Driver → Một Ngày Làm Shipper (Deliver-Simulator)
      </text>
    </svg>
  );
};

export const ProjectsBento: React.FC<ProjectsBentoProps> = ({ locale }) => {
  const shouldReduceMotion = useReducedMotion();
  const t = UI_LABELS[locale].projects;

  return (
    <section
      id="projects"
      className="border-b border-folio-border py-16 sm:py-24"
      aria-labelledby="projects-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4 border-b border-folio-border pb-6">
          <div className="max-w-3xl">
            <span className="font-mono text-xs font-semibold text-folio-vermilion">
              {t.sectionIndex}
            </span>
            <h2
              id="projects-heading"
              className="mt-2 font-serif text-3xl font-bold text-folio-ink sm:text-5xl"
            >
              {t.heading}
            </h2>
            <p className="mt-3 text-base text-folio-muted">{t.subheading}</p>
          </div>
          <div className="font-mono text-xs text-folio-spruce">
            <span>[SRC: src/data/projects.ts]</span>
          </div>
        </div>

        {/* Asymmetric Bento Grid: Row 1 (7 cols + 5 cols), Row 2 (5 cols + 7 cols) */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          {PROJECTS_DATA.map((project, idx) => {
            // Intentional asymmetric Bento column spans:
            // Project 0 (Marginal): 7 cols
            // Project 1 (SnapTask): 5 cols
            // Project 2 (Team Quiz Battle): 5 cols
            // Project 3 (Be The Driver): 7 cols
            const colSpanClass =
              idx === 0 || idx === 3 ? 'lg:col-span-7' : 'lg:col-span-5';

            return (
              <motion.article
                key={project.id}
                id={`project-${project.id}`}
                initial={
                  shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 24 }
                }
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: idx * 0.06 }}
                className={`group relative flex flex-col justify-between rounded-md border border-folio-strong bg-folio-surface p-5 transition-transform duration-300 hover:-translate-y-1 sm:p-7 ${colSpanClass}`}
              >
                <div>
                  {/* Top Folio Bar */}
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-folio-border pb-3">
                    <span className="font-mono text-xs font-bold text-folio-vermilion">
                      {project.indexNumber}
                    </span>
                    <div className="flex flex-wrap items-center gap-2 font-mono text-[11px] text-folio-muted">
                      <FileCheck2
                        className="h-3.5 w-3.5 text-folio-spruce"
                        aria-hidden="true"
                      />
                      <span>{project.evidenceFiles.slice(0, 2).join(', ')}</span>
                    </div>
                  </div>

                  {/* Title & Subtitle */}
                  <div className="mt-4">
                    <h3 className="font-serif text-2xl font-bold text-folio-ink group-hover:text-folio-vermilion sm:text-3xl">
                      {project.title}
                    </h3>
                    <p className="mt-1 font-serif text-base italic text-folio-muted">
                      {project.subtitle[locale]}
                    </p>
                  </div>

                  {/* Custom Architectural SVG Preview */}
                  <div className="my-5 h-44 w-full overflow-hidden rounded border border-folio-border bg-folio-bg p-2">
                    <ProjectVisualPreview projectId={project.id} />
                  </div>

                  {/* Description */}
                  <p className="text-sm leading-relaxed text-folio-ink sm:text-base">
                    {project.description[locale]}
                  </p>

                  {/* Marginalia Callout Box */}
                  <div className="mt-4 rounded border-l-2 border-folio-vermilion bg-folio-elevated p-3.5 text-xs leading-relaxed text-folio-muted">
                    {project.marginaliaAnnotation[locale]}
                  </div>

                  {/* Verified Technologies from Source Code */}
                  <div className="mt-5">
                    <div className="mb-2 flex items-center gap-1.5 font-mono text-[11px] font-semibold text-folio-spruce">
                      <Layers className="h-3.5 w-3.5" aria-hidden="true" />
                      <span>{t.techLabel}</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech.name}
                          title={tech.detail[locale]}
                          className="inline-flex items-center rounded border border-folio-border bg-folio-elevated px-2.5 py-1 font-mono text-xs font-medium text-folio-ink"
                        >
                          {tech.name}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bottom Evidence Files & Links */}
                <div className="mt-6 border-t border-folio-border pt-4">
                  <div className="mb-3 font-mono text-[11px] text-folio-muted">
                    <span className="font-semibold text-folio-ink">
                      {t.evidenceLabel}
                    </span>{' '}
                    {project.evidenceFiles.join(' · ')}
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-2 font-mono text-xs">
                      <span className="text-folio-muted">
                        {t.linkPlaceholderLabel}
                      </span>
                      <span className="placeholder-token">
                        {project.linkPlaceholder}
                      </span>
                    </div>

                    <a
                      href={project.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-[40px] items-center gap-1.5 rounded border border-folio-strong bg-folio-elevated px-3.5 py-1.5 font-mono text-xs font-semibold text-folio-ink transition-transform duration-300 hover:-translate-y-0.5 hover:border-folio-vermilion hover:text-folio-vermilion"
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
