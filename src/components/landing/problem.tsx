import BlurFade from "@/components/ui/blur-fade";
import Section from "@/components/landing/section";
import { Card, CardContent } from "@/components/ui/card";
// import { Brain, Shield, Zap } from "lucide-react";
import { AlertCircle, EyeOff, FileSpreadsheet } from "lucide-react";

const problems = [
  // {
  //   title: "Overdraft Fees and Missed Payments",
  //   description:
  //     "Many individuals face unexpected overdraft fees or missed payments due to inadequate planning, leading to unnecessary financial stress and penalties.",
  //   icon: Brain,
  // },
  // {
  //   title: "Lack of Financial Visibility",
  //   description:
  //     "It\'s hard to see when your cash flow might run negative, making it challenging to plan for bills, paychecks, and daily expenses.",
  //   icon: Zap,
  // },
  // {
  //   title: "Manual Tracking is Time-Consuming",
  //   description:
  //     "Tracking income and expenses manually or with spreadsheets is tedious and error-prone, leaving users overwhelmed and disengaged.",
  //   icon: Shield,
  // },
    {
      title: "Unexpected Financial Penalties",
      description: "Users face overdraft fees and missed payments due to poor planning, causing unnecessary stress and monetary losses.",
      icon: AlertCircle,
    },
    {
      title: "Limited Cash Flow Visibility",
      description: "Difficulty in predicting negative cash flow periods hinders effective planning for bills, income, and daily expenses.",
      icon: EyeOff,
    },
    {
      title: "Inefficient Expense Tracking",
      description: "Manual tracking of finances using spreadsheets is time-consuming and error-prone, leading to user frustration.",
      icon: FileSpreadsheet,
    }
];


export default function Problem() {
  return (
    <Section
      // title="Problem"
      subtitle="Tracking your finances can be overwhelming."
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
        {problems.map((problem, index) => (
          <BlurFade key={index} delay={0.2 + index * 0.2} inView>
            <Card className="bg-background border-none shadow-none">
              <CardContent className="p-6 space-y-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <problem.icon className="w-6 h-6" style={{ color: "#37ecba" }} />
                </div>
                <h3 className="text-xl font-semibold">{problem.title}</h3>
                <p className="text-muted-foreground">{problem.description}</p>
              </CardContent>
            </Card>
          </BlurFade>
        ))}
      </div>
    </Section>
  );
}
