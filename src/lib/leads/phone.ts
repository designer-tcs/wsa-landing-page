import { z } from "zod";
import { DEFAULT_COUNTRY_ISO, getCountry, nationalDigits, toE164 } from "./countries";

export const PHONE_VALIDATION_MESSAGE = "Please enter a valid phone number";

/** Normalise to E.164. Prefers an explicit country ISO when provided. */
export function normalizePhone(phone: string, iso: string = DEFAULT_COUNTRY_ISO): string {
  const trimmed = phone.trim();
  if (!trimmed) return trimmed;

  if (trimmed.startsWith("+")) {
    const digits = nationalDigits(trimmed);
    return digits ? `+${digits}` : trimmed;
  }

  const digits = nationalDigits(trimmed);
  const country = getCountry(iso) ?? getCountry(DEFAULT_COUNTRY_ISO)!;

  if (iso === "IN" || country.iso === "IN") {
    if (digits.length === 10 && /^[6-9]/.test(digits)) return `+91${digits}`;
    if (digits.length === 12 && /^91[6-9]/.test(digits)) return `+${digits}`;
    if (digits.length === 11 && digits.startsWith("0") && /^[6-9]/.test(digits.slice(1))) {
      return `+91${digits.slice(1)}`;
    }
  }

  if (digits.startsWith(country.dial) && digits.length > country.dial.length) {
    return `+${digits}`;
  }

  return toE164(country.iso, digits);
}

export function isValidPhone(phone: string, iso: string = DEFAULT_COUNTRY_ISO): boolean {
  const e164 = normalizePhone(phone, iso);
  if (!/^\+[1-9]\d{7,14}$/.test(e164)) return false;

  if (e164.startsWith("+91")) {
    return /^\+91[6-9]\d{9}$/.test(e164);
  }

  return true;
}

export const phoneSchema = z
  .string()
  .trim()
  .min(1, "Please enter a phone number")
  .transform((value) => normalizePhone(value))
  .refine((value) => isValidPhone(value), { message: PHONE_VALIDATION_MESSAGE });
