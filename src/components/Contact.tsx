import React, { useState } from 'react';
import { ExternalLink, Github, Mail, Send } from 'lucide-react';
import { Locale, PROFILE_DATA, UI_LABELS } from '../data/profile';

interface ContactProps {
  locale: Locale;
}

export const Contact: React.FC<ContactProps> = ({ locale }) => {
  const t = UI_LABELS[locale].contact;
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');

  const mailtoHref = `mailto:${PROFILE_DATA.contacts.email}?subject=${encodeURIComponent(
    subject || 'Trao đổi công việc với Long Hoàng'
  )}&body=${encodeURIComponent(body)}`;

  return (
    <section
      id="contact"
      className="folio-section"
      aria-labelledby="contact-heading"
    >
      <div className="folio-container">
        <div className="folio-section-header">
          <span className="folio-index-label">{t.sectionIndex}</span>
          <h2 id="contact-heading" className="folio-section-heading">
            {t.heading}
          </h2>
          <p className="mt-3 max-w-2xl text-base text-folio-muted">
            {t.subheading}
          </p>
        </div>

        <div className="grid grid-cols-1 items-stretch gap-6 lg:grid-cols-12">
          <div className="flex flex-col justify-between gap-4 lg:col-span-5">
            <div className="folio-card flex flex-1 flex-col justify-center">
              <div className="flex items-center gap-2 font-mono text-xs text-folio-muted">
                <Mail className="h-4 w-4 text-folio-vermilion" aria-hidden="true" />
                <span>EMAIL</span>
              </div>
              <a
                href={`mailto:${PROFILE_DATA.contacts.email}`}
                className="mt-2 inline-flex min-h-[36px] items-center break-all font-mono text-sm font-semibold text-folio-ink underline hover:text-folio-vermilion"
              >
                {PROFILE_DATA.contacts.email}
              </a>
            </div>

            <div className="folio-card flex flex-1 flex-col justify-center">
              <div className="flex items-center gap-2 font-mono text-xs text-folio-muted">
                <Github className="h-4 w-4 text-folio-spruce" aria-hidden="true" />
                <span>GITHUB</span>
              </div>
              <a
                href={PROFILE_DATA.contacts.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex min-h-[36px] items-center gap-1.5 break-all font-mono text-sm font-semibold text-folio-spruce underline hover:text-folio-vermilion"
              >
                <span>{PROFILE_DATA.contacts.githubUrl}</span>
                <ExternalLink className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
              </a>
            </div>
          </div>

          <div className="folio-card flex flex-col justify-between lg:col-span-7">
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
                    className="w-full rounded-[var(--radius-control)] border border-folio-strong bg-folio-elevated px-4 py-2.5 text-sm text-folio-ink placeholder:text-folio-muted/60"
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
                    rows={4}
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    placeholder={t.bodyPlaceholder}
                    className="w-full rounded-[var(--radius-control)] border border-folio-strong bg-folio-elevated px-4 py-2.5 text-sm text-folio-ink placeholder:text-folio-muted/60"
                  />
                </div>
              </div>
            </div>

            <div className="mt-6">
              <a href={mailtoHref} className="folio-btn-primary">
                <Send className="h-4 w-4" aria-hidden="true" />
                <span>{t.mailtoButton}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
