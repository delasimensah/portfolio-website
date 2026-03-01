"use client";

import { Group } from "@mantine/core";
import React from "react";

import Text from "../../ui/Text/Text";

interface ProductionCostRowProps {
  label: string;
  value: string;
  last?: boolean;
}

const ProductionCostRow: React.FC<ProductionCostRowProps> = ({
  label,
  value,
  last = false,
}) => {
  return (
    <Group
      justify="space-between"
      className={`flex-col items-start gap-1 py-3 md:flex-row md:items-center md:gap-0 ${!last ? "border-b border-gray-800" : ""}`}
    >
      <Text component="span" className="text-text-secondary">
        {label}
      </Text>
      <Text component="span" className="font-semibold text-text-primary">
        {value}
      </Text>
    </Group>
  );
};

export default ProductionCostRow;
