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
import StaggerContainer from "../../shared/StaggerContainer/StaggerContainer";
import StaggerItem from "../../shared/StaggerContainer/StaggerItem";
import SectionTitle from "../SectionTitle/SectionTitle";
import WhatYouGetCard from "../WhatYouGetCard/WhatYouGetCard";

const CARDS = [
  {
    icon: <IconWorld size={24} className="text-accent-primary" />,
    title: "Web Application",
    description:
      "Fully responsive web platform built for your users and business needs.",
  },
  {
    icon: <IconDeviceMobile size={24} className="text-accent-primary" />,
    title: "iOS & Android Mobile App",
    description:
      "Native mobile experience for both iOS and Android platforms.",
  },
  {
    icon: <IconDatabase size={24} className="text-accent-primary" />,
    title: "Backend System",
    description:
      "Database, authentication, storage, and all server infrastructure.",
  },
  {
    icon: <IconRocket size={24} className="text-accent-primary" />,
    title: "Launch-Ready Product",
    description: "Complete product ready for your users from day one.",
  },
  {
    icon: <IconCloudUpload size={24} className="text-accent-primary" />,
    title: "Deployment Support",
    description: "Full deployment assistance to get your product live.",
  },
  {
    icon: <IconFileDescription size={24} className="text-accent-primary" />,
    title: "Clear Documentation",
    description:
      "Complete documentation for maintenance and future development.",
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
          {CARDS.map((card) => (
            <StaggerItem key={card.title}>
              <WhatYouGetCard
                icon={card.icon}
                title={card.title}
                description={card.description}
              />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </Box>
    </section>
  );
};

export default WhatYouGetSection;
