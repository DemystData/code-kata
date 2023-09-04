import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import React from 'react';


export default function DecisionEngineButton({name, year, profitOrLoss, preAssessment, setIsButtonClicked} : any) {
    const handleClick = async (e: any) => {
        e.preventDefault();
    
        let companyDetails = {
          name: name,
          year: year,
          profitOrLoss: profitOrLoss,
          preAssessment: preAssessment
        };
    
        try {
          let response = await fetch("/api/decisionEngine", {
            method: "POST",
            body: JSON.stringify(companyDetails),
          });
          let data = await response.json();

          if (data.error) {
            alert(data.error);
            return;
          }

          setIsButtonClicked(true);
        } catch (error: any) {
          console.log(error);
          alert(error.message);
        }
      };

    return (
        <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleClick}>
            Apply For Loan
        </Button>
    </Box>
  )
}

