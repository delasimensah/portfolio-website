"use client";

import { Box, Group, Stack, Title } from "@mantine/core";
import React from "react";

import FadeInSection from "../../shared/FadeInSection/FadeInSection";
import SectionTitle from "../../shared/SectionTitle/SectionTitle";
import Text from "../../ui/Text/Text";

const FACTORS = [
  {
    number: "1",
    title: "Number of User Roles",
    description: "More roles = more screens and logic",
  },
  {
    number: "2",
    title: "Data Complexity",
    description: "Complex relationships increase backend work",
  },
  {
    number: "3",
    title: "Third-Party Integrations",
    description: "Stripe, Twilio, etc. add integration time",
  },
  {
    number: "4",
    title: "Custom Design Requirements",
    description: "Detailed UI mockups increase design scope",
  },
  {
    number: "5",
    title: "Platform Priority",
    description: "Web or mobile only is faster than web + mobile",
  },
];

const WhatAffectsPricingSection: React.FC = () => {
  return (
    <section className="py-20">
      <Box className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeInSection className="mx-auto max-w-4xl">
          <Box className="mb-12 text-center">
            <SectionTitle>What Affects Pricing?</SectionTitle>
          </Box>
          <Stack gap={12}>
            {FACTORS.map((factor) => (
              <Box
                key={factor.number}
                className="rounded-xl border border-gray-800 bg-bg-surface p-6"
              >
                <Group gap={16} align="flex-start" className="flex-col items-stretch md:flex-row md:items-start">
                  <Box className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent-primary/20">
                    <Text component="span" className="text-sm font-bold text-accent-primary">
                      {factor.number}
                    </Text>
                  </Box>
                  <Box>
                    <Title order={3} className="mb-1 text-base font-semibold text-text-primary">
                      {factor.title}
                    </Title>
                    <Text className="text-text-secondary">{factor.description}</Text>
                  </Box>
                </Group>
              </Box>
            ))}
          </Stack>
        </FadeInSection>
      </Box>
    </section>
  );
};

export default WhatAffectsPricingSection;
