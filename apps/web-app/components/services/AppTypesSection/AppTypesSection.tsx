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

const ICON_CLASS = "text-accent-primary";

const APP_TYPES = [
  { icon: <IconBuilding size={24} className={ICON_CLASS} />, title: "Real Estate Platforms" },
  { icon: <IconCalendarCheck size={24} className={ICON_CLASS} />, title: "Booking Systems" },
  { icon: <IconBuildingStore size={24} className={ICON_CLASS} />, title: "Marketplace Apps" },
  { icon: <IconUsers size={24} className={ICON_CLASS} />, title: "CRM Systems" },
  { icon: <IconCreditCard size={24} className={ICON_CLASS} />, title: "Subscription Platforms" },
  { icon: <IconChartLine size={24} className={ICON_CLASS} />, title: "Internal Dashboards" },
  { icon: <IconUserStar size={24} className={ICON_CLASS} />, title: "Client Portals" },
  { icon: <IconPackage size={24} className={ICON_CLASS} />, title: "Inventory Systems" },
  { icon: <IconSchool size={24} className={ICON_CLASS} />, title: "Educational Platforms" },
  {
    icon: <IconCheckbox size={24} className={ICON_CLASS} />,
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
            {APP_TYPES.map((app) => (
              <AppTypeCard
                key={app.title}
                icon={app.icon}
                title={app.title}
                className={app.className}
              />
            ))}
          </Box>
        </Box>
      </Box>
    </section>
  );
};

export default AppTypesSection;
