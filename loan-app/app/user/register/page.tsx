'use client';

import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import Link from 'next/link';

const formSchema = z
  .object({
    email: z.string({ required_error: 'Email is required' }).email({ message: 'Invalid email address' }),
    username: z
      .string({ required_error: 'Username is required' })
      .min(2, { message: 'Username must be at least 2 characters' })
      .max(50, { message: 'Username must be less than 50 characters' }),
    password: z
      .string({ required_error: 'Password is required' })
      .regex(new RegExp('.*[A-Z].*'), 'One uppercase character')
      .regex(new RegExp('.*[a-z].*'), 'One lowercase character')
      .regex(new RegExp('.*\\d.*'), 'One number')
      .regex(new RegExp('.*[`~<>?,./!@#$%^&*()\\-_+="\'|{}\\[\\];:\\\\].*'), 'One special character')
      .min(8, 'Must be at least 8 characters in length'),
    confirmPassword: z.string({ required_error: 'Confirm password is required' }),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: 'custom',
        message: 'Passwords do not match',
        path: ['confirmPassword'],
      });
    }
  });

export default function Register() {
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log('submitted');
    console.log(values);
  }
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    mode: 'onBlur',
    shouldFocusError: true,
    criteriaMode: 'firstError',
    shouldUnregister: true,
  });

  return (
    <main className="flex min-h-screen flex-col p-6 md:p-12 bg-gradient-to-b from-slate-900 to-slate-800 justify-center lg:items-center">
      <div className="text-white w-full lg:w-[50%]">
        <h1 className="text-white text-3xl md:text-4xl font-semibold gradient-text">Create your account</h1>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="space-y-5 my-6">
              <FormField
                name="email"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your email address" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="username"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your username" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="password"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="Enter your password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="confirmPassword"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="Confirm your password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div>
              <Button type="submit" className="mt-2">
                Join Now
              </Button>
            </div>
            <div className="mt-2">
              <Link href="/user/login" className="mt-4 underline text-sm md:text-base">
                Already have an account?
              </Link>
            </div>
          </form>
        </Form>
      </div>
    </main>
  );
}
