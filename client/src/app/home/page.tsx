"use client";

import React from 'react';
import Navbar from '../components/Navbar'
import 'bootstrap/dist/css/bootstrap.min.css';
import Link from 'next/link';
import styles from '../components/Navbar.module.css';

const BootstrapForm = () => {

  const handleSubmit=()=>{
    console.log('in handle submit')
  }

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
              <input type="text" className="form-control" id="username" />
            </div>
            <div className='mb-3'>
              <label className='form-label'>Account Provider</label>
              <select className="form-select" aria-label="Default select example">
                <option selected>Select</option>
                <option value="1">Xero</option>
                <option value="2">MYOB</option>
              </select>
            </div>
            <button type="submit" className={styles.btn} onClick={handleSubmit}>
              <Link href='/review' className={styles.link}>Submit</Link>
            </button>
          </form>
      </div>
    </div>
    </>
  );
};

export default BootstrapForm;
