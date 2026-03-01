import React from "react";

import { type CaseStudy } from "@/utils";

import CaseStudyCTA from "../../case-studies/CaseStudyCTA/CaseStudyCTA";
import CaseStudyHero from "../../case-studies/CaseStudyHero/CaseStudyHero";
import CaseStudyMobileDisplay from "../../case-studies/CaseStudyMobileDisplay/CaseStudyMobileDisplay";
import CaseStudyOutcome from "../../case-studies/CaseStudyOutcome/CaseStudyOutcome";
import CaseStudyOverview from "../../case-studies/CaseStudyOverview/CaseStudyOverview";
import CaseStudyProblem from "../../case-studies/CaseStudyProblem/CaseStudyProblem";
import CaseStudySolution from "../../case-studies/CaseStudySolution/CaseStudySolution";
import CaseStudyWebExperience from "../../case-studies/CaseStudyWebExperience/CaseStudyWebExperience";

interface CaseStudyPageProps {
  study: CaseStudy;
}

const CaseStudyPage: React.FC<CaseStudyPageProps> = ({ study }) => {
  return (
    <>
      <CaseStudyHero title={study.title} tagline={study.tagline} websiteUrl={study.websiteUrl} />

      <CaseStudyMobileDisplay
        imageSrc={study.mobileImageSrc}
        imageAlt={study.mobileImageAlt}
        screenshots={study.mobileScreenshots}
      />

      <CaseStudyOverview study={study} />

      <CaseStudyProblem study={study} />

      <CaseStudySolution solution={study.solution} />

      <CaseStudyWebExperience study={study} screenshots={study.webScreenshots} />

      <CaseStudyOutcome outcomes={study.outcomes} />

      <CaseStudyCTA />
    </>
  );
};

export default CaseStudyPage;
