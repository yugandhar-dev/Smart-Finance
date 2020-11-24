import React, { useState, useEffect } from "react";
import {
  TextField,
  InputAdornment,
  Button,
  makeStyles,
  Grid,
  Typography,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@material-ui/core";
import BarChart from "./BarChart";
import InterestCard from "./InterestCard";
import InvestTable from "./InvestTable";
import Interest from "./Interest";
import { getAllInvestmentOptions } from "../../../auth/index";
import StocksData from "./StocksData";

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: "60%",
    backgroundColor: "#fff",
  },
  root: {
    width: "50vw",
    backgroundColor: "#F4F4F6",
    padding: "20px",
    textAlign: "center",
    fontSize: "1.2rem",
    marginTop: "10px",
    marginLeft: "5px",
  },
  input: {
    backgroundColor: "#fff",
  },
  chart: {
    width: "50vw",
    margin: "5vh 0",
  },
  card: {
    width: "17vw",
    position: "absolute",
    right: "1%",
    top: "53%",
  },
  table: {
    width: "60vw",
  },
}));

const InvestmentCalculator = () => {
  const initialState = {
    principal: 2000,
    contribution: 0,
    interest: 4,
    tenure: 10,
  };
  const [formData, setFormData] = useState(initialState);
  const [investData, setInvestData] = useState(Interest(initialState));
  const [investmentOptions, setInvestmentOptions] = useState([]);
  const [investmentSelected, setInvestmentSelected] = useState("");
  const [companySelected, setCompanySelected] = useState("");
  const [companyDetails, setCompanyDetails] = useState([]);
  const [marketData, setMarketData] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const getData = async () => {
      const data = await getAllInvestmentOptions();
      setInvestmentOptions(data);
    };
    getData();

    const data = investmentOptions.filter(
      ({ investmentType, companyName }) =>
        companySelected === companyName && investmentSelected === investmentType
    );
    setCompanyDetails(data);
  }, [companySelected]);

  useEffect(() => {
    const fetchMarketData = async companyDetails => {
      setMarketData(await StocksData(companyDetails));
    };
    if (companyDetails[0] && !companyDetails[0].companyStockSymbol) return;
    else fetchMarketData(companyDetails);
  }, [companyDetails]);

  const onChange = e => {
    const re = /^[0-9\b]+$/;
    if (e.target.value === "" || re.test(e.target.value)) {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const submitData = () => {
    if (
      investmentSelected === "lowRiskFund" ||
      investmentSelected === "exchangeTradedFund"
    ) {
      companyDetails[0] &&
        formData.principal > companyDetails[0].pricePerUnit &&
        setMessage(
          `You can buy ${parseInt(
            formData.principal / companyDetails[0].pricePerUnit
          )} units of ${companySelected}`
        );
    } else if (formData.principal >= 100 && formData.tenure >= 1) {
      for (var key in formData) {
        formData[key] = parseFloat(formData[key]);
      }
      setInvestData(Interest(formData));
    } else return;
  };

  const classes = useStyles();
  return (
    <div>
      <Typography component="h1" variant="h5">
        Investment Calculator
      </Typography>
      <Grid container className={classes.root} spacing={2}>
        <Grid item xs={6}>
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel id="investmentType">
              Choose type of Investment
            </InputLabel>
            <Select
              labelId="investmentType"
              id="investment-type-outlined"
              onChange={e => {
                setCompanySelected("");
                setInvestmentSelected(e.target.value);
              }}
              label="Choose type of Investment"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {Array.from(
                new Set(investmentOptions.map(s => s.investmentType))
              ).map(investmentType => (
                <MenuItem key={Math.random(10)} value={investmentType}>
                  {investmentType}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel id="company">
              {investmentSelected === "lowRiskFund" ||
              investmentSelected === "exchangeTradedFund"
                ? "Select the company"
                : "Select the Scheme"}
            </InputLabel>
            <Select
              labelId="company"
              id="company-outlined"
              onChange={e => {
                setMessage("");
                setCompanySelected(e.target.value);
              }}
              label={
                investmentSelected === "lowRiskFund" ||
                investmentSelected === "exchangeTradedFund"
                  ? "Select the company"
                  : "Select the Scheme"
              }
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {investmentOptions
                .filter(
                  ({ investmentType }) => investmentType === investmentSelected
                )
                .map(company => (
                  <MenuItem key={company._id} value={company.companyName}>
                    {company.companyName}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          {investmentSelected === "lowRiskFund" ||
          investmentSelected === "exchangeTradedFund" ? (
            <TextField
              id="outlined-basic"
              label="Investment Amount"
              name="principal"
              error={
                companyDetails[0] &&
                formData.principal < companyDetails[0].pricePerUnit &&
                true
              }
              helperText={
                companyDetails[0] &&
                formData.principal < companyDetails[0].pricePerUnit
                  ? `Min amount must be $${
                      parseInt(companyDetails[0].pricePerUnit) + 1
                    }`
                  : ""
              }
              value={formData.principal}
              onChange={onChange}
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">$</InputAdornment>
                ),
              }}
              className={classes.input}
              autoComplete="off"
            />
          ) : (
            <TextField
              id="outlined-basic"
              label="Starting Amount"
              name="principal"
              error={formData.principal < 100 && true}
              helperText={
                formData.principal < 100 ? "Min amount must be $100" : ""
              }
              value={formData.principal}
              onChange={onChange}
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">$</InputAdornment>
                ),
              }}
              className={classes.input}
              autoComplete="off"
            />
          )}
        </Grid>
        <Grid item xs={6}>
          {investmentSelected === "savingScheme" && (
            <TextField
              id="outlined-basic"
              label="Contribution per month"
              variant="outlined"
              name="contribution"
              disabled={
                investmentSelected === "lowRiskFund" ||
                (investmentSelected === "exchangeTradedFund" && true)
              }
              value={formData.contribution}
              onChange={onChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">$</InputAdornment>
                ),
              }}
              className={classes.input}
              autoComplete="off"
            />
          )}
        </Grid>
        <Grid item xs={6}>
          {investmentSelected === "lowRiskFund" ||
          investmentSelected === "exchangeTradedFund" ? (
            <TextField
              id="outlined-basic"
              label="Price Per Unit"
              variant="outlined"
              name="interest"
              value={companyDetails[0] ? companyDetails[0].pricePerUnit : 0}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">$</InputAdornment>
                ),
              }}
              className={classes.input}
              autoComplete="off"
            />
          ) : (
            <TextField
              id="outlined-basic"
              label="Percentage of Returns"
              variant="outlined"
              name="interest"
              value={
                (formData.interest = companyDetails[0]
                  ? companyDetails[0].percentageOfReturns
                  : 0)
              }
              onChange={onChange}
              InputProps={{
                endAdornment: <InputAdornment position="end">%</InputAdornment>,
              }}
              className={classes.input}
              autoComplete="off"
            />
          )}
        </Grid>
        <Grid item xs={6}>
          <TextField
            id="outlined-basic"
            label="Tenure in Years"
            variant="outlined"
            name="tenure"
            error={formData.tenure < 1 && true}
            helperText={formData.tenure < 1 ? "Must be min 1 year" : ""}
            value={formData.tenure}
            onChange={onChange}
            className={classes.input}
            autoComplete="off"
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" color="primary" onClick={submitData}>
            Calculate
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body1">{message}</Typography>
        </Grid>
      </Grid>
      <Grid className={classes.chart}>
        {investmentSelected === "lowRiskFund" && marketData && (
          <BarChart
            investData={marketData}
            type="lowRiskFund"
            company={companyDetails[0].companyName}
          />
        )}
        {investmentSelected === "exchangeTradedFund" && marketData && (
          <BarChart
            investData={marketData}
            type="exchangeTradedFund"
            company={companyDetails[0].companyName}
          />
        )}
        {investmentSelected === "savingScheme" && investData && (
          <BarChart investData={investData} type="savingScheme" />
        )}
      </Grid>
      {investmentSelected === "savingScheme" && (
        <Grid className={classes.card}>
          <InterestCard investData={investData} />
        </Grid>
      )}
      {investmentSelected === "savingScheme" && (
        <Grid className={classes.table}>
          <InvestTable investData={investData} />
        </Grid>
      )}
      <br />
    </div>
  );
};

export default InvestmentCalculator;
