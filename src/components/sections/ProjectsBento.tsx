import React, { useEffect, useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  FolderGit2,
  Globe,
  Layers,
  Sparkles,
  X,
  ZoomIn,
} from 'lucide-react';
import { Locale, UI_LABELS } from '../../data/profile';
import { PROJECTS_DATA, ProjectItem } from '../../data/projects';
import { useBodyScrollLock } from '../../hooks/useBodyScrollLock';

interface ProjectsBentoProps {
  locale: Locale;
}

interface ProjectLightboxProps {
  projectIndex: number | null;
  locale: Locale;
  onClose: () => void;
  onSelectIndex: (index: number) => void;
}

const ProjectLightboxModal: React.FC<ProjectLightboxProps> = ({
  projectIndex,
  locale,
  onClose,
  onSelectIndex,
}) => {
  const isOpen = projectIndex !== null;
  const total = PROJECTS_DATA.length;
  const project =
    projectIndex !== null ? PROJECTS_DATA[projectIndex] ?? null : null;

  useBodyScrollLock(isOpen);

  useEffect(() => {
    if (!isOpen || projectIndex === null) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      } else if (event.key === 'ArrowLeft') {
        onSelectIndex((projectIndex - 1 + total) % total);
      } else if (event.key === 'ArrowRight') {
        onSelectIndex((projectIndex + 1) % total);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose, onSelectIndex, projectIndex, total]);

  if (!project || projectIndex === null) return null;

  const t = UI_LABELS[locale].projects;
  const liveLabel = locale === 'vi' ? 'Mở bản chạy thử' : 'Live demo';
  const prevLabel = locale === 'vi' ? 'Ảnh dự án trước' : 'Previous project';
  const nextLabel = locale === 'vi' ? 'Ảnh dự án tiếp theo' : 'Next project';
  const closeLabel = locale === 'vi' ? 'Đóng xem ảnh' : 'Close preview';

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={project.title}
      data-project-lightbox="true"
      data-lenis-prevent=""
      onClick={onClose}
      className="fixed inset-0 z-[120] flex items-center justify-center bg-black/80 p-3 backdrop-blur-sm sm:p-6"
    >
      <div
        onClick={(event) => event.stopPropagation()}
        className="relative flex max-h-[92vh] w-full max-w-5xl flex-col overflow-hidden rounded-[var(--radius-card)] border border-folio-border bg-folio-surface shadow-2xl"
      >
        <div className="flex items-center justify-between gap-3 border-b border-folio-border px-4 py-3 sm:px-5">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 font-mono text-[11px] font-semibold text-folio-muted">
              <span>
                {project.indexNumber} / {String(total).padStart(2, '0')}
              </span>
              <span>·</span>
              <span className="truncate">{project.subtitle[locale]}</span>
            </div>
            <h3 className="truncate font-serif text-lg font-bold text-folio-ink sm:text-xl">
              {project.title}
            </h3>
          </div>

          <div className="flex shrink-0 items-center gap-1.5">
            <button
              type="button"
              onClick={() => onSelectIndex((projectIndex - 1 + total) % total)}
              aria-label={prevLabel}
              title={prevLabel}
              className="folio-btn-icon !h-9 !w-9"
            >
              <ChevronLeft className="h-4 w-4" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => onSelectIndex((projectIndex + 1) % total)}
              aria-label={nextLabel}
              title={nextLabel}
              className="folio-btn-icon !h-9 !w-9"
            >
              <ChevronRight className="h-4 w-4" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={onClose}
              aria-label={closeLabel}
              title={closeLabel}
              className="folio-btn-icon !h-9 !w-9"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-auto bg-folio-bg p-3 sm:p-5">
          <div className="mx-auto aspect-[16/10] w-full overflow-hidden rounded-[10px] border border-folio-border bg-folio-surface">
            <img
              src={project.previewImage}
              alt={project.previewAlt[locale]}
              width={1200}
              height={750}
              decoding="async"
              className="h-full w-full object-cover object-top"
            />
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2.5 border-t border-folio-border px-4 py-3 sm:px-5">
          <div className="flex flex-wrap gap-1.5">
            {project.technologies.map((tech) => (
              <span key={tech.name} className="folio-chip">
                {tech.name}
              </span>
            ))}
          </div>

          <div className="flex shrink-0 items-center gap-2">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="folio-btn-compact"
              >
                <Globe className="h-3.5 w-3.5" aria-hidden="true" />
                <span>{liveLabel}</span>
                <ExternalLink className="h-3 w-3" aria-hidden="true" />
              </a>
            )}
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="google-btn-github group/btn"
            >
              <FolderGit2 className="h-3.5 w-3.5" aria-hidden="true" />
              <span className="google-btn-github-label">{t.repoLabel}</span>
              <ExternalLink
                className="h-3 w-3 transition-transform duration-150 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
                aria-hidden="true"
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

