'use client';

import { SessionProvider } from 'next-auth/react';

function Provider({ children, session }: any) {
  return <SessionProvider session={session}>{children}</SessionProvider>;
}

export default Provider;
