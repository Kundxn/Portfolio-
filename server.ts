import express from 'express';
import fs from 'fs';
import path from 'path';
import {fileURLToPath} from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = Number(process.env.PORT) || 3000;

interface ContactPayload {
  name?: unknown;
  email?: unknown;
  subject?: unknown;
  message?: unknown;
}

function escapePdfText(text: string): string {
  return text
    .replace(/\\/g, '\\\\')
    .replace(/\(/g, '\\(')
    .replace(/\)/g, '\\)')
    .replace(/[^\x20-\x7E]/g, '-');
}

function buildResumePdfBuffer(): Buffer {
  const lines: Array<{text: string; size: number; bold?: boolean; gap?: number}> = [
    {text: 'KUNDAN SINGH', size: 18, bold: true, gap: 20},
    {text: 'Full Stack Developer | Cloud & DevOps', size: 11, bold: true, gap: 16},
    {
      text: 'Email: kundan55xi@gmail.com  |  Phone: +91 7727932990  |  Chandigarh, India',
      size: 9,
      gap: 20,
    },
    {text: 'SUMMARY', size: 11, bold: true, gap: 14},
    {
      text: 'B.E. CSE (Cloud Computing) graduate building fast, scalable web apps with React/Next.js,',
      size: 9.5,
      gap: 13,
    },
    {
      text: 'Node.js, and Spring Boot, deployed on AWS and Azure with Docker, Kubernetes, and CI/CD.',
      size: 9.5,
      gap: 18,
    },
    {text: 'EXPERIENCE', size: 11, bold: true, gap: 14},
    {
      text: 'Full Stack Developer - Rabtech Academy (Remote) | Jun 2026 - Nov 2026',
      size: 9.5,
      bold: true,
      gap: 13,
    },
    {
      text: '- Built responsive layouts across mobile, tablet, and desktop using modern CSS, Grid, and Flexbox.',
      size: 9,
      gap: 12,
    },
    {
      text: '- Integrated RESTful APIs with asynchronous JavaScript (ES6+) to fetch live data and manage state.',
      size: 9,
      gap: 12,
    },
    {
      text: '- Engineered a production-ready web capstone and deployed it via Vercel, Netlify, or GitHub Pages.',
      size: 9,
      gap: 12,
    },
    {
      text: '- Structured modular UI components and maintained Git workflows with cross-browser accessibility checks.',
      size: 9,
      gap: 16,
    },
    {
      text: 'Full Stack Developer - Rightway Auto Delivery Ltd. (Remote) | Oct 2025 - Apr 2026',
      size: 9.5,
      bold: true,
      gap: 13,
    },
    {
      text: '- Built production Next.js + Tailwind CSS site with custom scheduling (+60% online bookings).',
      size: 9,
      gap: 12,
    },
    {
      text: '- Optimized web architecture and SEO, reducing LCP from 5s to under 1s (100+ monthly clicks).',
      size: 9,
      gap: 12,
    },
    {
      text: '- Engineered React + Node.js admin dashboard over relational DB (-70% manual processing).',
      size: 9,
      gap: 12,
    },
    {
      text: '- Automated CI/CD pipelines for zero-downtime deployments, sustaining 99.9% uptime.',
      size: 9,
      gap: 18,
    },
    {text: 'PROJECTS', size: 11, bold: true, gap: 14},
    {
      text: 'RightWay Auto Delivery (Next.js, Tailwind CSS, Node.js, Relational DB)',
      size: 9.5,
      bold: true,
      gap: 12,
    },
    {
      text: 'Production e-commerce platform with 99/100 Lighthouse score, LCP <1s, and admin console.',
      size: 9,
      gap: 15,
    },
    {
      text: 'Phoenix Compiler (Spring Boot, Java, Maven, React, Docker)',
      size: 9.5,
      bold: true,
      gap: 12,
    },
    {
      text: 'Online IDE supporting 12+ languages in isolated Docker sandboxes with global error handling.',
      size: 9,
      gap: 18,
    },
    {text: 'TECHNICAL SKILLS', size: 11, bold: true, gap: 14},
    {text: 'Languages: Java, JavaScript (ES6+), Python, SQL', size: 9, gap: 12},
    {text: 'Frontend: HTML5, CSS3, React, Next.js, Tailwind CSS, Shadcn UI', size: 9, gap: 12},
    {
      text: 'Backend & DB: Node.js, Express.js, Spring Boot, REST, WebSockets, JWT, Bun, MongoDB, PostgreSQL, MySQL',
      size: 9,
      gap: 12,
    },
    {
      text: 'Cloud & DevOps: AWS (EC2, S3), Azure, Docker, Kubernetes, Jenkins, GitHub Actions, CI/CD, Linux',
      size: 9,
      gap: 18,
    },
    {text: 'CERTIFICATIONS & EDUCATION', size: 11, bold: true, gap: 14},
    {
      text: '- AWS Certified AI Practitioner (AIF-C01) | Microsoft Certified: Azure Fundamentals (AZ-900)',
      size: 9,
      gap: 12,
    },
    {
      text: '- Oracle Cloud Infrastructure 2024 Generative AI Certified Professional',
      size: 9,
      gap: 12,
    },
    {
      text: '- Cloud Computing Concepts (University of Illinois) | Scientific Computing with Python (freeCodeCamp)',
      size: 9,
      gap: 14,
    },
    {
      text: 'B.E. in Computer Science & Engineering (Cloud Computing) - Chandigarh University (2022 - 2026)',
      size: 9.5,
      bold: true,
      gap: 12,
    },
  ];

  const commands: string[] = ['BT'];
  let y = 760;
  for (const line of lines) {
    const fontRef = line.bold ? '/F2' : '/F1';
    commands.push(`${fontRef} ${line.size} Tf`);
    commands.push(`1 0 0 1 48 ${y} Tm`);
    commands.push(`(${escapePdfText(line.text)}) Tj`);
    y -= line.gap ?? 14;
  }
  commands.push('ET');
  const stream = commands.join('\n');

  const objects: string[] = [
    '1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n',
    '2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n',
    '3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 4 0 R /Resources << /Font << /F1 5 0 R /F2 6 0 R >> >> >>\nendobj\n',
    `4 0 obj\n<< /Length ${Buffer.byteLength(stream, 'utf8')} >>\nstream\n${stream}\nendstream\nendobj\n`,
    '5 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>\nendobj\n',
    '6 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>\nendobj\n',
  ];

  let pdf = '%PDF-1.4\n';
  const offsets: number[] = [0];
  for (const obj of objects) {
    offsets.push(Buffer.byteLength(pdf, 'utf8'));
    pdf += obj;
  }

  const xrefOffset = Buffer.byteLength(pdf, 'utf8');
  pdf += `xref\n0 ${objects.length + 1}\n`;
  pdf += '0000000000 65535 f \n';
  for (let i = 1; i < offsets.length; i += 1) {
    pdf += `${String(offsets[i]).padStart(10, '0')} 00000 n \n`;
  }
  pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF\n`;

  return Buffer.from(pdf, 'utf8');
}

async function startServer() {
  const app = express();
  app.use(express.json({limit: '64kb'}));

  app.post('/api/contact', async (req, res) => {
    const body = (req.body || {}) as ContactPayload;
    const name = typeof body.name === 'string' ? body.name.trim() : '';
    const email = typeof body.email === 'string' ? body.email.trim() : '';
    const subject = typeof body.subject === 'string' ? body.subject.trim() : 'Portfolio Inquiry';
    const message = typeof body.message === 'string' ? body.message.trim() : '';

    if (name.length < 2 || name.length > 120) {
      res.status(400).json({ok: false, error: 'Please provide a valid name (2-120 characters).'});
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 180) {
      res.status(400).json({ok: false, error: 'Please provide a valid email address.'});
      return;
    }

    if (message.length < 10 || message.length > 5000) {
      res.status(400).json({
        ok: false,
        error: 'Message must be between 10 and 5000 characters.',
      });
      return;
    }

    const resendKey = process.env.RESEND_API_KEY;
    const recipient = process.env.CONTACT_TO_EMAIL || 'kundan55xi@gmail.com';
    const fromEmail = process.env.CONTACT_FROM_EMAIL || 'Portfolio Contact <onboarding@resend.dev>';

    if (resendKey) {
      try {
        const resendRes = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${resendKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: fromEmail,
            to: [recipient],
            reply_to: email,
            subject: `[Portfolio] ${subject}`,
            text: `From: ${name} <${email}>\nSubject: ${subject}\n\n${message}`,
          }),
        });

        if (!resendRes.ok) {
          const errText = await resendRes.text();
          console.error('Resend API error:', resendRes.status, errText);
          res.status(502).json({
            ok: false,
            error: 'Email delivery provider returned an error. Please email kundan55xi@gmail.com directly.',
          });
          return;
        }

        res.json({
          ok: true,
          message: 'Your message has been sent to Kundan Singh. Thank you for reaching out!',
        });
        return;
      } catch (err) {
        console.error('Contact send error:', err);
        res.status(502).json({
          ok: false,
          error: 'Could not reach email service. Please email kundan55xi@gmail.com directly.',
        });
        return;
      }
    }

    // Preview / local mode without RESEND_API_KEY configured
    console.info('[Contact Inquiry]', {name, email, subject, timestamp: new Date().toISOString()});
    res.json({
      ok: true,
      message: 'Message received! Thank you for reaching out — Kundan will respond shortly.',
    });
  });

  app.get('/resume.pdf', (_req, res) => {
    const customPdfPath = path.resolve(__dirname, 'public', 'resume.pdf');
    if (fs.existsSync(customPdfPath)) {
      res.sendFile(customPdfPath);
      return;
    }
    const buffer = buildResumePdfBuffer();
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename="Kundan_Singh_Resume.pdf"');
    res.setHeader('Content-Length', String(buffer.length));
    res.send(buffer);
  });

  app.get('/sitemap.xml', (req, res) => {
    const baseUrl =
      process.env.APP_URL || `${req.protocol}://${req.get('host') || 'localhost:3000'}`;
    const lastMod = new Date().toISOString().split('T')[0];
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}/</loc>
    <lastmod>${lastMod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>`;
    res.setHeader('Content-Type', 'application/xml');
    res.send(xml);
  });

  app.get('/robots.txt', (req, res) => {
    const baseUrl =
      process.env.APP_URL || `${req.protocol}://${req.get('host') || 'localhost:3000'}`;
    res.setHeader('Content-Type', 'text/plain');
    res.send(`User-agent: *\nAllow: /\nSitemap: ${baseUrl}/sitemap.xml\n`);
  });

  if (process.env.NODE_ENV !== 'production') {
    const {createServer: createViteServer} = await import('vite');
    const vite = await createViteServer({
      server: {middlewareMode: true},
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distDir = path.resolve(__dirname, 'dist');
    app.use(express.static(distDir));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distDir, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