interface ProjectCardProps {
  project: ProjectItem;
  locale: Locale;
  gridSpanClass: string;
  onInspectPreview: () => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  locale,
  gridSpanClass,
  onInspectPreview,
}) => {
  const t = UI_LABELS[locale].projects;
  const zoomAria =
    locale === 'vi'
      ? `Phóng to ảnh giao diện ${project.title}`
      : `Expand ${project.title} preview`;
  const liveLabel = locale === 'vi' ? 'Chạy thử' : 'Live';
  const repoPrefix = 'https://github.com/nguyenvanhoanglong478-source/';
  const shortRepoLabel = project.repoUrl.startsWith(repoPrefix)
    ? project.repoUrl.slice(repoPrefix.length)
    : 'github.com/nguyenvanhoanglong478-source';

  return (
    <div className={gridSpanClass}>
      <article id={`project-${project.id}`} className="scroll-mt-20">
        <div className="google-gradient-hover-border group relative flex h-full flex-col justify-between overflow-hidden rounded-[var(--radius-card)] border border-folio-border bg-folio-surface p-5 shadow-[var(--shadow-soft)] hover:-translate-y-0.5 hover:border-folio-strong hover:shadow-[var(--shadow-glow)]">
          <span
            aria-hidden="true"
            className="editorial-watermark absolute -right-2 -top-3 z-0 text-[5.5rem] sm:text-[6.5rem] lg:text-[7.5rem]"
          >
            {project.indexNumber}
          </span>

          <div className="relative z-10">
            <div className="flex items-center justify-between gap-2 border-b border-folio-border pb-2.5">
              <span className="font-mono text-[11.5px] font-bold text-folio-ink">
                {project.indexNumber}
              </span>
              <span className="font-mono text-[11px] font-semibold text-folio-muted">
                {project.technologies[0]?.name}
              </span>
            </div>

            <div className="mt-3">
              <h3 className="font-serif text-xl font-bold leading-snug text-folio-ink sm:text-2xl">
                {project.title}
              </h3>
              <p className="mt-0.5 font-serif text-[13px] italic text-folio-muted lg:min-h-[2.25rem]">
                {project.subtitle[locale]}
              </p>
            </div>

            <button
              type="button"
              onClick={onInspectPreview}
              aria-label={zoomAria}
              data-project-preview-btn={project.id}
              className="group/img relative my-3.5 block aspect-[16/10] w-full overflow-hidden rounded-[10px] border border-folio-border bg-folio-bg text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-folio-ink"
            >
              <img
                src={project.previewImage}
                alt={project.previewAlt[locale]}
                width={1200}
                height={750}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover object-top transition-transform duration-300 ease-out group-hover/img:scale-[1.03]"
              />
              <span
                aria-hidden="true"
                className="pointer-events-none absolute bottom-2.5 right-2.5 inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-black/65 text-white opacity-85 backdrop-blur-sm transition-all duration-200 group-hover/img:scale-105 group-hover/img:opacity-100"
              >
                <ZoomIn className="h-3.5 w-3.5" />
              </span>
            </button>

            <p className="text-sm leading-relaxed text-folio-muted">
              {project.description[locale]}
            </p>
          </div>

          <div className="relative z-10 mt-4">
            <div className="mb-1.5 flex items-center gap-1.5 font-mono text-[10.5px] font-semibold text-folio-muted">
              <Layers className="h-3 w-3" aria-hidden="true" />
              <span>{t.techLabel}</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {project.technologies.map((tech) => (
                <span key={tech.name} className="folio-chip">
                  {tech.name}
                </span>
              ))}
            </div>

            <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-folio-border pt-3">
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                title={project.repoUrl}
                className="min-w-0 flex-1 truncate font-mono text-[11.5px] text-folio-ink underline transition-colors hover:text-folio-muted"
              >
                {shortRepoLabel}
              </a>

              <div className="flex shrink-0 items-center gap-1.5">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="folio-btn-compact !min-h-[34px] !px-3"
                  >
                    <Globe className="h-3 w-3" aria-hidden="true" />
                    <span>{liveLabel}</span>
                  </a>
                )}

                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="google-btn-github group/btn shrink-0"
                >
                  <FolderGit2 className="h-3.5 w-3.5" aria-hidden="true" />
                  <span className="google-btn-github-label">{t.repoLabel}</span>
                  <ExternalLink
                    className="h-3 w-3 transition-transform duration-150 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
                    aria-hidden="true"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
};

export const ProjectsBento: React.FC<ProjectsBentoProps> = ({ locale }) => {
  const t = UI_LABELS[locale].projects;
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const getGridSpanClass = (idx: number) =>
    idx % 2 === 0
      ? 'lg:col-start-1 lg:col-span-6'
      : 'lg:col-start-7 lg:col-span-6 lg:mt-8';

  return (
    <section
      id="projects"
      className="folio-section"
      aria-labelledby="projects-heading"
    >
      <div className="folio-container">
        <div className="folio-section-header grid grid-cols-1 gap-3 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <div className="flex items-center gap-2 font-mono text-[11.5px] font-semibold text-folio-muted">
              <Sparkles
                className="h-3.5 w-3.5 text-folio-muted"
                aria-hidden="true"
              />
              <span className="folio-index-label">{t.sectionIndex}</span>
            </div>
            <h2 id="projects-heading" className="folio-section-heading">
              {t.heading}
            </h2>
          </div>
          <p className="text-sm leading-relaxed text-folio-muted sm:text-[0.95rem] lg:col-span-5">
            {t.subheading}
          </p>
        </div>

        <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-12 lg:gap-x-7 lg:gap-y-7">
          {PROJECTS_DATA.map((project, idx) => (
            <ProjectCard
              key={project.id}
              project={project}
              locale={locale}
              gridSpanClass={getGridSpanClass(idx)}
              onInspectPreview={() => setLightboxIndex(idx)}
            />
          ))}
        </div>
      </div>

      <ProjectLightboxModal
        projectIndex={lightboxIndex}
        locale={locale}
        onClose={() => setLightboxIndex(null)}
        onSelectIndex={setLightboxIndex}
      />
    </section>
  );
};
