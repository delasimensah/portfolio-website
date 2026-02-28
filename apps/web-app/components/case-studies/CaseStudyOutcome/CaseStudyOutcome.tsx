"use client";

import { Box, Group, Title } from "@mantine/core";
import {
  IconCalendarCheck,
  IconChartLine,
  IconDeviceMobile,
  IconEye,
  IconMicrophone,
  IconPhoneOff,
  IconRocket,
  IconSitemap,
  IconUsers,
} from "@tabler/icons-react";
import React from "react";

import { type OutcomeItem } from "@/utils";

import FadeInSection from "../../shared/FadeInSection/FadeInSection";
import Text from "../../ui/Text/Text";

interface CaseStudyOutcomeProps {
  outcomes: OutcomeItem[];
}

const ICON_MAP: Record<string, React.ReactNode> = {
  users: <IconUsers size={24} className="text-accent-primary" />,
  microphone: <IconMicrophone size={24} className="text-accent-primary" />,
  chartLine: <IconChartLine size={24} className="text-accent-primary" />,
  deviceMobile: <IconDeviceMobile size={24} className="text-accent-primary" />,
  rocket: <IconRocket size={24} className="text-accent-primary" />,
  calendarCheck: <IconCalendarCheck size={24} className="text-accent-primary" />,
  phoneOff: <IconPhoneOff size={24} className="text-accent-primary" />,
  eye: <IconEye size={24} className="text-accent-primary" />,
  sitemap: <IconSitemap size={24} className="text-accent-primary" />,
};

const CaseStudyOutcome: React.FC<CaseStudyOutcomeProps> = ({ outcomes }) => {
  return (
    <section className="py-20">
      <Box className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <FadeInSection>
          <Box className="mb-12">
            <Title order={2} className="mb-6 text-3xl font-bold text-text-primary lg:text-4xl">
              Outcome
            </Title>
            <Box className="h-1 w-20 rounded-full bg-accent-primary" />
          </Box>
          <Box className="grid gap-6 md:grid-cols-2">
            {outcomes.map((item) => (
              <Box
                key={item.stat}
                className={`rounded-xl border border-gray-800 bg-bg-surface p-8 ${
                  item.fullWidth ? "md:col-span-2" : ""
                }`}
              >
                <Group gap={16} className="mb-4">
                  <Box className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent-primary/20">
                    {ICON_MAP[item.iconKey]}
                  </Box>
                  <Title order={3} className="text-xl font-bold text-text-primary">
                    {item.stat}
                  </Title>
                </Group>
                <Text className="text-text-secondary">{item.description}</Text>
              </Box>
            ))}
          </Box>
        </FadeInSection>
      </Box>
    </section>
  );
};

export default CaseStudyOutcome;
