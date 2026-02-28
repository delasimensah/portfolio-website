import React from "react";

import { type CaseStudy } from "@/utils";

interface CaseStudyPageProps {
  study: CaseStudy;
}

const CaseStudyPage: React.FC<CaseStudyPageProps> = ({ study }) => {
  return (
    <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <h1 className="mb-4 text-3xl font-bold text-text-primary">
        {study.title}
      </h1>
      <p className="text-text-secondary">Case study page coming soon.</p>
    </div>
  );
};

export default CaseStudyPage;
