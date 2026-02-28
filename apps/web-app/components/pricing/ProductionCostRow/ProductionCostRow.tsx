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
      className={`py-3 ${!last ? "border-b border-gray-800" : ""}`}
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
