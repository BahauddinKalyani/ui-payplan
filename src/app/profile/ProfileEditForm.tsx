"use client";

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from '@/hooks/use-toast';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { transactionAPI } from '@/api/transactionAPI';
import Image from "next/image";

const profileSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().optional(),
  // email: z.string().email("Invalid email address"),
  age: z.number().min(0, "Age must be a positive number"),
  avatar: z.string(),
});

interface ProfileEditFormProps {
    avatars: string[];
    userInfo: {
      firstName: string;
      lastName: string;
      // email: string;
      age: number;
      avatar: string;
    };
    setUserInfo: React.Dispatch<React.SetStateAction<any>>;
  }

export function ProfileEditForm({ avatars, userInfo, setUserInfo }: ProfileEditFormProps) {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: userInfo.firstName,
      lastName: userInfo.lastName,
      age: userInfo.age,
      avatar: userInfo.avatar,
    },
  });

  function setLocalStorage(data: z.infer<typeof profileSchema>) {
    localStorage.setItem('firstName', data.firstName);
    localStorage.setItem('lastName', data.lastName || '');
    // localStorage.setItem('email', data.email);
    localStorage.setItem('age', data.age.toString());
    localStorage.setItem('avatar', data.avatar);
  }
  const onSubmit = async (data: z.infer<typeof profileSchema>) => {
    try {
      // API call to update profile would go here
      console.log('Profile updated:', data);
      const username = localStorage.getItem('username');
      if (username && data){
        const response = await transactionAPI.update_user_attributes(username, data)
        if (response.status === 200) {
          toast({
            title: 'Success',
            description: 'Your profile has been updated successfully.',
            variant: 'success',
            duration: 1000,
          })
          setLocalStorage(data);
          setUserInfo(data);
        } else {
          toast({
            title: 'Error',
            description: 'Failed to update personal information.',
            variant: 'destructive',
            duration: 1000,
          })
        }
      }
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: (error as { detail: string }).detail,
        variant: "destructive",
        duration: 1000,
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <Input {...field} />
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
              <FormLabel>Last Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        /> */}
        <FormField
          control={form.control}
          name="age"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Age</FormLabel>
              <FormControl>
                <Input type="number" min={0} {...field} onChange={e => {
                                        let value = e.target.value;
                                        value = value.toString().replace(/^0+/, '');
                                        field.onChange(value ? parseFloat(value) : 0);
                                    }}
                                    onFocus={(e) => {
                                      let value = e.target.value;
                                      value = value.toString().replace(/^0+/, '');
                                      form.setValue('age', parseInt(value));
                                    }}
                      />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* <FormField
          control={form.control}
          name="avatar"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Avatar</FormLabel>
              <FormControl>
                <div className="flex space-x-2">
                  {avatars.map((avatar) => (
                    <img
                      key={avatar}
                      src={'/avatars/'+avatar}
                      alt="Avatar option"
                      className={`w-12 h-12 rounded-full cursor-pointer border ${field.value === avatar ? 'border-blue-500' : 'border-transparent'}`}
                      onClick={() => field.onChange(avatar)}
                    />
                  ))}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        /> */}
        <FormField
          control={form.control}
          name="avatar"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Avatar</FormLabel>
              <FormControl>
                <div className="flex flex-wrap gap-2">
                  {avatars.map((avatar) => (
                    <Image
                      key={avatar}
                      src={'/avatars/'+avatar}
                      alt="Avatar option"
                      width={48}
                      height={48}
                      className={`rounded-full cursor-pointer border-4 ${field.value === avatar ? 'border-green-500' : 'border-transparent'}`}
                      onClick={() => field.onChange(avatar)}
                    />
                  ))}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="float-right">Update Profile</Button>
      </form>
    </Form>
  );
}