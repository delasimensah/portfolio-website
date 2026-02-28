"use client";

import { Box } from "@mantine/core";
import {
  IconClock,
  IconRefresh,
  IconTarget,
} from "@tabler/icons-react";
import React from "react";

import FadeInSection from "../../shared/FadeInSection/FadeInSection";
import StaggerContainer from "../../shared/StaggerContainer/StaggerContainer";
import StaggerItem from "../../shared/StaggerContainer/StaggerItem";

const BENEFITS = [
  { icon: IconClock, title: "Faster build times" },
  { icon: IconRefresh, title: "Cleaner iterations" },
  { icon: IconTarget, title: "More focus on product decisions" },
];

const ModernWorkflowSection: React.FC = () => {
  return (
    <section className="py-20">
      <Box className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeInSection className="mx-auto max-w-4xl text-center">
          <h2 className="mb-8 text-3xl font-bold text-text-primary lg:text-4xl">
            Built With Modern Tools — Delivered With Accountability
          </h2>
          <Box className="space-y-8 text-lg">
            <p className="text-text-secondary">
              I use AI tools to speed up development and reduce repetitive work.
            </p>
            <Box className="rounded-xl border border-gray-800 bg-bg-surface p-8">
              <h3 className="mb-6 text-xl font-semibold text-text-primary">
                What that means for you:
              </h3>
              <StaggerContainer className="grid gap-6 md:grid-cols-3">
                {BENEFITS.map(({ icon: Icon, title }) => (
                  <StaggerItem key={title} className="text-center">
                    <Box className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-accent-primary/20">
                      <Icon size={24} className="text-accent-primary" />
                    </Box>
                    <h4 className="font-semibold text-text-primary">{title}</h4>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </Box>
            <Box className="space-y-4 text-text-secondary">
              <p>AI improves execution speed.</p>
              <p className="font-semibold text-text-primary">
                I handle scope, architecture, and final responsibility.
              </p>
            </Box>
          </Box>
        </FadeInSection>
      </Box>
    </section>
  );
};

export default ModernWorkflowSection;
