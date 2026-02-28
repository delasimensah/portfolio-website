"use client";

import { Box } from "@mantine/core";
import Image from "next/image";
import React from "react";

import FadeInSection from "../../shared/FadeInSection/FadeInSection";
import Text from "../../ui/Text/Text";

interface CaseStudyMobileDisplayProps {
  imageSrc: string;
  imageAlt: string;
}

const CaseStudyMobileDisplay: React.FC<CaseStudyMobileDisplayProps> = ({
  imageSrc,
  imageAlt,
}) => {
  return (
    <section className="py-20">
      <Box className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <FadeInSection>
          <Box className="rounded-xl border border-gray-800 bg-bg-surface p-8 lg:p-12">
            <Text className="mb-6 text-center text-sm uppercase tracking-wider text-text-secondary">
              Mobile Experience
            </Text>
            <Box className="flex justify-center">
              <Box className="w-[55%] overflow-hidden rounded-xl bg-bg-primary">
                <Image
                  src={imageSrc}
                  alt={imageAlt}
                  width={800}
                  height={600}
                  className="h-auto w-full object-contain"
                  unoptimized
                />
              </Box>
            </Box>
          </Box>
        </FadeInSection>
      </Box>
    </section>
  );
};

export default CaseStudyMobileDisplay;
