import React, { useState } from 'react';
import { ExternalLink, Github, Mail, MessageSquareShare, Send } from 'lucide-react';
import { Locale, PROFILE_DATA, UI_LABELS } from '../data/profile';

interface ContactProps {
  locale: Locale;
}

export const Contact: React.FC<ContactProps> = ({ locale }) => {
  const t = UI_LABELS[locale].contact;
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');

  const rawEmail = PROFILE_DATA.contacts.email.startsWith('[[')
    ? ''
    : PROFILE_DATA.contacts.email;

  const mailtoHref = `mailto:${rawEmail}?subject=${encodeURIComponent(
    subject || 'Hello Marcus — Marginalia & Folio'
  )}&body=${encodeURIComponent(body)}`;

  return (
    <section
      id="contact"
      className="border-b border-folio-border py-16 sm:py-24"
      aria-labelledby="contact-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4 border-b border-folio-border pb-6">
          <div className="max-w-2xl">
            <span className="font-mono text-xs font-semibold text-folio-vermilion">
              {t.sectionIndex}
            </span>
            <h2
              id="contact-heading"
              className="mt-2 font-serif text-3xl font-bold text-folio-ink sm:text-5xl"
            >
              {t.heading}
            </h2>
            <p className="mt-3 text-base text-folio-muted">{t.subheading}</p>
          </div>
          <div className="font-mono text-xs text-folio-muted">
            [ZERO-BACKEND MAILTO PROTOCOL]
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Left: Explicit Contact Channels */}
          <div className="space-y-4 lg:col-span-5">
            {/* Email Card */}
            <div className="rounded-md border border-folio-strong bg-folio-surface p-5">
              <div className="flex items-center gap-2 font-mono text-xs text-folio-muted">
                <Mail className="h-4 w-4 text-folio-vermilion" aria-hidden="true" />
                <span>EMAIL</span>
              </div>
              <div className="mt-2">
                <span className="placeholder-token text-sm">
                  {PROFILE_DATA.contacts.email}
                </span>
              </div>
            </div>

            {/* GitHub Card */}
            <div className="rounded-md border border-folio-strong bg-folio-surface p-5">
              <div className="flex items-center justify-between font-mono text-xs text-folio-muted">
                <span className="flex items-center gap-2">
                  <Github className="h-4 w-4 text-folio-spruce" aria-hidden="true" />
                  <span>GITHUB</span>
                </span>
                <a
                  href={PROFILE_DATA.contacts.githubDetectedUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-folio-spruce underline hover:text-folio-vermilion"
                >
                  <span>nguyenvanhoanglong478-source</span>
                  <ExternalLink className="h-3 w-3" aria-hidden="true" />
                </a>
              </div>
              <div className="mt-2">
                <span className="placeholder-token text-sm">
                  {PROFILE_DATA.contacts.github}
                </span>
              </div>
            </div>

            {/* LinkedIn / Facebook Card */}
            <div className="rounded-md border border-folio-strong bg-folio-surface p-5">
              <div className="flex items-center gap-2 font-mono text-xs text-folio-muted">
                <MessageSquareShare
                  className="h-4 w-4 text-folio-vermilion"
                  aria-hidden="true"
                />
                <span>LINKEDIN / FACEBOOK</span>
              </div>
              <div className="mt-2">
                <span className="placeholder-token text-sm">
                  {PROFILE_DATA.contacts.social}
                </span>
              </div>
            </div>

            <p className="rounded border border-folio-border bg-folio-elevated p-4 font-mono text-xs leading-relaxed text-folio-muted">
              {t.editHint}
            </p>
          </div>

          {/* Right: Interactive Mailto Composer */}
          <div className="rounded-md border border-folio-strong bg-folio-surface p-6 sm:p-8 lg:col-span-7">
            <h3 className="font-serif text-2xl font-bold text-folio-ink">
              {t.composeLabel}
            </h3>

            <div className="mt-5 space-y-4">
              <div>
                <label
                  htmlFor="mailto-subject-input"
                  className="mb-1.5 block font-mono text-xs font-medium text-folio-muted"
                >
                  {locale === 'vi' ? 'Tiêu đề thư' : 'Subject'}
                </label>
                <input
                  id="mailto-subject-input"
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder={t.subjectPlaceholder}
                  className="w-full rounded border border-folio-strong bg-folio-elevated px-4 py-2.5 text-sm text-folio-ink placeholder:text-folio-muted/60"
                />
              </div>

              <div>
                <label
                  htmlFor="mailto-body-input"
                  className="mb-1.5 block font-mono text-xs font-medium text-folio-muted"
                >
                  {locale === 'vi' ? 'Nội dung trao đổi' : 'Message body'}
                </label>
                <textarea
                  id="mailto-body-input"
                  rows={4}
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  placeholder={t.bodyPlaceholder}
                  className="w-full rounded border border-folio-strong bg-folio-elevated px-4 py-2.5 text-sm text-folio-ink placeholder:text-folio-muted/60"
                />
              </div>

              <div className="pt-2">
                <a
                  href={mailtoHref}
                  className="inline-flex min-h-[48px] items-center gap-2.5 rounded border border-folio-vermilion bg-folio-vermilion px-6 py-3 font-mono text-sm font-semibold text-[var(--accent-primary-contrast)] transition-transform duration-300 hover:-translate-y-0.5"
                >
                  <Send className="h-4 w-4" aria-hidden="true" />
                  <span>{t.mailtoButton}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
