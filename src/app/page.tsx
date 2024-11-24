"use client"
import OpenNavigation from '@/components/open-navigation';
// import Safari from "@/components/ui/safari";
// import { Button } from "@/components/ui/button";
// import { Card } from "@/components/ui/card";
// import { BorderBeam } from "@/components/ui/border-beam";
// import { AspectRatio } from "@/components/ui/aspect-ratio"
// import Image from 'next/image';
import HeroSection from '@/app/hero';

function Home() {
  // const router = useRouter();
  return (
    <div className='w-full'>
      <OpenNavigation />
      <HeroSection />

      {/* <div className="w-full max-w-screen-lg overflow-hidden mt-[8rem] mx-auto">
        <AspectRatio ratio={16 / 9} className="relative rounded-2xl">
          <Image
            src="/desktop.png"
            alt="Curved fade image"
            fill
            className="mask-image"
          />
          <BorderBeam size={250} duration={12} delay={9} />
        </AspectRatio>
      </div> */}
    </div>
  );
}

export default Home;