"use client";

import { Box } from "@mantine/core";
import React from "react";

import { type CaseStudy } from "@/utils";

import FadeInSection from "../../shared/FadeInSection/FadeInSection";
import SectionTitle from "../../shared/SectionTitle/SectionTitle";
import Text from "../../ui/Text/Text";

interface CaseStudyOverviewProps {
  study: Pick<
    CaseStudy,
    "timeline" | "value" | "platforms" | "additionalStats"
  >;
}

const CaseStudyOverview: React.FC<CaseStudyOverviewProps> = ({ study }) => {
  const primaryStats = [
    { label: "Timeline", value: study.timeline },
    { label: "Project Value", value: study.value, accent: true },
    { label: "Platforms", value: study.platforms },
  ];

  const allStats = [...primaryStats, ...study.additionalStats];

  return (
    <section className="py-20">
      <Box className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <FadeInSection>
          <Box className="mb-12 text-center">
            <SectionTitle>Project Overview</SectionTitle>
          </Box>
          <Box className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {allStats.map((stat) => (
              <Box
                key={stat.label}
                className="rounded-xl border border-gray-800 bg-bg-surface p-8"
              >
                <Text className="mb-2 text-sm uppercase tracking-wider text-text-secondary">
                  {stat.label}
                </Text>
                <Text
                  className={`text-3xl font-bold ${
                    stat.accent ? "text-accent-primary" : "text-text-primary"
                  }`}
                >
                  {stat.value}
                </Text>
              </Box>
            ))}
          </Box>
        </FadeInSection>
      </Box>
    </section>
  );
};

export default CaseStudyOverview;
