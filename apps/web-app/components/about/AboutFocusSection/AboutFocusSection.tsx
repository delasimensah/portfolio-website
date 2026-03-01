"use client";

import { Box, Title } from "@mantine/core";
import { IconBox, IconCalendar, IconListCheck, IconTool } from "@tabler/icons-react";
import React from "react";

import FadeInSection from "../../shared/FadeInSection/FadeInSection";
import Text from "../../ui/Text/Text";

const FOCUS_GRADIENTS = [
  "bg-gradient-to-br from-accent-primary to-accent-hover",
  "bg-gradient-to-br from-accent-secondary to-accent-secondary-dark",
  "bg-gradient-to-br from-success to-success-dark",
  "bg-gradient-to-br from-warm to-warm-dark",
];

const FOCUS_ITEMS = [
  {
    icon: <IconListCheck size={28} className="text-white" />,
    title: "Clear scoping",
    description: "Distinct deliverables from the very beginning",
  },
  {
    icon: <IconCalendar size={28} className="text-white" />,
    title: "Defined timelines",
    description: "Realistic schedules with milestone tracking",
  },
  {
    icon: <IconBox size={28} className="text-white" />,
    title: "Clean architecture",
    description: "Code you won't need to throw out in six months",
  },
  {
    icon: <IconTool size={28} className="text-white" />,
    title: "Practical solutions",
    description: "Built for real business needs, not trends",
  },
];

const AboutFocusSection: React.FC = () => {
  return (
    <section className="py-20">
      <Box className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <FadeInSection>
          <Box className="mb-12 text-center">
            <Title order={2} className="mb-6 text-3xl font-bold text-text-primary lg:text-4xl">
              I focus on:
            </Title>
            <Box className="mx-auto h-1 w-20 rounded-full bg-accent-primary" />
          </Box>
          <Box className="grid gap-6 sm:grid-cols-2">
            {FOCUS_ITEMS.map((item, i) => (
              <Box
                key={item.title}
                className="rounded-xl border border-gray-800 bg-bg-surface p-8 transition-colors duration-200 hover:border-accent-primary/30"
              >
                <Box
                  className={`mb-6 flex h-14 w-14 items-center justify-center rounded-xl ${FOCUS_GRADIENTS[i]}`}
                >
                  {item.icon}
                </Box>
                <Title order={3} className="mb-3 text-2xl font-bold text-text-primary">
                  {item.title}
                </Title>
                <Text className="text-text-secondary">{item.description}</Text>
              </Box>
            ))}
          </Box>
        </FadeInSection>
      </Box>
    </section>
  );
};

export default AboutFocusSection;
