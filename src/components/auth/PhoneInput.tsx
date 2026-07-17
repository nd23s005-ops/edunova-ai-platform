import { useMemo, useState, forwardRef, useId } from "react";
import { Check, ChevronDown, Search } from "lucide-react";
import type { CountryCode } from "libphonenumber-js";

import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  COUNTRIES,
  PRIORITY_COUNTRIES,
  DEFAULT_COUNTRY,
  findCountry,
  formatAsYouType,
  normalizePhone,
  type Country,
  type PhoneValidation,
} from "@/lib/auth/phone";

export type PhoneInputValue = {
  country: CountryCode;
  national: string; // user-visible national portion
  e164: string | null; // normalized when valid, null otherwise
  valid: boolean;
};

type Props = {
  value: PhoneInputValue;
  onChange: (v: PhoneInputValue) => void;
  onValidationChange?: (result: PhoneValidation) => void;
  disabled?: boolean;
  autoFocus?: boolean;
  id?: string;
  className?: string;
  error?: string;
};

export const PhoneInput = forwardRef<HTMLInputElement, Props>(function PhoneInput(
  { value, onChange, onValidationChange, disabled, autoFocus, id, className, error },
  ref,
) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const [open, setOpen] = useState(false);

  const country = useMemo<Country>(
    () => findCountry(value.country) ?? DEFAULT_COUNTRY,
    [value.country],
  );

  const emit = (nextCountry: CountryCode, nextNational: string) => {
    const result = normalizePhone(nextNational, nextCountry);
    onValidationChange?.(result);
    onChange({
      country: nextCountry,
      national: nextNational,
      e164: result.valid ? result.e164 : null,
      valid: result.valid,
    });
  };

  const handleCountryPick = (cc: CountryCode) => {
    setOpen(false);
    emit(cc, value.national);
  };

  const handleNationalChange = (raw: string) => {
    // Keep digits, spaces, and common separators; strip anything else.
    const cleaned = raw.replace(/[^\d\s\-()]/g, "");
    const formatted = formatAsYouType(cleaned, country.code);
    emit(country.code, formatted);
  };

  return (
    <div className={cn("space-y-1.5", className)}>
      <div className="flex gap-2">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              type="button"
              variant="outline"
              role="combobox"
              aria-label="Select country"
              aria-expanded={open}
              disabled={disabled}
              className="h-11 min-w-[7.5rem] justify-between gap-2 px-3"
            >
              <span className="flex items-center gap-2 text-sm">
                <span className="text-base leading-none">{country.flag}</span>
                <span className="font-medium">{country.dialCode}</span>
              </span>
              <ChevronDown className="h-4 w-4 opacity-60" />
            </Button>
          </PopoverTrigger>
          <PopoverContent align="start" className="w-[300px] p-0">
            <Command
              filter={(itemValue, search) => {
                const s = search.toLowerCase();
                return itemValue.toLowerCase().includes(s) ? 1 : 0;
              }}
            >
              <div className="flex items-center border-b px-3">
                <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
                <CommandInput placeholder="Search country or code" className="h-10" />
              </div>
              <CommandList className="max-h-72">
                <CommandEmpty>No country found.</CommandEmpty>
                <CommandGroup heading="Popular">
                  {PRIORITY_COUNTRIES.map((c) => (
                    <CountryRow
                      key={`p-${c.code}`}
                      country={c}
                      selected={c.code === country.code}
                      onPick={handleCountryPick}
                    />
                  ))}
                </CommandGroup>
                <CommandSeparator />
                <CommandGroup heading="All countries">
                  {COUNTRIES.map((c) => (
                    <CountryRow
                      key={c.code}
                      country={c}
                      selected={c.code === country.code}
                      onPick={handleCountryPick}
                    />
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>

        <Input
          ref={ref}
          id={inputId}
          type="tel"
          inputMode="tel"
          autoComplete="tel-national"
          placeholder="Phone number"
          className="h-11 flex-1"
          disabled={disabled}
          autoFocus={autoFocus}
          value={value.national}
          onChange={(e) => handleNationalChange(e.target.value)}
          aria-invalid={!!error}
        />
      </div>
      {error ? (
        <p className="text-xs text-destructive">{error}</p>
      ) : value.valid && value.e164 ? (
        <p className="text-xs text-muted-foreground">
          We'll send an OTP to <span className="font-medium text-foreground">{value.e164}</span>
        </p>
      ) : (
        <p className="text-xs text-muted-foreground">
          Include your mobile number without the country code.
        </p>
      )}
    </div>
  );
});

function CountryRow({
  country,
  selected,
  onPick,
}: {
  country: Country;
  selected: boolean;
  onPick: (cc: CountryCode) => void;
}) {
  // Include name, code, and dial code in the value so Command's filter matches all.
  const searchValue = `${country.name} ${country.code} ${country.dialCode}`;
  return (
    <CommandItem
      value={searchValue}
      onSelect={() => onPick(country.code)}
      className="flex items-center gap-3"
    >
      <span className="text-base leading-none">{country.flag}</span>
      <span className="flex-1 truncate text-sm">{country.name}</span>
      <span className="text-xs text-muted-foreground">{country.dialCode}</span>
      {selected && <Check className="ml-1 h-4 w-4 text-primary" />}
    </CommandItem>
  );
}

export function createEmptyPhoneValue(country: CountryCode = DEFAULT_COUNTRY.code): PhoneInputValue {
  return { country, national: "", e164: null, valid: false };
}
