import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { format } from 'date-fns';
import { useEffect } from 'react';
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { transactionAPI } from '@/api/transactionAPI';
import { formatDate } from '@/lib/utils';
import { parseDate } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import TransactionFormSkeleton from '@/app/dashboard/transaction-form-skeleton';
import { Payment } from './columns';
import { Switch } from "@/components/ui/switch";
import { CalendarIcon } from "lucide-react";

const formSchema = z.object({
  type: z.enum(['income', 'expense']),
  name: z.string().min(1, 'Name is required'),
  amount: z.number().positive('Amount must be positive'),
  frequency: z.enum(['one-time', 'weekly', 'bi-weekly', 'semi-monthly', 'monthly']),
  day: z.number().optional(),
  date_of_transaction: z.date().optional(),
  date_of_second_transaction: z.date().optional(),
  start_date: z.date(),
  end_date: z.date().optional(),
  skip_end_date: z.boolean(),
}).refine(data => {
  // Ensure start_date is not later than end_date unless skipping end date
  return data.skip_end_date || (data.start_date <= (data.end_date ?? data.start_date));
}, {
  message: "Start date cannot be later than end date.",
  path: ["start_date"], // This will show the error under start_date field
});

const daysOfWeek = [
  { value: 1, label: 'Monday' },
  { value: 2, label: 'Tuesday' },
  { value: 3, label: 'Wednesday' },
  { value: 4, label: 'Thursday' },
  { value: 5, label: 'Friday' },
  { value: 6, label: 'Saturday' },
  { value: 7, label: 'Sunday' },
];

const frequencies = [
  { value: 'one-time', label: 'One-time' },
  { value: 'weekly', label: 'Weekly' },
  { value: 'bi-weekly', label: 'Bi-weekly' },
  { value: 'semi-monthly', label: 'Semi-monthly' },
  { value: 'monthly', label: 'Monthly' },
];

