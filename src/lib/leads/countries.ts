export type Country = {
  iso: string;
  name: string;
  dial: string;
  nsnMin: number;
  nsnMax: number;
  /** If set, the national number must match (India mobiles start 6–9). */
  mobileStart?: RegExp;
};

/** iso, name, dial (no +), nsnMin, nsnMax */
const RAW: Array<[string, string, string, number, number]> = [
  ["IN", "India", "91", 10, 10],
  ["AF", "Afghanistan", "93", 9, 9],
  ["AL", "Albania", "355", 8, 9],
  ["DZ", "Algeria", "213", 8, 9],
  ["AD", "Andorra", "376", 6, 9],
  ["AO", "Angola", "244", 9, 9],
  ["AR", "Argentina", "54", 10, 10],
  ["AM", "Armenia", "374", 8, 8],
  ["AU", "Australia", "61", 9, 9],
  ["AT", "Austria", "43", 10, 13],
  ["AZ", "Azerbaijan", "994", 9, 9],
  ["BH", "Bahrain", "973", 8, 8],
  ["BD", "Bangladesh", "880", 10, 10],
  ["BY", "Belarus", "375", 9, 9],
  ["BE", "Belgium", "32", 8, 9],
  ["BZ", "Belize", "501", 7, 7],
  ["BJ", "Benin", "229", 8, 8],
  ["BT", "Bhutan", "975", 8, 8],
  ["BO", "Bolivia", "591", 8, 8],
  ["BA", "Bosnia and Herzegovina", "387", 8, 8],
  ["BW", "Botswana", "267", 7, 8],
  ["BR", "Brazil", "55", 10, 11],
  ["BN", "Brunei", "673", 7, 7],
  ["BG", "Bulgaria", "359", 8, 9],
  ["KH", "Cambodia", "855", 8, 9],
  ["CM", "Cameroon", "237", 9, 9],
  ["CA", "Canada", "1", 10, 10],
  ["CL", "Chile", "56", 9, 9],
  ["CN", "China", "86", 11, 11],
  ["CO", "Colombia", "57", 10, 10],
  ["CR", "Costa Rica", "506", 8, 8],
  ["HR", "Croatia", "385", 8, 9],
  ["CU", "Cuba", "53", 8, 8],
  ["CY", "Cyprus", "357", 8, 8],
  ["CZ", "Czechia", "420", 9, 9],
  ["DK", "Denmark", "45", 8, 8],
  ["DJ", "Djibouti", "253", 8, 8],
  ["EC", "Ecuador", "593", 9, 9],
  ["EG", "Egypt", "20", 10, 10],
  ["SV", "El Salvador", "503", 8, 8],
  ["EE", "Estonia", "372", 7, 8],
  ["ET", "Ethiopia", "251", 9, 9],
  ["FJ", "Fiji", "679", 7, 7],
  ["FI", "Finland", "358", 9, 10],
  ["FR", "France", "33", 9, 9],
  ["GE", "Georgia", "995", 9, 9],
  ["DE", "Germany", "49", 10, 11],
  ["GH", "Ghana", "233", 9, 9],
  ["GR", "Greece", "30", 10, 10],
  ["GT", "Guatemala", "502", 8, 8],
  ["GY", "Guyana", "592", 7, 7],
  ["HT", "Haiti", "509", 8, 8],
  ["HN", "Honduras", "504", 8, 8],
  ["HK", "Hong Kong", "852", 8, 8],
  ["HU", "Hungary", "36", 8, 9],
  ["IS", "Iceland", "354", 7, 7],
  ["ID", "Indonesia", "62", 9, 12],
  ["IR", "Iran", "98", 10, 10],
  ["IQ", "Iraq", "964", 10, 10],
  ["IE", "Ireland", "353", 9, 9],
  ["IL", "Israel", "972", 9, 9],
  ["IT", "Italy", "39", 9, 10],
  ["JM", "Jamaica", "1876", 7, 7],
  ["JP", "Japan", "81", 10, 10],
  ["JO", "Jordan", "962", 9, 9],
  ["KZ", "Kazakhstan", "7", 10, 10],
  ["KE", "Kenya", "254", 9, 9],
  ["KW", "Kuwait", "965", 8, 8],
  ["KG", "Kyrgyzstan", "996", 9, 9],
  ["LA", "Laos", "856", 8, 10],
  ["LV", "Latvia", "371", 8, 8],
  ["LB", "Lebanon", "961", 7, 8],
  ["LY", "Libya", "218", 9, 9],
  ["LT", "Lithuania", "370", 8, 8],
  ["LU", "Luxembourg", "352", 9, 9],
  ["MO", "Macao", "853", 8, 8],
  ["MG", "Madagascar", "261", 9, 10],
  ["MW", "Malawi", "265", 9, 9],
  ["MY", "Malaysia", "60", 9, 10],
  ["MV", "Maldives", "960", 7, 7],
  ["ML", "Mali", "223", 8, 8],
  ["MT", "Malta", "356", 8, 8],
  ["MX", "Mexico", "52", 10, 10],
  ["MD", "Moldova", "373", 8, 8],
  ["MC", "Monaco", "377", 8, 9],
  ["MN", "Mongolia", "976", 8, 8],
  ["ME", "Montenegro", "382", 8, 8],
  ["MA", "Morocco", "212", 9, 9],
  ["MZ", "Mozambique", "258", 9, 9],
  ["MM", "Myanmar", "95", 8, 10],
  ["NA", "Namibia", "264", 9, 9],
  ["NP", "Nepal", "977", 10, 10],
  ["NL", "Netherlands", "31", 9, 9],
  ["NZ", "New Zealand", "64", 8, 10],
  ["NI", "Nicaragua", "505", 8, 8],
  ["NG", "Nigeria", "234", 10, 10],
  ["KP", "North Korea", "850", 10, 10],
  ["MK", "North Macedonia", "389", 8, 8],
  ["NO", "Norway", "47", 8, 8],
  ["OM", "Oman", "968", 8, 8],
  ["PK", "Pakistan", "92", 10, 10],
  ["PS", "Palestine", "970", 9, 9],
  ["PA", "Panama", "507", 8, 8],
  ["PG", "Papua New Guinea", "675", 8, 8],
  ["PY", "Paraguay", "595", 9, 9],
  ["PE", "Peru", "51", 9, 9],
  ["PH", "Philippines", "63", 10, 10],
  ["PL", "Poland", "48", 9, 9],
  ["PT", "Portugal", "351", 9, 9],
  ["PR", "Puerto Rico", "1787", 7, 7],
  ["QA", "Qatar", "974", 8, 8],
  ["RO", "Romania", "40", 9, 9],
  ["RU", "Russia", "7", 10, 10],
  ["RW", "Rwanda", "250", 9, 9],
  ["SA", "Saudi Arabia", "966", 9, 9],
  ["SN", "Senegal", "221", 9, 9],
  ["RS", "Serbia", "381", 8, 9],
  ["SG", "Singapore", "65", 8, 8],
  ["SK", "Slovakia", "421", 9, 9],
  ["SI", "Slovenia", "386", 8, 8],
  ["ZA", "South Africa", "27", 9, 9],
  ["KR", "South Korea", "82", 9, 10],
  ["ES", "Spain", "34", 9, 9],
  ["LK", "Sri Lanka", "94", 9, 9],
  ["SD", "Sudan", "249", 9, 9],
  ["SE", "Sweden", "46", 9, 9],
  ["CH", "Switzerland", "41", 9, 9],
  ["SY", "Syria", "963", 9, 9],
  ["TW", "Taiwan", "886", 9, 9],
  ["TJ", "Tajikistan", "992", 9, 9],
  ["TZ", "Tanzania", "255", 9, 9],
  ["TH", "Thailand", "66", 9, 9],
  ["TL", "Timor-Leste", "670", 8, 8],
  ["TG", "Togo", "228", 8, 8],
  ["TT", "Trinidad and Tobago", "1868", 7, 7],
  ["TN", "Tunisia", "216", 8, 8],
  ["TR", "Turkey", "90", 10, 10],
  ["TM", "Turkmenistan", "993", 8, 8],
  ["UG", "Uganda", "256", 9, 9],
  ["UA", "Ukraine", "380", 9, 9],
  ["AE", "United Arab Emirates", "971", 9, 9],
  ["GB", "United Kingdom", "44", 10, 10],
  ["US", "United States", "1", 10, 10],
  ["UY", "Uruguay", "598", 8, 8],
  ["UZ", "Uzbekistan", "998", 9, 9],
  ["VE", "Venezuela", "58", 10, 10],
  ["VN", "Vietnam", "84", 9, 10],
  ["YE", "Yemen", "967", 9, 9],
  ["ZM", "Zambia", "260", 9, 9],
  ["ZW", "Zimbabwe", "263", 9, 9],
];

