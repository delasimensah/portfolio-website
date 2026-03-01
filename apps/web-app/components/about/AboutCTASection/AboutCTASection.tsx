"use client";

import { Box, Title } from "@mantine/core";
import React from "react";

import FadeInSection from "../../shared/FadeInSection/FadeInSection";
import Button from "../../ui/Button/Button";
import Text from "../../ui/Text/Text";

const AboutCTASection: React.FC = () => {
  return (
    <section className="bg-bg-surface/50 py-20">
      <Box className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <FadeInSection>
          <Title
            order={2}
            className="mb-6 text-3xl font-bold text-text-primary lg:text-4xl"
          >
            Want to work together?
          </Title>
          <Text className="mx-auto mb-12 max-w-2xl text-xl text-text-secondary">
            If you value clarity, structure, and knowing exactly what
            you&apos;re getting, let&apos;s talk.
          </Text>
          <Box className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button href="/contact" size="lg">
              Build Your Product
            </Button>
            <Button href="/services" variant="secondary" size="lg">
              View Services
            </Button>
          </Box>
        </FadeInSection>
      </Box>
    </section>
  );
};

export default AboutCTASection;
