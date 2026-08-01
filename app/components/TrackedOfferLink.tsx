"use client";

import {
  type ComponentPropsWithoutRef,
  type ReactNode,
} from "react";
import {
  buildOfferUrl,
  sourceFromReferrer,
  type Offer,
} from "../lib/offerAttribution";

export function TrackedOfferLink({
  offer,
  medium,
  content,
  defaultSource = "github_pages",
  children,
  onClick,
  ...anchorProps
}: {
  offer: Offer;
  medium: string;
  content: string;
  defaultSource?: string;
  children: ReactNode;
} & Omit<ComponentPropsWithoutRef<"a">, "href" | "children">) {
  const href = buildOfferUrl({ offer, source: defaultSource, medium, content });

  return (
    <a
      {...anchorProps}
      href={href}
      onClick={(event) => {
        const source = sourceFromReferrer(document.referrer, defaultSource);
        event.currentTarget.href = buildOfferUrl({ offer, source, medium, content });
        onClick?.(event);
      }}
    >
      {children}
    </a>
  );
}
