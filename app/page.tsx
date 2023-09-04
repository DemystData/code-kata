"use client";
import React, { useState, useEffect } from "react";
import Typography from '@mui/material/Typography';
import Form from "./components/form";
import SpanningTable from "./components/balanceSheet";
import DecisionEngineButton from './components/decisionEngineButton';
import  Alert  from '@mui/material/Alert';

const Page = () => {
  const [balanceSheets, setBalanceSheets] = useState([]);
  const [companyDetails, setCompanyDetails] = useState<any>({});
  const [preAssessment, setPreAssessment] = useState(20);
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const [profit, setProfit] = useState(0);

  function Copyright(props: any) {
    return (
      <Typography
        variant="body2"
        color="text.secondary"
        align="center"
        {...props}
      >
        {"Copyright © "}
          Loan Application Manager 
        {" "}{new Date().getFullYear()}
        {"."}
      </Typography>
    );
  }

  useEffect(() => {
    if (balanceSheets.length === 0) return;

    let first12Objects = balanceSheets.slice(0, 12);
    // Calculate total profitOrLoss and avg Asset Value
    const totalProfitOrLoss = first12Objects.reduce(
      (acc: any, obj: any) => acc + obj.profitOrLoss,
      0
    );
    setProfit(totalProfitOrLoss);

    const totalAssestsValue = first12Objects.reduce(
      (acc: any, obj: any) => acc + obj.assetsValue,
      0
    );
    const averageAssetsValue = totalAssestsValue / first12Objects.length;

    if (totalProfitOrLoss > 0) {
      setPreAssessment(60);
    }
    if (averageAssetsValue > companyDetails?.loan) {
      setPreAssessment(100);
    }
  }, [balanceSheets]);

  

  return (
    <div>
      {balanceSheets.length == 0 &&
        (<Form
        setBalanceSheets={setBalanceSheets} setCompanyDetails={setCompanyDetails}
        />
      )}     
      {balanceSheets.length > 0 && (
        <SpanningTable company={companyDetails?.company} balanceSheet={balanceSheets} provider={companyDetails?.provider} />
      )}
      {balanceSheets.length > 0 && (
        <div className="py-4 px-10 text-2xl bg-gray-300 rounded-md" style={{marginTop: "30px"}}>
          <h1 className="font-bold" style={{textAlign: "center"}}>Pre-Assesment: {preAssessment} </h1>
        </div>
      )}
      {balanceSheets.length > 0 && !isButtonClicked && (
          <DecisionEngineButton name={companyDetails?.company} year={companyDetails?.year} 
            profitOrLoss={profit} preAssessment={preAssessment} setIsButtonClicked={setIsButtonClicked} />
      )}
      {isButtonClicked && (
          <Alert severity="success">
            You have succesfully applied for a Loan.
            We will get back to you soon!
          </Alert>
      )}
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </div>
  );
};
export default Page;
