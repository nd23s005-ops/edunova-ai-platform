import {
  getCountries,
  getCountryCallingCode,
  parsePhoneNumberFromString,
  AsYouType,
  type CountryCode,
} from "libphonenumber-js";

export type Country = {
  code: CountryCode;
  name: string;
  dialCode: string; // e.g. "+91"
  flag: string; // emoji
};

// Flag emoji from ISO 3166-1 alpha-2 code
function flagEmoji(cc: string): string {
  return cc
    .toUpperCase()
    .replace(/./g, (c) => String.fromCodePoint(127397 + c.charCodeAt(0)));
}

// Prefer Intl.DisplayNames for localized country names; fall back to the code.
const displayNames =
  typeof Intl !== "undefined" && "DisplayNames" in Intl
    ? new Intl.DisplayNames(["en"], { type: "region" })
    : null;

export const COUNTRIES: Country[] = getCountries()
  .map((code) => ({
    code,
    name: displayNames?.of(code) ?? code,
    dialCode: `+${getCountryCallingCode(code)}`,
    flag: flagEmoji(code),
  }))
  .sort((a, b) => a.name.localeCompare(b.name));

// Popular list surfaced at the top of the picker; India first for the primary audience.
const PRIORITY: CountryCode[] = ["IN", "US", "GB", "CA", "AU", "AE", "SG"];
export const PRIORITY_COUNTRIES: Country[] = PRIORITY.map(
  (code) => COUNTRIES.find((c) => c.code === code)!,
).filter(Boolean);

export const DEFAULT_COUNTRY: Country =
  COUNTRIES.find((c) => c.code === "IN") ?? COUNTRIES[0];

export function findCountry(code: CountryCode): Country | undefined {
  return COUNTRIES.find((c) => c.code === code);
}

/** Format the national portion as the user types, using the selected country. */
export function formatAsYouType(national: string, country: CountryCode): string {
  const formatter = new AsYouType(country);
  return formatter.input(national);
}

export type PhoneValidation =
  | { valid: true; e164: string; country: CountryCode; national: string }
  | { valid: false; reason: string };

/**
 * Parse & normalize a national number for the selected country into E.164
 * (e.g. "+919812345678"). Returns a discriminated result.
 */
export function normalizePhone(
  national: string,
  country: CountryCode,
): PhoneValidation {
  const raw = national.trim();
  if (!raw) return { valid: false, reason: "Enter your phone number." };
  const parsed = parsePhoneNumberFromString(raw, country);
  if (!parsed) return { valid: false, reason: "Enter a valid phone number." };
  if (!parsed.isValid())
    return { valid: false, reason: "That phone number doesn't look right." };
  return {
    valid: true,
    e164: parsed.number,
    country: parsed.country ?? country,
    national: parsed.formatNational(),
  };
}
