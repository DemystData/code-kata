import React, { useState } from 'react';
import Modal from 'react-modal';

function PreAssessmentForm() {
  // State variables
  const [businessName, setBusinessName] = useState('');
  const [loanAmount, setLoanAmount] = useState('');
  const [accountingProvider, setAccountingProvider] = useState('xero');
  const [preAssessment, setPreAssessment] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [balanceSheetData, setBalanceSheetData] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  // Handle form submission
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      // Prepare request data
      const requestData = {
        name: businessName,
        loanAmount: parseFloat(loanAmount),
        // Add other fields as needed, e.g., accountingProvider
      };

      // Send a POST request to the server
      const response = await fetch('http://localhost:5000/decision', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      if (response.ok) {
        // Handle a successful response
        const data = await response.json();
        setPreAssessment(data.preAssessment);
        setErrorMessage(''); // Clear any previous error message
      } else if (response.status === 400) {
        // Handle a 400 error (Business name not found)
        setPreAssessment(null);
        setErrorMessage('Business name not found in the database.');
      } else {
        console.error('Failed to fetch data from the server');
        setErrorMessage('Failed to fetch data from the server.');
      }
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('An error occurred while processing your request.');
    }
  };

  // Open the modal to get balance sheet data
  const openModal = async () => {
    try {
      // Fetch balance sheet data
      const sheetResponse = await fetch(`http://localhost:5000/get-balance-sheet?businessName=${businessName}`);
      if (sheetResponse.ok) {
        const sheetData = await sheetResponse.json();
        setBalanceSheetData(sheetData);
        setModalIsOpen(true);
      } else {
        console.error('Failed to fetch balance sheet data');
        setBalanceSheetData([]);
        setModalIsOpen(true);
      }
    } catch (error) {
      console.error('Error:', error);
      setBalanceSheetData([]);
      setModalIsOpen(true);
    }
  };

  // Close the modal
  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div className="container mx-auto p-4">
    <h2 className="text-2xl font-semibold">Please fill the below details</h2>
    <form onSubmit={handleFormSubmit} className="mt-4">
      <div className="mb-4">
        <label htmlFor="businessName" className="block font-semibold">Business Name:</label>
        <input
          type="text"
          id="businessName"
          value={businessName}
          onChange={(e) => setBusinessName(e.target.value)}
          required
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="loanAmount" className="block font-semibold">Loan Amount:</label>
        <input
          type="number"
          id="loanAmount"
          value={loanAmount}
          onChange={(e) => setLoanAmount(e.target.value)}
          required
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="accountingProvider" className="block font-semibold">Accounting Provider:</label>
        <select
          id="accountingProvider"
          value={accountingProvider}
          onChange={(e) => setAccountingProvider(e.target.value)}
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
        >
          <option value="xero">Xero</option>
          <option value="myob">MYOB</option>
        </select>
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200"
      >
        Submit
      </button>
      <button
        type="button"
        onClick={openModal}
        className="ml-2 bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 focus:outline-none focus:ring focus:ring-gray-200"
      >
        Get Balance Sheet Data
      </button>
    </form>

      {errorMessage && (
        <div className="error-message">
          <p>{errorMessage}</p>
        </div>
      )}

{preAssessment !== null && !errorMessage && (
  <div className="bg-white p-4 rounded-lg shadow-md mt-4">
    <h3 className="text-xl font-semibold mb-2">PreAssessment Result</h3>
    <div
      className={`bg-gray-100 p-4 rounded-md ${
        preAssessment === 20
          ? 'text-red-500' 
          : preAssessment === 60
          ? 'text-blue-500' 
          : preAssessment === 100
          ? 'text-green-500' 
          : ''
      }`}
    >
      <p className="text-lg font-semibold">
        {`PreAssessment: ${preAssessment}%`}
      </p>
    </div>
  </div>
)}


      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Balance Sheet Data"
      >
        <h2 className="text-2xl font-semibold">Balance Sheet Data</h2>
        {balanceSheetData.length === 0 ? (
          <p>No balance sheet data available.</p>
        ) : (
          <pre>{JSON.stringify(balanceSheetData, null, 2)}</pre>
        )}
        <button className="ml-2 bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 focus:outline-none focus:ring focus:ring-gray-200" onClick={closeModal}>Close</button>
      </Modal>
    </div>
  );
}

export default PreAssessmentForm;
