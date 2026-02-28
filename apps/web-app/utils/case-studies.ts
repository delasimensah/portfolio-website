import { ASSETS } from "@/constants";

export interface CaseStudy {
  id: string;
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
}

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: "aria",
    title: "Aria",
    description: "Direct-to-fan music monetization",
    imageSrc: ASSETS.images.ariaWeb,
    imageAlt: "Aria web app screenshot",
  },
  {
    id: "crown-lusso",
    title: "Crown Lusso",
    description: "Property booking and management system",
    imageSrc: ASSETS.images.crownLussoWeb,
    imageAlt: "Crown Lusso web app screenshot",
  },
];

export const getCaseStudyById = (id: string): CaseStudy | undefined =>
  CASE_STUDIES.find((s) => s.id === id);
