"use client";

import { Box, Title } from "@mantine/core";
import React from "react";

import FadeInSection from "../../shared/FadeInSection/FadeInSection";
import Button from "../../ui/Button/Button";
import Text from "../../ui/Text/Text";

const AboutDeliverySection: React.FC = () => {
  return (
    <section className="py-20">
      <Box className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <FadeInSection>
          <Box className="rounded-xl border border-accent-primary/30 bg-gradient-to-br from-accent-primary/10 to-accent-primary/5 p-12 text-center lg:p-16">
            <Box className="mx-auto max-w-3xl">
              <Title order={2} className="mb-8 text-3xl font-bold text-text-primary lg:text-5xl">
                Projects start at $3,000 and are delivered in 6–8 weeks.
              </Title>
              <Text className="mb-12 text-xl text-text-secondary">
                Clear scope. Fixed timeline. Predictable execution.
              </Text>
              <Button href="/contact" size="lg">
                Start Your Project
              </Button>
            </Box>
          </Box>
        </FadeInSection>
      </Box>
    </section>
  );
};

export default AboutDeliverySection;