export const DEFAULT_COUNTRY_ISO = "IN";

export const COUNTRIES: Country[] = RAW.map(([iso, name, dial, nsnMin, nsnMax]) => ({
  iso,
  name,
  dial,
  nsnMin,
  nsnMax,
  ...(iso === "IN" ? { mobileStart: /^[6-9]/ } : {}),
}));

const BY_ISO = new Map(COUNTRIES.map((c) => [c.iso, c]));

export function getCountry(iso: string): Country | undefined {
  return BY_ISO.get(iso);
}

export function flagEmoji(iso: string): string {
  return iso
    .toUpperCase()
    .replace(/./g, (char) => String.fromCodePoint(127397 + char.charCodeAt(0)));
}

export function nationalDigits(value: string): string {
  return value.replace(/\D/g, "");
}

export function toE164(iso: string, national: string): string {
  const country = getCountry(iso) ?? getCountry(DEFAULT_COUNTRY_ISO)!;
  const nsn = nationalDigits(national);
  return nsn ? `+${country.dial}${nsn}` : "";
}

export function validatePhoneForCountry(iso: string, national: string): string | null {
  const country = getCountry(iso);
  if (!country) return "Please select a country code";

  const nsn = nationalDigits(national);
  if (!nsn) return "Please enter a phone number";

  if (nsn.length < country.nsnMin || nsn.length > country.nsnMax) {
    if (country.nsnMin === country.nsnMax) {
      return `Please enter a valid ${country.nsnMin}-digit ${country.name} number`;
    }
    return `Please enter a valid ${country.nsnMin}–${country.nsnMax} digit ${country.name} number`;
  }

  if (country.mobileStart && !country.mobileStart.test(nsn)) {
    return "Please enter a valid 10-digit Indian mobile number";
  }

  return null;
}

export function filterCountries(query: string): Country[] {
  const q = query.trim().toLowerCase().replace(/^\+/, "");
  const list = COUNTRIES;
  if (!q) {
    return [...list].sort((a, b) => {
      if (a.iso === DEFAULT_COUNTRY_ISO) return -1;
      if (b.iso === DEFAULT_COUNTRY_ISO) return 1;
      return a.name.localeCompare(b.name);
    });
  }
  return list
    .filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.dial.startsWith(q) ||
        c.iso.toLowerCase().includes(q),
    )
    .sort((a, b) => a.name.localeCompare(b.name));
}
