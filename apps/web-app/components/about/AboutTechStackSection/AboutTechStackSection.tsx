"use client";

import { Box, Stack, Title } from "@mantine/core";
import { IconCheck } from "@tabler/icons-react";
import React from "react";

import FadeInSection from "../../shared/FadeInSection/FadeInSection";
import SectionTitle from "../../shared/SectionTitle/SectionTitle";
import Text from "../../ui/Text/Text";

interface TechCategory {
  label: string;
  items: string[];
}

const TECH_CATEGORIES: TechCategory[] = [
  {
    label: "Frontend",
    items: ["Next.js", "Expo / React Native", "TypeScript", "Tailwind CSS"],
  },
  {
    label: "Backend",
    items: ["Supabase", "PostgreSQL", "Edge Functions", "Row Level Security"],
  },
  {
    label: "Deployment",
    items: ["Vercel", "Expo EAS", "GitHub Actions", "App Store Connect"],
  },
  {
    label: "Tools",
    items: ["AI-assisted development", "Figma", "Linear", "Cursor / VS Code"],
  },
];

const WHY_STACK_REASONS = [
  "One codebase for web, iOS, and Android using React",
  "Supabase handles auth, database, and real-time features out of the box",
  "TypeScript catches bugs before they reach production",
  "Modern deployment with Vercel and Expo EAS means push-to-deploy simplicity",
];

const AboutTechStackSection: React.FC = () => {
  return (
    <section className="py-20">
      <Box className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <FadeInSection>
          <SectionTitle className="mb-4 text-left">The Tech Stack</SectionTitle>
          <Text className="mb-12 text-lg text-text-secondary">
            A proven, modern stack that prioritises developer velocity and
            product stability.
          </Text>

          <Box className="mb-16 grid grid-cols-2 gap-6 lg:grid-cols-4">
            {TECH_CATEGORIES.map((category) => (
              <Box
                key={category.label}
                className="bg-surface rounded-xl border border-border p-6"
              >
                <Title
                  order={4}
                  className="mb-4 text-sm font-semibold uppercase tracking-wider text-text-secondary"
                >
                  {category.label}
                </Title>
                <Stack gap={8}>
                  {category.items.map((item) => (
                    <Text
                      key={item}
                      className="text-sm font-medium text-text-primary"
                    >
                      {item}
                    </Text>
                  ))}
                </Stack>
              </Box>
            ))}
          </Box>

          <Title
            order={3}
            className="mb-6 text-2xl font-bold text-text-primary"
          >
            Why This Stack?
          </Title>
          <Stack gap={12}>
            {WHY_STACK_REASONS.map((reason) => (
              <Box key={reason} className="flex items-start gap-3">
                <Box className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-success to-success-dark">
                  <IconCheck
                    size={14}
                    strokeWidth={2.5}
                    className="text-white"
                  />
                </Box>
                <Text className="text-base text-text-secondary">{reason}</Text>
              </Box>
            ))}
          </Stack>
        </FadeInSection>
      </Box>
    </section>
  );
};

export default AboutTechStackSection;
