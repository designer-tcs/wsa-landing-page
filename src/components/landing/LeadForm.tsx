import { useState, type FormEvent } from "react";
import { ArrowRight, Check, Phone } from "lucide-react";
import { PHONE_DISPLAY, PHONE_TEL } from "@/lib/leads/contact";
import { validatePhoneForCountry } from "@/lib/leads/countries";
import { GRADE_OPTIONS } from "@/lib/leads/grade";
import { PhoneInput } from "@/components/landing/PhoneInput";

const fieldClass =
  "w-full border border-[var(--grey-300)] bg-white px-3.5 py-3 text-sm text-[var(--ws-ink)] outline-none transition-colors placeholder:text-[var(--grey-500)] focus:border-[var(--ws-ink)] disabled:opacity-60";

function Sent({ label }: { label: string }) {
  return (
    <div className="flex flex-col items-start gap-3 border border-[var(--sage-400)] bg-[var(--sage-200)]/50 px-5 py-6">
      <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[var(--sage-700)] text-white">
        <Check size={18} strokeWidth={2} />
      </span>
      <p className="text-lg">{label}</p>
      <p className="text-sm text-[var(--grey-700)]">
        Our admissions team will reach out shortly. If you would rather speak now, call{" "}
        <a href={`tel:${PHONE_TEL}`} className="underline">
          {PHONE_DISPLAY}
        </a>
        .
      </p>
    </div>
  );
}

function FormError({ message }: { message: string }) {
  return (
    <p className="text-sm text-[var(--coral-600)]" role="alert">
      {message}
    </p>
  );
}

function phoneErrorFromForm(fd: FormData): string | null {
  const iso = String(fd.get("countryIso") ?? "IN").toUpperCase();
  const national = String(fd.get("phoneNational") ?? "").trim();
  return validatePhoneForCountry(iso, national);
}

export function VisitForm() {
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (sent) return <Sent label="Thank you — your visit request is in." />;

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const phoneError = phoneErrorFromForm(new FormData(e.currentTarget));
    if (phoneError) {
      setError(phoneError);
      return;
    }
    setSent(true);
  }

  const phoneError = Boolean(
    error?.toLowerCase().includes("number") ||
      error?.toLowerCase().includes("phone") ||
      error?.toLowerCase().includes("mobile"),
  );

  return (
    <form onSubmit={onSubmit} className="space-y-3">
      <div className="grid gap-3 sm:grid-cols-2">
        <input required name="parent" placeholder="Parent name" maxLength={80} className={fieldClass} />
        <input required name="child" placeholder="Child's name" maxLength={100} className={fieldClass} />
      </div>
      <PhoneInput error={phoneError} />
      <div className="grid gap-3 sm:grid-cols-2">
        <select required name="grade" defaultValue="" className={fieldClass}>
          <option value="" disabled>
            Grade applying for
          </option>
          {GRADE_OPTIONS.map((g) => (
            <option key={g} value={g}>
              {g}
            </option>
          ))}
        </select>
        <input required name="email" type="email" placeholder="Email address" className={fieldClass} />
      </div>
      {error ? <FormError message={error} /> : null}
      <div className="grid gap-3 sm:gap-px sm:bg-[var(--grey-300)]">
        <button
          type="submit"
          className="group inline-flex w-full items-center justify-center gap-2 bg-[var(--coral-600)] px-6 py-4 font-mono text-[12px] uppercase tracking-[0.18em] text-white transition-colors hover:bg-[var(--ws-ink)]"
        >
          Request a Campus Visit
          <ArrowRight size={16} strokeWidth={2} className="transition-transform group-hover:translate-x-1" />
        </button>
        <a
          href={`tel:${PHONE_TEL}`}
          className="[clip-path:polygon(10px_0,100%_0,100%_calc(100%-10px),calc(100%-10px)_100%,0_100%,0_10px)] inline-flex w-full items-center justify-center gap-2 border-2 border-[var(--ws-ink)] bg-white px-6 py-3.5 font-mono text-[12px] uppercase tracking-[0.18em] text-[var(--ws-ink)] transition-colors hover:bg-[var(--ws-ink)] hover:text-white sm:border-0 sm:bg-[var(--ws-paper)] sm:py-4 sm:[clip-path:none]"
        >
          <Phone size={15} strokeWidth={1.8} />
          Call Admissions: {PHONE_DISPLAY}
        </a>
      </div>
    </form>
  );
}

export function CallbackForm() {
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (sent) return <Sent label="Thank you — we'll call you back." />;

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const phoneError = phoneErrorFromForm(new FormData(e.currentTarget));
    if (phoneError) {
      setError(phoneError);
      return;
    }
    setSent(true);
  }

  const phoneError = Boolean(
    error?.toLowerCase().includes("number") ||
      error?.toLowerCase().includes("phone") ||
      error?.toLowerCase().includes("mobile"),
  );

  return (
    <form onSubmit={onSubmit} className="space-y-3">
      <input required name="parent" placeholder="Parent name" maxLength={80} className={fieldClass} />
      <PhoneInput error={phoneError} />
      <select required name="grade" defaultValue="" className={fieldClass}>
        <option value="" disabled>
          Grade looking for
        </option>
        {GRADE_OPTIONS.map((g) => (
          <option key={g} value={g}>
            {g}
          </option>
        ))}
      </select>
      {error ? <FormError message={error} /> : null}
      <button
        type="submit"
        className="inline-flex w-full items-center justify-center gap-2 bg-[var(--ws-ink)] px-6 py-4 font-mono text-[12px] uppercase tracking-[0.18em] text-white transition-colors hover:bg-[var(--coral-600)]"
      >
        Request a Call Back
        <ArrowRight size={16} strokeWidth={2} />
      </button>
    </form>
  );
}
