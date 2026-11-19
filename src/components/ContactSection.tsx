import * as React from 'react';
import {Check, Copy, Github, Linkedin, Loader2, Mail, Phone, Send} from 'lucide-react';
import {PROFILE} from '@/src/data/portfolio';
import {Button} from '@/src/components/ui/button';
import {Input} from '@/src/components/ui/input';
import {Textarea} from '@/src/components/ui/textarea';

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

type SubmitStatus =
  | {type: 'idle'}
  | {type: 'submitting'}
  | {type: 'success'; message: string}
  | {type: 'error'; message: string};

export function ContactSection() {
  const [form, setForm] = React.useState<FormState>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = React.useState<SubmitStatus>({type: 'idle'});
  const [copiedEmail, setCopiedEmail] = React.useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PROFILE.email);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } catch {
      // Clipboard API fallback ignored if denied
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const trimmedName = form.name.trim();
    const trimmedEmail = form.email.trim();
    const trimmedMessage = form.message.trim();

    if (trimmedName.length < 2) {
      setStatus({type: 'error', message: 'Please enter your name (at least 2 characters).'});
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      setStatus({type: 'error', message: 'Please enter a valid email address.'});
      return;
    }

    if (trimmedMessage.length < 10) {
      setStatus({
        type: 'error',
        message: 'Please provide a brief message (at least 10 characters).',
      });
      return;
    }

    setStatus({type: 'submitting'});

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          name: trimmedName,
          email: trimmedEmail,
          subject: form.subject.trim() || 'Portfolio Inquiry',
          message: trimmedMessage,
        }),
      });

      const payload = (await response.json()) as {ok?: boolean; message?: string; error?: string};

      if (!response.ok || !payload.ok) {
        setStatus({
          type: 'error',
          message: payload.error || 'Unable to send message right now. Please try emailing directly.',
        });
        return;
      }

      setStatus({
        type: 'success',
        message: payload.message || 'Message received. Thank you for reaching out!',
      });
      setForm({name: '', email: '', subject: '', message: ''});
    } catch {
      setStatus({
        type: 'error',
        message: 'Network error while sending your message. Please email kundan55xi@gmail.com.',
      });
    }
  };

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="border-t border-zinc-400/75 dark:border-zinc-800/80 py-10 sm:py-14"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Direct Details */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <h2
                id="contact-heading"
                className="font-display text-2xl sm:text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50"
              >
                Get in Touch
              </h2>
              <p className="mt-3 text-sm sm:text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
                Seeking entry-level Software Engineering, Full Stack, and Cloud / DevOps roles. Open to discussing engineering teams, internships, or full-time opportunities.
              </p>
            </div>

            <div className="space-y-3 border-t border-zinc-400/75 dark:border-zinc-800/80 pt-6">
              <div className="flex items-center justify-between gap-3 rounded-lg border border-zinc-400/75 dark:border-zinc-800 bg-white dark:bg-[#111114] shadow-sm dark:shadow-none px-4 py-3">
                <a
                  href={`mailto:${PROFILE.email}`}
                  className="flex items-center gap-3 text-sm font-medium text-zinc-900 dark:text-zinc-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors truncate"
                >
                  <Mail className="h-4 w-4 shrink-0 text-blue-600 dark:text-blue-400" aria-hidden="true" />
                  <span className="truncate">{PROFILE.email}</span>
                </a>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  aria-label="Copy email address"
                  className="inline-flex h-8 items-center gap-1.5 rounded-md border border-zinc-400/80 dark:border-zinc-800 bg-zinc-100 dark:bg-transparent px-2.5 text-xs font-medium text-zinc-800 dark:text-zinc-300 hover:bg-zinc-200/70 dark:hover:bg-zinc-900 transition-colors shrink-0 cursor-pointer"
                >
                  {copiedEmail ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-emerald-500" aria-hidden="true" />
                      <span>Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

              <a
                href={PROFILE.phoneHref}
                className="flex items-center gap-3 rounded-lg border border-zinc-400/75 dark:border-zinc-800 bg-white dark:bg-[#111114] shadow-sm dark:shadow-none px-4 py-3 text-sm font-medium font-mono tabular-nums text-zinc-900 dark:text-zinc-100 hover:border-zinc-500 dark:hover:border-zinc-700 transition-colors"
              >
                <Phone className="h-4 w-4 shrink-0 text-blue-600 dark:text-blue-400" aria-hidden="true" />
                <span>{PROFILE.phone}</span>
              </a>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <a
                  href={PROFILE.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-10 items-center gap-2 rounded-lg border border-zinc-400/75 dark:border-zinc-800 bg-white dark:bg-[#111114] shadow-sm dark:shadow-none px-4 text-sm font-medium text-zinc-800 dark:text-zinc-200 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors"
                >
                  <Linkedin className="h-4 w-4 text-blue-600 dark:text-blue-400" aria-hidden="true" />
                  <span>LinkedIn</span>
                </a>
                <a
                  href={PROFILE.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-10 items-center gap-2 rounded-lg border border-zinc-400/75 dark:border-zinc-800 bg-white dark:bg-[#111114] shadow-sm dark:shadow-none px-4 text-sm font-medium text-zinc-800 dark:text-zinc-200 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors"
                >
                  <Github className="h-4 w-4 text-blue-600 dark:text-blue-400" aria-hidden="true" />
                  <span>GitHub</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <form
              onSubmit={handleSubmit}
              noValidate
              className="rounded-xl border border-zinc-400/75 dark:border-zinc-800 bg-white dark:bg-[#111114] shadow-sm dark:shadow-none p-6 sm:p-8 space-y-5"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label
                    htmlFor="contact-name"
                    className="block text-sm font-medium text-zinc-800 dark:text-zinc-200"
                  >
                    Name
                  </label>
                  <Input
                    id="contact-name"
                    name="name"
                    type="text"
                    required
                    autoComplete="name"
                    placeholder="Recruiter or Hiring Manager"
                    value={form.name}
                    onChange={(e) => setForm((prev) => ({...prev, name: e.target.value}))}
                  />
                </div>

                <div className="space-y-1.5">
                  <label
                    htmlFor="contact-email"
                    className="block text-sm font-medium text-zinc-800 dark:text-zinc-200"
                  >
                    Email
                  </label>
                  <Input
                    id="contact-email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    placeholder="you@company.com"
                    value={form.email}
                    onChange={(e) => setForm((prev) => ({...prev, email: e.target.value}))}
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label
                  htmlFor="contact-subject"
                  className="block text-sm font-medium text-zinc-800 dark:text-zinc-200"
                >
                  Subject
                </label>
                <Input
                  id="contact-subject"
                  name="subject"
                  type="text"
                  placeholder="Software Engineer Role / Interview"
                  value={form.subject}
                  onChange={(e) => setForm((prev) => ({...prev, subject: e.target.value}))}
                />
              </div>

              <div className="space-y-1.5">
                <label
                  htmlFor="contact-message"
                  className="block text-sm font-medium text-zinc-800 dark:text-zinc-200"
                >
                  Message
                </label>
                <Textarea
                  id="contact-message"
                  name="message"
                  required
                  placeholder="Share role details, team context, or preferred interview slots..."
                  value={form.message}
                  onChange={(e) => setForm((prev) => ({...prev, message: e.target.value}))}
                />
              </div>

              <div aria-live="polite" className="min-h-[24px]">
                {status.type === 'error' && (
                  <p
                    role="alert"
                    className="rounded-lg border border-red-300 dark:border-red-900/60 bg-red-50 dark:bg-red-950/30 px-3.5 py-2.5 text-sm text-red-700 dark:text-red-300"
                  >
                    {status.message}
                  </p>
                )}
                {status.type === 'success' && (
                  <p
                    role="status"
                    className="rounded-lg border border-emerald-300 dark:border-emerald-900/60 bg-emerald-50 dark:bg-emerald-950/30 px-3.5 py-2.5 text-sm text-emerald-800 dark:text-emerald-300"
                  >
                    {status.message}
                  </p>
                )}
              </div>

              <div className="flex items-center justify-end">
                <Button type="submit" disabled={status.type === 'submitting'}>
                  {status.type === 'submitting' ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" aria-hidden="true" />
                      <span>Send Message</span>
                    </>
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
