import * as React from "react"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button";
import Image from 'next/image';
import { ChevronRight  } from "lucide-react";
// import { PersonalInfoForm } from "./onboarding-personal-info-form";
// import TransactionFormSkeleton from '@/app/dashboard/transaction-form-skeleton';
import { useState } from "react";
import Stepper from '@/components/ui/stepper';
import  DataTable  from "@/app/dashboard/data-table"
import { Payment } from '@/app/dashboard/columns';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { set } from "date-fns";

interface OnboardingDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  isMobile: boolean;
  transactions: Payment[];
  setTransactions: React.Dispatch<React.SetStateAction<Payment[]>>;
}

export default function OnboardingDialog(props: OnboardingDialogProps) {
  const isMobile = props.isMobile;

  const [currentStep, setCurrentStep] = useState(-1);
  const [error, setError] = useState<Error | null>({name: '', message: ''});
  const [income, setIncome] = useState<Payment[]>(props.transactions.filter((item) => item.type === 'income'));
  const [expense, setExpense] = useState<Payment[]>(props.transactions.filter((item) => item.type === 'expense'));

  const steps = [
    { title: 'Step 1', description: 'Add Your Income' },
    { title: 'Step 2', description: 'Add Your Expenses' },
    { title: 'Step 3', description: 'All Set!' }
  ];

  const handleOpenChange = (isOpen: boolean) => {
    if (isOpen) props.setOpen(true)
  }

  const handlePrimaryClick = () => {
    if (currentStep === 2) {
      props.setTransactions([...income, ...expense]);
      props.setOpen(false);
      return;
    }
    if ((currentStep +1) <= steps.length+1) {
      if (currentStep === 0 && income.length === 0) {
        setError({name: 'No Transactions', message: 'Please add atleast one income transaction to proceed.'});
        return;
      }
      if (currentStep === 1 && expense.length === 0) {
        setError({name: 'No Transactions', message: 'Please add atleast one expense transaction to proceed.'});
        return;
      }
      setCurrentStep(currentStep + 1);
    }
  }

  React.useEffect(() => {
    if (currentStep === 0 && income.length > 0) {
      setError({name: '', message: ''});
    }
    if (currentStep === 1 && expense.length > 0) {
      setError({name: '', message: ''});
    }
  }, [currentStep, income.length, expense.length]);

  if (isMobile) {
    return (
      <Drawer open={props.open} onOpenChange={handleOpenChange}>
      <DrawerContent onPointerDownOutside={(e) => e.preventDefault()}
          onEscapeKeyDown={(e) => e.preventDefault()}
          data-vaul-no-drag>
        <DrawerHeader className={currentStep === -1 ?"invisible": ""}>
          <DrawerTitle className="mt-10 scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight transition-colors first:mt-0">
          { currentStep > -1 && currentStep < 3 && <Stepper steps={steps} currentStep={currentStep} />}
          { currentStep === 3 && 'All Set! You\'re Ready to Go!'}
          
          </DrawerTitle>
        </DrawerHeader>
        <ScrollArea className="h-[60vh]">
        { (() => {
          switch(currentStep) {
            case -1:
              return <Welcome />;
            case 0:
              return <Income isMobile={isMobile} income={income} setIncome={setIncome} error={error} />;
            case 1:
              return <Expense isMobile={isMobile} expense={expense} setExpense={setExpense} error={error} />;
            case 2: return <Final />;
          }
        })()}
        </ScrollArea>
        <DrawerFooter>
            <Button
              onClick={handlePrimaryClick}
            >
              {(() => {
                switch(currentStep) {
                  case -1:
                    return "Get Started";
                  case 0:
                    return 'Next';
                  case 1:
                    return 'Next';
                  default:
                    return 'Finish';
                }
              })()}
              <ChevronRight className="mr-2 h-4 w-4" />
            </Button>
        </DrawerFooter>
      </DrawerContent>
      </Drawer>
    )
  }

  return (
    <Dialog open={props.open} onOpenChange={handleOpenChange}>
        <DialogContent className="sm:max-w-[425px] md:max-w-[700px] lg:max-w-[900px] p-8 [&>button]:hidden"
          onPointerDownOutside={(e) => e.preventDefault()}
          onEscapeKeyDown={(e) => e.preventDefault()}>
          <DialogHeader className={currentStep === -1 ?"invisible": ""}>
            <DialogTitle className="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
            { currentStep > -1 && currentStep < 3 && <Stepper steps={steps} currentStep={currentStep} />}
            { currentStep === 3 && 'All Set! You\'re Ready to Go!'}
            </DialogTitle>
          </DialogHeader>
          { (() => {
          switch(currentStep) {
            case -1:
              return <Welcome />;
            case 0:
              return <Income isMobile={isMobile} income={income} setIncome={setIncome} error={error} />;
            case 1:
              return <Expense isMobile={isMobile} expense={expense} setExpense={setExpense} error={error} />;
            case 2: return <Final />;

          }
        })()}
          <DialogFooter>
            <Button
              onClick={handlePrimaryClick}
            >
              {(() => {
                switch(currentStep) {
                  case -1:
                    return "Get Started";
                  case 0:
                    return 'Next';
                  case 1:
                    return 'Next';
                  default:
                    return 'Finish';
                }
              })()}
              
              <ChevronRight className="mr-2 h-4 w-4" />
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
  )
}

