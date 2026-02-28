"use client";

import { Box, Group, Stack, Title } from "@mantine/core";
import { IconCheck, IconX } from "@tabler/icons-react";
import React from "react";

import FadeInSection from "../../shared/FadeInSection/FadeInSection";
import SectionTitle from "../../shared/SectionTitle/SectionTitle";
import Text from "../../ui/Text/Text";

const GOOD_FIT_STEPS = [
  "We schedule a scoping call.",
  "Define the core features.",
  "Confirm timeline and pricing.",
  "Move forward with a build plan.",
];

const ContactWhatNextSection: React.FC = () => {
  return (
    <section className="bg-bg-surface/50 py-20">
      <Box className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <FadeInSection>
          <Box className="mb-12 text-center">
            <SectionTitle className="mb-6">What Happens Next</SectionTitle>
            <Box className="bg-accent-primary mx-auto h-1 w-20 rounded-full" />
          </Box>

          <Box className="bg-bg-surface mb-12 rounded-xl border border-gray-800 p-8 lg:p-12">
            <Text className="text-text-secondary mb-10 text-center text-xl">
              After you submit, I&apos;ll review your details and respond within
              1–2 business days.
            </Text>

            <Box className="grid gap-12 md:grid-cols-2">
              <Stack gap={24}>
                <Group gap={16}>
                  <Box className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-green-500/20">
                    <IconCheck size={20} className="text-green-400" />
                  </Box>
                  <Title
                    order={3}
                    className="text-text-primary text-2xl font-bold"
                  >
                    If it&apos;s a good fit:
                  </Title>
                </Group>

                <Stack gap={16} className="ml-16">
                  {GOOD_FIT_STEPS.map((step) => (
                    <Group key={step} gap={10} align="center">
                      <Box className="bg-accent-primary h-2 w-2 shrink-0 rounded-full" />
                      <Text className="text-text-secondary text-base">
                        {step}
                      </Text>
                    </Group>
                  ))}
                </Stack>
              </Stack>

              <Stack gap={24}>
                <Group gap={16}>
                  <Box className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-red-500/20">
                    <IconX size={20} className="text-red-400" />
                  </Box>
                  <Title
                    order={3}
                    className="text-text-primary text-2xl font-bold"
                  >
                    If it&apos;s not the right fit:
                  </Title>
                </Group>

                <Text className="text-text-secondary ml-16 text-lg">
                  I&apos;ll let you know clearly.
                </Text>
              </Stack>
            </Box>
          </Box>

          <Box className="bg-bg-surface/30 rounded-xl border border-gray-800 px-8 py-6 text-center">
            <Text className="text-text-secondary text-lg">
              You retain full ownership of your production accounts and
              infrastructure.
            </Text>
          </Box>
        </FadeInSection>
      </Box>
    </section>
  );
};

export default ContactWhatNextSection;
