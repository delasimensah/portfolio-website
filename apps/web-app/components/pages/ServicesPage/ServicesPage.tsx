import React from "react";

import AppTypesSection from "../../services/AppTypesSection/AppTypesSection";
import LaunchReadyProductSection from "../../services/LaunchReadyProductSection/LaunchReadyProductSection";
import ServicesCTASection from "../../services/ServicesCTASection/ServicesCTASection";
import ServicesHeroSection from "../../services/ServicesHeroSection/ServicesHeroSection";
import WhereAIFitsInSection from "../../services/WhereAIFitsInSection/WhereAIFitsInSection";

const ServicesPage: React.FC = () => {
  return (
    <>
      <ServicesHeroSection />
      <LaunchReadyProductSection />
      <WhereAIFitsInSection />
      <AppTypesSection />
      <ServicesCTASection />
    </>
  );
};

export default ServicesPage;
