import type {IncomingMessage, ServerResponse} from 'node:http';

interface ContactPayload {
  name?: unknown;
  email?: unknown;
  subject?: unknown;
  message?: unknown;
}

type VercelRequest = IncomingMessage & {
  body?: unknown;
};

function sendJson(res: ServerResponse, statusCode: number, data: Record<string, unknown>) {
  res.statusCode = statusCode;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.end(JSON.stringify(data));
}

async function readJsonBody(req: VercelRequest): Promise<ContactPayload> {
  if (req.body && typeof req.body === 'object') {
    return req.body as ContactPayload;
  }
  if (typeof req.body === 'string') {
    try {
      return JSON.parse(req.body) as ContactPayload;
    } catch {
      return {};
    }
  }
  const chunks: Buffer[] = [];
  for await (const chunk of req) {
    chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
  }
  if (chunks.length === 0) return {};
  try {
    return JSON.parse(Buffer.concat(chunks).toString('utf8')) as ContactPayload;
  } catch {
    return {};
  }
}

export default async function handler(req: VercelRequest, res: ServerResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    sendJson(res, 405, {ok: false, error: 'Method not allowed'});
    return;
  }

  const body = await readJsonBody(req);
  const name = typeof body.name === 'string' ? body.name.trim() : '';
  const email = typeof body.email === 'string' ? body.email.trim() : '';
  const subject = typeof body.subject === 'string' ? body.subject.trim() : 'Portfolio Inquiry';
  const message = typeof body.message === 'string' ? body.message.trim() : '';

  if (name.length < 2 || name.length > 120) {
    sendJson(res, 400, {ok: false, error: 'Please provide a valid name (2-120 characters).'});
    return;
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 180) {
    sendJson(res, 400, {ok: false, error: 'Please provide a valid email address.'});
    return;
  }

  if (message.length < 10 || message.length > 5000) {
    sendJson(res, 400, {ok: false, error: 'Message must be between 10 and 5000 characters.'});
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
        sendJson(res, 502, {
          ok: false,
          error: 'Email delivery provider returned an error. Please email kundan55xi@gmail.com directly.',
        });
        return;
      }

      sendJson(res, 200, {
        ok: true,
        message: 'Your message has been sent to Kundan Singh. Thank you for reaching out!',
      });
      return;
    } catch {
      sendJson(res, 502, {
        ok: false,
        error: 'Could not reach email service. Please email kundan55xi@gmail.com directly.',
      });
      return;
    }
  }

  console.info('[Vercel Contact Inquiry]', {
    name,
    email,
    subject,
    timestamp: new Date().toISOString(),
  });

  sendJson(res, 200, {
    ok: true,
    message: 'Message received! Thank you for reaching out — Kundan will respond shortly.',
  });
}
