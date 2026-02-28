"use client";

import { Box, Group, Stack, Title } from "@mantine/core";
import {
  IconCheck,
  IconCurrencyDollar,
  IconDeviceDesktop,
  IconDeviceMobile,
  IconFolder,
  IconPlayerPlay,
  IconShield,
  IconTarget,
  IconUserPlus,
  IconUsers,
} from "@tabler/icons-react";
import React from "react";

import { type Solution, type SolutionCard, type SolutionGroup } from "@/utils";

import FadeInSection from "../../shared/FadeInSection/FadeInSection";
import Text from "../../ui/Text/Text";

interface CaseStudySolutionProps {
  solution: Solution;
}

const ICON_MAP: Record<string, React.ReactNode> = {
  playerPlay: <IconPlayerPlay size={20} className="text-accent-primary" />,
  folder: <IconFolder size={20} className="text-accent-primary" />,
  userPlus: <IconUserPlus size={20} className="text-accent-primary" />,
  currencyDollar: <IconCurrencyDollar size={20} className="text-accent-primary" />,
  target: <IconTarget size={20} className="text-accent-primary" />,
  shield: <IconShield size={20} className="text-accent-primary" />,
  users: <IconUsers size={20} className="text-accent-primary" />,
  deviceMobile: <IconDeviceMobile size={24} className="text-accent-primary" />,
  desktop: <IconDeviceDesktop size={24} className="text-accent-primary" />,
};

const CaseStudySolution: React.FC<CaseStudySolutionProps> = ({ solution }) => {
  return (
    <section className="py-20">
      <Box className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <FadeInSection>
          <Box className="mb-12">
            <Title order={2} className="mb-6 text-3xl font-bold text-text-primary lg:text-4xl">
              The Solution
            </Title>
            <Box className="mb-8 h-1 w-20 rounded-full bg-accent-primary" />
          </Box>

          {solution.type === "cards" && (
            <>
              <Text className="mb-12 text-lg text-text-secondary">
                Built a streaming platform with:
              </Text>
              <Box className="grid gap-6 md:grid-cols-2">
                {solution.items.map((card: SolutionCard) => (
                  <Box
                    key={card.title}
                    className={`rounded-xl border border-gray-800 bg-bg-surface p-6 ${
                      card.fullWidth ? "md:col-span-2" : ""
                    }`}
                  >
                    <Stack gap={16}>
                      <Box className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-primary/20">
                        {ICON_MAP[card.iconKey]}
                      </Box>
                      <Box>
                        <Title order={3} className="mb-2 text-xl font-semibold text-text-primary">
                          {card.title}
                        </Title>
                        <Text className="text-text-secondary">{card.description}</Text>
                      </Box>
                    </Stack>
                  </Box>
                ))}
              </Box>
            </>
          )}

          {solution.type === "groups" && (
            <Box className="grid gap-8 md:grid-cols-2">
              {solution.groups.map((group: SolutionGroup) => (
                <Box
                  key={group.title}
                  className="rounded-xl border border-gray-800 bg-bg-surface p-8"
                >
                  <Stack gap={12} className="mb-6">
                    <Box className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent-primary/20">
                      {ICON_MAP[group.iconKey]}
                    </Box>
                    <Title order={3} className="text-2xl font-bold text-text-primary">
                      {group.title}
                    </Title>
                  </Stack>
                  <Box className="space-y-4">
                    {group.items.map((item: string) => (
                      <Group key={item} align="flex-start" gap={12}>
                        <Box className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent-primary/20">
                          <IconCheck size={12} className="text-accent-primary" />
                        </Box>
                        <Text className="text-text-secondary">{item}</Text>
                      </Group>
                    ))}
                  </Box>
                </Box>
              ))}
            </Box>
          )}
        </FadeInSection>
      </Box>
    </section>
  );
};

export default CaseStudySolution;
