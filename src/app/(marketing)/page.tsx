import ClientSection from "@/components/landing/client-section";
import CallToActionSection from "@/components/landing/cta-section";
import HeroSection from "@/components/landing/hero-section";
import PricingSection from "@/components/landing/pricing-section";
import Particles from "@/components/ui/particles";
import { SphereMask } from "@/components/ui/sphere-mask";
import {FeatureSection} from "@/components/landing/feature-section";

export default async function Page() {
  return (
    <>
      <HeroSection />
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
    </>
  );
}