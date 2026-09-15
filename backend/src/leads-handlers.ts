import { debugLog } from "./crm-debug.js";
import { postToCrm, toEnquiryCrmBody, toVisitCrmBody } from "./crm.js";
import { enquiryFormSchema, visitBookingFormSchema } from "./schemas.js";

export type LeadHandlerResult = {
  status: number;
  body: Record<string, unknown>;
};

function validationError(issues: { path: (string | number)[]; message: string }[]): LeadHandlerResult {
  return {
    status: 400,
    body: {
      error: "Validation failed",
      issues: issues.map((issue) => ({
        field: issue.path.join(".") || "form",
        message: issue.message,
      })),
    },
  };
}

export async function handleEnquiryLead(body: unknown): Promise<LeadHandlerResult> {
  debugLog("POST /api/leads/enquiry — raw body", body);

  const parsed = enquiryFormSchema.safeParse(body);
  if (!parsed.success) {
    debugLog("Validation failed", parsed.error.issues);
    return validationError(parsed.error.issues);
  }

  const crmBody = toEnquiryCrmBody(parsed.data);
  debugLog("Mapped CRM body (enquiry)", crmBody);

  try {
    await postToCrm(crmBody);
    return { status: 200, body: { success: true } };
  } catch (error) {
    console.error("[CRM] Enquiry failed:", error);
    return {
      status: 502,
      body: { error: "Unable to submit your request right now. Please try again or call us." },
    };
  }
}

export async function handleVisitBookingLead(body: unknown): Promise<LeadHandlerResult> {
  debugLog("POST /api/leads/visit-booking — raw body", body);

  const parsed = visitBookingFormSchema.safeParse(body);
  if (!parsed.success) {
    debugLog("Validation failed", parsed.error.issues);
    return validationError(parsed.error.issues);
  }

  const crmBody = toVisitCrmBody(parsed.data);
  debugLog("Mapped CRM body (visit)", crmBody);

  try {
    await postToCrm(crmBody);
    return { status: 200, body: { success: true } };
  } catch (error) {
    console.error("[CRM] Visit booking failed:", error);
    return {
      status: 502,
      body: { error: "Unable to submit your request right now. Please try again or call us." },
    };
  }
}
