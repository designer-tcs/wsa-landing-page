import { useEffect, useRef, type CSSProperties } from "react";
import flags1x from "intl-tel-input/dist/img/flags.webp?url";
import flags2x from "intl-tel-input/dist/img/flags@2x.webp?url";
import "intl-tel-input/styles";

type PhoneInputProps = {
  disabled?: boolean;
  error?: boolean;
};

export function PhoneInput({ disabled, error }: PhoneInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const e164Ref = useRef<HTMLInputElement>(null);
  const validRef = useRef<HTMLInputElement>(null);
  const isoRef = useRef<HTMLInputElement>(null);
  const itiRef = useRef<{
    destroy: () => void;
    getNumber: () => string;
    isValidNumber: () => boolean | null;
    getSelectedCountry: () => { iso2?: string } | null;
    setDisabled: (disabled: boolean) => void;
    promise: Promise<void>;
  } | null>(null);

  useEffect(() => {
    const input = inputRef.current;
    if (!input) return;
    let cancelled = false;

    function sync() {
      const iti = itiRef.current;
      if (!iti) return;
      const e164 = iti.getNumber() || "";
      const iso = iti.getSelectedCountry()?.iso2?.toUpperCase() ?? "IN";
      if (e164Ref.current) e164Ref.current.value = e164;
      if (validRef.current) validRef.current.value = iti.isValidNumber() ? "1" : "";
      if (isoRef.current) isoRef.current.value = iso;
    }

    void import("intl-tel-input/intlTelInputWithUtils").then((mod) => {
      if (cancelled || !input.isConnected) return;
      const intlTelInput = mod.default;
      const iti = intlTelInput(input, {
        initialCountry: "in",
        countryOrder: ["in"],
        separateDialCode: true,
        strictMode: true,
        formatAsYouType: true,
        countrySearch: true,
        showFlags: true,
        countrySelectorMode: "DROPDOWN",
        dropdownParent: document.body,
        allowedNumberTypes: ["MOBILE"],
        placeholderNumberType: "MOBILE",
        containerClass: "ws-phone-iti",
      });
      itiRef.current = iti;

      input.addEventListener("countrychange", sync);
      input.addEventListener("input", sync);
      void iti.promise.then(() => {
        if (!cancelled) sync();
      });
      sync();
    });

    return () => {
      cancelled = true;
      input.removeEventListener("countrychange", sync);
      input.removeEventListener("input", sync);
      itiRef.current?.destroy();
      itiRef.current = null;
    };
  }, []);

  useEffect(() => {
    itiRef.current?.setDisabled(Boolean(disabled));
  }, [disabled]);

  return (
    <div
      className={error ? "ws-phone ws-phone--error" : "ws-phone"}
      style={
        {
          "--iti-path-flags-1x": `url("${flags1x}")`,
          "--iti-path-flags-2x": `url("${flags2x}")`,
        } as CSSProperties
      }
    >
      <input ref={e164Ref} type="hidden" name="mobile" />
      <input ref={validRef} type="hidden" name="phoneValid" />
      <input ref={isoRef} type="hidden" name="countryIso" defaultValue="IN" />
      <input
        ref={inputRef}
        type="tel"
        inputMode="tel"
        autoComplete="tel"
        required
        disabled={disabled}
        aria-invalid={error || undefined}
        className="ws-phone-input"
        placeholder="Phone number"
      />
    </div>
  );
}
