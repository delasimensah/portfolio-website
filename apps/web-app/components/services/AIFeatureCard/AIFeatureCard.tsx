"use client";

import { Box, Stack, Title } from "@mantine/core";
import React from "react";

interface AIFeatureCardProps {
  icon: React.ReactNode;
  title: string;
  className?: string;
}

const AIFeatureCard: React.FC<AIFeatureCardProps> = ({ icon, title, className }) => {
  return (
    <Box className={`rounded-xl bg-bg-primary p-6 ${className ?? ""}`}>
      <Stack gap={12}>
        <Box className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-accent-primary/90 to-accent-secondary/90">
          {icon}
        </Box>
        <Title order={3} className="font-semibold text-text-primary">
          {title}
        </Title>
      </Stack>
    </Box>
  );
};

export default AIFeatureCard;
