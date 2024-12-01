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
import { ChevronRight  } from "lucide-react";
import { PersonalInfoForm } from "./onboarding-personal-info-form";
import TransactionFormSkeleton from '@/app/dashboard/transaction-form-skeleton';
import { useRef, useState } from "react";
import Stepper from '@/components/ui/stepper';
import  DataTable  from "@/app/dashboard/data-table"
import { Payment } from '@/app/dashboard/columns';

interface OnboardingDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  isMobile: boolean;
  transactions: Payment[];
  setTransactions: React.Dispatch<React.SetStateAction<Payment[]>>;
}

export default function OnboardingDialog(props: OnboardingDialogProps) {
  const isMobile = props.isMobile;
  const formRef = useRef<HTMLFormElement>(null);
  const [currentStep, setCurrentStep] = useState(-1);
  const [error, setError] = useState<Error | null>({name: '', message: ''});
  const [loading, setLoading] = useState(false);
  let income: Payment[] = [];
  let expense: Payment[] = [];
  ({income, expense} = separateTransactions(props.transactions));

  const steps = [
    { title: 'Step 1', description: 'Add Your Information' },
    { title: 'Step 2', description: 'Add Your Income' },
    { title: 'Step 3', description: 'Add Your Expenses' },
  ];

  function separateTransactions(transactions: Payment[]) {
    const income: Payment[] = [];
    const expense: Payment[] = [];
  
    transactions.forEach(transaction => {
      if (transaction.type === 'income') {
        income.push(transaction);
      } else if (transaction.type === 'expense') {
        expense.push(transaction);
      }
    });
  
    return { income, expense };
  }

  const handleOpenChange = (isOpen: boolean) => {
    if (isOpen) props.setOpen(true)
  }

  const handlePrimaryClick = () => {
    if (currentStep === 3) {
      props.setOpen(false);
      return;
    }
    if (currentStep=== 0 && formRef.current) {
      formRef.current.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
      return;
    }
    if ((currentStep +1) <= steps.length+1) {
      if (currentStep === 1 && income.length === 0) {
        setError({name: 'No Transactions', message: 'Please add atleast one income transaction to proceed.'});
        return;
      }
      if (currentStep === 2 && expense.length === 0) {
        setError({name: 'No Transactions', message: 'Please add atleast one expense transaction to proceed.'});
        return;
      }
      setCurrentStep(currentStep + 1);
    }
  }

  React.useEffect(() => {
    if (currentStep === 1 && income.length > 0) {
      setError({name: '', message: ''});
    }
    if (currentStep === 2 && expense.length > 0) {
      setError({name: '', message: ''});
    }
  }, [props.transactions])

  if (isMobile) {
    return (
      <Drawer open={props.open} onOpenChange={handleOpenChange}>
      <DrawerContent onPointerDownOutside={(e) => e.preventDefault()}
          onEscapeKeyDown={(e) => e.preventDefault()}
          data-vaul-no-drag>
        <DrawerHeader>
          <DrawerTitle className="mt-10 scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight transition-colors first:mt-0">
          { currentStep === -1 && 'Welcome to MyTwoney 🪙'}
          { currentStep > -1 && currentStep < 3 && <Stepper steps={steps} currentStep={currentStep} />}
          { currentStep === 3 && 'All Set! You\'re Ready to Go!'}
          
          </DrawerTitle>
        </DrawerHeader>
        <ScrollArea className="h-[60vh]">
        {loading && <TransactionFormSkeleton />}
        {!loading && (() => {
          switch(currentStep) {
            case -1:
              return <Welcome />;
            case 0:
              return <PersonalInfoForm formRef={formRef} setCurrentStep={setCurrentStep} setLoading={setLoading}/>;
            case 1:
              return <div className="p-8 pt-0">
                <DataTable 
                  type="income"
                  isMain={false} 
                  isMobile={isMobile} 
                  transactions={income} 
                  setTransactions={props.setTransactions as React.Dispatch<React.SetStateAction<Payment[]>>} />
                  <p className="text-red-500 text-sm">{error && error.message}</p>
              </div>
            case 2:
              return <div className="p-8 pt-0">
                <DataTable 
                  type="expense"
                  isMain={false} 
                  isMobile={isMobile} 
                  transactions={expense} 
                  setTransactions={props.setTransactions as React.Dispatch<React.SetStateAction<Payment[]>>} />
                  <p className="text-red-500 text-sm">{error && error.message}</p>
              </div>
            case 3: return <Final />;
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
                    return "Let's Start";
                  case 0:
                    return 'Next';
                  case 1:
                    return 'Next';
                  case 2:
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
          <DialogHeader>
            <DialogTitle className="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
            { currentStep === -1 && 'Welcome to MyTwoney 🪙'}
            { currentStep > -1 && currentStep < 3 && <Stepper steps={steps} currentStep={currentStep} />}
            { currentStep === 3 && 'All Set! You\'re Ready to Go!'}
            </DialogTitle>
          </DialogHeader>
          {loading && <TransactionFormSkeleton />}
          {!loading && (() => {
          switch(currentStep) {
            case -1:
              return <Welcome />;
            case 0:
              return <PersonalInfoForm formRef={formRef} setCurrentStep={setCurrentStep} setLoading={setLoading}/>;
            case 1:
              return <div className="p-8 pt-0">
                <DataTable 
                  type="income"
                  isMain={false} 
                  isMobile={isMobile} 
                  transactions={income} 
                  setTransactions={props.setTransactions as React.Dispatch<React.SetStateAction<Payment[]>>} />
                  <p className="text-red-500 text-sm">{error && error.message}</p>
              </div>;
            case 2:
              return <div className="p-8 pt-0">
                <DataTable 
                  type="expense"
                  isMain={false} 
                  isMobile={isMobile} 
                  transactions={expense} 
                  setTransactions={props.setTransactions as React.Dispatch<React.SetStateAction<Payment[]>>} />
                  <p className="text-red-500 text-sm">{error && error.message}</p>
              </div>
            case 3: return <Final />;

          }
        })()}
          <DialogFooter>
            <Button
              onClick={handlePrimaryClick}
            >
              {(() => {
                switch(currentStep) {
                  case -1:
                    return "Let's Start";
                  case 0:
                    return 'Next';
                  case 1:
                    return 'Next';
                  case 2:
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
    <div className="w-full p-6 pt-0">
          <p className="leading-7 [&:not(:first-child)]:mt-6 text-muted-foreground">
            We are thrilled to have you! Mytwoney makes managing your finances easy by helping you track your income and expenses.
          </p>
          <p className="leading-7 [&:not(:first-child)]:mt-6 text-muted-foreground">
            Just three quick steps to get started:
          </p>
          <ol className="my-6 ml-6 list-disc [&>li]:mt-2 text-muted-foreground">
            <li>Add Your Personal Information: Name, DOB etc.</li>
            <li>Add Your Income: Enter your earnings, like salary or freelance work.</li>
            <li>Add Your Expenses: Input your regular costs, such as bills and subscriptions.</li>
          </ol>
          <p className="leading-7 [&:not(:first-child)]:mt-6 text-muted-foreground">
            That&apos;s it! You&apos;re ready to start tracking your finances. Click the button below to get started.
          </p>
          </div>
  )
}

function Final() {
  return (
    <div className="w-full p-6 pt-0">
      <p className="leading-7 [&:not(:first-child)]:mt-6 text-muted-foreground">
        Congratulations on completing your setup with Mytwoney! You've taken the first step towards better financial management.
      </p>
      <p className="leading-7 [&:not(:first-child)]:mt-6 text-muted-foreground">
        Here's what you've accomplished:
      </p>
      <ol className="my-6 ml-6 list-decimal [&>li]:mt-2 text-muted-foreground">
        <li>Added your personal information</li>
        <li>Set up your income sources</li>
        <li>Logged your regular expenses</li>
      </ol>
      <p className="leading-7 [&:not(:first-child)]:mt-6 text-muted-foreground">
        You're now ready to start tracking your finances like a pro. Remember, consistency is key to financial success!
      </p>
      <p className="leading-7 [&:not(:first-child)]:mt-6 text-muted-foreground">
        What's next? Explore your dashboard, set financial goals, and watch your savings grow. If you need any help, our support team is always here for you.
      </p>
      <p className="leading-7 [&:not(:first-child)]:mt-6 font-semibold">
        Welcome to smarter money management with Mytwoney!
      </p>
    </div>
  )
}
