"use client";

export const currencyOptions = [
  { code: "USD", label: "USD — US dollar", symbol: "$" },
  { code: "EUR", label: "EUR — euro", symbol: "€" },
  { code: "GBP", label: "GBP — pound sterling", symbol: "£" },
  { code: "CAD", label: "CAD — Canadian dollar", symbol: "CA$" },
  { code: "AUD", label: "AUD — Australian dollar", symbol: "A$" },
  { code: "NZD", label: "NZD — New Zealand dollar", symbol: "NZ$" },
] as const;

export type CurrencyCode = (typeof currencyOptions)[number]["code"];

export function createMoneyFormatter(currency: CurrencyCode) {
  return new Intl.NumberFormat(undefined, {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  });
}

export function getCurrencySymbol(currency: CurrencyCode) {
  return currencyOptions.find((option) => option.code === currency)?.symbol ?? currency;
}

export function CurrencyField({
  id,
  value,
  onChange,
}: {
  id: string;
  value: CurrencyCode;
  onChange: (currency: CurrencyCode) => void;
}) {
  return (
    <label className="field" htmlFor={id}>
      <span className="field-label">Currency</span>
      <span className="input-shell">
        <select
          id={id}
          value={value}
          onChange={(event) => onChange(event.target.value as CurrencyCode)}
        >
          {currencyOptions.map((option) => (
            <option key={option.code} value={option.code}>
              {option.label}
            </option>
          ))}
        </select>
      </span>
    </label>
  );
}
