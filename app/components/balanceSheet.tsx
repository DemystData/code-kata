import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import NavBar from './NavBar';

const months = ["blank", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

export default function SpanningTable({company, balanceSheet, provider}: any) {
  let first12Objects = balanceSheet.slice(0, 12);
  // Calculate total profitOrLoss and avg Asset Value
  const totalProfitOrLoss = first12Objects.reduce(
    (acc: any, obj: any) => acc + obj.profitOrLoss,
    0
  );
  const totalAssestsValue = first12Objects.reduce(
    (acc: any, obj: any) => acc + obj.assetsValue,
    0
  );
  const averageAssetsValue = Math.floor(totalAssestsValue / first12Objects.length);

  return (
      <div>
        <NavBar provider={provider}/>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="spanning table">
              <TableHead>
              <TableRow>
                  <TableCell align="center">
                        {company} Balance Sheet Review
                  </TableCell>   
              </TableRow>
              <TableRow>
                  <TableCell>Year</TableCell>
                  <TableCell align="right">Month</TableCell>
                  <TableCell align="right">Profit or Loss</TableCell>
                  <TableCell align="right">Asset Value</TableCell>
              </TableRow>
              </TableHead>
              <TableBody>
                {first12Objects.map((eachMonth: any) => (
                    <TableRow key={eachMonth.month}>
                    <TableCell>{eachMonth.year}</TableCell>
                    <TableCell align="right">{months[eachMonth.month]}</TableCell>
                    <TableCell align="right">{eachMonth.profitOrLoss}</TableCell>
                    <TableCell align="right">{eachMonth.assetsValue}</TableCell>
                    </TableRow>
                ))}
                <TableRow>
                  <TableCell></TableCell>
                  <TableCell align="right">Total Profit or Loss</TableCell>
                  <TableCell align="right">{totalProfitOrLoss}</TableCell>
                  <TableCell align="right"></TableCell>
                </TableRow>
                <TableRow>
                <TableCell></TableCell>
                  <TableCell align="right">Average Asset Value</TableCell>
                  <TableCell align="right"></TableCell>
                  <TableCell align="right">{averageAssetsValue}</TableCell>
                </TableRow>
              </TableBody>
          </Table>
        </TableContainer>
      </div>
  );
}