import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import App from "./App";

// Mock the fetch function to simulate API requests
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({}),
  })
);

describe("App component", () => {
  it("renders the component correctly", () => {
    render(<App />);
    const headerElement = screen.getByText("Business Details");
    expect(headerElement).toBeInTheDocument();
  });

  it("handles input changes correctly", () => {
    render(<App />);
    const loanAmountInput = screen.getByLabelText("Loan Amount Requested:");
    const assetValueInput = screen.getByLabelText("Average Asset Value:");
    const accountingProviderSelect = screen.getByLabelText("Accounting Provider:");

    fireEvent.change(loanAmountInput, { target: { value: 1000000 } });
    fireEvent.change(assetValueInput, { target: { value: 1500000 } });
    fireEvent.change(accountingProviderSelect, { target: { value: "MYOB" } });

    expect(loanAmountInput).toHaveValue(1000000);
    expect(assetValueInput).toHaveValue(1500000);
    expect(accountingProviderSelect).toHaveValue("MYOB");
  });

  it("handles balance sheet calculation", async () => {
    // Mock the fetch function to return a balance sheet response
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ assets: 50000, equity: { 2022: 20000, 2021: 10000 } }),
      })
    );

    render(<App />);
    const loanAmountInput = screen.getByLabelText("Loan Amount Requested:");
    const assetValueInput = screen.getByLabelText("Average Asset Value:");
    const balanceSheetButton = screen.getByText("Request Balance Sheet");

    fireEvent.change(loanAmountInput, { target: { value: 500000 } });
    fireEvent.change(assetValueInput, { target: { value: 800000 } });

    fireEvent.click(balanceSheetButton);

    await waitFor(() => {
      expect(screen.getByText("Assets: 50000")).toBeInTheDocument();
      expect(screen.getByText("2022: 20000")).toBeInTheDocument();
      expect(screen.getByText("2021: 10000")).toBeInTheDocument();
    });
  });

  it("handles application submission", async () => {
    // Mock the fetch function to return a pre-assessment response
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ businessDetails: { preAssessment: 75 }, preAssessment: 75 }),
      })
    );

    
  });
});
