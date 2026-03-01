"use client";

import { Box, Title } from "@mantine/core";
import React from "react";

import FadeInSection from "../../shared/FadeInSection/FadeInSection";
import Button from "../../ui/Button/Button";
import Text from "../../ui/Text/Text";

const CaseStudiesCTASection: React.FC = () => {
  return (
    <section className="py-20">
      <Box className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeInSection className="mx-auto max-w-2xl text-center">
          <Title order={2} className="mb-6 text-3xl font-bold text-text-primary lg:text-4xl">
            Ready to Build Your Product?
          </Title>
          <Text className="mb-12 text-xl text-text-secondary">
            Tell me what you&apos;re working on.
          </Text>
          <Box className="flex flex-col justify-center gap-4 sm:flex-row">
            <Button href="/contact" size="md">
              Build Your Product
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

export default CaseStudiesCTASection;
