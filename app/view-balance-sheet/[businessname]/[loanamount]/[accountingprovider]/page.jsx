"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import BalanceSheet from "@components/BalanceSheet";
import Link from "next/link";

const ViewBalanceSheet = () => {

  const params = useParams();

  const [ balanceSheet, setBalanceSheet ] = useState([]);
  const [ preAssessment, setPreAssesment ] = useState(20);
  const [ isLoading, setIsLoading ] = useState(true);
  const [ preAssessmentLoaded, setPreAssesmentLoaded ] = useState(false);
  const [ yearEndProfit , setYearEndProfit ] = useState();
  const [ noData, setNoData ] = useState(true);

  const requestBalanceSheet = async (e) => {
    const response = await fetch(`/api/getbalancesheet/${params.businessname}/${params.loanamount}/${params.accountingprovider}`);
    const data = await response.json();

    setIsLoading(false);

    if(data != null){
      setNoData(false);
      setBalanceSheet(data);
    }
  }

  const calcPreAssessment = async () => {

    const monthlySheet = balanceSheet.balanceSheet;

    const totalProfitOrLoss = monthlySheet?.map(element => element.profitOrLoss).reduce((a, b) => a + b, 0);
    setYearEndProfit(totalProfitOrLoss);

    const totalAssetValue = monthlySheet?.map(element => element.assetsValue).reduce((a, b) => a + b, 0);
    const averageAssetValue = totalAssetValue / 12;
    
    if(totalProfitOrLoss > 0){
      setPreAssesment(60);
    }
    if(averageAssetValue > params.loanamount){
      setPreAssesment(100);
    }

    setPreAssesmentLoaded(true);
  }

  useEffect(() => {
    requestBalanceSheet();
  }, [])

  useEffect(() => {
    calcPreAssessment();
  }, [balanceSheet])

  return (
    <div>
      {isLoading ? (
        <div>Fetching balance sheet</div>
      ) : (
        <div>
          <div>
            {noData ? (
              <div>
                <div className="w-full text-left">
                  <p>Sorry, we cannot find the balance sheet for the Business Name: <b>{decodeURI(params.businessname)}</b> and Accounting Provider: <b>{decodeURI(params.accountingprovider)}</b></p>
                </div>
                <br/>
                <Link 
                  href="/loan-apply"
                  className="px-5 py-3 text-sm bg-blue-500 rounded-full text-white"
                >
                  Back to Balace Sheet Request
                </Link>
              </div>
            ) : (
              <div>
                <div className="text-center">
                <BalanceSheet 
                  balanceSheet = {balanceSheet}
                />
                </div>
                <div>
                  {preAssessmentLoaded && (
                    <div>
                    <br/>
                    <Link 
                      href={`/decision-engine/${params.businessname}/${yearEndProfit}/${preAssessment}/${params.loanamount}/`}
                      className="px-5 py-3 text-sm bg-blue-500 rounded-full text-white"
                    >
                      Submit Application        
                    </Link>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default ViewBalanceSheet;
