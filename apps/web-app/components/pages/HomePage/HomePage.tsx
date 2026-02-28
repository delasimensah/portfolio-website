"use client";

import React from "react";

import CaseStudiesPreviewSection from "../../home/CaseStudiesPreviewSection/CaseStudiesPreviewSection";
import FinalCTASection from "../../home/FinalCTASection/FinalCTASection";
import HeroSection from "../../home/HeroSection/HeroSection";
import HowIWorkSection from "../../home/HowIWorkSection/HowIWorkSection";
import ModernWorkflowSection from "../../home/ModernWorkflowSection/ModernWorkflowSection";
import PricingPreviewSection from "../../home/PricingPreviewSection/PricingPreviewSection";
import WhatYouGetSection from "../../home/WhatYouGetSection/WhatYouGetSection";

const HomePage: React.FC = () => {
  return (
    <>
      <HeroSection />
      <WhatYouGetSection />
      <HowIWorkSection />
      <ModernWorkflowSection />
      <PricingPreviewSection />
      <CaseStudiesPreviewSection />
      <FinalCTASection />
    </>
  );
};

export default HomePage;
