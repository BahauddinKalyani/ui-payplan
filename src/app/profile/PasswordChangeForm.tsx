"use client";

import { useForm } from 'react-hook-form';
import { useState } from 'react';
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
import { Alert, AlertDescription } from "@/components/ui/alert";
import { authAPI } from '@/api/authAPI';

const passwordSchema = z.object({
  currentPassword: z.string()
  .min(8, "Password must be at least 8 characters long")
  .regex(/[0-9]/, "Password must contain at least one number")
  .regex(/[!@#$%^&*(),.?":{}|<>]/, "Password must contain at least one special character")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  .regex(/[a-z]/, "Password must contain at least one lowercase letter"),
  newPassword: z.string()
  .min(8, "Password must be at least 8 characters long")
  .regex(/[0-9]/, "Password must contain at least one number")
  .regex(/[!@#$%^&*(),.?":{}|<>]/, "Password must contain at least one special character")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  .regex(/[a-z]/, "Password must contain at least one lowercase letter"),
  confirmPassword: z.string()
  .min(8, "Password must be at least 8 characters long")
  .regex(/[0-9]/, "Password must contain at least one number")
  .regex(/[!@#$%^&*(),.?":{}|<>]/, "Password must contain at least one special character")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  .regex(/[a-z]/, "Password must contain at least one lowercase letter"),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export function PasswordChangeForm() {
  const { toast } = useToast();
  const [showPasswordRequirements, setShowPasswordRequirements] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const form = useForm<z.infer<typeof passwordSchema>>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (data: z.infer<typeof passwordSchema>) => {
    try {
      console.log('Password changed:', data);
      const username = localStorage.getItem('username');
      const response = await authAPI.change_password(username, data);
      if (response.status === 200) {
        toast({
          title: "Success",
          description: "Your password has been changed.",
          variant: "success",
          duration: 1000,
        });
      }
      
    } catch (error) {
      console.log(error);
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
          name="currentPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Current Password</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="newPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>New Password</FormLabel>
              <FormControl>
                <Input type="password" {...field}
                onFocus={() => setShowPasswordRequirements(true)} onChange={(e) => {
                  field.onChange(e.target.value);
                  setNewPassword(e.target.value);
                }} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {showPasswordRequirements && (
                  <Alert className="mt-2">
                      <AlertDescription>
                          Password must:
                          <ul className="list-disc pl-5 mt-2">
                              <li className={newPassword?.length >= 8 ? 'text-green-500' : ''}>Be at least 8 characters long</li>
                              <li className={/[0-9]/.test(newPassword || '') ? 'text-green-500' : ''}>Contain at least one number</li>
                              <li className={/[!@#$%^&*(),.?":{}|<>]/.test(newPassword || '') ? 'text-green-500' : ''}>Contain at least one special character</li>
                              <li className={/[A-Z]/.test(newPassword || '') ? 'text-green-500' : ''}>Contain at least one uppercase letter</li>
                              <li className={/[a-z]/.test(newPassword || '') ? 'text-green-500' : ''}>Contain at least one lowercase letter</li>
                          </ul>
                      </AlertDescription>
                  </Alert>
                )}
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm New Password</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="float-right">Change Password</Button>
      </form>
    </Form>
  );
}