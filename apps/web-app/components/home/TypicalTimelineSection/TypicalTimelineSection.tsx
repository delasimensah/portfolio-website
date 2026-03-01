"use client";

import { Box, Title } from "@mantine/core";
import React from "react";

import FadeInSection from "../../shared/FadeInSection/FadeInSection";
import StaggerContainer from "../../shared/StaggerContainer/StaggerContainer";
import StaggerItem from "../../shared/StaggerContainer/StaggerItem";
import Text from "../../ui/Text/Text";

const PHASES = [
  {
    step: 1,
    period: "Week 1",
    title: "Discovery & Design",
    description:
      "Define scope, map user flows, create wireframes, finalize tech architecture.",
  },
  {
    step: 2,
    period: "Weeks 2-4",
    title: "Development",
    description:
      "Build core features, implement authentication, create UI components, integrate backend.",
  },
  {
    step: 3,
    period: "Week 5",
    title: "Testing & Polish",
    description:
      "Bug fixes, performance optimization, cross-platform testing, user feedback integration.",
  },
  {
    step: 4,
    period: "Week 6",
    title: "Deployment & Launch",
    description:
      "Deploy web app, submit to app stores, handoff documentation, training session.",
  },
];

const STEP_GRADIENTS = [
  "bg-gradient-to-br from-accent-primary to-accent-hover",
  "bg-gradient-to-br from-accent-secondary to-accent-secondary-dark",
  "bg-gradient-to-br from-success to-success-dark",
  "bg-gradient-to-br from-warm to-warm-dark",
];

const TypicalTimelineSection: React.FC = () => {
  return (
    <section className="py-20">
      <Box className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <FadeInSection>
          <Box className="mb-12">
            <Title
              order={2}
              className="mb-6 text-3xl font-bold text-text-primary lg:text-4xl"
            >
              Typical Timeline
            </Title>
            <Box className="h-1 w-20 rounded-full bg-accent-primary" />
          </Box>
          <StaggerContainer className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {PHASES.map((phase, i) => (
              <StaggerItem key={phase.step}>
                <Box className="rounded-xl border border-gray-800 bg-bg-surface p-6">
                  <Box
                    className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl ${STEP_GRADIENTS[i]}`}
                  >
                    <span className="text-lg font-bold text-white">
                      {phase.step}
                    </span>
                  </Box>
                  <Text
                    component="span"
                    className="mb-2 block text-sm font-medium text-accent-primary"
                  >
                    {phase.period}
                  </Text>
                  <Title
                    order={3}
                    className="mb-3 text-lg font-semibold text-text-primary"
                  >
                    {phase.title}
                  </Title>
                  <Text className="text-text-secondary">
                    {phase.description}
                  </Text>
                </Box>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </FadeInSection>
      </Box>
    </section>
  );
};

export default TypicalTimelineSection;
