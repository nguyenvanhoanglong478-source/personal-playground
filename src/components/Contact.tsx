import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ExternalLink, Mail, Send, Sparkles } from 'lucide-react';
import { Locale, PROFILE_DATA, UI_LABELS } from '../data/profile';
import { SocialIcon } from './SocialIcon';

interface ContactProps {
  locale: Locale;
}

export const Contact: React.FC<ContactProps> = ({ locale }) => {
  const shouldReduceMotion = useReducedMotion();
  const t = UI_LABELS[locale].contact;
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');

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
            className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:col-span-6"
          >
            <div className="folio-card google-gradient-hover-border flex min-w-0 flex-col justify-center !p-5 sm:col-span-2">
              <div className="flex items-center gap-2 font-mono text-xs text-folio-muted">
                <Mail className="h-4 w-4 text-folio-ink" aria-hidden="true" />
                <span>EMAIL</span>
              </div>
              <a
                href={`mailto:${PROFILE_DATA.contacts.email}`}
                className="google-btn-github group/btn mt-3 w-fit max-w-full min-w-0"
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
            </div>

            {PROFILE_DATA.contacts.socials.map((social) => (
              <div
                key={social.id}
                className="folio-card google-gradient-hover-border flex min-w-0 flex-col justify-center !p-5"
              >
                <div className="flex items-center gap-2 font-mono text-xs text-folio-muted">
                  <SocialIcon platform={social.id} className="h-4 w-4 shrink-0 text-folio-ink" />
                  <span>{social.label}</span>
                </div>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="google-btn-github group/btn mt-3 w-fit max-w-full min-w-0"
                >
                  <span className="google-pill-aura" aria-hidden="true" />
                  <span className="google-btn-github-label min-w-0 truncate">
                    {social.displayText}
                  </span>
                  <ExternalLink
                    className="h-3.5 w-3.5 shrink-0 transition-transform duration-200 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
                    aria-hidden="true"
                  />
                </a>
              </div>
            ))}
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
