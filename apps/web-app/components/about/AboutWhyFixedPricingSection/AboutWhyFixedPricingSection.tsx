"use client";

import { Box, Stack } from "@mantine/core";
import React from "react";

import FadeInSection from "../../shared/FadeInSection/FadeInSection";
import SectionTitle from "../../shared/SectionTitle/SectionTitle";
import Text from "../../ui/Text/Text";

const PARAGRAPHS = [
  "Hourly billing creates perverse incentives. The slower I work, the more I get paid. That's backwards.",
  "Fixed pricing aligns our interests. You want a working product as fast as possible. I want to deliver efficiently and move on to the next project. We both win when I ship fast.",
  "More importantly: you know exactly what you're paying upfront. No surprise invoices. No ambiguous scope discussions halfway through. Just clear deliverables and a clear price.",
  "This only works if we define scope carefully at the start. That's why discovery is so important, and why it's included in every project.",
];

const AboutWhyFixedPricingSection: React.FC = () => {
  return (
    <section className="py-20">
      <Box className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <FadeInSection>
          <Box className="rounded-2xl border border-border bg-surface p-10">
            <SectionTitle className="mb-10 text-left">Why Fixed Scope &amp; Pricing?</SectionTitle>
            <Stack gap={20}>
              {PARAGRAPHS.map((paragraph, i) => (
                <Text key={i} className="text-lg leading-relaxed text-text-secondary">
                  {paragraph}
                </Text>
              ))}
            </Stack>
          </Box>
        </FadeInSection>
      </Box>
    </section>
  );
};

export default AboutWhyFixedPricingSection;
