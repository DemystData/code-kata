'use client';

import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const formSchema = z
  .object({
    email: z.string({ required_error: 'Email is required' }).email({ message: 'Invalid email address' }),
    username: z
      .string({ required_error: 'Username is required' })
      .min(4, { message: 'Username must be at least 4 characters' })
      .max(50, { message: 'Username must be less than 50 characters' }),
    password: z
      .string({ required_error: 'Password is required' })
      .min(8, 'Must be at least 8 characters in length')
      .regex(/.*[A-Z].*/, 'One uppercase character')
      .regex(/.*[a-z].*/, 'One lowercase character')
      .regex(/.*\d.*/, 'One number')
      .regex(/.*[`~<>?,./!@#$%^&*()\-_+="'|{}[\];:\\].*/, 'One special character'),
    confirmPassword: z
      .string({ required_error: 'Confirm password is required' })
      .min(8, { message: 'Passwords do not match' }),
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
  const router = useRouter();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const response = await fetch('/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ values }),
    });
    const userinfo = await response.json();
    console.log(userinfo);
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    mode: 'onSubmit',
    shouldFocusError: true,
    criteriaMode: 'firstError',
    shouldUnregister: true,
  });

  return (
    <main className="flex min-h-screen flex-col p-6 md:p-12 bg-gradient-to-b from-slate-900 to-slate-800 justify-center lg:items-center">
      <div className="text-white w-full lg:w-[30%]">
        <h1 className="text-white text-3xl md:text-4xl font-semibold gradient-text">Create your account</h1>
        <Alert className="my-3" variant="success">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>Your session has expired. Please log in again.</AlertDescription>
        </Alert>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="space-y-5 my-3">
              <FormField
                name="email"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="label">Email</FormLabel>
                    <FormControl>
                      <Input className="input" placeholder="Enter your email address" {...field} />
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
                    <FormLabel className="label">Username</FormLabel>
                    <FormControl>
                      <Input className="input" placeholder="Enter your username" {...field} />
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
                    <FormLabel className="label">Password</FormLabel>
                    <FormControl>
                      <Input className="input" type="password" placeholder="Enter your password" {...field} />
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
                    <FormLabel className="label">Confirm Password</FormLabel>
                    <FormControl>
                      <Input className="input" type="password" placeholder="Confirm your password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div>
              <Button type="submit" className="mt-1">
                Join Now
              </Button>
            </div>
            <div className="mt-2">
              <Link
                href="/user/login"
                className="mt-4 font-light text-slate-300 hover:text-slate-200 text-sm md:text-sm"
              >
                Already have an account? Click here
              </Link>
            </div>
          </form>
        </Form>
      </div>
    </main>
  );
}
