"use client";

import { Box, Title } from "@mantine/core";
import React from "react";

import FadeInSection from "../../shared/FadeInSection/FadeInSection";
import Text from "../../ui/Text/Text";
import ServiceCheckItem from "../ServiceCheckItem/ServiceCheckItem";

const INCLUDED = [
  "Product scoping session",
  "Web application",
  "Mobile app (iOS & Android)",
  "Backend system",
  "Authentication and role management",
  "3–5 core workflows",
  "Deployment to your accounts",
  "Basic documentation",
];

const NOT_INCLUDED = [
  "Enterprise-scale systems",
  "Large integrations unless scoped",
  "Ongoing feature expansion after launch",
  "App store or hosting fees",
];

const LaunchReadyProductSection: React.FC = () => {
  return (
    <section className="py-20">
      <Box className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeInSection className="mx-auto max-w-4xl">
          <Box className="rounded-xl border border-gray-800 bg-bg-surface p-8 lg:p-12">
            <Title order={2} className="mb-6 text-3xl font-bold text-text-primary lg:text-4xl">
              Launch-Ready Product Build
            </Title>
            <Text className="mb-8 text-lg leading-relaxed text-text-secondary">
              I build the first working version of your product. The version you
              can launch, test with real users, and grow from.
            </Text>

            <Box className="mb-8 grid gap-4 md:grid-cols-2">
              <Box className="rounded-xl bg-bg-primary p-6">
                <Text className="mb-2 text-text-secondary">Timeline</Text>
                <Text className="text-3xl font-bold text-text-primary">6–8 weeks</Text>
              </Box>
              <Box className="rounded-xl bg-bg-primary p-6">
                <Text className="mb-2 text-text-secondary">Starting From</Text>
                <Text className="text-3xl font-bold text-accent-primary">$3,000</Text>
              </Box>
            </Box>

            <Box className="space-y-8">
              <Box>
                <Title order={3} className="mb-6 text-2xl font-semibold text-text-primary">
                  Includes
                </Title>
                <Box className="grid gap-4 md:grid-cols-2">
                  {INCLUDED.map((item) => (
                    <ServiceCheckItem key={item} label={item} included />
                  ))}
                </Box>
              </Box>

              <Box className="border-t border-gray-800 pt-8">
                <Title order={3} className="mb-6 text-2xl font-semibold text-text-primary">
                  Not Included
                </Title>
                <Box className="grid gap-4 md:grid-cols-2">
                  {NOT_INCLUDED.map((item) => (
                    <ServiceCheckItem key={item} label={item} included={false} />
                  ))}
                </Box>
              </Box>
            </Box>
          </Box>
        </FadeInSection>
      </Box>
    </section>
  );
};

export default LaunchReadyProductSection;
