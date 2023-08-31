"use client"

import React from 'react';
import RequestSheetService from '../service/request-sheet'
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from '../components/Navbar.module.css';
import Navbar from '../components/Navbar';
import Swal from 'sweetalert2';

async function callAPI(id: any){
    let res=await RequestSheetService.getBalanceSheet({account_provider: id})
    return res
}

async function Review(props: any){
    let res=await callAPI(props.searchParams.accountProvider)

    const handleSubmit=async ()=>{
        let request: {}={
            business_name: props.searchParams.businessName,
            year: parseInt(props.searchParams.year, 10),
            loan_amount: parseInt(props.searchParams.loanAmount, 10),
            account_provider: parseInt(props.searchParams.accountProvider, 10)
        }
        // console.log(request)
        let res=await RequestSheetService.getDecisionEngineResult(request)
        console.log(res)
        Swal.fire(
            res.data[0]+'% of your loan amount is approved',
            'Amount approved : '+res.data[1],
            'success'
          )
    }

    return(
        <>
            <Navbar/><br/><br/>
            <h3 className="text-center mb-4">Please review the balance sheet and click on submit</h3>
            <br/>
            <div className={styles.centerContainer}>
                <div className={styles.tableContainer}>
                    <table className="table table-striped table-bordered table-hover">
                        <thead>
                            <tr>
                                <th>Year</th>
                                <th>Month</th>
                                <th>Profit/Loss</th>
                                <th>Assets Value</th>
                            </tr>
                        </thead>
                        <tbody>
                            {res.data.map((item: { year: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | React.PromiseLikeOfReactNode | null | undefined; month: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | React.PromiseLikeOfReactNode | null | undefined; profitOrLoss: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | React.PromiseLikeOfReactNode | null | undefined; assetsValue: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | React.PromiseLikeOfReactNode | null | undefined; }, 
                            index: React.Key | null | undefined) => (
                                <tr key={index}>
                                <td>{item.year}</td>
                                <td>{item.month}</td>
                                <td>{item.profitOrLoss}</td>
                                <td>{item.assetsValue}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
        </div>
        <button type="submit" onClick={handleSubmit} className='btn btn-success' style={{marginLeft: '650px', width: '100px'}}>Submit</button>
        <br/>
      </>
    )
}

export default Review