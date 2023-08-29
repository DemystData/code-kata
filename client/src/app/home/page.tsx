"use client";

import React from 'react';
import Navbar from '../components/Navbar'
import 'bootstrap/dist/css/bootstrap.min.css';
import Link from 'next/link';
import styles from '../components/Navbar.module.css';
import RequestSheetService from '../service/request-sheet'

class BootstrapForm extends React.Component {

  constructor(props: {}){
    super(props)
    this.state={
      name: '',
      business_name: '',
      loan_amount: 0,
      account_provider: ''
    }
    this.changeNameHandler=this.changeNameHandler.bind(this)
    this.changeBusinessNameHandler=this.changeBusinessNameHandler.bind(this)
    this.changeLoanAmountHandler=this.changeLoanAmountHandler.bind(this)
    this.changeAccountProviderHandler=this.changeAccountProviderHandler.bind(this)
  }

  changeNameHandler=(event: React.ChangeEvent<HTMLInputElement>)=>{
    this.setState({name: event.target.value})
  }

  changeBusinessNameHandler=(event: React.ChangeEvent<HTMLInputElement>)=>{
    this.setState({business_name: event.target.value})
  }

  changeLoanAmountHandler=(event: React.ChangeEvent<HTMLInputElement>)=>{
    this.setState({loan_amount: event.target.value})
  }

  changeAccountProviderHandler=(event: React.ChangeEvent<HTMLSelectElement>)=>{
    this.setState({account_provider: event.target.value})
  }

  handleSubmit=()=>{
    let request={ 
      account_provider: this.state.account_provider
    }
    console.log("Request: ", request)
    RequestSheetService.getBalanceSheet(request).then((res: [])=>{
      console.log(res)
    })
  }

  render(){
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
              <input type="text" autoComplete='off' value={this.state.name} onChange={this.changeNameHandler} className="form-control" id="username" required />
            </div>
            <div className="mb-3">
              <label htmlFor="business_name" className="form-label">
                Business Name
              </label>
              <input type="text" autoComplete='off' value={this.state.business_name} onChange={this.changeBusinessNameHandler} className="form-control" id="business_name" required />
            </div>
            <div className="mb-3">
              <label htmlFor="loan_amount" className="form-label">
                Loan Amount
              </label>
              <input type="number" autoComplete='off' value={this.state.loan_amount} onChange={this.changeLoanAmountHandler} className="form-control" id="loan_amount" required />
            </div>
            <div className='mb-3'>
              <label className='form-label'>Account Provider</label>
              <select className="form-select" aria-label="Default select example" value={this.state.account_provider} onChange={this.changeAccountProviderHandler}>
                <option selected>Select</option>
                <option value="1">Xero</option>
                <option value="2">MYOB</option>
              </select>
            </div>
            <button type="submit" className={styles.btn} onClick={this.handleSubmit}>
              <Link href='/review' className={styles.link}>Submit</Link>
            </button>
          </form>
      </div>
    </div>
    </>
  );
};
}

export default BootstrapForm;
