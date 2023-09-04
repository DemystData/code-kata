"use client"

import Link from "next/link";
import { useParams } from "next/navigation"

const DecisionEngine = () => {
  
  const params = useParams();
  const approvedValue = (params.loanamount) * (params.preassessment / 100);

  const businessName = decodeURI(params.businessname);

  return (
    <div>
        <div>
            <h1 className="head_text text-center">
                <span className="blue_gradient text-center">
                    Congratulations!
                </span>
            </h1>
            <br/>
            <p>
                Here is a quick summary of your application: 
            </p>
            <br/>
            <table className="text-center">
	            <tbody>
		            <tr className="font-bold bg-yellow-300">
			            <td>Business Name</td>
			            <td>Total Profit / Loss</td>
			            <td>Loan Amount Requested</td>
			            <td>Pre-Approved %</td>
                        <td>Pre-Approved Amount</td>
		            </tr>
		            <tr>
			            <td>{businessName}</td>
			            <td>{params.profitorloss}</td>
			            <td>{params.loanamount}</td>
			            <td>{params.preassessment}%</td>
                        <td>{approvedValue}</td>
		            </tr>
	            </tbody>
            </table>
            <br/>
            <p className="w-full text-left">
                The rest of the details have been sent for further processing. You will recieve your final loan approval shortly. Thank you for doing business with Loan Shark and we hope that it was a pleasant experience!
            </p>
            <br/>
            <Link href="/" className="px-5 py-3 text-sm bg-blue-500 rounded-full text-white">
                Go to Homepage
            </Link>
        </div>
    </div>
  )
}

export default DecisionEngine