export function TransactionForm(props: { initialValues: Payment|null; setOpenTransactionForm: (arg0: boolean) => void; transactions: Payment[]; setTransactions: (arg0: Array<Payment>) => void; isMobile: boolean; }) {
  // const [selectedType, setSelectedType] = useState('income');
  const [selectedFrequency, setSelectedFrequency] = useState('one-time');
  const [transaction_id, setTransactionId] = useState('');
  const [loading, setLoading] = useState(false);
  const [skipEndDate, setSkipEndDate] = useState(false);
  const [openPopover, setOpenPopover] = useState('');
  const { toast } = useToast()
  const defaultValues = {
    type: 'expense',
    name: '',
    amount: 0,
    frequency: 'one-time',
    start_date: new Date(),
    end_date: new Date(),
    date_of_transaction: new Date(),
    date_of_second_transaction: new Date(),
    day: 1,
    skip_end_date: false,
  };
  
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues
  });

  const handlePopoverToggle = (fieldName: string) => {
    setOpenPopover(openPopover === fieldName ? '' : fieldName);
  };

  useEffect(() => {
    if (props.initialValues) {
      const resetValues = {
        ...defaultValues,
        ...props.initialValues,
        amount: parseFloat(props.initialValues.amount.toString()) || 0,
        day: parseInt(props.initialValues.day) || 1,
        start_date: props.initialValues.start_date ? parseDate(props.initialValues.start_date) : new Date(),
        end_date: props.initialValues.end_date ? parseDate(props.initialValues.end_date) : new Date(),
        date_of_transaction: props.initialValues.date_of_transaction ? parseDate(props.initialValues.date_of_transaction) : new Date(),
        date_of_second_transaction: props.initialValues.date_of_second_transaction ? parseDate(props.initialValues.date_of_second_transaction) : new Date(),
      };
      form.reset(resetValues);
      // setSelectedType(resetValues.type);
      setSelectedFrequency(resetValues.frequency);
      setTransactionId(props.initialValues.id);
      setSkipEndDate(resetValues.skip_end_date);

    }
  }, [props.initialValues]);

  function onSubmit(values: any) {
    setLoading(true);
    if (skipEndDate) {
      delete values.end_date; // Remove end_date if skipping
    }
    if (transaction_id) {
      updateTransaction(values);
    } else {
      createTransaction(values);
    }
    setLoading(false);
    props.setOpenTransactionForm(false);
  }

  const createTransaction = async (values: any) => {
    const date_keys = ['date_of_transaction', 'date_of_second_transaction', 'start_date', 'end_date'];
    for (const key in values) {
      if (date_keys.includes(key)) {
        (values as any)[key] = formatDate((values as any)[key]);
      } else if (key === 'day') {
        (values as any)[key] = parseInt((values as any)[key]);
      } else if (key === 'amount') {  
        (values as any)[key] = parseFloat((values as any)[key]);
      }
    }
    (values as any)['user_id'] = localStorage.getItem('user_id');
    try {
      const transaction = await transactionAPI.create_transaction(values);
      let newTransactions = [...props.transactions];
      newTransactions.push(transaction.data as Payment);
      props.setTransactions(newTransactions);
      toast({
        title: "Success",
        description: "Transaction created successfully.",
        variant: "success",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Transaction creation failed. "+error,
        variant: "destructive",
      })
    }
  }
  const updateTransaction = async (values: any) => {
    const date_keys = ['date_of_transaction', 'date_of_second_transaction', 'start_date', 'end_date'];
    for (const key in values) {
      if (date_keys.includes(key)) {
        (values as any)[key] = formatDate((values as any)[key]);
      } else if (key === 'day') {
        (values as any)[key] = parseInt((values as any)[key]);
      } else if (key === 'amount') {  
        (values as any)[key] = parseFloat((values as any)[key]);
      }
    }
    (values as any)['user_id'] = localStorage.getItem('user_id');
    (values as any)['id'] = transaction_id;
    try {
      const transaction = await transactionAPI.update_transaction(values);
      let newTransactions = [...props.transactions];
      newTransactions = newTransactions.map((t) => t.id === transaction_id ? transaction.data : t);
      props.setTransactions(newTransactions);
      toast({
        title: "Success",
        description: "Transaction updated successfully.",
        variant: "success",
      })
      setSelectedFrequency(values.frequency);
      setSkipEndDate(values.skip_end_date);
    } catch (error) { 
      console.log(error);
      toast({
        title: "Error",
        description: "Transaction update failed. "+error,
        variant: "destructive",
      })
    }
  }

  if (loading) {
    return <TransactionFormSkeleton />;
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className={`space-y-8 ${props.isMobile ? 'flex flex-col' : 'grid grid-cols-1 md:grid-cols-2 gap-6'}`}>
          <div className="space-y-6">
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Transaction Type</FormLabel>
                  <Select 
                    onValueChange={(value) => {
                      if(value) {
                        field.onChange(value);
                        // setSelectedType(value);
                      }
                    }
                  }
                  value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select transaction type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="income">Income</SelectItem>
                      <SelectItem value="expense">Expense</SelectItem>
                      {/* <SelectItem value="transfer">Transfer</SelectItem> */}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Transaction Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Transaction name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Transaction Amount</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="Amount" {...field} onChange={e => {
                                        const value = e.target.value;
                                        field.onChange(value ? parseFloat(value) : 0);
                                    }} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="frequency"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Transaction Frequency</FormLabel>
                  <FormDescription>Select the frequency of the transaction (e.g., how often it occurs).</FormDescription>
                  <Select 
                    onValueChange={(value) => {
                        if(value) {
                          field.onChange(value);
                          setSelectedFrequency(value);
                        }
                      }
                    }
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select frequency" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {frequencies.map((freq) => (
                          <SelectItem key={freq.value} value={freq.value.toString()}>
                            {freq.label}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="space-y-6">
          {(selectedFrequency === 'weekly' || selectedFrequency === 'bi-weekly') && (
              <FormField
                control={form.control}
                name="day"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Day of the Week</FormLabel>
                    <Select onValueChange={(value) => {
                        if(value) {
                          const pvalue = parseInt(value);                         
                          field.onChange(pvalue);
                        }
                      }
                    } value={field.value?.toString()}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select day" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {daysOfWeek.map((day) => (
                          <SelectItem key={day.value} value={day.value.toString()}>
                            {day.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            
          {(selectedFrequency === 'one-time' || selectedFrequency === 'semi-monthly' || selectedFrequency === 'monthly') &&
          <FormField
              control={form.control}
              name="date_of_transaction"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Date of Transaction</FormLabel>
                  <FormDescription>Select the date when the transaction will happen.</FormDescription>
                  <Popover open={openPopover === "date_of_transaction"} onOpenChange={() => handlePopoverToggle("date_of_transaction")}>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button type="button" variant="outline">
                          <CalendarIcon className="-mt-1 h-4 w-4 opacity-50" />
                          {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 z-50">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={(date) => {
                          field.onChange(date);
                          handlePopoverToggle("date_of_transaction");
                        }}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
          }

        {(selectedFrequency === 'semi-monthly') &&
          <FormField
              control={form.control}
              name="date_of_second_transaction"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Date of Second Transaction</FormLabel>
                  <FormDescription>Select the date when the second semi monthly transaction will happen.</FormDescription>
                  <Popover open={openPopover === "date_of_second_transaction"} onOpenChange={() => handlePopoverToggle("date_of_second_transaction")}>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button type="button" variant="outline">
                          <CalendarIcon className="-mt-1 h-4 w-4 opacity-50" />
                          {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 z-50">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={(date) => {
                          field.onChange(date);
                          handlePopoverToggle("date_of_second_transaction");
                        }}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
          }

          {(selectedFrequency !== 'one-time') &&
          <>
          <FormField
              control={form.control}
              name="start_date"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Start Date</FormLabel>
                  <FormDescription>Select the date when the transaction will begin. This is the starting point for the recurring transaction.</FormDescription>
                  <Popover open={openPopover === "start_date"} onOpenChange={() => handlePopoverToggle("start_date")}>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button type="button" variant="outline">
                          <CalendarIcon className="-mt-1 h-4 w-4 opacity-50" />
                          {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 z-50">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={(date) => {
                          field.onChange(date);
                          handlePopoverToggle("start_date");
                        }}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField control={form.control} name="skip_end_date" render={({ field }) => (
              <FormItem className="flex items-center">
                <Switch className='mt-1' checked={field.value}
                onCheckedChange={(value) => {
                    field.onChange(value);
                    setSkipEndDate(value);
                }
              } />
                <FormLabel className="ml-2">Skip End Date</FormLabel>
                <FormDescription className="ml-2">Transaction will occur indefinitely.</FormDescription>
                <FormMessage />
              </FormItem>
            )} 
            />

            {!skipEndDate && (
            <FormField
              control={form.control}
              name="end_date"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>End Date (Optional)</FormLabel>
                  <FormDescription>Select the date when the transaction will cease. This is the end point of the recurring transaction.</FormDescription>
                  <Popover open={openPopover === "end_date"} onOpenChange={() => handlePopoverToggle("end_date")}>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button type="button" variant="outline">
                          <CalendarIcon className="-mt-1 h-4 w-4 opacity-50" />
                          {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 z-50">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={(date) => {
                          field.onChange(date);
                          handlePopoverToggle("end_date");
                        }}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            )}
          </>
          }
        </div>
      </div>
      <div className="p-4 flex justify-end">
          <Button type="submit" className="px-2 py-1">Submit</Button>
        </div>
      </form>      
    </Form>
  );
}