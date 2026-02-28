"use client";

import { Title, type TitleOrder } from "@mantine/core";
import React from "react";
import { cn } from "shared";

type HeadingVariant = "page" | "section" | "subsection" | "card";

const VARIANT_CONFIG: Record<
  HeadingVariant,
  { order: TitleOrder; className: string }
> = {
  page: { order: 1, className: "mb-4 text-darkGrey" },
  section: { order: 2, className: "mb-6 text-darkGrey" },
  subsection: { order: 3, className: "mb-4 text-darkGrey" },
  card: { order: 4, className: "mb-2 text-darkGrey" },
};

interface HeadingProps {
  variant: HeadingVariant;
  children: React.ReactNode;
  className?: string;
}

const Heading: React.FC<HeadingProps> = ({ variant, children, className }) => {
  const { order, className: variantClassName } = VARIANT_CONFIG[variant];
  return (
    <Title
      order={order}
      className={cn(variantClassName, className)}
    >
      {children}
    </Title>
  );
};

export default Heading;
