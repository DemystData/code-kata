'use client';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

function ApplicationResult() {
  const router = useRouter();
  const res = typeof window === 'undefined' ? {} : JSON.parse(localStorage.getItem('applicationResult') || '{}');
  const type = typeof window === 'undefined' ? 'success' : res.result.type;
  const data = typeof window === 'undefined' ? 'Application submitted successfully' : res.result.data;
  return (
    <main className="flex min-h-screen flex-col p-6 md:p-12 bg-gradient-to-b from-slate-900 to-slate-800 justify-center lg:items-center">
      <div className="text-white w-full lg:w-[40%]">
        <h1 className="text-white text-3xl md:text-4xl font-semibold gradient-text">Application Result</h1>
        <Alert className="my-6 flex justify-between" variant={type !== 'success' ? 'destructive' : 'success'}>
          <div>
            <AlertTitle className="my-3">{type === 'success' ? 'SUCCESS 🎉' : 'REGRET ❌'}</AlertTitle>
            <AlertDescription className="my-3">{data}</AlertDescription>
          </div>
        </Alert>
        <div className="flex flex-col md:flex-row md:items-center gap-3">
          <Button className="mt-2" onClick={() => router.push('/')}>
            Go to Home
          </Button>
          <Button variant={'outline'} className="md:mt-2" onClick={() => router.push('/user/dashboard')}>
            Go to Dashboard
          </Button>
        </div>
      </div>
    </main>
  );
}

export default ApplicationResult;
