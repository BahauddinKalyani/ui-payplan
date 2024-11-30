'use client'
import ClientSection from "@/components/landing/client-section";
import CallToActionSection from "@/components/landing/cta-section";
import HeroSection from "@/components/landing/hero-section";
import PricingSection from "@/components/landing/pricing-section";
import Particles from "@/components/ui/particles";
import { SphereMask } from "@/components/ui/sphere-mask";
import {FeatureSection} from "@/components/landing/feature-section";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export default function Page() {
  return (
    <>
    <SiteHeader />
      <main className="mx-auto flex-1 overflow-hidden">
      
      {/* <HeroSection /> */}
      <ClientSection />
      <SphereMask />
      <FeatureSection />
      <PricingSection />
      <CallToActionSection />
      <Particles
        className="absolute inset-0 -z-10"
        quantity={50}
        ease={70}
        size={0.05}
        staticity={40}
        color={"#ffffff"}
      />
      </main>
      <SiteFooter />
    </>
  );
}
