/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API } from "aws-amplify";
import { Button, Modal } from "react-bootstrap";
//@ts-ignore
import BootstrapTable from "react-bootstrap-table-next";
import { onError } from "../lib/errorLib.ts";
import { calculatePercentage } from "../lib/calculatePercentage.ts";
import LoaderButton from "../components/LoaderButton.tsx";
import RotatingSpinner from "../components/RotatingSpinner.tsx";
import MYSVG from "../components/Svg.tsx";

const columns = [
  {
    dataField: "year",
    text: "Year",
  },
  {
    dataField: "month",
    text: "Month",
  },
  {
    dataField: "profitOrLoss",
    text: "Profit/Loss",
  },
  {
    dataField: "assetValue",
    text: "AssetValue",
  },
];
interface Loan {
  businessName: string;
  amount: string;
  accountingProvider: string;
}
interface loanAmount {
  amount: string;
  approvedPercentage: string;
  status: string;
}

interface LoanData {
  accountingProvider: string;
  assets: Loan[];
  totalAssetValue: string;
  totalProfileOrLoss: string;
  hasLoan: boolean;
  id: string;
  loan: loanAmount;
}

const initialLoan: Loan = {
  businessName: "",
  amount: "",
  accountingProvider: "",
};

const initialLoanData: LoanData = {
  accountingProvider: "",
  assets: [initialLoan],
  totalAssetValue: "",
  totalProfileOrLoss: "",
  hasLoan: false,
  id: "",
  loan: { amount: "", approvedPercentage: "", status: "" },
};
const Home = () => {
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadData, setLoadData] = useState(true);
  const [loanData, setLoanData] = useState<LoanData>(initialLoanData);
  const { id } = useParams();

  useEffect(() => {
    const abortController = new AbortController();

    const fetchData = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/loan/${id}`,
          { signal: abortController.signal }
        );
        const loanData: LoanData = await response.json();
        setLoanData(loanData);
        if (loanData.assets.length === 0)
          return (window.location.href = `/loan-app-form/${id}`);
        setLoadData(false);
      } catch (e) {
        onError(e);
      }
    };

    fetchData();

    return () => {
      abortController.abort();
    };
  }, []);

  const handleShow = () => {
    try {
      API.put("loan", `/loan/${id}`, {});
      setShowModal(true);
      setIsLoading(false);
    } catch (e) {
      onError(e);
      setIsLoading(false);
    }
  };
  const handleClose = () => {
    window.location.reload();
    setShowModal(false);
  };

  return (
    <>
      {loadData ? (
        <RotatingSpinner />
      ) : (
        <>
          {loanData.hasLoan === false ? (
            <>
              <>
                <div className="container">
                  <div className="row">
                    <div className="col text-center col my-4">
                      <MYSVG
                        MYOB={
                          loanData.accountingProvider === "MYOB" ? true : false
                        }
                      ></MYSVG>
                      <h1>Balance Sheet Review</h1>
                    </div>
                  </div>
                </div>
                {isLoading && <h1>Loading</h1>}
                <BootstrapTable
                  keyField="id"
                  data={loanData.assets}
                  columns={columns}
                  striped
                  hover
                  condensed
                />
              </>

              <h4>Total Profit/Loss :{loanData.totalProfileOrLoss}</h4>

              <h4>Total Asset Value :{loanData.totalAssetValue}</h4>

              <div className="container">
                <div className="row">
                  <div className="col text-center">
                    <LoaderButton size="lg" type="submit" onClick={handleShow}>
                      Apply For Loan
                    </LoaderButton>
                  </div>
                </div>
              </div>
              <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Loan Status</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  Loan status Received click submit and view the result
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>
                    Submit
                  </Button>
                </Modal.Footer>
              </Modal>
            </>
          ) : (
            <>
              {loanData.loan?.approvedPercentage === "100%" && (
                <div className=" vh-100 d-flex justify-content-center align-items-center">
                  <h1 className="customColor text-center">
                    You requested loan amount {loanData.loan.amount} got
                    sanctioned
                  </h1>
                </div>
              )}
              {loanData.loan?.approvedPercentage === "60%" && (
                <div className=" vh-100 d-flex justify-content-center align-items-center">
                  <h1 className="customColor text-center">
                    You have requested loan for about
                    {loanData.loan.amount} of which finally this amount
                    {calculatePercentage(loanData.loan.amount, 60)} got
                    sanctioned
                  </h1>
                </div>
              )}
              {loanData.loan?.approvedPercentage === "20%" && (
                <div className=" vh-100 d-flex justify-content-center align-items-center">
                  <h1 className="customColor text-center">
                    You have requested loan for about
                    {loanData.loan.amount} of which finally this amount
                    {calculatePercentage(loanData.loan.amount, 20)} got
                    sanctioned
                  </h1>
                </div>
              )}
            </>
          )}
        </>
      )}
    </>
  );
};

export default Home;
