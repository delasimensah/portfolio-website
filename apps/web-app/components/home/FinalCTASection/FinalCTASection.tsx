"use client";

import { Box } from "@mantine/core";
import React from "react";

import { Button } from "@/components";

import FadeInSection from "../../shared/FadeInSection/FadeInSection";

const FinalCTASection: React.FC = () => {
  return (
    <section className="relative overflow-hidden bg-bg-surface/50 py-20">
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-subtle opacity-100"
        aria-hidden
      />
      <Box className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeInSection className="mx-auto max-w-2xl text-center">
          <Box className="rounded-xl border border-accent-primary/20 bg-gradient-card p-10">
            <h2 className="mb-8 text-3xl font-bold text-text-primary lg:text-4xl">
              Ready to Build?
            </h2>
            <Button href="/contact" size="lg">
              Start Now
            </Button>
          </Box>
        </FadeInSection>
      </Box>
    </section>
  );
};

export default FinalCTASection;
