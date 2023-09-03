interface fetchOutcomeArgs {
  buisnessName: string;
  loanAmount: number;
  netProfitLossLastYear: number;
  averageAssetValueLastYear: number;
}

export const fetchOutcome = async ({
  buisnessName,
  loanAmount,
  netProfitLossLastYear,
  averageAssetValueLastYear,
}: fetchOutcomeArgs) => {
  const data = {
    buisness_name: buisnessName,
    loan_amount: loanAmount,
    last_year_profit_loss: netProfitLossLastYear,
    last_year_avg_assets: averageAssetValueLastYear,
  };
  try {
    const fetchOutcomeAssessment = await fetch(
      "http://127.0.0.1:8000/getOutcomeFor/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    const outcomeResponse = await fetchOutcomeAssessment.json();
    if (outcomeResponse.preAssessmentValue)
      return outcomeResponse.preAssessmentValue;
    else throw new Error("Server error, please try again!");
  } catch (error) {
    console.error("Error in calculating pre-assessment: ", error);
  }
};
