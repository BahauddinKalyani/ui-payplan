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
}

export default function TransactionDialog(props: TransactionDialogProps) {
  const isMobile = useIsMobile()
  let title;
    if (props.initialValues) {
    title = "Edit Transaction";
    } else {
    title = "Create Transaction";
    }
  if (isMobile) {
    return (
      <Drawer open={props.openTransactionForm} onOpenChange={props.setOpenTransactionForm}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>{title}</DrawerTitle>
        </DrawerHeader>
        <ScrollArea className="h-[70vh] p-4">
        <TransactionForm setOpenTransactionForm={props.setOpenTransactionForm} initialValues={props.initialValues ?? null} transactions={props.transactions} setTransactions={props.setTransactions} isMobile={isMobile} />
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
          <TransactionForm setOpenTransactionForm={props.setOpenTransactionForm} initialValues={props.initialValues ?? null} transactions={props.transactions} setTransactions={props.setTransactions} isMobile={isMobile} />
        </DialogContent>
      </Dialog>
  )
}
