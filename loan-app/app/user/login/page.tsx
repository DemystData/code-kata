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
import { signIn } from 'next-auth/react';
import { useSession } from 'next-auth/react';

const formSchema = z.object({
  email: z.string({ required_error: 'Email is required' }).email({ message: 'Invalid email address' }),
  password: z.string({ required_error: 'Password is required' }).min(8, 'Invalid password'),
});

export default function Login() {
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
      const res = await signIn('credentials', {
        ...values,
        redirect: false,
      });
      if (!res?.error) {
        setShowAlert(true);
        setAlertType('success');
        setAlertMessage('Login Successful');
      } else {
        setLoading(false);
        setShowAlert(true);
        setAlertType('error');
        setAlertMessage('Invalid email or password');
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
      email: '',
      password: '',
    },
    mode: 'onSubmit',
    shouldFocusError: true,
    criteriaMode: 'firstError',
    shouldUnregister: true,
  });

  return (
    <main className="flex min-h-screen flex-col p-6 md:p-12 bg-gradient-to-b from-slate-900 to-slate-800 justify-center lg:items-center">
      <div className="text-white w-full lg:w-[30%]">
        <h1 className="text-white text-3xl md:text-4xl font-semibold gradient-text">Login to your account</h1>
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
            </div>
            <div className="flex items-center gap-3">
              <Button disabled={loading} type="submit" className="mt-1">
                {loading ? 'Logging in...' : 'Login'}
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
                href="/user/register"
                className="mt-4 font-light text-slate-300 hover:text-slate-200 text-sm md:text-sm"
              >
                New here? Click here to join now
              </Link>
            </div>
          </form>
        </Form>
      </div>
    </main>
  );
}
