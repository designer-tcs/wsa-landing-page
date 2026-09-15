import { LEADS_API } from "./endpoints";
import { toCrmGrade } from "./grade";
import { getLeadTrackingContext } from "./tracking";

type SubmitLeadSuccess = { success: true };
type SubmitLeadError = {
  error: string;
  issues?: Array<{ field: string; message: string }>;
};

export async function submitLead<T extends Record<string, unknown>>(
  endpoint: string,
  data: T,
): Promise<SubmitLeadSuccess> {
  const response = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ...getLeadTrackingContext(),
      ...data,
    }),
  });

  const result = (await response.json().catch(() => null)) as SubmitLeadSuccess | SubmitLeadError | null;

  if (!response.ok || !result || !("success" in result)) {
    const message =
      result && "error" in result
        ? result.error
        : "Something went wrong. Please try again or call us.";
    const err = new Error(message) as Error & { issues?: SubmitLeadError["issues"] };
    if (result && "issues" in result) err.issues = result.issues;
    throw err;
  }

  return result;
}

export function submitEnquiry(data: {
  parentFirstName: string;
  parentLastName: string;
  phone: string;
  email: string;
  childName: string;
  grade: string;
  visitTime?: string;
  message?: string;
}) {
  return submitLead(LEADS_API.enquiry, {
    ...data,
    grade: toCrmGrade(data.grade),
  });
}

export function submitVisitBooking(data: {
  studentName: string;
  parentFirstName: string;
  parentLastName: string;
  phone: string;
  grade: string;
  comments?: string;
}) {
  return submitLead(LEADS_API.visitBooking, {
    ...data,
    grade: toCrmGrade(data.grade),
  });
}
