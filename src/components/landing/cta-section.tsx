import { Button } from "@/components/ui/button";
import Link from "next/link";

const BUTTONS = [
  { text: "Get Started for Free", href: "/signup", variant: "default" as const },
  { text: "Learn More", href: "#blog", variant: "outline" as const },
];

export default function CallToActionSection() {
  return (
    <section id="cta">
      <div className="container px-4 py-12 md:px-6 md:py-24 lg:py-32">
        <div className="mx-auto space-y-4 py-6 text-center">
          <h4 className="mx-auto mb-2 max-w-4xl text-balance text-[42px] font-medium tracking-tighter">
            Unlock Your Financial Potential with MyTwoney
          </h4>
        </div>
        <div className="space-y-4 text-center">
          <p className="mx-auto max-w-[700px] text-balance text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
          Plan smarter, avoid overdraft fees, missed payments and take control of your finances with our intuitive tools and features.

          </p>
          <div className="mt-6 flex flex-col justify-center gap-4 sm:flex-row">
            {BUTTONS.map((button, index) => (
              <Button key={index} variant={button.variant} asChild>
                <Link href={button.href} prefetch={false}>
                  {button.text}
                </Link>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
