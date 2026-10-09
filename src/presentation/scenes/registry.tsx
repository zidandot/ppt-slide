/* =============================================================================
   scenes/registry.tsx — PEMETAAN JENIS KONTEN → KOMPONEN ISI.
   SlideBody menerjemahkan slide.content.kind menjadi komponen visual yang tepat;
   switch ini membuat TypeScript mempersempit tipe konten dengan aman.
   ========================================================================== */

import type { Slide } from "../types";
import {
  BudgetScene,
  ClosingScene,
  CoverScene,
  DividerScene,
  FiveForcesScene,
  FrameworkScene,
  InventoryScene,
  LogoPhilosophyScene,
  LogoScene,
  PartnershipScene,
  PortfolioScene,
  ProblemTreeScene,
  ProgramDesignScene,
  ProgramFeatureScene,
  ProgramIndicatorsScene,
  RegionScene,
  SponsorsScene,
  ThemeScene,
  WordCloudScene,
} from "./bodies";

export function SlideBody({ slide }: { slide: Slide }) {
  const content = slide.content;

  switch (content.kind) {
    case "cover":
      return <CoverScene data={content.data} />;
    case "wordcloud":
      return <WordCloudScene data={content.data} />;
    case "divider":
      return <DividerScene data={content.data} />;
    case "five-forces":
      return <FiveForcesScene data={content.data} />;
    case "inventory":
      return <InventoryScene data={content.data} />;
    case "theme":
      return <ThemeScene data={content.data} />;
    case "region":
      return <RegionScene data={content.data} />;
    case "problem-tree":
      return <ProblemTreeScene data={content.data} />;
    case "portfolio":
      return <PortfolioScene data={content.data} />;
    case "logo":
      return <LogoScene data={content.data} />;
    case "logo-philosophy":
      return <LogoPhilosophyScene data={content.data} />;
    case "framework":
      return <FrameworkScene data={content.data} />;
    case "program-design":
      return <ProgramDesignScene data={content.data} />;
    case "program-feature":
      return <ProgramFeatureScene data={content.data} />;
    case "program-indicators":
      return <ProgramIndicatorsScene data={content.data} />;
    case "partnership":
      return <PartnershipScene data={content.data} />;
    case "sponsors":
      return <SponsorsScene data={content.data} />;
    case "budget":
      return <BudgetScene data={content.data} />;
    case "closing":
      return <ClosingScene data={content.data} />;
    default:
      return null;
  }
}
