"use client";

import { Box } from "@mantine/core";
import React from "react";

import { cn } from "@/utils";

interface HowIWorkStepProps {
  step: number;
  title: string;
  description: string;
  /** Gradient class for the step circle (e.g. bg-gradient-to-br from-accent-primary to-accent-hover). */
  stepCircleGradient?: string;
}

const HowIWorkStep: React.FC<HowIWorkStepProps> = ({
  step,
  title,
  description,
  stepCircleGradient,
}) => {
  return (
    <Box className="text-center">
      <Box
        className={cn(
          "mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-xl",
          stepCircleGradient ?? "bg-accent-primary"
        )}
      >
        <span className="text-2xl font-bold text-white">{step}</span>
      </Box>
      <h3 className="mb-3 text-xl font-semibold text-text-primary">{title}</h3>
      <p className="text-text-secondary">{description}</p>
    </Box>
  );
};

export default HowIWorkStep;
