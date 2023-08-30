"use client"

import React from 'react';
import RequestSheetService from '../service/request-sheet'

async function callAPI(id: any){
    let res=await RequestSheetService.getBalanceSheet({account_provider: id})
    return res
}

async function Review(props: any){
    // console.log("Review: ", props.searchParams)
    let res=await callAPI(props.searchParams.accountProvider)
    console.log(res.data)
    return(
        <div>Review</div>
    )
}

export default Review