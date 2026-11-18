import React from "react";
import { HeroSection } from "@/components/home/HeroSection";
import { IntroStatementSection } from "@/components/home/IntroStatementSection";
import { ServicesSection } from "@/components/home/ServicesSection";
import { SelectedWorkSection } from "@/components/home/SelectedWorkSection";
import { SoloOrTeamSection } from "@/components/home/SoloOrTeamSection";
import { LightContrastBand } from "@/components/home/LightContrastBand";
import { ProcessSection } from "@/components/home/ProcessSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { FaqSection } from "@/components/home/FaqSection";
import { ContactSection } from "@/components/home/ContactSection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <IntroStatementSection />
      <ServicesSection />
      <SelectedWorkSection />
      <SoloOrTeamSection />
      <LightContrastBand />
      <ProcessSection />
      <TestimonialsSection />
      <FaqSection />
      <ContactSection />
    </>
  );
}
