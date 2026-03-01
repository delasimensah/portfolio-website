"use client";

import { Box, Stack, Title } from "@mantine/core";
import React from "react";

import FadeInSection from "../../shared/FadeInSection/FadeInSection";
import Text from "../../ui/Text/Text";

const BIO_PARAGRAPHS = [
  "I help founders and small businesses build MVPs (Minimum Viable Products: the first working version of their product, built to launch fast and test with real users) without the usual delays, scope creep, or technical debt.",
  "I've spent the last decade building software, both as a solo founder and as part of early-stage startup teams. I've launched products that failed, products that succeeded, and everything in between.",
  "What I learned: most MVPs never launch. Not because the idea was bad, but because the process was broken. Scope creep. Slow development cycles. Overly complex architecture. Feature bloat.",
  "So I built a better way. Fixed-scope builds. Modern, AI-accelerated workflows. Transparent pricing. And a tech stack that actually lets you move fast without breaking things.",
  "I work with founders who want to move fast without endless scope creep.",
];

const AboutBioSection: React.FC = () => {
  return (
    <section className="py-20">
      <Box className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <FadeInSection>
          <Title
            order={2}
            className="mb-10 text-3xl font-bold text-text-primary lg:text-4xl"
          >
            Hi, I&apos;m a Product-Minded Developer
          </Title>
          <Stack gap={20}>
            {BIO_PARAGRAPHS.map((paragraph, i) => (
              <Text
                key={i}
                className="text-lg leading-relaxed text-text-secondary"
              >
                {paragraph}
              </Text>
            ))}
          </Stack>
        </FadeInSection>
      </Box>
    </section>
  );
};

export default AboutBioSection;
