export type RushFeeInputs = {
  basePrice: number;
  estimatedHours: number;
  minimumHourlyRate: number;
  markupPercent: number;
  displacedWork: number;
  offHoursRequired: boolean;
  offHoursPercent: number;
  roundingIncrement?: number;
};

function nonNegative(value: number) {
  return Number.isFinite(value) ? Math.max(0, value) : 0;
}

export function timelineCompression(normalDays: number, requestedDays: number) {
  const normal = nonNegative(normalDays);
  const requested = nonNegative(requestedDays);
  if (normal === 0 || requested >= normal) return 0;
  return Math.min(1, 1 - requested / normal);
}

export function suggestedMarkupForCompression(compression: number) {
  const bounded = Math.max(0, Math.min(1, compression));
  if (bounded === 0) return 0;
  if (bounded <= 0.25) return 15;
  if (bounded <= 0.5) return 25;
  if (bounded <= 0.75) return 50;
  return 100;
}

export function calculateRushFee(inputs: RushFeeInputs) {
  const basePrice = nonNegative(inputs.basePrice);
  const estimatedHours = nonNegative(inputs.estimatedHours);
  const minimumHourlyRate = nonNegative(inputs.minimumHourlyRate);
  const markupPercent = Math.min(500, nonNegative(inputs.markupPercent));
  const displacedWork = nonNegative(inputs.displacedWork);
  const offHoursPercent = Math.min(500, nonNegative(inputs.offHoursPercent));
  const roundingIncrement = Math.max(1, nonNegative(inputs.roundingIncrement ?? 25));

  const percentageSurcharge = basePrice * (markupPercent / 100);
  const minimumRevenue = estimatedHours * minimumHourlyRate;
  const floorGap = Math.max(0, minimumRevenue - basePrice);
  const coreProtection = Math.max(
    percentageSurcharge,
    displacedWork,
    floorGap,
  );
  const offHoursSurcharge = inputs.offHoursRequired
    ? basePrice * (offHoursPercent / 100)
    : 0;
  const rawSurcharge = coreProtection + offHoursSurcharge;
  const surcharge = Math.ceil(rawSurcharge / roundingIncrement) * roundingIncrement;
  const total = basePrice + surcharge;
  const effectiveHourlyRate = estimatedHours > 0 ? total / estimatedHours : 0;

  return {
    percentageSurcharge,
    displacedWork,
    floorGap,
    coreProtection,
    offHoursSurcharge,
    surcharge,
    total,
    effectiveHourlyRate,
  };
}
