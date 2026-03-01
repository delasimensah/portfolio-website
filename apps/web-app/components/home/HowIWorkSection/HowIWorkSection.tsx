"use client";

import { Box } from "@mantine/core";
import React from "react";

import FadeInSection from "../../shared/FadeInSection/FadeInSection";
import SectionTitle from "../../shared/SectionTitle/SectionTitle";
import StaggerContainer from "../../shared/StaggerContainer/StaggerContainer";
import StaggerItem from "../../shared/StaggerContainer/StaggerItem";
import HowIWorkStep from "../HowIWorkStep/HowIWorkStep";

const STEPS = [
  {
    step: 1,
    title: "Define",
    description: "Clearly define the product scope and outcome.",
  },
  {
    step: 2,
    title: "Simplify",
    description: "Unclutter and streamline the user experience.",
  },
  {
    step: 3,
    title: "Build",
    description: "Build the full product: UI, workflows, and infrastructure.",
  },
  { step: 4, title: "Launch", description: "Launch, refine, optimise." },
];

const STEP_GRADIENTS = [
  "bg-gradient-to-br from-accent-primary to-accent-hover",
  "bg-gradient-to-br from-accent-secondary to-accent-secondary-dark",
  "bg-gradient-to-br from-success to-success-dark",
  "bg-gradient-to-br from-warm to-warm-dark",
];

const HowIWorkSection: React.FC = () => {
  return (
    <section className="relative overflow-hidden bg-bg-surface/50 py-20">
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-subtle opacity-100"
        aria-hidden
      />
      <Box className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeInSection className="mb-16">
          <SectionTitle>How I Work</SectionTitle>
        </FadeInSection>
        <StaggerContainer className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s, i) => (
            <StaggerItem key={s.step}>
              <HowIWorkStep
                step={s.step}
                title={s.title}
                description={s.description}
                stepCircleGradient={STEP_GRADIENTS[i]}
              />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </Box>
    </section>
  );
};

export default HowIWorkSection;
