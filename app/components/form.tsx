"use client";
import React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useState } from "react";

const defaultTheme = createTheme();
interface FormProps {
  setBalanceSheets: any;
  setCompanyDetails: any;
}

export default function Form({setBalanceSheets, setCompanyDetails}: FormProps) {
  const [company, setCompany] = useState("");
  const [year, setYear] = useState(0);
  const [provider, setProvider] = useState("");
  const [loan, setLoan] = useState(0);

  const submitHandler = async (e: any) => {
    e.preventDefault();
    if (company == "" || year == 0 || !provider || loan == 0) {
      alert("Please enssure all fields are entered");
      return;
    }

    let companyDetails = {
      company: company,
      year: year,
      provider: provider,
      loan: loan,
    };

    try {
      let response = await fetch("/api/balanceSheets", {
        method: "POST",
        body: JSON.stringify(companyDetails),
      });
      let data = await response.json();

      if (data.error) {
        alert(data.error);
        return;
      }
      setCompanyDetails(companyDetails);
      setBalanceSheets(data?.balanceSheet.sheet);
    } catch (error: any) {
      console.log(error);
      alert(error.message);
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <AccountBalanceIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Apply for Loan
          </Typography>
          <Box component="form" noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="company"
              label="Company Name"
              className="company"
              value={company}
              onChange={(e) => setCompany(e.target.value as string)}
              autoComplete="name"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="Year Established"
              label="Year Established"
              type="number"
              id="Year Established"
              value={year}
              onChange={(e) => setYear(e.target.value as unknown as number)}
              autoComplete="Year Established"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="Loan Amount"
              label="Loan Amount"
              type="number"
              id="Loan Amount"
              value={loan}
              onChange={(e) => setLoan(e.target.value as unknown as number)}
              autoComplete="Year Established"
            />
            <FormControl sx={{ mt: 1, minWidth: 500 }}>
              <InputLabel id="demo-simple-select-autowidth-label">
                Accounting Provider
              </InputLabel>
              <Select
                labelId="demo-simple-select-autowidth-label"
                id="demo-simple-select-autowidth"
                value={provider}
                onChange={(e) => setProvider(e.target.value as string)}
                autoWidth
                label="Accounting Provider"
              >
                <MenuItem value={"Xero"}>Xero</MenuItem>
                <MenuItem value={"MYOB"}>MYOB</MenuItem>
              </Select>
            </FormControl>
            <Button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={(e) => {
                submitHandler(e);
              }}
            >
              Fetch Balance Sheet from Accounting Provider
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
