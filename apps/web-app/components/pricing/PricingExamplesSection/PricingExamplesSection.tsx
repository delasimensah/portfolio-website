"use client";

import { Box, Title } from "@mantine/core";
import React from "react";

import FadeInSection from "../../shared/FadeInSection/FadeInSection";
import Text from "../../ui/Text/Text";

interface PricingExample {
  platform: string;
  description: string;
  price: string;
  note?: string;
}

const EXAMPLES: PricingExample[] = [
  {
    platform: "Web App Only",
    description:
      "Single-platform web application with core workflows, authentication, and deployment.",
    price: "~$1,500",
  },
  {
    platform: "Mobile App Only",
    description:
      "iOS and Android app with core workflows, authentication, and App Store deployment.",
    price: "~$2,000",
  },
  {
    platform: "Web + Mobile",
    description:
      "Full web and mobile product sharing the same backend, deployed to all platforms.",
    price: "$3,500+",
  },
];

const PricingExamplesSection: React.FC = () => {
  return (
    <section className="py-20">
      <Box className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeInSection className="mx-auto max-w-4xl">
          <Box className="mb-10">
            <Title
              order={2}
              className="mb-4 text-3xl font-bold text-text-primary lg:text-4xl"
            >
              Pricing Examples
            </Title>
            <Text className="text-lg text-text-secondary">
              These are starting points. Complexity, integrations, and the
              number of user roles will move the final price up or down.
            </Text>
          </Box>

          <Box className="grid gap-6 md:grid-cols-3">
            {EXAMPLES.map((example) => (
              <Box
                key={example.platform}
                className="rounded-xl border border-gray-800 bg-bg-surface p-6"
              >
                <Text className="mb-3 text-sm font-semibold uppercase tracking-wider text-accent-primary">
                  {example.platform}
                </Text>

                <Text className="mb-6 leading-relaxed text-text-secondary">
                  {example.description}
                </Text>

                <Text className="text-3xl font-bold text-text-primary">
                  {example.price}
                </Text>
              </Box>
            ))}
          </Box>

          <Box className="mt-8 rounded-xl border border-accent-primary/20 bg-accent-primary/10 p-6">
            <Text className="leading-relaxed text-text-secondary">
              <span className="font-semibold text-text-primary">
                More complexity = higher cost.
              </span>{" "}
              Projects with multiple user roles, complex data relationships,
              third-party integrations (e.g. Stripe, Twilio), or custom design
              requirements will be priced accordingly. Everything is scoped
              upfront so you know the exact number before work begins.
            </Text>
          </Box>
        </FadeInSection>
      </Box>
    </section>
  );
};

export default PricingExamplesSection;
