"use client";

import { Box } from "@mantine/core";
import React from "react";

interface HowIWorkStepProps {
  step: number;
  title: string;
  description: string;
}

const HowIWorkStep: React.FC<HowIWorkStepProps> = ({
  step,
  title,
  description,
}) => {
  return (
    <Box className="text-center">
      <Box className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-xl bg-accent-primary">
        <span className="text-2xl font-bold text-white">{step}</span>
      </Box>
      <h3 className="mb-3 text-xl font-semibold text-text-primary">{title}</h3>
      <p className="text-text-secondary">{description}</p>
    </Box>
  );
};

export default HowIWorkStep;
