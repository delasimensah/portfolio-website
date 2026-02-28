"use client";

import { Box, Group, Stack, Title } from "@mantine/core";
import { IconCheck } from "@tabler/icons-react";
import React from "react";

import FadeInSection from "../../shared/FadeInSection/FadeInSection";
import SectionTitle from "../../shared/SectionTitle/SectionTitle";
import Text from "../../ui/Text/Text";

const PAYMENT_SPLITS = [
  { percent: "50%", label: "upfront to begin work" },
  { percent: "50%", label: "upon delivery" },
];

const INCLUDED = [
  "Discovery and scoping session",
  "All development work",
  "Deployment and handoff",
  "2 weeks post-launch support",
];

const PaymentTermsSection: React.FC = () => {
  return (
    <section className="bg-bg-surface/50 py-20">
      <Box className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeInSection className="mx-auto max-w-4xl">
          <Box className="mb-12 text-center">
            <SectionTitle>Payment Terms</SectionTitle>
          </Box>
          <Box className="grid gap-6 md:grid-cols-2">
            <Box className="rounded-xl border border-gray-800 bg-bg-surface p-8">
              <Title order={3} className="mb-6 text-xl font-semibold text-text-primary">
                Standard Structure
              </Title>
              <Stack gap={12}>
                {PAYMENT_SPLITS.map((split) => (
                  <Box key={split.label} className="rounded-xl bg-bg-primary p-4">
                    <Text component="span" className="text-2xl font-bold text-accent-primary">
                      {split.percent}
                    </Text>
                    <Text className="text-text-secondary">{split.label}</Text>
                  </Box>
                ))}
              </Stack>
            </Box>

            <Box className="rounded-xl border border-gray-800 bg-bg-surface p-8">
              <Title order={3} className="mb-6 text-xl font-semibold text-text-primary">
                What&apos;s Included
              </Title>
              <Stack gap={12}>
                {INCLUDED.map((item) => (
                  <Group key={item} gap={12}>
                    <Box className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent-primary/20">
                      <IconCheck size={12} className="text-accent-primary" />
                    </Box>
                    <Text component="span" className="text-text-secondary">
                      {item}
                    </Text>
                  </Group>
                ))}
              </Stack>
            </Box>
          </Box>
        </FadeInSection>
      </Box>
    </section>
  );
};

export default PaymentTermsSection;
