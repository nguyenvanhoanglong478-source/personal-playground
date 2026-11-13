import React, { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowDown, Check, Clock, Copy, Mail, Send, Sparkles } from 'lucide-react';
import { Locale, PROFILE_DATA, UI_LABELS } from '../data/profile';

interface ContactProps {
  locale: Locale;
}

export const Contact: React.FC<ContactProps> = ({ locale }) => {
  const shouldReduceMotion = useReducedMotion();
  const t = UI_LABELS[locale].contact;
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [copied, setCopied] = useState(false);
  const copyTimerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (copyTimerRef.current !== null) {
        window.clearTimeout(copyTimerRef.current);
      }
    };
  }, []);

  const handleCopyEmail = async () => {
    const email = PROFILE_DATA.contacts.email;
    let didCopy = false;

    if (navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
      try {
        await navigator.clipboard.writeText(email);
        didCopy = true;
      } catch {
        didCopy = false;
      }
    }

    if (!didCopy) {
      try {
        const textarea = document.createElement('textarea');
        textarea.value = email;
        textarea.setAttribute('readonly', '');
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        didCopy = document.execCommand('copy');
        document.body.removeChild(textarea);
      } catch {
        didCopy = false;
      }
    }

    if (!didCopy) return;

    setCopied(true);
    if (copyTimerRef.current !== null) {
      window.clearTimeout(copyTimerRef.current);
    }
    copyTimerRef.current = window.setTimeout(() => {
      setCopied(false);
      copyTimerRef.current = null;
    }, 2000);
  };

  const mailtoHref = `mailto:${PROFILE_DATA.contacts.email}?subject=${encodeURIComponent(
    subject ||
      (locale === 'vi'
        ? 'Trao đổi công việc với Long Hoàng'
        : 'Project inquiry for Long Hoàng')
  )}&body=${encodeURIComponent(body)}`;

  return (
    <section
      id="contact"
      className="folio-section !pb-28 sm:!pb-28"
      aria-labelledby="contact-heading"
    >
      <div className="folio-container">
        <div className="folio-section-header grid grid-cols-1 gap-4 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <div className="flex items-center gap-2 font-mono text-xs font-semibold text-folio-muted">
              <Sparkles className="h-3.5 w-3.5 text-folio-muted" aria-hidden="true" />
              <span className="folio-index-label">{t.sectionIndex}</span>
            </div>
            <h2 id="contact-heading" className="folio-section-heading">
              {t.heading}
            </h2>
          </div>
          <p className="text-base leading-relaxed text-folio-muted lg:col-span-5">
            {t.subheading}
          </p>
        </div>

        <div className="grid grid-cols-1 items-stretch gap-6 lg:grid-cols-12">
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-5 lg:col-span-6"
          >
            <div className="folio-card google-gradient-hover-border flex min-w-0 flex-col justify-center !p-5 sm:!p-6">
              <div className="flex items-center gap-2 font-mono text-xs text-folio-muted">
                <Mail className="h-4 w-4 shrink-0 text-folio-ink" aria-hidden="true" />
                <span>{t.emailLabel}</span>
              </div>
              <div className="mt-3.5 flex min-w-0 flex-wrap items-center gap-2.5">
                <a
                  href={`mailto:${PROFILE_DATA.contacts.email}`}
                  className="google-btn-github group/btn min-h-[44px] w-fit max-w-full min-w-0 sm:min-h-[40px]"
                >
                  <span className="google-pill-aura" aria-hidden="true" />
                  <span className="google-btn-github-label min-w-0 truncate">
                    {PROFILE_DATA.contacts.email}
                  </span>
                  <Mail
                    className="h-3.5 w-3.5 shrink-0 transition-transform duration-200 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
                    aria-hidden="true"
                  />
                </a>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  aria-label={t.copyAriaLabel}
                  className="folio-btn-compact min-h-[44px] min-w-[44px] shrink-0 sm:min-h-[40px]"
                >
                  <span className="google-pill-aura" aria-hidden="true" />
                  {copied ? (
                    <Check className="h-3.5 w-3.5 shrink-0 text-folio-ink" aria-hidden="true" />
                  ) : (
                    <Copy className="h-3.5 w-3.5 shrink-0 text-folio-ink" aria-hidden="true" />
                  )}
                  <span>{copied ? t.copiedButton : t.copyButton}</span>
                </button>
              </div>
              <span className="sr-only" aria-live="polite">
                {copied ? t.copiedAnnouncement : ''}
              </span>
            </div>

            <div className="folio-card google-gradient-hover-border flex min-w-0 flex-1 flex-col justify-between !p-5 sm:!p-7">
              <div>
                <div className="inline-flex max-w-full items-center gap-2 rounded-full border border-folio-border bg-folio-elevated px-3 py-1.5 font-mono text-[11px] font-semibold text-folio-ink">
                  <span className="relative flex h-2 w-2 shrink-0">
                    {!shouldReduceMotion && (
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-folio-ggreen opacity-75" />
                    )}
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-folio-ggreen" />
                  </span>
                  <span className="leading-snug">{t.availabilityBadge}</span>
                </div>

                <h3 className="mt-4 font-serif text-xl font-bold text-folio-ink sm:text-2xl">
                  {t.availabilityTitle}
                </h3>

                <ul className="mt-4 space-y-2.5 text-sm leading-relaxed text-folio-muted">
                  {t.availabilityScope.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <span
                        className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-folio-ink/50"
                        aria-hidden="true"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 flex flex-wrap items-center justify-between gap-x-4 gap-y-2 border-t border-folio-border pt-4 text-xs">
                <div className="inline-flex items-center gap-1.5 font-mono text-folio-muted">
                  <Clock className="h-3.5 w-3.5 shrink-0 text-folio-ink" aria-hidden="true" />
                  <span>{t.responseTime}</span>
                </div>
                <div className="inline-flex items-center gap-1.5 font-sans text-folio-faint">
                  <span>{t.socialNote}</span>
                  <ArrowDown className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.45, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="folio-card google-gradient-hover-border flex flex-col justify-between lg:col-span-6"
          >
            <div>
              <h3 className="font-serif text-2xl font-bold text-folio-ink">
                {t.composeLabel}
              </h3>

              <div className="mt-5 space-y-4">
                <div>
                  <label
                    htmlFor="mailto-subject-input"
                    className="mb-1.5 block font-mono text-xs font-medium text-folio-muted"
                  >
                    {t.subjectLabel}
                  </label>
                  <input
                    id="mailto-subject-input"
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder={t.subjectPlaceholder}
                    className="w-full rounded-[var(--radius-control)] border border-folio-strong bg-folio-elevated px-4 py-2.5 text-sm text-folio-ink placeholder:text-folio-faint"
                  />
                </div>

                <div>
                  <label
                    htmlFor="mailto-body-input"
                    className="mb-1.5 block font-mono text-xs font-medium text-folio-muted"
                  >
                    {t.bodyLabel}
                  </label>
                  <textarea
                    id="mailto-body-input"
                    rows={5}
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    placeholder={t.bodyPlaceholder}
                    className="w-full rounded-[var(--radius-control)] border border-folio-strong bg-folio-elevated px-4 py-2.5 text-sm text-folio-ink placeholder:text-folio-faint"
                  />
                </div>
              </div>
            </div>

            <div className="mt-6">
              <a href={mailtoHref} className="folio-btn-primary">
                <span className="google-pill-aura" aria-hidden="true" />
                <Send className="h-4 w-4" aria-hidden="true" />
                <span>{t.mailtoButton}</span>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
