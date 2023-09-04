"use client"

import Link from "next/link";

const Form = ({ details, setDetails}) => {
  return (
    <section className="w-full max-w-full flex-start flex-col">
      <h1 className="head_text text-left">
        <span className="blue_gradient">Balance Sheet Request</span>
      </h1>
      <p className="desc text-left max-w-md">
        To be approved for a loan, you need to provide your business details.
        Fill out the business details and the accounting provider to get the yearly balance sheet of your business. 
      </p>

      <form
        className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism"
      >
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">Business Name</span>
          <input 
            value={details.businessName}
            onChange={(e) => 
              setDetails({
                ...details,
                businessName: e.target.value
            })}
            placeholder="Enter your business name here"
            required
            className="form_textarea"
          />
        </label>
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">Loan Amount</span>
          <input 
            value={details.loanAmount}
            onChange={(e) => 
              setDetails({
                ...details,
                loanAmount: e.target.value
            })}
            placeholder="Enter the loan amount"
            required
            className="form_textarea"
          />
        </label>
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">Accounting Provider</span>
          <input 
            value={details.accountingProvider}
            onChange={(e) => 
              setDetails({
                ...details,
                accountingProvider: e.target.value
            })}
            placeholder="Enter your accounting provider here"
            required
            className="form_textarea"
          />
        </label>

        <div className="flex-end mx-3 mb-5 gap-4">
          <Link href="/" className="text-grey-500 text-sm">
            Cancel
          </Link>
          <Link
            href={`/view-balance-sheet/${details.businessName}/${details.loanAmount}/${details.accountingProvider}`}
            className="px-5 py-3 text-sm bg-blue-500 rounded-full text-white"
          >
            Request Balance Sheet
          </Link>
        </div>
      </form>
    </section>
  )
}

export default Form;