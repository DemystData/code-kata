"use client"

import React from 'react';
import RequestSheetService from '../service/request-sheet'
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from '../components/Navbar.module.css';
import Navbar from '../components/Navbar';

async function callAPI(id: any){
    let res=await RequestSheetService.getBalanceSheet({account_provider: id})
    return res
}

async function Review(props: any){
    // console.log("Review: ", props.searchParams)
    let res=await callAPI(props.searchParams.accountProvider)
    // console.log(res.data)
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
        
      </>
    )
}

export default Review

// table-striped table-bordered table-hover