'use client';

import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { ExclamationTriangleIcon } from '@radix-ui/react-icons';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

function ApplicationReview() {
  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const data = typeof window === 'undefined' ? {} : JSON.parse(localStorage.getItem('applicationData') || '{}');

  async function submitApplication() {
    try {
      setShowAlert(false);
      setLoading(true);
      const response = await fetch('/api/user/submitApplication', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      const json = await response.json();
      if (response.status === 200) {
        setLoading(false);
        setShowAlert(false);
        localStorage.setItem('applicationResult', JSON.stringify(json));
        router.push('/user/applicationResult');
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

  const month = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  return (
    <main className="flex min-h-screen flex-col p-6 md:p-12 bg-gradient-to-b from-slate-900 to-slate-800 justify-center lg:items-center">
      <div className="text-white w-full lg:w-[40%]">
        <h1 className="text-white text-3xl md:text-4xl font-semibold gradient-text">Review your application</h1>
        <p className="text-slate-400 text-sm italic mt-2">Please review your application properly before you submit.</p>
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
        <div className="mt-8">
          <h2 className="text-slate-200 text-xl font-semibold">Business Information</h2>
          <div className="mt-4 flex flex-col gap-1">
            <p className="text-white text-sm">
              <span className="text-slate-200 font-semibold">Business Name:</span> {data.businessName}
            </p>
            <p className="text-white text-sm">
              <span className="text-slate-200 font-semibold">Year Established:</span> {data.yearEstablished}{' '}
            </p>
            <p className="text-white text-sm">
              <span className="text-slate-200 font-semibold">Business Type:</span> {data.businessType}
            </p>
            <p className="text-white text-sm">
              <span className="text-slate-200 font-semibold">Business Address:</span> {data.businessAddress}
            </p>
            <p className="text-white text-sm">
              <span className="text-slate-200 font-semibold">Business Phone:</span> {data.businessPhone}
            </p>
            <p className="text-white text-sm">
              <span className="text-slate-200 font-semibold">Business Email:</span> {data.businessEmail}
            </p>
            <p className="text-white text-sm">
              <span className="text-slate-200 font-semibold">Account Provider:</span> {data.accountProvider}
            </p>
            <p className="text-white text-sm">
              <span className="text-slate-200 font-semibold">Loan Amount:</span> {data.loanAmount}
            </p>
          </div>
          <div className="mt-4 flex flex-col gap-1">
            <h2 className="text-slate-200 text-xl font-semibold">Balance Sheet</h2>
            <Table>
              {/* <TableCaption>Balance sheet for {data.businessName}</TableCaption> */}
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Year</TableHead>
                  <TableHead>Month</TableHead>
                  <TableHead>Profit or Loss</TableHead>
                  <TableHead className="text-right">Assets Value</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data?.balanceSheet?.map((data: any) => (
                  <TableRow key={data.assetsValue}>
                    <TableCell className="font-medium">{data.year}</TableCell>
                    <TableCell>{month[data.month - 1]}</TableCell>
                    <TableCell>{data.profitOrLoss}</TableCell>
                    <TableCell className="text-right">{data.assetsValue}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
        <div className="flex flex-col md:flex-row md:items-center gap-3">
          <Button disabled={loading} className="mt-4" onClick={submitApplication}>
            {loading ? 'Submitting...' : 'Submit'}
          </Button>
          <Button
            disabled={loading}
            variant={'outline'}
            className="md:mt-4"
            onClick={() => router.push('/user/dashboard')}
          >
            Go to Dashboard
          </Button>
        </div>
      </div>
    </main>
  );
}

export default ApplicationReview;
