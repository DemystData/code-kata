"use client";

import React, { useState } from 'react';
import Navbar from '../components/Navbar'
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from '../components/Navbar.module.css';
import Link from 'next/link';

export default function BootstrapForm() {
  const [name, setName] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [loanAmount, setLoanAmount] = useState(0);
  const [accountProvider, setAccountProvider] = useState('');
  
  const changeNameHandler = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setName(event.target.value);
  };

  const changeBusinessNameHandler = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setBusinessName(event.target.value);
  };

  const changeLoanAmountHandler = (event: any) => {
    setLoanAmount(event.target.value);
  };

  const changeAccountProviderHandler = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setAccountProvider(event.target.value);
  };

  return (
    <>
      <Navbar/>
      <div className="container mt-5 d-flex justify-content-center"> 
        <div className="col-md-6"> 
          <h3 className="text-center mb-4">Please fill the below form</h3> 
          <form>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input type="text" required autoComplete='off' value={name} 
              onChange={changeNameHandler} className={`form-control ${name === '' ? 'is-invalid' : ''}`}
               id="username" />
               {name === '' && <div className="invalid-feedback">Name is required</div>}
            </div>
            <div className="mb-3">
              <label htmlFor="business_name" className="form-label">
                Business Name
              </label>
              <input type="text" required autoComplete='off' value={businessName} 
              onChange={changeBusinessNameHandler} className={`form-control ${businessName === '' ? 'is-invalid' : ''}`} 
              id="business_name" />
              {businessName === '' && <div className="invalid-feedback">Business Name is required</div>}
            </div>
            <div className="mb-3">
              <label htmlFor="loan_amount" className="form-label">
                Loan Amount
              </label>
              <input type="number" required autoComplete='off' value={loanAmount} 
              onChange={changeLoanAmountHandler} className={`form-control ${loanAmount === 0 ? 'is-invalid' : ''}`} 
              id="loan_amount" />
              {loanAmount === 0 && <div className="invalid-feedback">Loan Amount is required</div>}
            </div>
            <div className='mb-3'>
              <label className='form-label'>Account Provider</label>
              <select className="form-select" aria-label="Default select example" value={accountProvider} onChange={changeAccountProviderHandler}>
                <option selected>Select</option>
                <option value="1">Xero</option>
                <option value="2">MYOB</option>
              </select>
            </div>
            <div className={styles.btn}>
              <button type="submit" className='btn btn-success'>
                  <Link href={{
                    pathname: '/review',
                    query: {
                      name: name,
                      businessName: businessName,
                      loanAmount: loanAmount,
                      accountProvider: accountProvider
                    }}} style={{textDecoration: 'none', color: 'white'}}>Submit</Link>
              </button>
              <button type='reset' className='btn btn-secondary'>Reset</button>
            </div>
          </form>
      </div>
    </div>
    </>
  );
};