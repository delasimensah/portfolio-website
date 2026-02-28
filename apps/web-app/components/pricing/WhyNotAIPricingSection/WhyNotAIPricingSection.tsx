"use client";

import { Box, Title } from "@mantine/core";
import {
  IconChartLine,
  IconClipboardList,
  IconCompass,
  IconRocket,
  IconSettings,
  IconUserCheck,
} from "@tabler/icons-react";
import React from "react";

import AIFeatureCard from "../../services/AIFeatureCard/AIFeatureCard";
import FadeInSection from "../../shared/FadeInSection/FadeInSection";
import SectionTitle from "../../shared/SectionTitle/SectionTitle";
import Text from "../../ui/Text/Text";

const ICON_CLASS = "text-accent-primary";

const VALUE_PROPS = [
  { icon: <IconClipboardList size={20} className={ICON_CLASS} />, title: "Structured scoping" },
  { icon: <IconChartLine size={20} className={ICON_CLASS} />, title: "Decisions tied to your business goals" },
  { icon: <IconCompass size={20} className={ICON_CLASS} />, title: "Clean system design" },
  { icon: <IconRocket size={20} className={ICON_CLASS} />, title: "Delivered ready to ship" },
  { icon: <IconSettings size={20} className={ICON_CLASS} />, title: "Production setup" },
  { icon: <IconUserCheck size={20} className={ICON_CLASS} />, title: "Accountability after launch" },
];

const WhyNotAIPricingSection: React.FC = () => {
  return (
    <section className="bg-bg-surface/50 py-20">
      <Box className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeInSection className="mx-auto max-w-4xl">
          <Box className="mb-12 text-center">
            <SectionTitle className="mb-6">Why Not Just Use an AI Tool?</SectionTitle>
            <Text className="text-xl text-text-secondary">
              AI tools can generate prototypes quickly.
            </Text>
          </Box>
          <Box className="rounded-xl border border-gray-800 bg-bg-surface p-8 lg:p-12">
            <Title order={3} className="mb-8 text-center text-2xl font-bold text-text-primary">
              What you&apos;re paying for here:
            </Title>
            <Box className="mb-12 grid gap-4 md:grid-cols-2">
              {VALUE_PROPS.map((item) => (
                <AIFeatureCard key={item.title} icon={item.icon} title={item.title} />
              ))}
            </Box>
            <Box className="space-y-3 border-t border-gray-800 pt-8 text-center">
              <Text className="text-lg text-text-secondary">
                If you only need a demo, AI tools may be enough.
              </Text>
              <Text className="text-xl font-semibold text-accent-primary">
                If you need a product you can run a business on, that&apos;s where I come in.
              </Text>
            </Box>
          </Box>
        </FadeInSection>
      </Box>
    </section>
  );
};

export default WhyNotAIPricingSection;
