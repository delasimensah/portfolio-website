"use client";

import { Box, Group, Stack, Title } from "@mantine/core";
import { IconCheck } from "@tabler/icons-react";
import React from "react";

import FadeInSection from "../../shared/FadeInSection/FadeInSection";
import Text from "../../ui/Text/Text";

const PRINCIPLES = [
  "No feature creep. Scope is locked after agreement.",
  "No subcontracting. You work directly with me from day one.",
  "No hype. Just structured execution and working software.",
  "No hand-holding. You get a professional product, not a consulting relationship.",
];

const AboutPrinciplesSection: React.FC = () => {
  return (
    <section className="bg-bg-surface/50 py-20">
      <Box className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <FadeInSection>
          <Box className="mb-12">
            <Title order={2} className="mb-6 text-3xl font-bold text-text-primary lg:text-4xl">
              Core Principles
            </Title>
            <Box className="h-1 w-20 rounded-full bg-accent-primary" />
          </Box>
          <Stack gap={24}>
            {PRINCIPLES.map((principle) => (
              <Group key={principle} align="flex-start" gap={16}>
                <Box className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-success to-success-dark">
                  <IconCheck size={14} className="text-white" />
                </Box>
                <Text className="text-lg text-text-secondary">{principle}</Text>
              </Group>
            ))}
          </Stack>
        </FadeInSection>
      </Box>
    </section>
  );
};

export default AboutPrinciplesSection;
