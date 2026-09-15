import { useState, type FormEvent } from "react";
import { ArrowRight, Check, Phone } from "lucide-react";
import { PHONE_DISPLAY, PHONE_TEL } from "@/lib/leads/contact";
import { GRADE_OPTIONS } from "@/lib/leads/grade";
import { splitParentName } from "@/lib/leads/names";
import { enquiryFormSchema, visitBookingFormSchema } from "@/lib/leads/schemas";
import { submitEnquiry, submitVisitBooking } from "@/lib/leads/submit-lead";
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

function phoneFromForm(fd: FormData): { phone: string; error: string | null } {
  const phone = String(fd.get("mobile") ?? "").trim();
  const valid = String(fd.get("phoneValid") ?? "") === "1";
  const iso = String(fd.get("countryIso") ?? "IN").toUpperCase();

  if (!phone) return { phone, error: "Please enter a phone number" };
  if (!valid) {
    if (iso === "IN") return { phone, error: "Please enter a valid 10-digit Indian mobile number" };
    return { phone, error: "Please enter a valid phone number for the selected country" };
  }
  return { phone, error: null };
}

export function VisitForm() {
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (sent) return <Sent label="Thank you — your visit request is in." />;

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    const fd = new FormData(e.currentTarget);
    const parent = splitParentName(String(fd.get("parent") ?? ""));
    const { phone, error: phoneError } = phoneFromForm(fd);
    if (phoneError) {
      setError(phoneError);
      setSubmitting(false);
      return;
    }

    const payload = {
      ...parent,
      phone,
      email: String(fd.get("email") ?? ""),
      childName: String(fd.get("child") ?? ""),
      grade: String(fd.get("grade") ?? ""),
    };

    const parsed = enquiryFormSchema.safeParse(payload);
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? "Please check the form and try again.");
      setSubmitting(false);
      return;
    }

    try {
      await submitEnquiry(parsed.data);
      setSent(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again or call us.");
    } finally {
      setSubmitting(false);
    }
  }

  const phoneError = Boolean(
    error?.toLowerCase().includes("number") ||
      error?.toLowerCase().includes("phone") ||
      error?.toLowerCase().includes("mobile"),
  );

  return (
    <form onSubmit={onSubmit} className="space-y-3">
      <div className="grid gap-3 sm:grid-cols-2">
        <input required name="parent" placeholder="Parent name" maxLength={80} className={fieldClass} disabled={submitting} />
        <input required name="child" placeholder="Child's name" maxLength={100} className={fieldClass} disabled={submitting} />
      </div>
      <PhoneInput disabled={submitting} error={phoneError} />
      <div className="grid gap-3 sm:grid-cols-2">
        <select required name="grade" defaultValue="" className={fieldClass} disabled={submitting}>
          <option value="" disabled>
            Grade applying for
          </option>
          {GRADE_OPTIONS.map((g) => (
            <option key={g} value={g}>
              {g}
            </option>
          ))}
        </select>
        <input
          required
          name="email"
          type="email"
          placeholder="Email address"
          className={fieldClass}
          disabled={submitting}
        />
      </div>
      {error ? <FormError message={error} /> : null}
      <div className="grid gap-3 sm:gap-px sm:bg-[var(--grey-300)]">
        <button
          type="submit"
          disabled={submitting}
          className="group inline-flex w-full items-center justify-center gap-2 bg-[var(--coral-600)] px-6 py-4 font-mono text-[12px] uppercase tracking-[0.18em] text-white transition-colors hover:bg-[var(--ws-ink)] disabled:pointer-events-none disabled:opacity-60"
        >
          {submitting ? "Sending…" : "Request a Campus Visit"}
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
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (sent) return <Sent label="Thank you — we'll call you back." />;

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    const fd = new FormData(e.currentTarget);
    const parent = splitParentName(String(fd.get("parent") ?? ""));
    const { phone, error: phoneError } = phoneFromForm(fd);
    if (phoneError) {
      setError(phoneError);
      setSubmitting(false);
      return;
    }

    const payload = {
      studentName: parent.parentFirstName,
      ...parent,
      phone,
      grade: String(fd.get("grade") ?? ""),
      comments: "Callback request from website",
    };

    const parsed = visitBookingFormSchema.safeParse(payload);
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? "Please check the form and try again.");
      setSubmitting(false);
      return;
    }

    try {
      await submitVisitBooking(parsed.data);
      setSent(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again or call us.");
    } finally {
      setSubmitting(false);
    }
  }

  const phoneError = Boolean(
    error?.toLowerCase().includes("number") ||
      error?.toLowerCase().includes("phone") ||
      error?.toLowerCase().includes("mobile"),
  );

  return (
    <form onSubmit={onSubmit} className="space-y-3">
      <input required name="parent" placeholder="Parent name" maxLength={80} className={fieldClass} disabled={submitting} />
      <PhoneInput disabled={submitting} error={phoneError} />
      <select required name="grade" defaultValue="" className={fieldClass} disabled={submitting}>
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
        disabled={submitting}
        className="inline-flex w-full items-center justify-center gap-2 bg-[var(--ws-ink)] px-6 py-4 font-mono text-[12px] uppercase tracking-[0.18em] text-white transition-colors hover:bg-[var(--coral-600)] disabled:pointer-events-none disabled:opacity-60"
      >
        {submitting ? "Sending…" : "Request a Call Back"}
        <ArrowRight size={16} strokeWidth={2} />
      </button>
    </form>
  );
}
