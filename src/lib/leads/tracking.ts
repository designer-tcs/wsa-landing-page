export type LeadTracking = {
  pageUrl?: string;
  url?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmTerm?: string;
  utmContent?: string;
  adGroup?: string;
  utmDevice?: string;
  utmAgeGroup?: string;
  utmGenderGroup?: string;
};

const STORAGE_KEY = "ws_lead_tracking";

function isLocalhostUrl(url?: string): boolean {
  if (!url) return false;
  try {
    const host = new URL(url).hostname;
    return host === "localhost" || host === "127.0.0.1";
  } catch {
    return /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?/i.test(url);
  }
}

function sanitizeStoredTracking(stored: LeadTracking): LeadTracking {
  if (typeof window === "undefined") return stored;
  const onProduction = !isLocalhostUrl(window.location.origin);
  if (!onProduction) return stored;

  const next = { ...stored };
  if (isLocalhostUrl(next.url)) delete next.url;
  if (isLocalhostUrl(next.pageUrl)) delete next.pageUrl;
  return next;
}

const QUERY_PARAM_MAP: Record<string, keyof LeadTracking> = {
  utm_source: "utmSource",
  utm_medium: "utmMedium",
  utm_campaign: "utmCampaign",
  utm_term: "utmTerm",
  utm_content: "utmContent",
  ad_group: "adGroup",
  utm_ad_group: "adGroup",
  utm_device: "utmDevice",
  utm_age_group: "utmAgeGroup",
  utm_gender_group: "utmGenderGroup",
};

function readStoredTracking(): LeadTracking {
  if (typeof window === "undefined") return {};
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as LeadTracking) : {};
  } catch {
    return {};
  }
}

function writeStoredTracking(tracking: LeadTracking) {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(tracking));
}

function parseTrackingFromSearchParams(params: URLSearchParams): Partial<LeadTracking> {
  const tracking: Partial<LeadTracking> = {};

  for (const [param, key] of Object.entries(QUERY_PARAM_MAP)) {
    const value = params.get(param)?.trim();
    if (value) tracking[key] = value;
  }

  return tracking;
}

/** Call once on app load to capture UTMs from the landing URL. */
export function initLeadTracking() {
  if (typeof window === "undefined") return;

  const params = new URLSearchParams(window.location.search);
  const fromUrl = parseTrackingFromSearchParams(params);
  const stored = sanitizeStoredTracking(readStoredTracking());
  const landingUrl = `${window.location.origin}${window.location.pathname}${window.location.search}`;

  const hasNewUtms = Object.keys(fromUrl).length > 0;
  if (hasNewUtms) {
    writeStoredTracking({
      ...stored,
      ...fromUrl,
      url: landingUrl,
    });
    return;
  }

  if (!stored.url) {
    writeStoredTracking({
      ...stored,
      url: `${window.location.origin}${window.location.pathname}`,
    });
  }
}

/** Tracking context attached to every form submission. */
export function getLeadTrackingContext(): LeadTracking {
  if (typeof window === "undefined") return {};

  const stored = sanitizeStoredTracking(readStoredTracking());
  const pageUrl = window.location.href;

  return {
    ...stored,
    pageUrl,
    url: stored.url ?? `${window.location.origin}${window.location.pathname}`,
  };
}
