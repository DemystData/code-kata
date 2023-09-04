import { NextResponse } from 'next/server';

function calculateProfitOrLossSummary(balanceSheet: any) {
  const summary: any = {};
  for (const entry of balanceSheet) {
    const { year, profitOrLoss } = entry;

    if (!summary.hasOwnProperty(year)) {
      summary[year] = profitOrLoss;
    } else {
      summary[year] += profitOrLoss;
    }
  }
  return summary;
}

function calculatePreAssessment(balanceSheet: any, loanAmount: number, summary: any) {
  const currentYear = new Date().getFullYear();
  if (summary[currentYear - 1] > 0) {
    const averageAssetValue = balanceSheet.reduce((total: any, entry: any) => total + entry.assetsValue, 0) / 12;
    return averageAssetValue > loanAmount ? 100 : 60;
  } else {
    return 20;
  }
}

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
  const profitOrLossSummary = calculateProfitOrLossSummary(body.balanceSheet);

  const data = {
    businessDetails: {
      businessName: body.businessName,
      yearEstablished: body.yearEstablished,
      businessType: body.businessType,
      accountProvider: body.accountProvider,
      loanAmount: body.loanAmount,
      profitOrLossSummary,
    },
    preAssessment: calculatePreAssessment(body.balanceSheet, body.loanAmount, profitOrLossSummary),
  };

  const response = await fetch('https://the-decision-engine.vercel.app/getDecision', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  const res = await response.json();

  return NextResponse.json({ result: res, data });
}
