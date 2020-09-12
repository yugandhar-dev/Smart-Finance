import React from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: "#3f51b5",
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles(theme => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const createData = (
  year,
  startingAmount,
  annualContribution,
  totalContributions,
  totalInterestEarned,
  endBalance
) => {
  return {
    year,
    startingAmount,
    annualContribution,
    totalContributions,
    totalInterestEarned,
    endBalance,
  };
};

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

export default function InvestTable({ investData }) {
  const { principal, contribution, interests, tenure, amount } = investData;
  const rows = [];
  for (let i = 1; i <= tenure; i++) {
    rows.push(
      createData(
        2020 + i,
        principal,
        contribution * 12,
        contribution * 12 * i,
        interests[i - 1],
        amount[i - 1]
      )
    );
  }

  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Year</StyledTableCell>
            <StyledTableCell align="right">Starting Amount</StyledTableCell>
            <StyledTableCell align="right">Annual Contribution</StyledTableCell>
            <StyledTableCell align="right">Total Contributions</StyledTableCell>
            <StyledTableCell align="right">
              Total Interest Earned
            </StyledTableCell>
            <StyledTableCell align="right">End Balance</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <StyledTableRow key={row.year}>
              <StyledTableCell component="th" scope="row">
                {row.year}
              </StyledTableCell>
              <StyledTableCell align="right">
                {row.startingAmount}
              </StyledTableCell>
              <StyledTableCell align="right">
                {row.annualContribution}
              </StyledTableCell>
              <StyledTableCell align="right">
                {row.totalContributions}
              </StyledTableCell>
              <StyledTableCell align="right">
                {row.totalInterestEarned}
              </StyledTableCell>
              <StyledTableCell align="right">{row.endBalance}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
