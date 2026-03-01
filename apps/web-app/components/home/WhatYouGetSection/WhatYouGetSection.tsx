"use client";

import { Box } from "@mantine/core";
import {
  IconCloudUpload,
  IconDatabase,
  IconDeviceMobile,
  IconFileDescription,
  IconRocket,
  IconWorld,
} from "@tabler/icons-react";
import React from "react";

import FadeInSection from "../../shared/FadeInSection/FadeInSection";
import SectionTitle from "../../shared/SectionTitle/SectionTitle";
import StaggerContainer from "../../shared/StaggerContainer/StaggerContainer";
import StaggerItem from "../../shared/StaggerContainer/StaggerItem";
import WhatYouGetCard from "../WhatYouGetCard/WhatYouGetCard";

const ICON_WHITE = "text-white";
const GRADIENTS = [
  "bg-gradient-to-br from-accent-primary to-accent-hover",
  "bg-gradient-to-br from-accent-secondary to-accent-secondary-dark",
  "bg-gradient-to-br from-success to-success-dark",
  "bg-gradient-to-br from-warm to-warm-dark",
  "bg-gradient-to-br from-accent-primary to-accent-secondary",
  "bg-gradient-to-br from-accent-secondary to-success",
] as const;

const CARDS = [
  {
    icon: <IconWorld size={24} className={ICON_WHITE} />,
    title: "Web Application",
    description:
      "Fully responsive web platform built for your users and business needs.",
  },
  {
    icon: <IconDeviceMobile size={24} className={ICON_WHITE} />,
    title: "iOS & Android Mobile App",
    description:
      "Native experience on both platforms with consistent performance and UX.",
  },
  {
    icon: <IconDatabase size={24} className={ICON_WHITE} />,
    title: "Backend System",
    description:
      "Database, auth, storage, and server infrastructure you can manage and extend.",
  },
  {
    icon: <IconRocket size={24} className={ICON_WHITE} />,
    title: "Launch-Ready Product",
    description: "Complete product ready from day one.",
  },
  {
    icon: <IconCloudUpload size={24} className={ICON_WHITE} />,
    title: "Deployment Support",
    description: "Deployment to your accounts and support until you're live.",
  },
  {
    icon: <IconFileDescription size={24} className={ICON_WHITE} />,
    title: "Clear Documentation",
    description:
      "Simple, easy-to-understand documentation for maintenance and future development.",
  },
];

const WhatYouGetSection: React.FC = () => {
  return (
    <section className="py-20">
      <Box className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeInSection className="mb-16">
          <SectionTitle>What You Get</SectionTitle>
        </FadeInSection>
        <StaggerContainer className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {CARDS.map((card, i) => (
            <StaggerItem key={card.title}>
              <WhatYouGetCard
                icon={card.icon}
                title={card.title}
                description={card.description}
                iconBoxGradient={GRADIENTS[i]}
              />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </Box>
    </section>
  );
};

export default WhatYouGetSection;
