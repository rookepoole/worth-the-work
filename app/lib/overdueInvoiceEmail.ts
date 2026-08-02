export type InvoiceFollowUpState =
  | "no_response"
  | "acknowledged"
  | "promised_missed"
  | "partial_payment"
  | "question_or_dispute";

export type OverdueInvoiceEmailInput = {
  clientName: string;
  senderName: string;
  invoiceReference: string;
  invoiceAmount: number;
  currency: string;
  daysOverdue: number;
  followUpState: InvoiceFollowUpState;
  promisedDate: string;
  partialPaymentAmount: number;
  issueSummary: string;
};

export type OverdueInvoiceEmail = {
  subject: string;
  body: string;
  stage: "Gentle check-in" | "Direct follow-up" | "Firm deadline" | "Final internal escalation";
};

function safeText(value: string, fallback: string) {
  return value.trim() || fallback;
}

function formatMoney(amount: number, currency: string) {
  return new Intl.NumberFormat(undefined, {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(Math.max(0, amount));
}

function stageForDays(daysOverdue: number): OverdueInvoiceEmail["stage"] {
  if (daysOverdue <= 3) return "Gentle check-in";
  if (daysOverdue <= 14) return "Direct follow-up";
  if (daysOverdue <= 30) return "Firm deadline";
  return "Final internal escalation";
}

export function generateOverdueInvoiceEmail(
  input: OverdueInvoiceEmailInput,
): OverdueInvoiceEmail {
  const client = safeText(input.clientName, "there");
  const sender = safeText(input.senderName, "Your name");
  const reference = safeText(input.invoiceReference, "the outstanding invoice");
  const days = Math.max(1, Math.round(input.daysOverdue));
  const amount = formatMoney(input.invoiceAmount, input.currency);
  const partialPayment = formatMoney(input.partialPaymentAmount, input.currency);
  const remainingBalance = formatMoney(
    Math.max(0, input.invoiceAmount - input.partialPaymentAmount),
    input.currency,
  );
  const promisedDate = safeText(input.promisedDate, "the date you confirmed");
  const issue = safeText(
    input.issueSummary,
    "the question you raised about the invoice",
  );
  const stage = stageForDays(days);
  const greeting = `Hi ${client},`;
  const signoff = `Thanks,\n${sender}`;

  if (input.followUpState === "promised_missed") {
    return {
      stage,
      subject: `Payment update needed — ${reference}`,
      body: `${greeting}\n\nI’m following up on ${reference} for ${amount}. You had confirmed payment for ${promisedDate}, but I haven’t received it yet.\n\nPlease reply with the new payment date or the payment confirmation if it has already been sent.\n\n${signoff}`,
    };
  }

  if (input.followUpState === "partial_payment") {
    return {
      stage,
      subject: `Remaining balance — ${reference}`,
      body: `${greeting}\n\nThank you for the ${partialPayment} payment toward ${reference}. The remaining balance is ${remainingBalance}, and the invoice is now ${days} ${days === 1 ? "day" : "days"} overdue.\n\nPlease confirm when the remaining balance will be paid.\n\n${signoff}`,
    };
  }

  if (input.followUpState === "question_or_dispute") {
    return {
      stage,
      subject: `Resolve invoice question — ${reference}`,
      body: `${greeting}\n\nThanks for flagging ${issue}. I’d like to resolve that point promptly while keeping the payment timeline clear.\n\nPlease send the specific item or amount you believe needs correction. If any portion of ${reference} for ${amount} is not in question, please also confirm when that portion will be paid.\n\n${signoff}`,
    };
  }

  if (input.followUpState === "acknowledged") {
    return {
      stage,
      subject: `Confirm payment date — ${reference}`,
      body: `${greeting}\n\nThank you for confirming receipt of ${reference} for ${amount}. It is now ${days} ${days === 1 ? "day" : "days"} overdue.\n\nPlease reply with the scheduled payment date so I can update my records. If payment has already been sent, the remittance reference would be helpful.\n\n${signoff}`,
    };
  }

  if (stage === "Gentle check-in") {
    return {
      stage,
      subject: `Quick check-in — ${reference}`,
      body: `${greeting}\n\nI’m checking in on ${reference} for ${amount}, which is now ${days} ${days === 1 ? "day" : "days"} overdue. Could you confirm that the invoice reached the right person and let me know the payment date?\n\nI’m happy to resend the invoice or payment details if needed.\n\n${signoff}`,
    };
  }

  if (stage === "Direct follow-up") {
    return {
      stage,
      subject: `Payment date needed — ${reference}`,
      body: `${greeting}\n\n${reference} for ${amount} is now ${days} days overdue, and I haven’t received a payment update.\n\nPlease confirm the scheduled payment date today. If another person handles payment, please copy them on your reply so we can close this out.\n\n${signoff}`,
    };
  }

  if (stage === "Firm deadline") {
    return {
      stage,
      subject: `Overdue invoice follow-up — ${reference}`,
      body: `${greeting}\n\nI’m following up again on ${reference} for ${amount}, now ${days} days overdue. I need a specific payment date so I can resolve the outstanding balance in my records.\n\nPlease confirm the payment date within two business days, or let me know in writing if there is a specific issue preventing payment.\n\n${signoff}`,
    };
  }

  return {
    stage,
    subject: `Final payment follow-up — ${reference}`,
    body: `${greeting}\n\n${reference} for ${amount} is now ${days} days overdue, and I still don’t have a confirmed payment date.\n\nPlease provide payment confirmation or a specific written resolution within two business days. If I don’t receive either, I will review the next steps available under our agreement.\n\n${signoff}`,
  };
}
