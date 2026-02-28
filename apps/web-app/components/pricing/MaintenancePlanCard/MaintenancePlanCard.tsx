"use client";

import { Box, Title } from "@mantine/core";
import React from "react";

import ServiceCheckItem from "../../services/ServiceCheckItem/ServiceCheckItem";
import Text from "../../ui/Text/Text";

interface MaintenancePlanCardProps {
  name: string;
  price: string;
  features: string[];
  popular?: boolean;
}

const MaintenancePlanCard: React.FC<MaintenancePlanCardProps> = ({
  name,
  price,
  features,
  popular = false,
}) => {
  return (
    <Box
      className={`relative rounded-xl border bg-bg-surface p-8 ${popular ? "border-accent-primary/50" : "border-gray-800"}`}
    >
      {popular && (
        <Text
          component="span"
          className="absolute -top-3 left-6 rounded-full bg-accent-primary px-4 py-1 text-sm font-medium text-white"
        >
          Popular
        </Text>
      )}
      <Box className="mb-6">
        <Title order={3} className="mb-2 text-2xl font-bold text-text-primary">
          {name}
        </Title>
        <Text className="text-3xl font-bold text-accent-primary">
          {price}
          <Text component="span" className="text-lg font-normal text-text-secondary">
            /month
          </Text>
        </Text>
      </Box>
      <Box className="space-y-4">
        {features.map((feature) => (
          <ServiceCheckItem key={feature} label={feature} included />
        ))}
      </Box>
    </Box>
  );
};

export default MaintenancePlanCard;
