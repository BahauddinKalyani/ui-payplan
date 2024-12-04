import * as React from "react"

// import { cn } from "@/lib/utils"
// import { useMediaQuery } from "@/hooks/use-media-query"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer"
import { TransactionForm } from "./transaction-form"
import { Payment } from "./columns";
import { useIsMobile } from "@/hooks/is-mobile";
import { ScrollArea } from "@/components/ui/scroll-area"

interface TransactionDialogProps {
  openTransactionForm: boolean;
  setOpenTransactionForm: (open: boolean) => void;
  initialValues?: Payment | null;
  setTransactions: (transactions: Payment[]) => void;
  transactions: Payment[];
  TransactionType: string;
}

export default function TransactionDialog(props: TransactionDialogProps) {
  const isMobile = useIsMobile()
  let title;
    if (props.initialValues) {
    title = "Edit Transaction";
    } else {
    title = "Create Transaction";
    }
  
    React.useEffect(() => {
      const onVisualViewportChange = () => {
        const visualViewportHeight = window.visualViewport?.height ?? window.innerHeight;
        const keyboardHeight = window.innerHeight - visualViewportHeight;
        const drawerElement = document.querySelector('.drawer-content') as HTMLElement;
        
        if (drawerElement) {
          if (keyboardHeight > 0) {
            // Keyboard is open
            // drawerElement.style.height = `${visualViewportHeight}px`;
          } else {
            // Keyboard is closed
            drawerElement.style.height = '80vh'; // Reset to default height
          }
        }
      };
    
      window.visualViewport?.addEventListener("resize", onVisualViewportChange);
      return () => window.visualViewport?.removeEventListener("resize", onVisualViewportChange);
    }, []);
  if (isMobile) {
    return (
      <Drawer open={props.openTransactionForm} onOpenChange={props.setOpenTransactionForm}>
      <DrawerContent onPointerDownOutside={(e) => e.preventDefault()}
          onEscapeKeyDown={(e) => e.preventDefault()}>
        <DrawerHeader>
          <DrawerTitle>{title}</DrawerTitle>
        </DrawerHeader>
        <ScrollArea className="h-[70vh] p-4">
        <TransactionForm TransactionType={props.TransactionType} setOpenTransactionForm={props.setOpenTransactionForm} initialValues={props.initialValues ?? null} transactions={props.transactions} setTransactions={props.setTransactions} isMobile={isMobile} />
        </ScrollArea>
      </DrawerContent>
      </Drawer>
    )
  }

  return (
    <Dialog open={props.openTransactionForm} onOpenChange={props.setOpenTransactionForm}>
        <DialogContent className="sm:max-w-[425px] md:max-w-[700px] lg:max-w-[900px]"
          onPointerDownOutside={(e) => e.preventDefault()}
          onEscapeKeyDown={(e) => e.preventDefault()}>
          <DialogHeader>
            <DialogTitle>
                {title}
            </DialogTitle>
          </DialogHeader>
          <TransactionForm TransactionType={props.TransactionType} setOpenTransactionForm={props.setOpenTransactionForm} initialValues={props.initialValues ?? null} transactions={props.transactions} setTransactions={props.setTransactions} isMobile={isMobile} />
        </DialogContent>
      </Dialog>
  )
}
