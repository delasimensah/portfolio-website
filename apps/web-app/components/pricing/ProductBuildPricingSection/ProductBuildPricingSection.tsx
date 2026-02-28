"use client";

import { Box, Title } from "@mantine/core";
import React from "react";

import FadeInSection from "../../shared/FadeInSection/FadeInSection";
import Text from "../../ui/Text/Text";

const STATS = [
  { label: "Starting From", value: "$3,000", accent: true },
  { label: "Typical Range", value: "$3,000 – $6,000+", accent: false },
  { label: "Delivery Timeline", value: "6–8 weeks", accent: false },
];

const ProductBuildPricingSection: React.FC = () => {
  return (
    <section className="py-20">
      <Box className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeInSection className="mx-auto max-w-4xl">
          <Box className="bg-bg-surface rounded-xl border border-gray-800 p-8 lg:p-12">
            <Title
              order={2}
              className="text-text-primary mb-8 text-3xl font-bold lg:text-4xl"
            >
              Product Build
            </Title>
            <Box className="mb-8 grid gap-6 md:grid-cols-3">
              {STATS.map((stat) => (
                <Box key={stat.label} className="bg-bg-primary rounded-xl p-4">
                  <Text className="text-text-secondary mb-2">{stat.label}</Text>
                  <Text
                    className={`text-2xl font-bold ${stat.accent ? "text-accent-primary" : "text-text-primary"}`}
                  >
                    {stat.value}
                  </Text>
                </Box>
              ))}
            </Box>
            <Box className="border-accent-primary/20 bg-accent-primary/10 rounded-xl border p-6">
              <Text className="text-text-primary text-lg">
                Final pricing depends on scope and complexity.
              </Text>
            </Box>
          </Box>
        </FadeInSection>
      </Box>
    </section>
  );
};

export default ProductBuildPricingSection;
