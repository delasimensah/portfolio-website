import React from "react";

import MaintenancePlansSection from "../../pricing/MaintenancePlansSection/MaintenancePlansSection";
import PaymentTermsSection from "../../pricing/PaymentTermsSection/PaymentTermsSection";
import PricingCTASection from "../../pricing/PricingCTASection/PricingCTASection";
import PricingExamplesSection from "../../pricing/PricingExamplesSection/PricingExamplesSection";
import PricingHeroSection from "../../pricing/PricingHeroSection/PricingHeroSection";
import ProductBuildPricingSection from "../../pricing/ProductBuildPricingSection/ProductBuildPricingSection";
import ProductionCostsSection from "../../pricing/ProductionCostsSection/ProductionCostsSection";
import WhatAffectsPricingSection from "../../pricing/WhatAffectsPricingSection/WhatAffectsPricingSection";
import WhyNotAIPricingSection from "../../pricing/WhyNotAIPricingSection/WhyNotAIPricingSection";

const PricingPage: React.FC = () => {
  return (
    <>
      <PricingHeroSection />
      <ProductBuildPricingSection />
      <PricingExamplesSection />
      <WhatAffectsPricingSection />
      <PaymentTermsSection />
      <MaintenancePlansSection />
      <ProductionCostsSection />
      <WhyNotAIPricingSection />
      <PricingCTASection />
    </>
  );
};

export default PricingPage;
