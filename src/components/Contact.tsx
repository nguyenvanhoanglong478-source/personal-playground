import React, { useEffect, useRef, useState } from 'react';
import { ArrowDown, Check, Clock, Copy, Mail, Send, Sparkles } from 'lucide-react';
import { Locale, UI_LABELS } from '../data/profile';
import {
  openContactMailto,
  resolveContactEmail,
} from '../utils/contactProtection';

interface ContactProps {
  locale: Locale;
}

export const Contact: React.FC<ContactProps> = ({ locale }) => {
  const t = UI_LABELS[locale].contact;
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [copied, setCopied] = useState(false);
  const [emailDisplay, setEmailDisplay] = useState('');
  const copyTimerRef = useRef<number | null>(null);

  useEffect(() => {
    setEmailDisplay(resolveContactEmail());
    return () => {
      if (copyTimerRef.current !== null) {
        window.clearTimeout(copyTimerRef.current);
      }
    };
  }, []);

  const handleCopyEmail = async () => {
    const email = resolveContactEmail();
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

  const handleOpenComposedMail = () => {
    openContactMailto(
      subject ||
        (locale === 'vi'
          ? 'Trao đổi công việc với Long Hoàng'
          : 'Project inquiry for Long Hoàng'),
      body
    );
  };

  return (
    <section
      id="contact"
      className="folio-section !pb-20 sm:!pb-20"
      aria-labelledby="contact-heading"
    >
      <div className="folio-container">
        <div className="folio-section-header grid grid-cols-1 gap-3 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <div className="flex items-center gap-2 font-mono text-[11.5px] font-semibold text-folio-muted">
              <Sparkles className="h-3.5 w-3.5 text-folio-muted" aria-hidden="true" />
              <span className="folio-index-label">{t.sectionIndex}</span>
            </div>
            <h2 id="contact-heading" className="folio-section-heading">
              {t.heading}
            </h2>
          </div>
          <p className="text-sm leading-relaxed text-folio-muted sm:text-[0.95rem] lg:col-span-5">
            {t.subheading}
          </p>
        </div>

        <div className="grid grid-cols-1 items-stretch gap-5 lg:grid-cols-12">
          <div className="flex flex-col gap-4 lg:col-span-6">
            <div className="folio-card google-gradient-hover-border flex min-w-0 flex-col justify-center !p-4 sm:!p-5">
              <div className="flex items-center gap-2 font-mono text-[11.5px] text-folio-muted">
                <Mail className="h-3.5 w-3.5 shrink-0 text-folio-ink" aria-hidden="true" />
                <span>{t.emailLabel}</span>
              </div>
              <div className="mt-3 flex min-w-0 flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => openContactMailto()}
                  className="google-btn-github group/btn w-fit max-w-full min-w-0"
                >
                  <span className="google-btn-github-label min-w-0 truncate">
                    {emailDisplay}
                  </span>
                  <Mail
                    className="h-3.5 w-3.5 shrink-0 transition-transform duration-150 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
                    aria-hidden="true"
                  />
                </button>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  aria-label={t.copyAriaLabel}
                  className="folio-btn-compact shrink-0"
                >
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

            <div className="folio-card google-gradient-hover-border flex min-w-0 flex-1 flex-col justify-between !p-4 sm:!p-5">
              <div>
                <div className="inline-flex max-w-full items-center gap-2 rounded-full border border-folio-border bg-folio-elevated px-2.5 py-1 font-mono text-[10.5px] font-semibold text-folio-ink">
                  <span className="inline-flex h-2 w-2 shrink-0 rounded-full bg-folio-ggreen" aria-hidden="true" />
                  <span className="leading-snug">{t.availabilityBadge}</span>
                </div>

                <h3 className="mt-3 font-serif text-lg font-bold text-folio-ink sm:text-xl">
                  {t.availabilityTitle}
                </h3>

                <ul className="mt-3 space-y-2 text-xs leading-relaxed text-folio-muted sm:text-[13.5px]">
                  {t.availabilityScope.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span
                        className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-folio-ink/50"
                        aria-hidden="true"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-4 flex flex-wrap items-center justify-between gap-x-4 gap-y-2 border-t border-folio-border pt-3 text-[11.5px]">
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
          </div>

          <div className="folio-card google-gradient-hover-border flex flex-col justify-between !p-4 sm:!p-5 lg:col-span-6">
            <div>
              <h3 className="font-serif text-lg font-bold text-folio-ink sm:text-xl">
                {t.composeLabel}
              </h3>

              <div className="mt-4 space-y-3">
                <div>
                  <label
                    htmlFor="mailto-subject-input"
                    className="mb-1 block font-mono text-[11.5px] font-medium text-folio-muted"
                  >
                    {t.subjectLabel}
                  </label>
                  <input
                    id="mailto-subject-input"
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder={t.subjectPlaceholder}
                    className="w-full rounded-[var(--radius-control)] border border-folio-strong bg-folio-elevated px-3.5 py-2 text-sm text-folio-ink placeholder:text-folio-faint"
                  />
                </div>

                <div>
                  <label
                    htmlFor="mailto-body-input"
                    className="mb-1 block font-mono text-[11.5px] font-medium text-folio-muted"
                  >
                    {t.bodyLabel}
                  </label>
                  <textarea
                    id="mailto-body-input"
                    rows={4}
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    placeholder={t.bodyPlaceholder}
                    className="w-full rounded-[var(--radius-control)] border border-folio-strong bg-folio-elevated px-3.5 py-2 text-sm text-folio-ink placeholder:text-folio-faint"
                  />
                </div>
              </div>
            </div>

            <div className="mt-4">
              <button
                type="button"
                onClick={handleOpenComposedMail}
                className="folio-btn-primary"
              >
                <Send className="h-3.5 w-3.5" aria-hidden="true" />
                <span>{t.mailtoButton}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
