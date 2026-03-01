"use client";

import { Box, Title } from "@mantine/core";
import React from "react";

import FadeInSection from "../../shared/FadeInSection/FadeInSection";
import Button from "../../ui/Button/Button";
import Text from "../../ui/Text/Text";

const PricingCTASection: React.FC = () => {
  return (
    <section className="py-20">
      <Box className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeInSection className="mx-auto max-w-2xl text-center">
          <Title
            order={2}
            className="mb-8 text-3xl font-bold text-text-primary lg:text-4xl"
          >
            Questions about pricing?
          </Title>
          <Text className="mb-6 text-text-secondary">
            Get in touch for a quote or to ask anything about scope and pricing.
          </Text>
          <Box className="flex flex-col justify-center gap-4 sm:flex-row">
            <Button href="/contact" size="md">
              Get In Touch
            </Button>
            <Button href="/services" variant="secondary" size="md">
              View Services
            </Button>
          </Box>
        </FadeInSection>
      </Box>
    </section>
  );
};

export default PricingCTASection;
