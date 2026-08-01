export type ProjectCostInputs = {
  deliveryHours: number;
  discoveryHours: number;
  adminHours: number;
  targetHourlyRate: number;
  directCosts: number;
  contingencyPercent: number;
  operatingMarginPercent: number;
  depositPercent: number;
  roundingIncrement?: number;
};

function nonNegative(value: number) {
  return Number.isFinite(value) ? Math.max(0, value) : 0;
}

function boundedPercent(value: number, maximum = 100) {
  return Math.min(maximum, nonNegative(value));
}

export function calculateProjectCost(inputs: ProjectCostInputs) {
  const deliveryHours = nonNegative(inputs.deliveryHours);
  const discoveryHours = nonNegative(inputs.discoveryHours);
  const adminHours = nonNegative(inputs.adminHours);
  const targetHourlyRate = nonNegative(inputs.targetHourlyRate);
  const directCosts = nonNegative(inputs.directCosts);
  const contingencyPercent = boundedPercent(inputs.contingencyPercent, 200);
  const operatingMarginPercent = boundedPercent(
    inputs.operatingMarginPercent,
    90,
  );
  const depositPercent = boundedPercent(inputs.depositPercent);
  const roundingIncrement = Math.max(
    1,
    nonNegative(inputs.roundingIncrement ?? 50),
  );

  const totalHours = deliveryHours + discoveryHours + adminHours;
  const laborValue = totalHours * targetHourlyRate;
  const baseCost = laborValue + directCosts;
  const contingencyReserve = baseCost * (contingencyPercent / 100);
  const protectedCost = baseCost + contingencyReserve;
  const rawQuote =
    protectedCost / (1 - operatingMarginPercent / 100 || 0.1);
  const recommendedQuote =
    Math.ceil(rawQuote / roundingIncrement) * roundingIncrement;
  const operatingMarginAmount = Math.max(0, recommendedQuote - protectedCost);
  const effectiveHourlyRate =
    totalHours > 0 ? (recommendedQuote - directCosts) / totalHours : 0;
  const rawDeposit = Math.max(
    directCosts,
    recommendedQuote * (depositPercent / 100),
  );
  const deposit = Math.min(
    recommendedQuote,
    Math.ceil(rawDeposit / roundingIncrement) * roundingIncrement,
  );

  return {
    totalHours,
    laborValue,
    directCosts,
    baseCost,
    contingencyReserve,
    protectedCost,
    operatingMarginAmount,
    recommendedQuote,
    effectiveHourlyRate,
    deposit,
  };
}
