"use client";

import { Box, Group, Title } from "@mantine/core";
import { IconBuilding, IconRocket } from "@tabler/icons-react";
import React from "react";

import FadeInSection from "../../shared/FadeInSection/FadeInSection";
import Text from "../../ui/Text/Text";

const WHO_GRADIENTS = [
  "bg-gradient-to-br from-accent-primary to-accent-hover",
  "bg-gradient-to-br from-accent-secondary to-accent-secondary-dark",
];

const WHO_ITEMS = [
  {
    icon: <IconRocket size={24} className="text-white" />,
    title: "Founders",
    description: "Building their first product or validating an idea with a structured MVP",
  },
  {
    icon: <IconBuilding size={24} className="text-white" />,
    title: "Businesses",
    description: "Digitising operations, automating workflows, or launching internal tools",
  },
];

const AboutWhoIWorkWithSection: React.FC = () => {
  return (
    <section className="py-20">
      <Box className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <FadeInSection>
          <Box className="mb-12">
            <Title order={2} className="mb-6 text-3xl font-bold text-text-primary lg:text-4xl">
              Who I Work With
            </Title>
            <Box className="h-1 w-20 rounded-full bg-accent-primary" />
          </Box>
          <Box className="grid gap-6 md:grid-cols-2">
            {WHO_ITEMS.map((item, i) => (
              <Box
                key={item.title}
                className="rounded-xl border border-gray-800 bg-bg-surface p-8"
              >
                <Group gap={16} className="mb-6">
                  <Box className={`flex h-12 w-12 items-center justify-center rounded-xl ${WHO_GRADIENTS[i]}`}>
                    {item.icon}
                  </Box>
                  <Title order={3} className="text-2xl font-bold text-text-primary">
                    {item.title}
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

export default AboutWhoIWorkWithSection;
