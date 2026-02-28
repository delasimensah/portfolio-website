"use client";

import { Box, Title } from "@mantine/core";
import React from "react";

import FadeInSection from "../../shared/FadeInSection/FadeInSection";
import Button from "../../ui/Button/Button";
import Text from "../../ui/Text/Text";

const CaseStudyCTA: React.FC = () => {
  return (
    <section className="bg-bg-surface/50 py-20">
      <Box className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
        <FadeInSection>
          <Title order={2} className="mb-6 text-3xl font-bold text-text-primary lg:text-4xl">
            Want to build something like this?
          </Title>
          <Text className="mb-12 text-xl text-text-secondary">
            Tell me about your project.
          </Text>
          <Box className="flex flex-col justify-center gap-4 sm:flex-row">
            <Button href="/contact" size="lg">
              Start Your Project
            </Button>
            <Button href="/case-studies" variant="secondary" size="lg">
              View All Case Studies
            </Button>
          </Box>
        </FadeInSection>
      </Box>
    </section>
  );
};

export default CaseStudyCTA;
