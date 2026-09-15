import { z } from "zod";
import { phoneSchema } from "./phone.js";

const optionalText = (max: number) =>
  z
    .string()
    .trim()
    .max(max)
    .optional()
    .transform((v) => v || undefined);

const requiredName = (message: string) => z.string().trim().min(1, message).max(50);

const trackingFields = {
  pageUrl: optionalText(2000),
  url: optionalText(2000),
  utmSource: optionalText(200),
  utmMedium: optionalText(200),
  utmCampaign: optionalText(200),
  utmTerm: optionalText(200),
  utmContent: optionalText(200),
  adGroup: optionalText(200),
  utmDevice: optionalText(200),
  utmAgeGroup: optionalText(200),
  utmGenderGroup: optionalText(200),
};

export const enquiryFormSchema = z.object({
  ...trackingFields,
  parentFirstName: requiredName("Please enter the parent's first name"),
  parentLastName: requiredName("Please enter the parent's last name"),
  phone: phoneSchema,
  email: z.string().trim().email("Please enter a valid email").max(200),
  childName: z.string().trim().min(1, "Please enter the child's name").max(100),
  grade: z.string().trim().min(1, "Please select a grade").max(50),
  visitTime: optionalText(80),
  message: optionalText(2000),
});

export const visitBookingFormSchema = z.object({
  ...trackingFields,
  studentName: z.string().trim().min(1, "Please tell us the student's name").max(100),
  parentFirstName: requiredName("Please enter the parent's first name"),
  parentLastName: requiredName("Please enter the parent's last name"),
  phone: phoneSchema,
  grade: z.string().trim().min(1, "Please select a grade").max(50),
  comments: optionalText(500),
});

export type EnquiryFormInput = z.infer<typeof enquiryFormSchema>;
export type VisitBookingFormInput = z.infer<typeof visitBookingFormSchema>;
