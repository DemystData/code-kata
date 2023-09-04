const BalanceSheet = ({ balanceSheet }) => {

  const monthlySheet = balanceSheet.balanceSheet;
  const [month1, month2, month3, month4, month5, month6, month7, month8, month9, month10, month11, month12] = monthlySheet;

  return (
    <div>
        <div className="w-full max-w-full flex-start flex-col text-center">
            <p>Here's a summary of your business: <b>{balanceSheet.businessName}</b></p>
            <p>Balance sheet of your business as provided by your accounting provider: <b>{balanceSheet.accountingProvider}</b></p>
            <br/>
        </div>
        <div>
        <table>
	        <tbody>
		        <tr>
			        <td colspan="3" className="bg-yellow-300 "><b>Balance Sheet</b></td>
		        </tr>
		        <tr className="bg-blue-300">
			        <td>Month</td>
			        <td>Profit / Loss</td>
			        <td>Asset Value</td>
		        </tr>
		        <tr>
			        <td>December</td>
			        <td>{month12.profitOrLoss}</td>
			        <td>{month12.assetsValue}</td>
		        </tr>
		        <tr>
			        <td>November</td>
			        <td>{month11.profitOrLoss}</td>
			        <td>{month11.assetsValue}</td>
		        </tr>
		        <tr>
			        <td>October</td>
			        <td>{month10.profitOrLoss}</td>
			        <td>{month10.assetsValue}</td>
		        </tr>
		        <tr>
			        <td>September</td>
			        <td>{month9.profitOrLoss}</td>
			        <td>{month9.assetsValue}</td>
		        </tr>
		        <tr>
			        <td>August</td>
			        <td>{month8.profitOrLoss}</td>
			        <td>{month8.assetsValue}</td>
		        </tr>
		        <tr>
			        <td>July</td>
			        <td>{month7.profitOrLoss}</td>
			        <td>{month7.assetsValue}</td>
		        </tr>
		        <tr>
			        <td>June</td>
			        <td>{month6.profitOrLoss}</td>
			        <td>{month6.assetsValue}</td>
		        </tr>
		        <tr>
			        <td>May</td>
			        <td>{month5.profitOrLoss}</td>
			        <td>{month5.assetsValue}</td>
		        </tr>
		        <tr>
			        <td>April</td>
			        <td>{month4.profitOrLoss}</td>
			        <td>{month4.assetsValue}</td>
		        </tr>
		        <tr>
			        <td>March</td>
			        <td>{month3.profitOrLoss}</td>
			        <td>{month3.assetsValue}</td>
		        </tr>
		        <tr>
			        <td>February</td>
			        <td>{month2.profitOrLoss}</td>
			        <td>{month2.assetsValue}</td>
		        </tr>
		        <tr>
			        <td>January</td>
			        <td>{month1.profitOrLoss}</td>
			        <td>{month1.assetsValue}</td>
		        </tr>
	        </tbody>
        </table> 
        </div>
    </div>
  )
}

export default BalanceSheet;
