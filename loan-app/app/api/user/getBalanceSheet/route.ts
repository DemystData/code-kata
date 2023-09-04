import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  if (!request.headers.get('Content-Type')?.includes('application/json')) {
    return NextResponse.json({ data: 'Missing Content-Type header' }, { status: 400 });
  }
  if (request.method !== 'POST') {
    return NextResponse.json({ data: 'Method not allowed' }, { status: 405 });
  }
  if (!request.body) {
    return NextResponse.json({ data: 'Missing request body' }, { status: 400 });
  }
  const body = await request.json();
  const response = await fetch('https://accounting-server.vercel.app/getBalanceSheet', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  const data = await response.json();

  return NextResponse.json(data);
}
