"use client";

import { Box } from "@mantine/core";
import React from "react";

import FadeInSection from "../../shared/FadeInSection/FadeInSection";
import SectionTitle from "../../shared/SectionTitle/SectionTitle";
import StaggerContainer from "../../shared/StaggerContainer/StaggerContainer";
import StaggerItem from "../../shared/StaggerContainer/StaggerItem";
import HowIWorkStep from "../HowIWorkStep/HowIWorkStep";

const STEPS = [
  { step: 1, title: "Define", description: "Define what actually needs to be built." },
  { step: 2, title: "Simplify", description: "Remove unnecessary features." },
  { step: 3, title: "Build", description: "Build the core system." },
  { step: 4, title: "Launch", description: "Launch and refine." },
];

const HowIWorkSection: React.FC = () => {
  return (
    <section className="bg-bg-surface/50 py-20">
      <Box className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeInSection className="mb-16">
          <SectionTitle>How I Work</SectionTitle>
        </FadeInSection>
        <StaggerContainer className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s) => (
            <StaggerItem key={s.step}>
              <HowIWorkStep
                step={s.step}
                title={s.title}
                description={s.description}
              />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </Box>
    </section>
  );
};

export default HowIWorkSection;
