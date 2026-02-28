"use client";

import { Box, Title } from "@mantine/core";
import { IconCode, IconRocket, IconSearch } from "@tabler/icons-react";
import React from "react";

import FadeInSection from "../../shared/FadeInSection/FadeInSection";
import SectionTitle from "../../shared/SectionTitle/SectionTitle";
import Text from "../../ui/Text/Text";

const FACTORS = [
  {
    icon: <IconSearch size={24} className="text-accent-primary" />,
    title: "Clear Requirements",
    description: "I spend real time upfront understanding what you need, so we build the right thing and not the wrong thing fast.",
  },
  {
    icon: <IconCode size={24} className="text-accent-primary" />,
    title: "Production-Ready Code",
    description: "Code you won't need to throw out in six months. Clean structure, no shortcuts.",
  },
  {
    icon: <IconRocket size={24} className="text-accent-primary" />,
    title: "Launch Support",
    description: "I handle deployment and stay available after launch, not just until the code is done.",
  },
];

const WhatMakesSuccessSection: React.FC = () => {
  return (
    <section className="bg-bg-surface/50 py-20">
      <Box className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeInSection className="mx-auto max-w-4xl">
          <Box className="mb-12 text-center">
            <SectionTitle className="mb-4">
              What goes into every project
            </SectionTitle>
            <Text className="text-xl text-text-secondary">
              The approach is the same regardless of the project.
            </Text>
          </Box>
          <Box className="grid gap-8 md:grid-cols-3">
            {FACTORS.map((factor) => (
              <Box
                key={factor.title}
                className="rounded-xl border border-gray-800 bg-bg-surface p-8"
              >
                <Box className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-accent-primary/20">
                  {factor.icon}
                </Box>
                <Title order={3} className="mb-4 text-xl font-bold text-text-primary">
                  {factor.title}
                </Title>
                <Text className="text-text-secondary">{factor.description}</Text>
              </Box>
            ))}
          </Box>
        </FadeInSection>
      </Box>
    </section>
  );
};

export default WhatMakesSuccessSection;
