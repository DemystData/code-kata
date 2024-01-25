/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { API } from "aws-amplify";
import { onError } from "../lib/errorLib";
import Form from "react-bootstrap/Form";
import Stack from "react-bootstrap/Stack";
import { useFormFields } from "../lib/hooksLib";
import LoaderButton from "../components/LoaderButton";
import RotatingSpinner from "../components/RotatingSpinner";
import "./LoanApplicationForm.css";
interface Loan {
  businessName: string;
  amount: string;
  accountingProvider: string;
}
export default function LoanApplicationForm() {
  const [fields, handleFieldChange] = useFormFields({
    businessName: "",
    amount: "",
    accountingProvider: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [loader, setLoader] = useState(true);
  const { id } = useParams();
  useEffect(() => {
    const abortController = new AbortController();

    const fetchData = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/loan/${id}`,
          { signal: abortController.signal }
        );
        const loanData = await response.json();
        if (loanData.assets.length>0)
          return (window.location.href = `/${id}`);
          setLoader(false);
      } catch (e) {
        onError(e);
      } 
    };

    fetchData();

    return () => {
      abortController.abort();
    };
  }, []);
  function createLoan(loan: Loan) {
    return API.post("loan", `/loan/${id}`, {
      body: loan,
    });
  }

  function validateForm() {
    return (
      fields.businessName.trim().length > 0 &&
      fields.amount.trim().length > 0 &&
      (fields.accountingProvider === "XERO" ||
        fields.accountingProvider === "MYOB")
    );
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    try {
      // @ts-ignore
      await createLoan(fields);
      window.location.href=`/${id}`
      setIsLoading(false);
    } catch (e) {
      onError(e);
      setIsLoading(false);
    }
  }

  function renderForm() {
    return (
      <>
        <div className="icon-container">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path d="M8.277.084a.5.5 0 0 0-.554 0l-7.5 5A.5.5 0 0 0 .5 6h1.875v7H1.5a.5.5 0 0 0 0 1h13a.5.5 0 1 0 0-1h-.875V6H15.5a.5.5 0 0 0 .277-.916zM12.375 6v7h-1.25V6zm-2.5 0v7h-1.25V6zm-2.5 0v7h-1.25V6zm-2.5 0v7h-1.25V6zM8 4a1 1 0 1 1 0-2 1 1 0 0 1 0 2M.5 15a.5.5 0 0 0 0 1h15a.5.5 0 1 0 0-1z" />
          </svg>
          <p>Loan Application Form</p>
        </div>
        <Form onSubmit={handleSubmit}>
          <Stack gap={3}>
            <Form.Group controlId="businessName">
              <Form.Label>Business Name: </Form.Label>
              <Form.Control
                size="lg"
                autoFocus
                type="text"
                placeholder="Enter business Name"
                value={fields.businessName}
                onChange={handleFieldChange}
              />
            </Form.Group>
            <Form.Group controlId="amount">
              <Form.Label>Loan Amount: </Form.Label>
              <Form.Control
                size="lg"
                type="number"
                placeholder="Enter loan Amount"
                value={fields.amount}
                onChange={handleFieldChange}
              />
            </Form.Group>
            <Form.Group controlId="accountingProvider">
              <Form.Select
                onChange={handleFieldChange}
                aria-label="Default select example"
              >
                <option>Acounting Provider</option>
                <option value="XERO">XERO</option>
                <option value="MYOB">MYOB</option>
              </Form.Select>
            </Form.Group>
            <LoaderButton
              size="lg"
              type="submit"
              variant="success"
              isLoading={isLoading}
              disabled={!validateForm()}
              className="true"
            >
              Fetch Balance Sheet
            </LoaderButton>
          </Stack>
        </Form>
      </>
    );
  }

  return (
    <>
      {loader ? (
        <RotatingSpinner/>
      ) : (
        <div className="loanForm">{renderForm()}</div>
      )}
    </>
  );
}
