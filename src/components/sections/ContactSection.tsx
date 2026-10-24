import React, { useRef, useState } from 'react';
import {
  MessageCircle, Copy, Check, Clock, MapPin
} from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../common/BrandIcons';
import { personalInfo } from '../../data/portfolioData';
import { soundManager } from '../../utils/sound';
import { createGmailComposeUrl } from '../../utils/email';
import { copyTextToClipboard } from '../../utils/clipboard';
import { useGsapScrollReveal } from '../../hooks/useGsapScrollReveal';

interface ContactSectionProps {
  onNotify: (title: string, message?: string) => void;
}

const ContactForm: React.FC<ContactSectionProps> = ({ onNotify }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) {
      errs.name = 'Please provide your name.';
    } else if (formData.name.trim().length < 2) {
      errs.name = 'Name must be at least 2 characters.';
    }

    if (!formData.email.trim()) {
      errs.email = 'Please provide your email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = 'Please enter a valid email address.';
    }

    if (!formData.message.trim()) {
      errs.message = 'Please include a message describing your opportunity or question.';
    } else if (formData.message.trim().length < 10) {
      errs.message = 'Message must be at least 10 characters.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      soundManager.playClick();
      return;
    }

    soundManager.playClick();
    const whatsappMessage = [
      'Portfolio contact form submission',
      `Name: ${formData.name.trim()}`,
      `Email: ${formData.email.trim()}`,
      formData.subject.trim() ? `Subject: ${formData.subject.trim()}` : '',
      '',
      formData.message.trim(),
    ].filter(Boolean).join('\n');
    const whatsappUrl = `https://wa.me/919313058171?text=${encodeURIComponent(whatsappMessage)}`;
    const whatsappWindow = window.open(whatsappUrl, '_blank');

    if (whatsappWindow) {
      whatsappWindow.opener = null;
      onNotify('WhatsApp message ready', 'Review the details and tap Send in WhatsApp.');
    } else {
      window.location.href = whatsappUrl;
      onNotify('WhatsApp message ready', 'Review the details and tap Send in WhatsApp.');
    }
  };

  return (
    <div data-gsap-reveal className="contact-form-column lg:col-span-7">
      <div className="contact-form-panel p-6 sm:p-10 rounded-3xl border border-white/10 bg-neutral-900/90 shadow-2xl relative overflow-hidden">
        <form noValidate onSubmit={handleSubmit} data-gsap-stagger className="space-y-5">
          <div data-gsap-item className="space-y-1">
            <label htmlFor="contact-name" className="text-xs font-mono uppercase tracking-wider text-neutral-300 block">
              Your Full Name <span className="text-[#B8A7D9]">*</span>
            </label>
            <input
              id="contact-name"
              type="text"
              autoComplete="name"
              required
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? 'contact-name-error' : undefined}
              value={formData.name}
              onChange={(e) => setFormData((current) => ({ ...current, name: e.target.value }))}
              placeholder="e.g. Elena Rostova"
              className={`w-full px-4 py-3 rounded-xl bg-black/60 border text-sm text-white placeholder-neutral-600 focus:outline-none transition-colors ${
                errors.name ? 'border-rose-500 focus:border-rose-400' : 'border-white/10 focus:border-white/40'
              }`}
            />
            {errors.name && <p id="contact-name-error" role="alert" className="text-[11px] font-mono text-rose-400 mt-1">{errors.name}</p>}
          </div>

          <div data-gsap-item className="space-y-1">
            <label htmlFor="contact-email" className="text-xs font-mono uppercase tracking-wider text-neutral-300 block">
              Your Email Address <span className="text-[#B8A7D9]">*</span>
            </label>
            <input
              id="contact-email"
              type="email"
              autoComplete="email"
              required
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? 'contact-email-error' : undefined}
              value={formData.email}
              onChange={(e) => setFormData((current) => ({ ...current, email: e.target.value }))}
              placeholder="e.g. elena@company.com"
              className={`w-full px-4 py-3 rounded-xl bg-black/60 border text-sm text-white placeholder-neutral-600 focus:outline-none transition-colors ${
                errors.email ? 'border-rose-500 focus:border-rose-400' : 'border-white/10 focus:border-white/40'
              }`}
            />
            {errors.email && <p id="contact-email-error" role="alert" className="text-[11px] font-mono text-rose-400 mt-1">{errors.email}</p>}
          </div>

          <div data-gsap-item className="space-y-1">
            <label htmlFor="contact-subject" className="text-xs font-mono uppercase tracking-wider text-neutral-300 block">Opportunity / Topic</label>
            <input
              id="contact-subject"
              type="text"
              value={formData.subject}
              onChange={(e) => setFormData((current) => ({ ...current, subject: e.target.value }))}
              placeholder="e.g. Full Stack Role / Architecture Review"
              className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/10 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-white/40 transition-colors"
            />
          </div>

          <div data-gsap-item className="space-y-1">
            <label htmlFor="contact-message" className="text-xs font-mono uppercase tracking-wider text-neutral-300 block">
              Message Details <span className="text-[#B8A7D9]">*</span>
            </label>
            <textarea
              id="contact-message"
              rows={5}
              required
              aria-invalid={Boolean(errors.message)}
              aria-describedby={errors.message ? 'contact-message-error' : undefined}
              value={formData.message}
              onChange={(e) => setFormData((current) => ({ ...current, message: e.target.value }))}
              placeholder="Tell me about your product requirements, team, or project vision..."
              className={`w-full px-4 py-3 rounded-xl bg-black/60 border text-sm text-white placeholder-neutral-600 focus:outline-none transition-colors resize-none ${
                errors.message ? 'border-rose-500 focus:border-rose-400' : 'border-white/10 focus:border-white/40'
              }`}
            />
            {errors.message && <p id="contact-message-error" role="alert" className="text-[11px] font-mono text-rose-400 mt-1">{errors.message}</p>}
          </div>

          <button data-gsap-item type="submit" className="w-full py-4 rounded-full bg-white hover:bg-neutral-200 text-black font-bold text-xs font-mono uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer">
            <MessageCircle className="w-3.5 h-3.5" />
            <span>Continue in WhatsApp</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export const ContactSection: React.FC<ContactSectionProps> = ({ onNotify }) => {
  const sectionRef = useRef<HTMLElement>(null);
  useGsapScrollReveal(sectionRef);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = async () => {
    soundManager.playClick();
    try {
      await copyTextToClipboard(personalInfo.email);
      soundManager.playSuccess();
      setCopiedEmail(true);
      onNotify('Email Copied to Clipboard', personalInfo.email);
      setTimeout(() => setCopiedEmail(false), 2500);
    } catch {
      setCopiedEmail(false);
      onNotify('Unable to copy email', `Please copy this address manually: ${personalInfo.email}`);
    }
  };

  return (
    <section ref={sectionRef} id="contact" className="portfolio-section contact-section relative z-10">
      <div className="section-inner container-x max-w-7xl mx-auto px-2 sm:px-4 lg:px-5">
        <div data-gsap-reveal className="section-header contact-header flex flex-col space-y-4 mb-12 text-left">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#B8A7D9]">
            <span>(06)</span><span>//</span><span>INITIATE CONTACT</span>
          </div>
          <h2 data-gsap-rule className="section-title text-4xl sm:text-6xl font-extrabold uppercase tracking-tighter text-[#f4f4f0] max-w-4xl">
            Let's Build Something <br />
            <span className="text-neutral-500">Refined &amp; Scalable.</span>
          </h2>
          <p className="text-base sm:text-lg text-neutral-400 max-w-2xl font-normal leading-8">
            Whether you have a full-time engineering opportunity, architecture consultation, or freelance collaboration, let's talk.
          </p>
        </div>

        <div className="contact-layout grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div data-gsap-reveal className="contact-direct-column lg:col-span-5 space-y-6">
            <div className="contact-direct-panel p-6 sm:p-8 rounded-3xl glass-panel border border-white/10 shadow-2xl space-y-6 relative overflow-hidden">
              <div className="space-y-2">
                <span className="text-xs font-mono text-[#B8A7D9] uppercase tracking-wider">
                  Direct Line
                </span>
                <h3 className="text-2xl font-bold text-white">
                  Get In Touch
                </h3>
                <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed font-light">
                  I typically respond within 12 hours. Feel free to copy my direct email or connect through professional networks.
                </p>
              </div>

              {/* Copy Email Box */}
              <div className="p-4 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <span className="text-[10px] font-mono text-[#B8A7D9] uppercase block">
                    PRIMARY EMAIL
                  </span>
                  <a href={createGmailComposeUrl(personalInfo.email)} target="_blank" rel="noreferrer" onClick={() => soundManager.playClick()} className="text-sm font-mono text-white truncate block hover:underline underline-offset-2">
                    {personalInfo.email}
                  </a>
                </div>

                <button
                  onClick={handleCopyEmail}
                  className="px-3.5 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-mono uppercase tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
                >
                  {copiedEmail ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-white" />
                      <span>Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-[#B8A7D9]" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

              {/* Status info */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-3 text-xs text-neutral-300">
                  <div className="p-2 rounded-lg bg-white/5 text-[#B8A7D9]">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-semibold block text-white">Rapid Response SLA</span>
                    <span className="text-neutral-400 font-light">Within 12 hours on business days</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-xs text-neutral-300">
                  <div className="p-2 rounded-lg bg-white/5 text-[#B8A7D9]">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-semibold block text-white">Location & Availability</span>
                    <span className="text-neutral-400 font-light">India • Open to Remote Worldwide</span>
                  </div>
                </div>
              </div>

              {/* Social Channels Strip */}
              <div className="pt-4 border-t border-white/5 flex items-center gap-3">
                <a
                  href={personalInfo.github}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => soundManager.playClick()}
                  className="flex-1 py-2.5 rounded-full glass-panel border border-white/10 hover:border-white/25 text-neutral-300 hover:text-white text-xs font-mono uppercase tracking-wider flex items-center justify-center gap-2 transition-colors"
                >
                  <GithubIcon className="w-3.5 h-3.5" />
                  <span>GitHub</span>
                </a>

                <a
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => soundManager.playClick()}
                  className="flex-1 py-2.5 rounded-full glass-panel border border-white/10 hover:border-white/25 text-neutral-300 hover:text-white text-xs font-mono uppercase tracking-wider flex items-center justify-center gap-2 transition-colors"
                >
                  <LinkedinIcon className="w-3.5 h-3.5 text-[#B8A7D9]" />
                  <span>LinkedIn</span>
                </a>
              </div>
            </div>
          </div>

          <ContactForm onNotify={onNotify} />

        </div>

      </div>
    </section>
  );
};
