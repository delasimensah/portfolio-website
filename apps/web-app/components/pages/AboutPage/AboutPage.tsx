import React from "react";

import AboutApproachSection from "../../about/AboutApproachSection/AboutApproachSection";
import AboutBioSection from "../../about/AboutBioSection/AboutBioSection";
import AboutCTASection from "../../about/AboutCTASection/AboutCTASection";
import AboutDeliverySection from "../../about/AboutDeliverySection/AboutDeliverySection";
import AboutFocusSection from "../../about/AboutFocusSection/AboutFocusSection";
import AboutHeroSection from "../../about/AboutHeroSection/AboutHeroSection";
import AboutPrinciplesSection from "../../about/AboutPrinciplesSection/AboutPrinciplesSection";
import AboutTechStackSection from "../../about/AboutTechStackSection/AboutTechStackSection";
import AboutWhoIWorkWithSection from "../../about/AboutWhoIWorkWithSection/AboutWhoIWorkWithSection";
import AboutWhyFixedPricingSection from "../../about/AboutWhyFixedPricingSection/AboutWhyFixedPricingSection";
import TypicalTimelineSection from "../../home/TypicalTimelineSection/TypicalTimelineSection";

const AboutPage: React.FC = () => {
  return (
    <>
      <AboutHeroSection />
      <AboutBioSection />
      <AboutFocusSection />
      <AboutApproachSection />
      <AboutTechStackSection />
      <AboutWhyFixedPricingSection />
      <TypicalTimelineSection />
      <AboutDeliverySection />
      <AboutPrinciplesSection />
      <AboutWhoIWorkWithSection />
      <AboutCTASection />
    </>
  );
};

export default AboutPage;
