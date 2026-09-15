export function isCrmDebugEnabled(): boolean {
  const value = process.env.CRM_DEBUG?.trim().toLowerCase();
  return value === "1" || value === "true" || value === "yes";
}

function maskUrl(url: string): string {
  try {
    const parsed = new URL(url);
    const key = parsed.searchParams.get("zapikey");
    if (key) parsed.searchParams.set("zapikey", `${key.slice(0, 8)}…`);
    return parsed.toString();
  } catch {
    return url;
  }
}

export function debugLog(step: string, data?: unknown) {
  if (!isCrmDebugEnabled()) return;
  const time = new Date().toISOString();
  if (data === undefined) {
    console.info(`[CRM DEBUG ${time}] ${step}`);
    return;
  }
  console.info(
    `[CRM DEBUG ${time}] ${step}`,
    typeof data === "string" ? data : JSON.stringify(data, null, 2),
  );
}

export function debugCrmConfig(apiUrl: string) {
  debugLog("CRM_API_URL configured", apiUrl ? maskUrl(apiUrl) : "(missing)");
  debugLog("CRM_DEBUG enabled", isCrmDebugEnabled());
}

export { maskUrl };
