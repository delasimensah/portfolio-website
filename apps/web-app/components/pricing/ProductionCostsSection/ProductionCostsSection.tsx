"use client";

import { Box, Title } from "@mantine/core";
import React from "react";

import FadeInSection from "../../shared/FadeInSection/FadeInSection";
import Text from "../../ui/Text/Text";
import ProductionCostRow from "../ProductionCostRow/ProductionCostRow";

const COSTS = [
  { label: "Apple Developer Account", value: "$99/year" },
  { label: "Google Play Developer Account", value: "$25 one-time" },
  { label: "Hosting / backend usage", value: "Variable" },
  { label: "Domain name", value: "$10–15/year" },
  { label: "Third-party services", value: "Variable" },
];

const ProductionCostsSection: React.FC = () => {
  return (
    <section className="py-20">
      <Box className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeInSection className="mx-auto max-w-4xl">
          <Box className="rounded-xl border border-gray-800 bg-bg-surface p-8 lg:p-12">
            <Title
              order={2}
              className="mb-2 text-3xl font-bold text-text-primary lg:text-4xl"
            >
              Production Costs
            </Title>
            <Text className="mb-8 text-xl text-accent-primary">
              (Paid Directly by You)
            </Text>
            <Box className="mb-8">
              {COSTS.map((cost, index) => (
                <ProductionCostRow
                  key={cost.label}
                  label={cost.label}
                  value={cost.value}
                  last={index === COSTS.length - 1}
                />
              ))}
            </Box>
            <Box className="space-y-1 rounded-xl bg-bg-primary p-6">
              <Text className="font-semibold text-text-primary">
                You own your accounts and billing.
              </Text>
              <Text className="text-text-secondary">
                I handle setup and deployment.
              </Text>
            </Box>
          </Box>
        </FadeInSection>
      </Box>
    </section>
  );
};

export default ProductionCostsSection;
