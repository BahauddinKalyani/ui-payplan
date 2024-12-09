import Features from "@/components/landing/features-vertical";
import Section from "@/components/landing/section";
import { PlusCircle, Calendar , BarChart2  } from "lucide-react";

const data = [
  {
    id: 1,
    title: "1. Input Your Transactions",
    content:
      "Manually add your transactions or set up recurring entries like paychecks, rent, or utility bills. Our flexible input system ensures you can track expenses with minimal effort.",
    image: "/dashboard-dark.png",
    icon: <PlusCircle className="w-6 h-6 text-primary" style={{ color: "#37ecba" }} />,
  },
  {
    id: 2,
    title: "2. View Your Calendar",
    content:
      "See your cash flow at a glance! The calendar highlights income days in blue, manageable expense days in green, and risky expense days in red, helping you instantly spot when action is needed.",
    image: "/dashboard-dark.png",
    icon: <Calendar  className="w-6 h-6 text-primary" style={{ color: "#37ecba" }} />,
  },
  {
    id: 3,
    title: "3. Take Control of Your Finances",
    content:
      "Click on any date to view detailed transaction breakdowns and color-coded insights. Use this information to make informed decisions, avoid overdraft fees, and ensure your expenses are covered well in advance.",
    image: "/dashboard-dark.png",
    icon: <BarChart2  className="w-6 h-6 text-primary" style={{ color: "#37ecba" }} />,
  },
];

export default function HowItWorks() {
  return (
    <Section 
      // title="How it works"
      subtitle="Just 3 steps to get started with MyTwoney">
      <Features data={data} />
    </Section>
  );
}
