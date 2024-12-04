import ClientSection from "@/components/landing/client-section";
import CallToActionSection from "@/components/landing/cta-section";
import HeroSection from "@/components/landing/hero-section";
import PricingSection from "@/components/landing/pricing-section";
import Particles from "@/components/ui/particles";
import { SphereMask } from "@/components/ui/sphere-mask";
// import {FeatureSection} from "@/components/landing/feature-section";
import Problem from "@/components/landing/problem";
import Solution from "@/components/landing/solution";
import HowItWorks from "@/components/landing/how-it-works";
import FAQ from "@/components/landing/faq";
import Blog from "@/components/landing/blog";

export default async function Page() {
  return (
    <>
      <HeroSection />
      <ClientSection />
      <SphereMask />
      <Problem />
      <Solution />
      <HowItWorks />
      <PricingSection />
      <FAQ />
      <Blog />
      <br /><br /><br /><br /><br />
      <SphereMask reverse={true}/>
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
