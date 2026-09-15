import { createContext, useContext, useState, type ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CallbackForm, VisitForm } from "@/components/landing/LeadForm";

export type LeadFormType = "callback" | "visit";

type LeadFormContextValue = {
  openLeadForm: (type: LeadFormType) => void;
};

const LeadFormContext = createContext<LeadFormContextValue | null>(null);

export function useLeadForm() {
  const ctx = useContext(LeadFormContext);
  if (!ctx) throw new Error("useLeadForm must be used within LeadFormProvider");
  return ctx;
}

const COPY: Record<LeadFormType, { title: string; description: string }> = {
  callback: {
    title: "Request a call back",
    description: "Share a few details and our admissions team will call you.",
  },
  visit: {
    title: "Book a campus visit",
    description: "Tell us about your child and we will help you plan a visit.",
  },
};

export function LeadFormProvider({ children }: { children: ReactNode }) {
  const [type, setType] = useState<LeadFormType | null>(null);

  return (
    <LeadFormContext.Provider value={{ openLeadForm: setType }}>
      {children}
      <Dialog open={type !== null} onOpenChange={(open) => { if (!open) setType(null); }}>
        <DialogContent className="max-h-[90vh] w-[calc(100%-1.5rem)] max-w-lg overflow-visible rounded-none border-[var(--grey-300)] bg-[var(--ws-paper)] p-6 sm:rounded-none">
          {type ? (
            <>
              <DialogHeader className="pr-8 text-left">
                <DialogTitle className="text-2xl md:text-3xl font-medium tracking-normal">
                  {COPY[type].title}
                </DialogTitle>
                <DialogDescription className="text-sm text-[var(--grey-700)]">
                  {COPY[type].description}
                </DialogDescription>
              </DialogHeader>
              <div className="mt-2">
                {type === "callback" ? <CallbackForm key="callback" /> : <VisitForm key="visit" />}
              </div>
            </>
          ) : null}
        </DialogContent>
      </Dialog>
    </LeadFormContext.Provider>
  );
}

const ctaBase = "group inline-flex items-center gap-2 px-6 py-4 text-sm font-medium transition-colors";
const ctaStyles: Record<string, string> = {
  solid: "bg-[var(--ws-ink)] text-[var(--ws-paper)] hover:bg-[var(--coral-600)]",
  coral: "bg-[var(--coral-600)] text-white hover:bg-[var(--ws-ink)]",
  outline:
    "border border-[var(--ws-ink)] text-[var(--ws-ink)] hover:bg-[var(--ws-ink)] hover:text-[var(--ws-paper)]",
  paper:
    "border border-[var(--ws-paper)]/60 text-[var(--ws-paper)] hover:bg-[var(--ws-paper)] hover:text-[var(--ws-ink)]",
};

export function LeadCta({
  form,
  children,
  variant = "solid",
  className,
}: {
  form: LeadFormType;
  children: ReactNode;
  variant?: "solid" | "outline" | "coral" | "paper";
  className?: string;
}) {
  const { openLeadForm } = useLeadForm();
  return (
    <button
      type="button"
      onClick={() => openLeadForm(form)}
      className={className ?? `${ctaBase} ${ctaStyles[variant]}`}
    >
      {children}
      {className ? null : (
        <ArrowRight size={16} strokeWidth={1.8} className="transition-transform group-hover:translate-x-1" />
      )}
    </button>
  );
}
