import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input';
import { transactionAPI } from '@/api/transactionAPI';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  firstName: z.string().min(2, {
    message: 'First name must be at least 2 characters.',
  }),
  lastName: z.string().optional(),
  age: z.number().min(1).max(120, {
    message: 'Age must be between 0 and 120.',
  }),
})

export function PersonalInfoForm(props: { 
  formRef: React.RefObject<HTMLFormElement>, 
  setCurrentStep: (step: number) => void,
  setLoading: (loading: boolean) => void
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      age: 1,
    },
  })
  const { toast } = useToast()

  async function onSubmit(values: z.infer<typeof formSchema>) {
    props.setLoading(true)
    const username = localStorage.getItem('username')
    if (username && values){
      const response = await transactionAPI.update_user_attributes(username, values)
      if (response.status === 200) {
        toast({
          title: 'Success',
          description: 'Personal information updated successfully.',
          variant: 'success',
        })
        props.setLoading(false)
        props.setCurrentStep(1)
      } else {
        props.setLoading(false)
        toast({
          title: 'Error',
          description: 'Failed to update personal information.',
          variant: 'destructive',
        })
      }
    }
  }

  return (
    <Form {...form}>
      <form ref={props.formRef} onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 p-6 pt-0 w-1/2">
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First name</FormLabel>
              <FormControl>
                <Input placeholder="John" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last name</FormLabel>
              <FormControl>
                <Input placeholder="Doe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="age"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Age</FormLabel>
              <FormControl>
                <Input 
                  type="number" 
                  placeholder="18" 
                  {...field} 
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  )
}