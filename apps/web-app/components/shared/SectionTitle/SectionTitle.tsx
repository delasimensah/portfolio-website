"use client";

import { Title } from "@mantine/core";
import React from "react";

import { cn } from "@/utils";

interface SectionTitleProps {
  children: React.ReactNode;
  className?: string;
}

const SectionTitle: React.FC<SectionTitleProps> = ({ children, className }) => {
  return (
    <Title
      order={2}
      className={cn(
        "text-center text-3xl font-bold text-text-primary lg:text-4xl",
        className
      )}
    >
      {children}
    </Title>
  );
};

export default SectionTitle;
