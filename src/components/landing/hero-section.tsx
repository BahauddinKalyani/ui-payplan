"use client";

import { BorderBeam } from "@/components/ui/border-beam";
import TextShimmer from "@/components/ui/text-shimmer";
import { Button } from "@/components/ui/button";
// import { ArrowRightIcon } from "@radix-ui/react-icons";
import { ArrowRightIcon } from "lucide-react"
import { useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function HeroSection() {
  const ref = useRef(null);
  const router = useRouter();
  const inView = useInView(ref, { once: true, margin: "-100px" });
  return (
    <section
      id="hero"
      className="relative mx-auto mt-32 max-w-[80rem] px-6 text-center md:px-8"
    >
      <div className="backdrop-filter-[12px] inline-flex h-7 items-center justify-between rounded-full border border-white/5 bg-white/10 px-3 text-xs text-white dark:text-black transition-all ease-in hover:cursor-pointer hover:bg-white/20 group gap-1 translate-y-[-1rem] animate-fade-in opacity-0">
        <Link href="/blog/say-goodbye-to-overdraft-surprises-with-mytwoney">
        <TextShimmer className="inline-flex items-center justify-center">
          <span>✨ Introducing mytwoney</span>{" "}
          <ArrowRightIcon className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
        </TextShimmer>
        </Link>
      </div>
      <h1 className="bg-gradient-to-br dark:from-white from-black from-30% dark:to-white/40 to-black/40 bg-clip-text py-6 text-5xl font-medium leading-none tracking-tighter text-transparent text-balance sm:text-6xl md:text-7xl lg:text-8xl translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:200ms]">
      Never Miss a Beat with 
        <br className="hidden md:block" /> Your Finances
      </h1>
      <p className="mb-12 text-lg tracking-tight text-gray-400 md:text-xl text-balance translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:400ms]">
      Stay Ahead of Overdrafts, Every Day.
        {/* <br className="hidden md:block" /> savings grow effortlessly. */}
      </p>
      <Button onClick={()=> {router.push('/login');} } className="translate-y-[-1rem] animate-fade-in gap-1 rounded-lg text-black opacity-0 ease-in-out [--animation-delay:600ms] hover:bg-[#37ecba] hover:text-white transition-colors duration-200 ease-in">
        <span>Get Started for free </span>
        <ArrowRightIcon className="ml-1 size-4 transition-transform duration-300 ease-in-out group-hover:translate-x-1" />
      </Button>
      <div
        ref={ref}
        className="relative mt-[8rem] animate-fade-up opacity-0 [--animation-delay:400ms] [perspective:2000px] after:absolute after:inset-0 after:z-50 after:[background:linear-gradient(to_top,hsl(var(--background))_30%,transparent)]"
      >
        <div
          className={`rounded-xl border border-white/10 bg-white bg-opacity-[0.01] before:absolute before:bottom-1/2 before:left-0 before:top-0 before:h-full before:w-full before:opacity-0 before:[filter:blur(180px)] before:[background-image:linear-gradient(to_bottom,var(--color-one),var(--color-one),transparent_40%)] ${
            inView ? "before:animate-image-glow" : ""
          }`}
        >
          <BorderBeam
            size={200}
            duration={12}
            delay={11}
            // colorFrom="var(--color-one)"
            // colorTo="var(--color-two)"
          />
          <Image
            src="/dashboard-dark.png"
            alt="Hero Image"
            className="hidden relative w-full h-full rounded-[inherit] border object-contain dark:block"
            // layout="fill"
            width={2000}
            height={2000}
            // objectFit="contain"
          />
          <Image
            src="/dashboard-light.png"
            alt="Hero Image"
            className="block relative w-full h-full rounded-[inherit] border object-contain dark:hidden"
            // layout="fill"
            width={700}
            height={700}
            // objectFit="contain"
          />
        </div>
      </div>
    </section>
  );
}
