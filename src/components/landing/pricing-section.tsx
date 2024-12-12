"use client";
 
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { ArrowRight, Check } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
// import { color } from "framer-motion";

const pricingOptions = [
  {
    name: "Free Plan",
    price: "$0",
    yearlyPrice: "$0",
    description:
      "Perfect for individuals looking to take control of their finances without any cost.",
    features: [
      "Access all core features",
      "Transaction input",
      "Recurring tracking",
      "Calendar visualization",
    ],
    extraBenefits: "",
  },
  {
    name: "Pro Plan (Coming Soon)",
    price: "-",
    yearlyPrice: "-",
    description:
      "Unlock advanced financial tools and premium features:",
    features: [
      "AI-driven savings recommendations.",
      "Priority integrations with banks.",
      "Early access to new features.",
      "Competitive pricing to be announced soon!",
    ],
    extraBenefits: "",
  },
  // {
  //   name: "Pro",
  //   price: "$499",
  //   yearlyPrice: "$1228",
  //   description:
  //     "Get your roles filled faster with unlimited access to Dribbble's Job Board and Designer search.",
  //   features: [
  //     "Access to All Features",
  //     "20% discount on backorders",
  //     "Domain name Appraisal",
  //     "10 Social Profiles",
  //   ],
  //   extraBenefits: "Everything in free plan, plus",
  // },
];

export default function PricingSection() {
  const [isYearly, setIsYearly] = useState(false);
  
  return (
    <section id="pricing">
      <div className="container mx-auto max-w-5xl py-10">
        <div className="mx-auto space-y-4 py-6 text-center">
          {/* <h2 className="font-mono text-[14px] font-medium tracking-tight text-primary">
            Pricing
          </h2> */}
          <h4 className="mx-auto mb-2 max-w-3xl text-balance text-[42px] font-medium tracking-tighter">
            Simple pricing for everyone.
          </h4>
        </div>
        <p className="mt-6 text-center text-xl leading-8 text-muted-foreground">
          Choose an <strong>affordable plan</strong> that&apos;s packed with the
          best features for engaging your audience, creating customer loyalty,
          and driving sales.
        </p>
        <div className="mt-5 flex items-center justify-center space-x-2">
          <span
            className={`font-bold ${!isYearly ? "" : "text-muted-foreground"}`}
          >
            Monthly
          </span>
          <Switch checked={isYearly} onCheckedChange={setIsYearly} />
          <span
            className={`font-bold ${isYearly ? "" : "text-muted-foreground"}`}
          >
            Yearly
          </span>
        </div>
        <div className="mx-auto grid gap-6 px-10 py-8 lg:grid-cols-2">
          {pricingOptions.map((option, index) => (
            <Card key={index} className="flex flex-col shadow-none">
              <CardHeader>
                <CardTitle>{option.name}</CardTitle>
                <p className="text-muted-foreground">{option.description}</p>
              </CardHeader>
              <CardContent className="flex-grow">
                <div className="text-3xl font-bold">
                  {isYearly ? option.yearlyPrice : option.price}
                  <span className="text-sm font-medium text-muted-foreground">
                    {isYearly ? "/year" : "/month"}
                  </span>
                </div>
                {option.extraBenefits && (
                  <p className="mt-4 text-sm text-muted-foreground">
                    {option.extraBenefits}
                  </p>
                )}
                <ul className="mt-4 space-y-2">
                  {option.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <Check className="mr-2 h-4 w-4 text-primary" style={{ color: "#37ecba" }} />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                {index === 0 && (
                <Link href="/login" className="w-full">
                <Button className="w-full hover:bg-[#37ecba] hover:text-white transition-colors duration-200 ease-in">
                  Choose Plan
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                </Link>
                )}

                {index === 1 && (
                <Link target="_blank" href="https://forms.gle/xbFmwV3CMCoAAc7Y8" className="w-full">
                <Button className="w-full hover:bg-[#37ecba] hover:text-white transition-colors duration-200 ease-in">
                  Join Waitlist
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                </Link>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
        <p className="mt-8 text-center text-sm text-gray-500">
          Sign up for free today and be the first to know when Pro launches!
        </p>
      </div>
    </section>
  );
}