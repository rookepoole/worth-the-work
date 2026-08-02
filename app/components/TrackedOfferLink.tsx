"use client";

import {
  type ComponentPropsWithoutRef,
  type ReactNode,
} from "react";
import {
  buildOfferUrl,
  sourceFromReferrer,
  sourceFromSearch,
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
        const referrerSource = sourceFromReferrer(document.referrer, defaultSource);
        const source = sourceFromSearch(window.location.search, referrerSource);
        event.currentTarget.href = buildOfferUrl({ offer, source, medium, content });
        onClick?.(event);
      }}
    >
      {children}
    </a>
  );
}
