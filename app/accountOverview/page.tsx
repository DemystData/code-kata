'use client'
import React from 'react';
import SpanningTable from '../components/balanceSheet';
import { useParams } from 'next/navigation';

export default function SimpleContainer() {
  
  const company  = useParams();
  console.log(company);
  
  return (
    <React.Fragment>
        <SpanningTable company={company} />
    </React.Fragment>
  );
}
