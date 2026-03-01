"use client";

import { Box } from "@mantine/core";
import React from "react";

import { Button } from "@/components";

import FadeInSection from "../../shared/FadeInSection/FadeInSection";

const PricingPreviewSection: React.FC = () => {
  return (
    <section className="bg-bg-surface/50 py-20">
      <Box className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeInSection className="mx-auto max-w-2xl text-center">
          <Box className="rounded-xl border border-accent-primary/20 bg-bg-surface bg-gradient-card p-8 sm:p-12">
            <Box className="space-y-8">
              <Box>
                <p className="mb-2 text-text-secondary">Starting From:</p>
                <p className="text-5xl font-bold text-text-primary">$1,500</p>
              </Box>
              <p className="text-text-secondary">Delivered in 4–8 weeks.</p>
              <Button href="/services" size="md">
                View Services
              </Button>
            </Box>
          </Box>
        </FadeInSection>
      </Box>
    </section>
  );
};

export default PricingPreviewSection;
