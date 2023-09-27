import React, { useState } from "react";
import "./LoanForm.css";
import getBalanceSheet from "../../api/balanceSheet";

const LoanForm = () => {
  const [modal, setModal] = useState(false);
  const [provider, setProvider] = useState("");
  const [accountsData, setAccountsData] = useState([]);
  const [assessmentValue, setAssessmentValue] = useState(0);
  const [final, setFinal] = useState(false);
  const [profitValue, setProfitValue] = useState(0);
  const [assetsValue, setAssetsValue] = useState(0);
  const [submit, setSubmit] = useState(false);
  let profit = 0;
  let assets = 0;
  let n = 0;

  function handleSubmit(){
    setSubmit(true);
  }

  function handleProviderChange(e) {
    setProvider(e.target.value);
  }

  const toggleModal = () => {
    setModal(!modal);
  };

  const toggleFinal = () => {
    setFinal(!final);
  };

  function handleBalanceSheet() {
    getBalanceSheet(provider)
      .then((result) => {
        console.log(result.data);
        setAccountsData([...result.data]);
        setModal(!modal);
      })
      .catch((err) => {
        console.log(err);
        setModal(false);
      });

    accountsData.forEach((data) => {
      console.log(data.profitOrLoss, data.assetsValue);
      profit += parseInt(data.profitOrLoss);
      assets += parseInt(data.assetsValue);
      n++;
    });
    setProfitValue(profit);
    setAssetsValue(assets);
    console.log(assets, profit);
    if (profit > 0 && assets / n > 0) {
      setAssessmentValue(100);
    } else if (profit > 0) {
      setAssessmentValue(60);
    }
    console.log(assessmentValue);
  }

  function handleNext() {
    profit = 0;
    assets = 0;
    n = 0;
    handleBalanceSheet();
    setModal(false);
    setProfitValue(profit);
    setAssetsValue(assets);
    setFinal(true);
  }
  return (
    <div className="cover">
      <h1>Business Loan Application</h1>

      <input type="text" placeholder="BUSINESS NAME" />
      <input type="text" placeholder="BUSINESS TYPE" list="BusinessOptions" />
      <datalist id="BusinessOptions">
        <option value="Edtech" />
        <option value="fintech" />
        <option value="Healthtech" />
        <option value="E-commerce" />
        <option value="Other" />
      </datalist>
      <input type="text" placeholder="BUSINESS TAXID" />
      <input type="number" placeholder="YEAR ESTABLISHED" min="1900" max="2099" step="1" />
      <input type="email" placeholder="BUSINESS EMAIL" />
      <input type="text" placeholder="BUSINESS PHONE NUMBER" />

      <input
        type="text"
        placeholder="ACCOUNTING PROVIDER"
        list="providerList"
        value={provider}
        onChange={handleProviderChange}
      />
      <datalist id="providerList">
        <option value="MYOB" />
        <option value="Xero" />
        <option value="Other" />
      </datalist>
      <input type="number" placeholder="LOAN AMOUNT REQUESTED" />
      <input type="text" placeholder="LOAN PURPOSE" list="purposeList" />
      <datalist id="purposeList">
        <option value="working Capital" />
        <option value="equipment purchase" />
        <option value="Other" />
      </datalist>
      <div className="alt-next-btn">
        <div role="button" onClick={handleBalanceSheet}>
          BALANCE SHEET
        </div>
        <div role="button" onClick={handleNext}>
          NEXT
        </div>
      </div>

      {modal && (
        <div className="modal">
          <div onClick={toggleModal} className="overlay"></div>
          <div className="modal-content">
            <h2>Balance Sheet</h2>
            <table>
              <thead>
                <tr>
                  <th>Year</th>
                  <th>Month</th>
                  <th>Profit or Loss</th>
                  <th>Assets Value</th>
                </tr>
              </thead>
              <tbody>
                {accountsData.map((item, index) => (
                  <tr key={index}>
                    <td>{item.year}</td>
                    <td>{item.month}</td>
                    <td>{item.profitOrLoss}</td>
                    <td>{item.assetsValue}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button className="close-modal" onClick={toggleModal}>
              CLOSE
            </button>
          </div>
        </div>
      )}

      {final && (
        <div className="modal">
          <div onClick={toggleFinal} className="overlay"></div>
          <div className="modal-content">
            <h2>Final Review</h2>
            <p>
              Your Profit Value is {profitValue} and your assets value is {assetsValue}.
              Based on your Data you are eligible for the {assessmentValue}% of your Loan Amount
              Value.
            </p>
            <div role="button" id="submit" onClick={handleSubmit}>Submit</div>
            <button className="close-modal" onClick={toggleFinal}>
              CLOSE
            </button>
          </div>
        </div>
      )}

      {submit && (
        <div className="modal">
          <div onClick={toggleFinal} className="overlay"></div>
          <div className="modal-content">
            <h2>Thanks for Applying for the Loan.</h2>
            <p>Our team will reach out to you shortly.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoanForm;
