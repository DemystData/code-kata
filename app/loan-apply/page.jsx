"use client"

import { useState } from 'react';

import Form from '@components/Form';

const ApplyLoan = () => {

  const [details, setDetails] = useState({
    bussinessName: "",
    loanAmount: "",
    accountingProvider: ""
  })

  return (
    <Form 
        details={details}
        setDetails={setDetails}
    />
  )
}

export default ApplyLoan;