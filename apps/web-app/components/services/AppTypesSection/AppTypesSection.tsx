"use client";

import { Box } from "@mantine/core";
import {
  IconBuilding,
  IconBuildingStore,
  IconCalendarCheck,
  IconChartLine,
  IconCheckbox,
  IconCreditCard,
  IconPackage,
  IconSchool,
  IconUsers,
  IconUserStar,
} from "@tabler/icons-react";
import React from "react";

import FadeInSection from "../../shared/FadeInSection/FadeInSection";
import SectionTitle from "../../shared/SectionTitle/SectionTitle";
import AppTypeCard from "../AppTypeCard/AppTypeCard";

const ICON_WHITE = "text-white";
const APP_GRADIENTS = [
  "bg-gradient-to-br from-accent-primary to-accent-hover",
  "bg-gradient-to-br from-accent-secondary to-accent-secondary-dark",
  "bg-gradient-to-br from-success to-success-dark",
  "bg-gradient-to-br from-warm to-warm-dark",
  "bg-gradient-to-br from-accent-primary to-accent-secondary",
];

const APP_TYPES = [
  {
    icon: <IconBuilding size={24} className={ICON_WHITE} />,
    title: "Real Estate Platforms",
  },
  {
    icon: <IconCalendarCheck size={24} className={ICON_WHITE} />,
    title: "Booking Systems",
  },
  {
    icon: <IconBuildingStore size={24} className={ICON_WHITE} />,
    title: "Marketplace Apps",
  },
  {
    icon: <IconUsers size={24} className={ICON_WHITE} />,
    title: "CRM Systems",
  },
  {
    icon: <IconCreditCard size={24} className={ICON_WHITE} />,
    title: "Subscription Platforms",
  },
  {
    icon: <IconChartLine size={24} className={ICON_WHITE} />,
    title: "Internal Dashboards",
  },
  {
    icon: <IconUserStar size={24} className={ICON_WHITE} />,
    title: "Client Portals",
  },
  {
    icon: <IconPackage size={24} className={ICON_WHITE} />,
    title: "Inventory Systems",
  },
  {
    icon: <IconSchool size={24} className={ICON_WHITE} />,
    title: "Educational Platforms",
  },
  {
    icon: <IconCheckbox size={24} className={ICON_WHITE} />,
    title: "Operational Management Tools",
    className: "sm:col-span-2 lg:col-span-3",
  },
];

const AppTypesSection: React.FC = () => {
  return (
    <section className="py-20">
      <Box className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeInSection className="mb-16">
          <SectionTitle>Types of Applications</SectionTitle>
        </FadeInSection>
        <Box className="mx-auto max-w-5xl">
          <Box className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {APP_TYPES.map((app, i) => (
              <AppTypeCard
                key={app.title}
                icon={app.icon}
                title={app.title}
                className={app.className}
                iconBoxGradient={APP_GRADIENTS[i % APP_GRADIENTS.length]}
              />
            ))}
          </Box>
        </Box>
      </Box>
    </section>
  );
};

export default AppTypesSection;
