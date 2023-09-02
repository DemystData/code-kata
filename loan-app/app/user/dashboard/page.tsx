'use client';

import { useSession } from 'next-auth/react';

function Dashboard() {
  const { data: session, status } = useSession();
  console.log(session);

  return <div>Dashboard</div>;
}

export default Dashboard;
