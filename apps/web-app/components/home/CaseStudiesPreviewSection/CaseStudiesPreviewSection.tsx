"use client";

import { Box } from "@mantine/core";
import React from "react";

import { Button } from "@/components";
import { CASE_STUDIES } from "@/utils";

import FadeInSection from "../../shared/FadeInSection/FadeInSection";
import SectionTitle from "../../shared/SectionTitle/SectionTitle";
import CaseStudyCard from "../CaseStudyCard/CaseStudyCard";

const CaseStudiesPreviewSection: React.FC = () => {
  return (
    <section className="py-20">
      <Box className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeInSection className="mb-16">
          <SectionTitle>My Work</SectionTitle>
        </FadeInSection>
        <div className="mb-12 grid gap-8 lg:grid-cols-2">
          {CASE_STUDIES.map((study) => (
            <CaseStudyCard
              key={study.id}
              title={study.title}
              description={study.description}
              imageSrc={study.webImageSrc}
              imageAlt={study.webImageAlt}
              href={`/case-studies/${study.id}`}
            />
          ))}
        </div>
        <FadeInSection className="text-center">
          <Button href="/case-studies" size="md">
            View My Work
          </Button>
        </FadeInSection>
      </Box>
    </section>
  );
};

export default CaseStudiesPreviewSection;
