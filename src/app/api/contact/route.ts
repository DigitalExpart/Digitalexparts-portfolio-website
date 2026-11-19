import { NextRequest, NextResponse } from "next/server";
import { SITE } from "@/data/site";

interface ContactPayload {
  name?: string;
  email?: string;
  service?: string;
  budget?: string;
  message?: string;
  website?: string; // honeypot
}

const RATE_WINDOW_MS = 10 * 60 * 1000;
const RATE_MAX_REQUESTS = 5;
const rateStore = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const prev = (rateStore.get(ip) || []).filter((t) => now - t < RATE_WINDOW_MS);
  if (prev.length >= RATE_MAX_REQUESTS) {
    rateStore.set(ip, prev);
    return true;
  }
  prev.push(now);
  rateStore.set(ip, prev);
  return false;
}

function escapeHtml(input: string): string {
  return input
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

export async function POST(request: NextRequest) {
  let body: ContactPayload;
  try {
    body = (await request.json()) as ContactPayload;
  } catch {
    return NextResponse.json(
      { error: "Invalid request payload." },
      { status: 400 }
    );
  }

  // Honeypot trap: silently accept bot submissions without triggering delivery
  if (body.website && body.website.trim().length > 0) {
    return NextResponse.json({ ok: true });
  }

  const name = (body.name || "").trim();
  const email = (body.email || "").trim();
  const service = (body.service || "Not specified").trim();
  const budget = (body.budget || "Not specified").trim();
  const message = (body.message || "").trim();

  if (name.length < 2 || name.length > 120) {
    return NextResponse.json(
      { error: "Please enter your name (at least 2 characters)." },
      { status: 400 }
    );
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 200) {
    return NextResponse.json(
      { error: "Please enter a valid email address." },
      { status: 400 }
    );
  }

  if (message.length < 20 || message.length > 5000) {
    return NextResponse.json(
      { error: "Please share at least 20 characters about your project." },
      { status: 400 }
    );
  }

  const forwardedFor = request.headers.get("x-forwarded-for");
  const clientIp = forwardedFor ? forwardedFor.split(",")[0].trim() : "local";
  if (isRateLimited(clientIp)) {
    return NextResponse.json(
      {
        error: `Too many requests in a short window. Please wait a few minutes or email ${SITE.email}.`,
      },
      { status: 429 }
    );
  }

  const resendKey = process.env.RESEND_API_KEY?.trim();
  const toEmail = process.env.CONTACT_TO_EMAIL?.trim();
  const fromEmail =
    process.env.CONTACT_FROM_EMAIL?.trim() ||
    `${SITE.brand} <onboarding@resend.dev>`;
  const formspreeEndpoint = process.env.FORMSPREE_ENDPOINT?.trim();

  // Option 1: Resend
  if (resendKey && toEmail && !toEmail.startsWith("[")) {
    const html = `
      <div style="font-family:Inter,Arial,sans-serif;line-height:1.6;color:#111;">
        <h2>New ${escapeHtml(SITE.brand)} Project Inquiry</h2>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Service:</strong> ${escapeHtml(service)}</p>
        <p><strong>Budget:</strong> ${escapeHtml(budget)}</p>
        <hr />
        <p style="white-space:pre-wrap;">${escapeHtml(message)}</p>
      </div>
    `;

    const resendRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [toEmail],
        reply_to: email,
        subject: `[${SITE.brand}] ${service} inquiry from ${name}`,
        html,
        text: `Name: ${name}\nEmail: ${email}\nService: ${service}\nBudget: ${budget}\n\n${message}`,
      }),
    });

    if (!resendRes.ok) {
      return NextResponse.json(
        {
          error: `Email delivery failed. Please reach out directly at ${SITE.email}.`,
        },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true, provider: "resend" });
  }

  // Option 2: Formspree
  if (formspreeEndpoint) {
    const fsRes = await fetch(formspreeEndpoint, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        service,
        budget,
        message,
        _subject: `[${SITE.brand}] ${service} inquiry from ${name}`,
      }),
    });

    if (!fsRes.ok) {
      return NextResponse.json(
        {
          error: `Form relay failed. Please email ${SITE.email} directly.`,
        },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true, provider: "formspree" });
  }

  // Local development preview fallback when no provider env vars are configured yet
  if (process.env.NODE_ENV !== "production") {
    console.info("[Digital Experts Contact Preview]", {
      name,
      email,
      service,
      budget,
      messageLength: message.length,
    });
    return NextResponse.json({ ok: true, provider: "dev-preview" });
  }

  return NextResponse.json(
    {
      error: `Contact form delivery is not configured yet. Please email ${SITE.email} directly.`,
    },
    { status: 503 }
  );
}
