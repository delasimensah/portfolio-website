"use client";

import { Box, Title } from "@mantine/core";
import React from "react";

import { type CaseStudy } from "@/utils";

import FadeInSection from "../../shared/FadeInSection/FadeInSection";
import Text from "../../ui/Text/Text";

interface CaseStudyProblemProps {
  study: Pick<CaseStudy, "problem" | "problemHighlight">;
}

const CaseStudyProblem: React.FC<CaseStudyProblemProps> = ({ study }) => {
  return (
    <section className="bg-bg-surface/50 py-20">
      <Box className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <FadeInSection>
          <Box className="mb-12">
            <Title order={2} className="mb-6 text-3xl font-bold text-text-primary lg:text-4xl">
              The Problem
            </Title>
            <Box className="mb-8 h-1 w-20 rounded-full bg-accent-primary" />
          </Box>
          <Box className="space-y-6 text-lg leading-relaxed">
            {study.problem.map((paragraph, i) => (
              <Text key={i} className="text-lg leading-relaxed text-text-secondary">
                {paragraph}
              </Text>
            ))}
            <Text className="pt-4 text-xl font-semibold text-text-primary">
              {study.problemHighlight}
            </Text>
          </Box>
        </FadeInSection>
      </Box>
    </section>
  );
};

export default CaseStudyProblem;
