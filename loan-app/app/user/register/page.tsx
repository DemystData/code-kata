'use client';

import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { ExclamationTriangleIcon } from '@radix-ui/react-icons';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useSession } from 'next-auth/react';

const formSchema = z
  .object({
    name: z
      .string({ required_error: 'name is required' })
      .min(3, { message: 'name must be at least 3 characters' })
      .max(50, { message: 'name must be less than 50 characters' }),
    email: z.string({ required_error: 'Email is required' }).email({ message: 'Invalid email address' }),
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
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === 'authenticated') {
    router.push('/');
  }

  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [loading, setLoading] = useState(false);
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setShowAlert(false);
      setLoading(true);
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });
      const json = await response.json();
      if (response.status === 200) {
        setShowAlert(true);
        setAlertType('success');
        setAlertMessage('You have successfully registered. Redirecting to login page automatically.');
        setTimeout(() => {
          router.push('/user/login');
        }, 5000);
      } else {
        setLoading(false);
        setShowAlert(true);
        setAlertType('error');
        setAlertMessage(json.data);
      }
    } catch (error: any) {
      console.log(error);
      setLoading(false);
      setShowAlert(true);
      setAlertType('error');
      setAlertMessage(error.message);
    }
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
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
      <div className="text-white w-full lg:w-[40%]">
        <h1 className="text-white text-3xl md:text-4xl font-semibold gradient-text">Create your account</h1>
        {alertType === 'error' ? (
          <Alert hidden={!showAlert} className="my-3 flex justify-between" variant="destructive">
            <div>
              <AlertTitle>{alertType.toUpperCase()}</AlertTitle>
              <AlertDescription>{alertMessage}</AlertDescription>
            </div>
            <div className="flex justify-center items-center">
              <ExclamationTriangleIcon className="h-5 w-5" />
            </div>
          </Alert>
        ) : null}
        {alertType === 'success' ? (
          <>
            <Alert hidden={!showAlert} className="my-3" variant="success">
              <AlertTitle>{alertType.toUpperCase()}</AlertTitle>
              <AlertDescription>{alertMessage}</AlertDescription>
            </Alert>
          </>
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="space-y-5 my-3">
                <FormField
                  name="name"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="label">Name</FormLabel>
                      <FormControl>
                        <Input className="input" placeholder="Enter your name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
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
              <div className="flex items-center gap-3">
                <Button disabled={loading} type="submit" className="mt-1">
                  {loading ? 'Registering...' : 'Join Now'}
                </Button>
                <Button
                  disabled={loading}
                  variant={'outline'}
                  className="mt-1"
                  onClick={(e) => {
                    e.preventDefault();
                    router.push('/');
                  }}
                >
                  Back to Home
                </Button>
              </div>
              <div className="mt-2">
                <Link
                  aria-disabled
                  href="/user/login"
                  className="mt-4 font-light text-slate-300 hover:text-slate-200 text-sm md:text-sm"
                >
                  Already have an account? Click here
                </Link>
              </div>
            </form>
          </Form>
        )}
      </div>
    </main>
  );
}
