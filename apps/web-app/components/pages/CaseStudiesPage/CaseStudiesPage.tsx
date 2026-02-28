import { Box } from "@mantine/core";
import React from "react";

import { CASE_STUDIES } from "@/utils";

import CaseStudiesCTASection from "../../case-studies/CaseStudiesCTASection/CaseStudiesCTASection";
import CaseStudiesHero from "../../case-studies/CaseStudiesHero/CaseStudiesHero";
import CaseStudyListCard from "../../case-studies/CaseStudyListCard/CaseStudyListCard";
import WhatMakesSuccessSection from "../../case-studies/WhatMakesSuccessSection/WhatMakesSuccessSection";

const CaseStudiesPage: React.FC = () => {
  return (
    <>
      <CaseStudiesHero />

      <section className="py-20">
        <Box className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Box className="grid gap-8 lg:grid-cols-2">
            {CASE_STUDIES.map((study) => (
              <CaseStudyListCard key={study.id} study={study} />
            ))}
          </Box>
        </Box>
      </section>

      <WhatMakesSuccessSection />

      <CaseStudiesCTASection />
    </>
  );
};

export default CaseStudiesPage;