function Welcome() {
  return (
    <section id="hero">
        <div className="container mx-auto px-4 py-8 md:py-8 lg:py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="space-y-2">
              <div className="text-center space-y-2 mx-auto lg:text-left lg:mx-0">
                <h1 className="text-[42px] font-medium mb-2 text-balance max-w-3xl mx-auto tracking-tighter lg:mx-0">
                  Ready to take control of your finances?
                </h1>
                <p className="text-muted-foreground max-w-[600px] mx-auto lg:mx-0">
                  MyTwoney helps you track your cash flow, predict potential overdrafts, and plan ahead—all in a simple calendar view.
                </p>
              </div>
            </div>
          <DotLottieReact
            src="https://lottie.host/2d606796-8107-4339-8c35-ed46f9124cdb/ap64HaeTjg.lottie"
            loop
            autoplay
            className="filter grayscale-[95%]"
          />
          </div>
        </div>
      </section>
  )
}

interface IncomeProps {
  isMobile: boolean;
  income: Payment[];
  setIncome: React.Dispatch<React.SetStateAction<Payment[]>>;
  error: Error | null;
}

function Income({ isMobile, income, setIncome, error }: IncomeProps) {
  return (
    <div className="pt-0 grid grid-cols-1 lg:grid-cols-2 gap-8 px-4 lg:px-0">
      <div className="space-y-2">
        <div className="text-center space-y-2 mx-auto lg:text-left lg:mx-0">
          <h1 className="text-[42px] font-medium mb-2 text-balance max-w-3xl mx-auto tracking-tighter lg:mx-0">
          Let&apos;s Add Your Income
          </h1>
          <p className="text-muted-foreground max-w-[600px] mx-auto lg:mx-0">
          Start by adding your income sources, such as your bi-weekly paycheque or freelance earnings.
          </p>
        </div>
      </div>
      <div className="mt-6">
      <DataTable 
        type="income"
        isMain={false} 
        isMobile={isMobile || true} 
        transactions={income} 
        setTransactions={setIncome} />
        <p className="text-red-500 text-sm">{error && error.message}</p>
      </div>
    </div>
  )
}

interface ExpenseProps {
  isMobile: boolean;
  expense: Payment[];
  setExpense: React.Dispatch<React.SetStateAction<Payment[]>>;
  error: Error | null;
}

function Expense({ isMobile, expense, setExpense, error }: ExpenseProps) {
  return (
    <div className="pt-0 grid grid-cols-1 lg:grid-cols-2 gap-8 px-4 lg:px-0">
      <div className="space-y-2">
        <div className="text-center space-y-2 mx-auto lg:text-left lg:mx-0">
          <h1 className="text-[42px] font-medium mb-2 text-balance max-w-3xl mx-auto tracking-tighter lg:mx-0">
          Time to Track Your Expenses
          </h1>
          <p className="text-muted-foreground max-w-[600px] mx-auto lg:mx-0">
          Add recurring payments like rent, bills, or subscriptions. Don&apos;t forget variable expenses like groceries or entertainment.
          </p><br />
          <p className="text-muted-foreground text-sm max-w-[600px] mx-auto lg:mx-0">Tip: Use accurate dates to get the most from your calendar view.</p>
        </div>
      </div>
      <div className="mt-6">
      <DataTable 
        type="income"
        isMain={false} 
        isMobile={isMobile || true} 
        transactions={expense} 
        setTransactions={setExpense} />
        <p className="text-red-500 text-sm">{error && error.message}</p>
      </div>
    </div>
  )
}

function Final() {
  return (
    <div className="pt-0 grid grid-cols-1 lg:grid-cols-2 gap-8 px-4 lg:px-0 lg:mb-6">
      <div className="space-y-2">
        <div className="text-center space-y-2 mx-auto lg:text-left lg:mx-0">
          <h1 className="text-[42px] font-medium mb-4 text-balance max-w-3xl mx-auto tracking-tighter lg:mx-0">
          Your Calendar at a Glance
          </h1>
          <div className="flex items-center justify-center lg:justify-start">
            <ul className="text-muted-foreground max-w-[600px] mx-auto lg:mx-0">
              <li className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
                <span className="font-bold mr-2">Blue dots:</span>
                Income days
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                <span className="font-bold mr-2">Green dots:</span>
                Expense you can cover
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-red-500 mr-2"></div>
                <span className="font-bold mr-2">Red dots:</span>
                Potential overdrafts
              </li>
            </ul>
          </div>
        </div>
      </div>
      <Image
            alt="dashboard screenshot"
            className="aspect-video rounded-lg"
            height="366"
            src="/dashboard-dark.png"
            width="550"
          />
    </div>
  )
}
