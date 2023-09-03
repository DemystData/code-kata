'use client';

import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { ExclamationTriangleIcon } from '@radix-ui/react-icons';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

const formSchema = z.object({
  businessName: z
    .string({ required_error: 'Business name is required' })
    .min(3, { message: 'name must be at least 3 characters' })
    .max(50, { message: 'name must be less than 50 characters' }),
  yearEstablished: z.string({ required_error: 'Year established is required' }),
  businessType: z
    .string({ required_error: 'Business type is required' })
    .min(2, { message: 'Business type must be at least 2 characters' })
    .max(30, { message: 'Business type must be less than 30 characters' }),
  businessAddress: z
    .string({ required_error: 'Business address is required' })
    .min(3, { message: 'Business address must be at least 3 characters' }),
  businessPhone: z
    .string({ required_error: 'Business phone number is required' })
    .regex(/^\d{10}$/, { message: 'Invalid phone number' })
    .min(10, { message: 'Invalid phone number' })
    .max(10, { message: 'Invalid phone number' }),
  businessEmail: z.string({ required_error: 'Business email is required' }).email({ message: 'Invalid email address' }),
  accountProvider: z.string({ required_error: 'Account provider is required' }),
  loanAmount: z.string({ required_error: 'Loan amount is required' }).regex(/^\d{1,10}(\.\d{1,2})?$/, {
    message: 'Invalid loan amount',
  }),
});

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [applicationData, setApplicationData] = useState(JSON.parse(localStorage.getItem('applicationData') || '{}'));
  const [inputDisabled, setInputDisabled] = useState(!!applicationData);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setShowAlert(false);
      setLoading(true);
      setInputDisabled(true);
      const response = await fetch('/api/user/getBalanceSheet', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });
      const json = await response.json();
      if (response.status === 200) {
        setLoading(false);
        setShowAlert(false);
        setInputDisabled(true);
        localStorage.setItem('applicationData', JSON.stringify(json));
      } else {
        setLoading(false);
        setInputDisabled(false);
        setShowAlert(true);
        setAlertType('error');
        setAlertMessage(json.data);
      }
    } catch (error: any) {
      console.log(error);
      setLoading(false);
      setInputDisabled(false);
      setShowAlert(true);
      setAlertType('error');
      setAlertMessage(error.message);
    }
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      businessName: '',
      yearEstablished: undefined,
      businessType: '',
      businessAddress: '',
      businessPhone: '',
      businessEmail: '',
      loanAmount: undefined,
    },
    mode: 'onSubmit',
    shouldFocusError: true,
    criteriaMode: 'firstError',
    shouldUnregister: true,
  });

  return (
    <main className="flex min-h-screen flex-col p-6 md:p-12 bg-gradient-to-b from-slate-900 to-slate-800 justify-center lg:items-center">
      <div className="text-white w-full lg:w-[30%]">
        <h1 className="text-white text-3xl md:text-4xl font-semibold gradient-text">Enter Business Details</h1>
        {showAlert ? (
          alertType === 'error' ? (
            <Alert hidden={!showAlert} className="my-3 flex justify-between" variant="destructive">
              <div>
                <AlertTitle>{alertType.toUpperCase()}</AlertTitle>
                <AlertDescription>{alertMessage}</AlertDescription>
              </div>
              <div className="flex justify-center items-center">
                <ExclamationTriangleIcon className="h-5 w-5" />
              </div>
            </Alert>
          ) : null
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
                  name="businessName"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="label">Business Name</FormLabel>
                      <FormControl>
                        <Input
                          disabled={inputDisabled}
                          className="input"
                          placeholder="Enter your business name"
                          {...field}
                          value={applicationData?.businessName}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name="yearEstablished"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="label">Year Established</FormLabel>
                      <FormControl>
                        <Input
                          disabled={inputDisabled}
                          type="number"
                          min={1900}
                          max={new Date().getFullYear()}
                          step={1}
                          className="input"
                          placeholder="Enter your date of establishment"
                          {...field}
                          value={applicationData?.yearEstablished}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name="businessType"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="label">Business Type</FormLabel>
                      <FormControl>
                        <Input
                          disabled={inputDisabled}
                          className="input"
                          placeholder="Enter your business type"
                          {...field}
                          value={applicationData?.businessType}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name="businessAddress"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="label">Business Address</FormLabel>
                      <FormControl>
                        <Input
                          disabled={inputDisabled}
                          className="input"
                          placeholder="Enter your business address"
                          {...field}
                          value={applicationData?.businessAddress}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name="businessPhone"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="label">Business Phone</FormLabel>
                      <FormControl>
                        <Input
                          disabled={inputDisabled}
                          className="input"
                          placeholder="Enter your business phone number"
                          {...field}
                          value={applicationData?.businessPhone}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name="businessEmail"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="label">Business Email</FormLabel>
                      <FormControl>
                        <Input
                          disabled={inputDisabled}
                          type="email"
                          className="input"
                          placeholder="Enter your business email id"
                          {...field}
                          value={applicationData?.businessEmail}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name="accountProvider"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="label">Account Provider</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        value={applicationData?.accountProvider}
                      >
                        <FormControl>
                          <SelectTrigger disabled={inputDisabled} className="input">
                            <SelectValue placeholder="Select your account provider" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value="myob">MYOB</SelectItem>
                            <SelectItem value="xero">Xero</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name="loanAmount"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="label">Loan Amount (in INR)</FormLabel>
                      <FormControl>
                        <Input
                          disabled={inputDisabled}
                          className="input"
                          placeholder="Enter your required loan amount"
                          {...field}
                          value={applicationData?.loanAmount}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex flex-col md:flex-row md:items-center gap-3">
                <Button
                  disabled={loading}
                  type="submit"
                  className={`${!loading && inputDisabled ? 'hidden' : ''} mt-1`}
                >
                  {loading ? 'Requesting...' : 'Request Balance Sheet'}
                </Button>
                <Link href="/user/applicationReview">
                  <Button className={`${!loading && inputDisabled ? '' : 'hidden'} mt-1`}>Review Application</Button>
                </Link>
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
            </form>
          </Form>
        )}
      </div>
    </main>
  );
}
