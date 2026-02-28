"use client";

import { Group } from "@mantine/core";
import { IconCircleCheck, IconCircleX } from "@tabler/icons-react";
import React from "react";

import Text from "../../ui/Text/Text";

interface ServiceCheckItemProps {
  label: string;
  included: boolean;
}

const ServiceCheckItem: React.FC<ServiceCheckItemProps> = ({ label, included }) => {
  return (
    <Group align="flex-start" gap={12}>
      {included ? (
        <IconCircleCheck size={20} className="mt-0.5 shrink-0 text-accent-primary" />
      ) : (
        <IconCircleX size={20} className="mt-0.5 shrink-0 text-text-secondary" />
      )}
      <Text component="span" className="text-text-secondary">
        {label}
      </Text>
    </Group>
  );
};

export default ServiceCheckItem;
