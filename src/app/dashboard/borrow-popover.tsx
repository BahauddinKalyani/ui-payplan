import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils"
import { format } from 'date-fns';
import { Loader2 } from "lucide-react"
import { transactionAPI } from '@/api/transactionAPI';
import { formatDate } from '@/lib/utils';
import { Payment } from './columns';

// const formSchema = z.object({
//   amount_borrowed: z.number().positive('Amount must be positive'),
//   amount_to_be_returned: z.number().positive('Amount must be positive'),
//   date_of_return: z.date().refine((date) => date > new Date(), {
//     message: "Return date must be in the future"
//   }),
// })

export default function BorrowInfoPopover( props: { 
    transactions: Payment[], 
    setTransactions: React.Dispatch<React.SetStateAction<Payment[]>>, 
    setIsDialogOpen: (open: boolean) => void,
    date: string } ) {
  const [openPopover, setOpenPopover] = React.useState('');
  const [isloading, setIsLoading] = React.useState(false);

  function convertToDate(dateString: string): Date {
    const [month, day, year] = dateString.split('-');
    return new Date(+year, +month - 1, +day);
  }
  const current_day = convertToDate(props.date)
  const formSchema = z.object({
    amount_borrowed: z.number().positive('Amount must be positive'),
    amount_to_be_returned: z.number().positive('Amount must be positive'),
    date_of_return: z.date().refine((date) => date > current_day, {
      message: "Return date must be in the future"
    }),
  });

  const defaultValues = {
    amount_borrowed: 0,
    amount_to_be_returned: 0,
    date_of_return: current_day,
  }

  const form = useForm<BorrowFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues,
  });

  interface BorrowFormData {
    amount_borrowed: number;
    amount_to_be_returned: number;
    date_of_return: Date;
  }

  const onSubmit = async (data: BorrowFormData): Promise<void> => {
    console.log(data);
    // create both transactions
    // update in current state
    try {
      setIsLoading(true);
      const user_id = localStorage.getItem('user_id');
      const attributes = {
        amount_borrowed: data.amount_borrowed,
        amount_to_be_returned: data.amount_to_be_returned,
        date_of_return: '',
        current_date: props.date,
      }
      attributes['date_of_return'] = formatDate(data['date_of_return']);
      const response = await transactionAPI.borrow(user_id, attributes);
      if (response.status === 200) {
        const responseData = response.data;
        props.setTransactions([...props.transactions, ...responseData]);
        props.setIsDialogOpen(false);
        console.log('Borrow information submitted successfully');
        setIsLoading(false);
      } else {
        console.error('Failed to submit borrow information');
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Failed to submit borrow information: ', error);
      setIsLoading(false);
    }
  };

  const handlePopoverToggle = (fieldName: string) => {
    setOpenPopover(openPopover === fieldName ? '' : fieldName);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <span className="text-muted-foreground underline cursor-pointer">+ borrow from future</span>
      </PopoverTrigger>
      <PopoverContent className="w-60">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
            <FormField
              control={form.control}
              name="amount_borrowed"
              render={({ field }) => (
                <FormItem className="space-y-0">
                  <FormLabel>Amount Borrowed</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      placeholder="Amount Borrowed" 
                      className="text-sm py-1" 
                      min={0}
                      {...field} 
                      onChange={e => field.onChange(e.target.value ? parseFloat(e.target.value) : 0)}
                      onFocus={(e) => {
                        let value = e.target.value;
                        value = value.toString().replace(/^0+/, '');
                        form.setValue('amount_borrowed', parseInt(value));
                      }}
                    />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="amount_to_be_returned"
              render={({ field }) => (
                <FormItem className="space-y-0">
                  <FormLabel>Amount to Repay</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      placeholder="Amount to Repay" 
                      className="text-sm py-1" 
                      min={0}
                      {...field} 
                      onChange={e => field.onChange(e.target.value ? parseFloat(e.target.value) : 0)}
                      onFocus={(e) => {
                        let value = e.target.value;
                        value = value.toString().replace(/^0+/, '');
                        form.setValue('amount_to_be_returned', parseInt(value));
                      }}
                    />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="date_of_return"
              render={({ field }) => (
                <FormItem className="space-y-0">
                  <FormLabel>Repayment Date</FormLabel>
                  <Popover open={openPopover === "date_of_return"} onOpenChange={() => handlePopoverToggle("date_of_return")}>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          type='button'
                          variant={"outline"}
                          className={cn(
                            "w-full justify-start text-left text-sm py-1",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-1 h-3 w-3" />
                          {field.value ? format(field.value, "PPP") : "Repayment Date"}
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 z-50">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={(date) => {
                          field.onChange(date);
                          handlePopoverToggle("date_of_return");
                        }}
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isloading} className="w-full mt-4 text-sm py-1">
              { isloading && <Loader2 className="animate-spin" /> }
              {isloading? "Please wait": "Submit" }
            </Button>
          </form>
        </Form>
      </PopoverContent>
    </Popover>
  );
}