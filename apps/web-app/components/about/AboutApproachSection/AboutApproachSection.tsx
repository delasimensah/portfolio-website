"use client";

import { Box, Group, Stack, Title } from "@mantine/core";
import { IconRobot, IconUserCheck } from "@tabler/icons-react";
import React from "react";

import FadeInSection from "../../shared/FadeInSection/FadeInSection";
import Text from "../../ui/Text/Text";

const APPROACH_GRADIENTS = [
  "bg-gradient-to-br from-accent-primary to-accent-hover",
  "bg-gradient-to-br from-accent-secondary to-accent-secondary-dark",
];

const APPROACH_ITEMS = [
  {
    icon: <IconRobot size={24} className="text-white" />,
    title: "Modern Tools",
    description:
      "I use modern tools to work efficiently. What doesn't change is the judgment, the planning, and the review.",
  },
  {
    icon: <IconUserCheck size={24} className="text-white" />,
    title: "Human Oversight",
    description:
      "Structure, judgment, and responsibility stay with me. Every decision is reviewed, every line of code is validated, and every deliverable is my responsibility.",
  },
];

const AboutApproachSection: React.FC = () => {
  return (
    <section className="bg-bg-surface/50 py-20">
      <Box className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <FadeInSection>
          <Box className="mb-12">
            <Title order={2} className="mb-6 text-3xl font-bold text-text-primary lg:text-4xl">
              My Approach
            </Title>
            <Box className="h-1 w-20 rounded-full bg-accent-primary" />
          </Box>
          <Stack gap={24}>
            {APPROACH_ITEMS.map((item, i) => (
              <Box
                key={item.title}
                className="rounded-xl border border-gray-800 bg-bg-surface p-8"
              >
                <Group align="flex-start" gap={24}>
                  <Box className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${APPROACH_GRADIENTS[i]}`}>
                    {item.icon}
                  </Box>
                  <Box>
                    <Title order={3} className="mb-3 text-xl font-bold text-text-primary">
                      {item.title}
                    </Title>
                    <Text className="text-lg leading-relaxed text-text-secondary">
                      {item.description}
                    </Text>
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

export default AboutApproachSection;
