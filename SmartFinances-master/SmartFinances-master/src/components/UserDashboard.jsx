import React, { useState, useEffect } from "react";
import FundOptions from "./FundOptions";
import Investments from "./investments/Investments";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { getUserDetails } from "../auth/index";
import { Doughnut } from "react-chartjs-2";
import { Table } from "react-bootstrap";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import "./App.css";
import PayMerchant from "./payToMerchant/payToMerchant";
import WalletDetails from "./WalletDetails";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  walletdiv: {
    width: "50px",
  },
}));

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

export default (props) => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [error, setError] = useState("");
  const [response, setResponse] = useState("");
  const [reload, setReload] = useState(true);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    getUserDetails()
      .then((data) => {
        if (data.error) {
          setError(data.error);
        } else {
          setResponse(data[0]);
        }
      })
      .catch((ex) => console.log("Fund Details Retrieval error", ex));
  }, [reload]);

  return (
    <div>
      <div>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Smart Finance
            </Typography>
            <Button color="inherit" onClick={props.logout}>
              Logout
            </Button>
          </Toolbar>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="simple tabs example"
            centered
          >
            <Tab label="Portfolio" />
            <Tab label="Pay Merchant" />
            <Tab label="Fund Options" />
            <Tab label="Investments" />
          </Tabs>
        </AppBar>
        <TabPanel value={value} index={0}>
          <Grid
            container
            direction="column"
            justify="center"
            alignItems="stretch"
            component={Paper}
          >
            <Table>
              <tbody>
                <tr>
                  <td>
                    <div>
                      <Typography variant="h6" fontWeight="bold">
                        <p>
                          <font color="#b80000">
                            Account Number:
                            <font color="#1273de">
                              {JSON.stringify(response.accountNumber)}
                            </font>
                          </font>
                        </p>
                      </Typography>
                      <Typography variant="h6" fontWeight="bold">
                        <p>
                          <font color="#b80000">
                            Account Balance:
                            <font color="#1273de">
                              ${JSON.stringify(response.accountBalance)}
                            </font>
                          </font>
                        </p>
                      </Typography>
                      <Typography variant="h6" fontWeight="bold">
                        <p>
                          <font color="#b80000">
                            Total Investments:
                            <font color="#1273de">
                              ${JSON.stringify(response.totalfunds)}
                            </font>
                          </font>
                        </p>
                      </Typography>
                      <p>
                        <font color="#f44336">
                          Low Risk Fund Investments:
                          <font color="#1273de">
                            ${JSON.stringify(response.lowRiskFund)}
                          </font>
                        </font>
                      </p>
                      <p>
                        <font color="#4caf50">
                          Medium Risk Fund Investments:
                          <font color="#1273de">
                            ${JSON.stringify(response.mediumRiskFund)}
                          </font>
                        </font>
                      </p>
                      <p>
                        <font color="#ff9800">
                          High Risk Fund Investments:
                          <font color="#1273de">
                            ${JSON.stringify(response.highRiskFund)}
                          </font>
                        </font>
                      </p>
                    </div>
                  </td>
                  <td>
                    <div>
                      <Doughnut
                        data={{
                          labels: [
                            "Low Risk Investments",
                            "Medium Risk Investments",
                            "High RIsk Investments",
                          ],
                          datasets: [
                            {
                              data: [
                                response.lowRiskFund,
                                response.mediumRiskFund,
                                response.highRiskFund,
                              ],
                              backgroundColor: [
                                "#F7464A",
                                "#46BFBD",
                                "#FDB45C",
                                // "#949FB1",
                                // "#4D5360",
                              ],
                              hoverBackgroundColor: [
                                "#FF5A5E",
                                "#5AD3D1",
                                "#FFC870",
                                // "#A8B3C5",
                                // "#616774",
                              ],
                            },
                          ],
                        }}
                        options={{ responsive: true }}
                      />
                    </div>
                  </td>
                  <div className={classes.walletdiv}>
                    <WalletDetails />
                  </div>
                </tr>
              </tbody>
            </Table>
          </Grid>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <WalletDetails />
          <PayMerchant reload={reload} setReload={setReload} />
          {/* {payMerchant} */}
        </TabPanel>
        <TabPanel value={value} index={2}>
          <FundOptions />
        </TabPanel>
        <TabPanel value={value} index={3}>
          <WalletDetails />
          <Investments />
        </TabPanel>
      </div>
    </div>
  );
};
