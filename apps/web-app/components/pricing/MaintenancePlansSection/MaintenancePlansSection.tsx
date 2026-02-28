"use client";

import { Box } from "@mantine/core";
import React from "react";

import FadeInSection from "../../shared/FadeInSection/FadeInSection";
import SectionTitle from "../../shared/SectionTitle/SectionTitle";
import Text from "../../ui/Text/Text";
import MaintenancePlanCard from "../MaintenancePlanCard/MaintenancePlanCard";

const PLANS = [
  {
    name: "Basic Care",
    price: "$300",
    popular: false,
    features: [
      "Bug fixes",
      "Dependency updates",
      "Small adjustments",
      "Up to 4 hours per month",
      "48–72 hour response",
    ],
  },
  {
    name: "Growth Plan",
    price: "$600",
    popular: true,
    features: [
      "Everything in Basic",
      "Small feature improvements",
      "Workflow refinements",
      "Up to 10 hours per month",
      "24–48 hour response",
    ],
  },
];

const MaintenancePlansSection: React.FC = () => {
  return (
    <section className="bg-bg-surface/50 py-20">
      <Box className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeInSection className="mx-auto max-w-5xl">
          <Box className="mb-12 text-center">
            <SectionTitle className="mb-2">Maintenance Plans</SectionTitle>
            <Text className="text-xl text-text-secondary">(Optional)</Text>
          </Box>
          <Box className="grid gap-8 md:grid-cols-2">
            {PLANS.map((plan) => (
              <MaintenancePlanCard
                key={plan.name}
                name={plan.name}
                price={plan.price}
                features={plan.features}
                popular={plan.popular}
              />
            ))}
          </Box>
          <Text className="mt-8 text-center text-lg text-text-secondary">
            Major new features are quoted separately.
          </Text>
        </FadeInSection>
      </Box>
    </section>
  );
};

export default MaintenancePlansSection;
