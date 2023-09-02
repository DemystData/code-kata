'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
// import { getServerSession } from 'next-auth';
// import { authOptions } from './api/auth/[...nextauth]/route';

export default function Home() {
  // const session = await getServerSession(authOptions);
  const { data: session, status } = useSession();
  return (
    <main className="flex min-h-screen flex-col p-6 md:p-12 bg-gradient-to-b from-slate-900 to-slate-800 justify-center lg:items-center lg:text-center">
      <div className="text-white w-full lg:w-[50%]">
        <h1 className="text-5xl md:text-6xl font-semibold leading-tight md:leading-tight mb-3 md:mb-6">
          <div className="mb-2 text-xl">Hi {session?.user?.name ? session?.user?.name : 'there'},</div>Welcome to{' '}
          <span className="gradient-text">Loan&#8377;!</span>
        </h1>
        <p className="text-xl font-normal md:text-3xl mb-3 md:mb-6 text-slate-300">
          Say goodbye to loan application rejections.
        </p>
        <p className="text-lg md:text-xl mb-2 font-light text-gray-400">
          Loanr empowers you with smart insights to increase your loan approval chances. Our advanced assessment
          analyzes your business and provides a tailored success prediction for your loan application.
        </p>
        {!session?.user ? (
          <div className="flex flex-row gap-5 lg:items-center lg:justify-center">
            <Link href="/user/login">
              <Button className="mt-6" size="lg">
                Login
              </Button>
            </Link>
            <Link href="/user/register">
              <Button variant="outline" className="mt-6" size="lg">
                Register
              </Button>
            </Link>
          </div>
        ) : (
          <div className="flex flex-row gap-5 lg:items-center lg:justify-center">
            <Link href="/user/dashboard">
              <Button className="mt-6" size="lg">
                Dashboard
              </Button>
            </Link>

            <Button
              variant="outline"
              className="mt-6"
              size="lg"
              onClick={() =>
                signOut({
                  callbackUrl: '/',
                  redirect: false,
                })
              }
            >
              Logout
            </Button>
          </div>
        )}
      </div>
    </main>
  );
}
