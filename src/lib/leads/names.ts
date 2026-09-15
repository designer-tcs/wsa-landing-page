/** Split a single "Parent name" field into first / last for Zoho. */
export function splitParentName(fullName: string): {
  parentFirstName: string;
  parentLastName: string;
} {
  const parts = fullName.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return { parentFirstName: "", parentLastName: "" };
  if (parts.length === 1) return { parentFirstName: parts[0], parentLastName: parts[0] };
  return { parentFirstName: parts[0], parentLastName: parts.slice(1).join(" ") };
}
