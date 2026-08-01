export type LatePaymentRatePeriod = "annual" | "monthly";

export type LatePaymentInputs = {
  invoiceAmount: number;
  daysOverdue: number;
  gracePeriodDays: number;
  ratePercent: number;
  ratePeriod: LatePaymentRatePeriod;
  flatFee: number;
  internalAnnualCostPercent: number;
};

function nonNegative(value: number) {
  return Number.isFinite(value) ? Math.max(0, value) : 0;
}

export function calculateLatePayment(inputs: LatePaymentInputs) {
  const invoiceAmount = nonNegative(inputs.invoiceAmount);
  const daysOverdue = Math.floor(nonNegative(inputs.daysOverdue));
  const gracePeriodDays = Math.floor(nonNegative(inputs.gracePeriodDays));
  const chargeableDays = Math.max(0, daysOverdue - gracePeriodDays);
  const ratePercent = Math.min(1_000, nonNegative(inputs.ratePercent));
  const annualizedRatePercent =
    inputs.ratePeriod === "monthly" ? ratePercent * 12 : ratePercent;
  const flatFee = nonNegative(inputs.flatFee);
  const internalAnnualCostPercent = Math.min(
    1_000,
    nonNegative(inputs.internalAnnualCostPercent),
  );

  const interestCharge =
    invoiceAmount * (annualizedRatePercent / 100) * (chargeableDays / 365);
  const appliedFlatFee = chargeableDays > 0 ? flatFee : 0;
  const contractualCharge = interestCharge + appliedFlatFee;
  const updatedBalance = invoiceAmount + contractualCharge;
  const economicDelayCost =
    invoiceAmount * (internalAnnualCostPercent / 100) * (daysOverdue / 365);

  return {
    invoiceAmount,
    daysOverdue,
    gracePeriodDays,
    chargeableDays,
    annualizedRatePercent,
    interestCharge,
    appliedFlatFee,
    contractualCharge,
    updatedBalance,
    economicDelayCost,
  };
}
