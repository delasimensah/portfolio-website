import { notFound } from "next/navigation";

import { CaseStudyPage } from "@/components";
import { getCaseStudyById } from "@/utils";

interface Props {
  params: Promise<{ id: string }>;
}

const CaseStudyRoute = async ({ params }: Props) => {
  const { id } = await params;
  const study = getCaseStudyById(id);
  if (!study) notFound();

  return <CaseStudyPage study={study} />;
};

export default CaseStudyRoute;
