import { Outlet, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { Phone, CalendarCheck } from "lucide-react";
import appCss from "../styles.css?url";
import logoMark from "@/assets/wellsprings-logo.png";
import { PHONE_DISPLAY, PHONE_TEL } from "@/lib/leads/contact";
import { LeadCta, LeadFormProvider } from "@/components/landing/LeadFormModal";

export { PHONE_DISPLAY, PHONE_TEL } from "@/lib/leads/contact";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center px-6">
      <div className="max-w-md text-center">
        <p className="sl-section-num text-[var(--grey-700)]">404</p>
        <h1 className="mt-3 text-5xl">Page not found.</h1>
        <a
          href="/"
          className="mt-6 inline-flex items-center justify-center bg-[var(--ws-ink)] px-5 py-3 text-sm font-medium text-[var(--ws-paper)]"
        >
          Back to Wellsprings
        </a>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "author", content: "Wellsprings Academy" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600&family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap",
      },
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "data:," },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return (
    <LeadFormProvider>
      <div className="flex min-h-screen flex-col bg-[var(--ws-paper)] text-[var(--ws-ink)]">
        <header className="sticky top-0 z-40 border-b border-[var(--grey-200)] bg-white/95 backdrop-blur">
          <div className="mx-auto flex w-full max-w-[1320px] items-center justify-between gap-4 px-5 py-2.5 md:px-8">
            <a href="#top" className="flex shrink-0 items-center" aria-label="Wellsprings Academy">
              <img
                src={logoMark}
                alt="Wellsprings Academy"
                className="h-12 w-auto object-contain md:h-16"
              />
            </a>

            <div
              className="hidden font-mono text-[12px] uppercase tracking-[0.32em] lg:flex lg:items-center lg:gap-3"
              aria-hidden
            >
              <span style={{ color: "var(--coral-600)" }}>Think</span>
              <span className="text-[var(--grey-400)]">·</span>
              <span style={{ color: "var(--sun-700)" }}>Build</span>
              <span className="text-[var(--grey-400)]">·</span>
              <span style={{ color: "var(--sage-700)" }}>Belong</span>
            </div>

            <div className="flex items-center gap-2">
              <a
                href={`tel:${PHONE_TEL}`}
                className="hidden items-center gap-2 border border-[var(--grey-300)] px-3 py-2.5 text-xs font-medium transition-colors hover:border-[var(--ws-ink)] sm:inline-flex"
              >
                <Phone size={14} strokeWidth={1.8} />
                {PHONE_DISPLAY}
              </a>
              <LeadCta
                form="callback"
                className="inline-flex items-center gap-2 bg-[var(--ws-ink)] px-4 py-2.5 text-xs font-medium text-[var(--ws-paper)] transition-colors hover:bg-[var(--coral-600)] md:text-sm"
              >
                <CalendarCheck size={15} strokeWidth={1.8} />
                Enquire Now
              </LeadCta>
            </div>
          </div>
        </header>

        <main className="flex-1">
          <Outlet />
        </main>

        {/* Sticky mobile action bar */}
        <div className="fixed bottom-0 left-0 right-0 z-40 grid grid-cols-2 border-t border-[var(--ws-ink)]/15 sm:hidden">
          <LeadCta
            form="callback"
            className="flex items-center justify-center gap-2 bg-white py-4 font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--ws-ink)]"
          >
            <Phone size={14} strokeWidth={1.8} /> Call now
          </LeadCta>
          <LeadCta
            form="visit"
            className="flex items-center justify-center gap-2 bg-[var(--coral-600)] py-4 font-mono text-[11px] uppercase tracking-[0.18em] text-white"
          >
            <CalendarCheck size={14} strokeWidth={1.8} /> Book a visit
          </LeadCta>
        </div>

        <footer className="border-t border-[var(--grey-200)] bg-white pb-20 sm:pb-0">
          <div className="mx-auto flex w-full max-w-[1320px] flex-col gap-2 px-5 py-6 text-xs text-[var(--grey-700)] md:flex-row md:items-center md:justify-between md:px-8">
            <p>
              © {new Date().getFullYear()} Wellsprings Academy · CBSE affiliated · Mugalur Village,
              Sarjapura – Chikka Thirupathi Main Road, Anekal Taluk, Bengaluru 562125
            </p>
            <div className="flex items-center gap-4">
              <a href="/v2" className="text-[var(--grey-600)] hover:text-[var(--ws-ink)]">
                Colour variant
              </a>
              <a href={`tel:${PHONE_TEL}`} className="hover:text-[var(--ws-ink)]">
                {PHONE_DISPLAY}
              </a>
            </div>
          </div>
        </footer>
      </div>
    </LeadFormProvider>
  );
}
