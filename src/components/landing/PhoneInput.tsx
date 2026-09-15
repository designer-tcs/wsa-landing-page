import { useEffect, useMemo, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import {
  DEFAULT_COUNTRY_ISO,
  filterCountries,
  getCountry,
  nationalDigits,
} from "@/lib/leads/countries";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

type PhoneInputProps = {
  disabled?: boolean;
  error?: boolean;
};

const fieldClass =
  "border bg-white px-3.5 py-3 text-sm text-[var(--ws-ink)] outline-none transition-colors disabled:opacity-60";

function CountryFlag({ iso }: { iso: string }) {
  const code = iso.toLowerCase();
  return (
    <img
      src={`https://flagcdn.com/w40/${code}.png`}
      srcSet={`https://flagcdn.com/w80/${code}.png 2x`}
      alt=""
      width={20}
      height={15}
      draggable={false}
      className="h-[15px] w-5 shrink-0 object-cover"
    />
  );
}

export function PhoneInput({ disabled, error }: PhoneInputProps) {
  const [iso, setIso] = useState(DEFAULT_COUNTRY_ISO);
  const [national, setNational] = useState("");
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const searchRef = useRef<HTMLInputElement>(null);

  const country = getCountry(iso) ?? getCountry(DEFAULT_COUNTRY_ISO)!;
  const countries = useMemo(() => filterCountries(query), [query]);
  const border = error
    ? "border-[var(--coral-600)]"
    : "border-[var(--grey-300)] focus:border-[var(--ws-ink)]";

  useEffect(() => {
    if (!open) {
      setQuery("");
      return;
    }
    const id = window.setTimeout(() => searchRef.current?.focus(), 0);
    return () => window.clearTimeout(id);
  }, [open]);

  function onNationalChange(value: string) {
    let digits = nationalDigits(value);
    if (digits.startsWith(country.dial) && digits.length > country.nsnMax) {
      digits = digits.slice(country.dial.length);
    }
    if (iso === "IN" && digits.startsWith("0") && digits.length === 11) {
      digits = digits.slice(1);
    }
    setNational(digits.slice(0, country.nsnMax));
  }

  return (
    <div className="grid grid-cols-1 gap-3 min-[420px]:grid-cols-[max-content_1fr]">
      <input type="hidden" name="countryIso" value={iso} />

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <button
            type="button"
            disabled={disabled}
            aria-label="Country code"
            className={`${fieldClass} ${border} inline-flex min-w-[7.75rem] items-center justify-between gap-2 whitespace-nowrap text-left`}
          >
            <span className="flex items-center gap-2">
              <CountryFlag iso={iso} />
              <span>+{country.dial}</span>
            </span>
            <ChevronDown
              size={14}
              strokeWidth={2}
              className={`shrink-0 text-[var(--grey-600)] transition-transform ${open ? "rotate-180" : ""}`}
            />
          </button>
        </PopoverTrigger>
        <PopoverContent
          align="start"
          side="bottom"
          collisionPadding={12}
          className="z-[80] w-[min(18.5rem,calc(100vw-2rem))] rounded-none border-[var(--grey-300)] bg-white p-0 shadow-md"
        >
          <input
            ref={searchRef}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search country"
            className="w-full border-b border-[var(--grey-300)] px-3 py-2 text-sm text-[var(--ws-ink)] outline-none placeholder:text-[var(--grey-500)]"
          />
          <ul role="listbox" className="max-h-52 overflow-y-auto py-1">
            {countries.map((item) => (
              <li key={item.iso}>
                <button
                  type="button"
                  role="option"
                  aria-selected={item.iso === iso}
                  onClick={() => {
                    setIso(item.iso);
                    setNational((prev) => prev.slice(0, item.nsnMax));
                    setOpen(false);
                  }}
                  className={`flex w-full items-center gap-2 px-3 py-2 text-left text-sm hover:bg-[var(--grey-200)] ${
                    item.iso === iso ? "bg-[var(--grey-200)]" : ""
                  }`}
                >
                  <CountryFlag iso={item.iso} />
                  <span className="min-w-0 flex-1 truncate">{item.name}</span>
                  <span className="shrink-0 text-[var(--grey-600)]">+{item.dial}</span>
                </button>
              </li>
            ))}
            {countries.length === 0 ? (
              <li className="px-3 py-2 text-sm text-[var(--grey-600)]">No countries found</li>
            ) : null}
          </ul>
        </PopoverContent>
      </Popover>

      <input
        type="tel"
        name="phoneNational"
        inputMode="numeric"
        autoComplete="tel-national"
        required
        disabled={disabled}
        aria-invalid={error || undefined}
        aria-label="Phone number"
        placeholder="Phone number"
        value={national}
        onChange={(event) => onNationalChange(event.target.value)}
        maxLength={country.nsnMax}
        className={`${fieldClass} ${border} min-w-0 w-full placeholder:text-[var(--grey-500)]`}
      />
    </div>
  );
}
