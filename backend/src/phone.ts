import { z } from "zod";

export const PHONE_VALIDATION_MESSAGE = "Please enter a valid phone number";

function digitsOnly(value: string): string {
  return value.replace(/\D/g, "");
}

/** Normalise to E.164. India 10-digit mobiles become +91XXXXXXXXXX. */
export function normalizePhone(phone: string): string {
  const trimmed = phone.trim();
  const digits = digitsOnly(trimmed);

  if (digits.length === 10 && /^[6-9]/.test(digits)) return `+91${digits}`;
  if (digits.length === 12 && /^91[6-9]/.test(digits)) return `+${digits}`;
  if (digits.length === 11 && digits.startsWith("0") && /^[6-9]/.test(digits.slice(1))) {
    return `+91${digits.slice(1)}`;
  }
  if (trimmed.startsWith("+") && digits.length >= 8 && digits.length <= 15) return `+${digits}`;
  if (digits.length >= 8 && digits.length <= 15) return `+${digits}`;
  return trimmed;
}

export function isValidPhone(phone: string): boolean {
  const e164 = normalizePhone(phone);
  if (/^\+91[6-9]\d{9}$/.test(e164)) return true;
  return /^\+[1-9]\d{7,14}$/.test(e164);
}

export const phoneSchema = z
  .string()
  .trim()
  .min(1, "Please enter a phone number")
  .transform(normalizePhone)
  .refine(isValidPhone, { message: PHONE_VALIDATION_MESSAGE });
