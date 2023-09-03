export const fetchBalanceSheet = async (accountingProvider) => {
  try {
    const url = `http://127.0.0.1:8000/getBalanceSheet/${accountingProvider}/`;
    const response = await fetch(url);
    const responseData = await response.json();
    return responseData[0].balance_sheet;
  } catch (error) {
    console.error("Error occured while fetching balance sheet: ", error);
    return null;
  }
};
