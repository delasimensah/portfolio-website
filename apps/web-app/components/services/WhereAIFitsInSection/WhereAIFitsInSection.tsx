"use client";

import { Box, Title } from "@mantine/core";
import {
  IconBulb,
  IconCompass,
  IconRocket,
  IconSearch,
  IconSettings,
  IconSitemap,
  IconUserCheck,
} from "@tabler/icons-react";
import React from "react";

import FadeInSection from "../../shared/FadeInSection/FadeInSection";
import SectionTitle from "../../shared/SectionTitle/SectionTitle";
import Text from "../../ui/Text/Text";
import AIFeatureCard from "../AIFeatureCard/AIFeatureCard";

const ICON_CLASS = "text-accent-primary";

const AI_FEATURES = [
  { icon: <IconBulb size={20} className={ICON_CLASS} />, title: "Defining what should be built" },
  { icon: <IconSitemap size={20} className={ICON_CLASS} />, title: "Structuring workflows around business goals" },
  { icon: <IconCompass size={20} className={ICON_CLASS} />, title: "Designing clean architecture" },
  { icon: <IconSearch size={20} className={ICON_CLASS} />, title: "Reviewing and refining generated code" },
  { icon: <IconSettings size={20} className={ICON_CLASS} />, title: "Keeping the codebase maintainable" },
  { icon: <IconRocket size={20} className={ICON_CLASS} />, title: "Deployment and production setup" },
  { icon: <IconUserCheck size={20} className={ICON_CLASS} />, title: "Ongoing accountability", className: "md:col-span-2" },
];

const WhereAIFitsInSection: React.FC = () => {
  return (
    <section className="bg-bg-surface/50 py-20">
      <Box className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeInSection className="mx-auto max-w-4xl">
          <Box className="mb-12 text-center">
            <SectionTitle className="mb-4">Where AI Fits In</SectionTitle>
            <Title order={3} className="text-2xl font-semibold text-accent-primary">
              AI is a tool, not the strategy
            </Title>
          </Box>

          <Box className="rounded-xl border border-gray-800 bg-bg-surface p-8 lg:p-12">
            <Text className="mb-8 text-center text-lg text-text-secondary">
              AI tools can generate code quickly.
              <br />
              But building a real product requires:
            </Text>

            <Box className="grid gap-4 md:grid-cols-2">
              {AI_FEATURES.map((feature) => (
                <AIFeatureCard
                  key={feature.title}
                  icon={feature.icon}
                  title={feature.title}
                  className={feature.className}
                />
              ))}
            </Box>

            <Box className="mt-12 space-y-2 text-center">
              <Title order={3} className="text-xl font-semibold text-text-primary">
                AI helps with speed.
              </Title>
              <Title order={3} className="text-xl font-bold text-accent-primary">
                I provide structure and responsibility.
              </Title>
            </Box>
          </Box>
        </FadeInSection>
      </Box>
    </section>
  );
};

export default WhereAIFitsInSection;
