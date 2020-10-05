import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Lowriskinvest from "./Lowriskinvest";

import LowRiskInvestment from "./lowRiskInvestment";

const useStyles = makeStyles(theme => ({
  root: {
    maxHeight: "100vh",
    marginTop: "5%",
  },
  paper: {
    margin: theme.spacing(8, 8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    alignContent: "center",
    alignSelf: "center",
    justifyItems: "center",
  },
  avatar: {
    margin: theme.spacing(1), //tilting the page up and down
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  control: {
    padding: theme.spacing(2),
  },
}));

const Lowrisk = props => {
  const [status, currentStatus] = useState(null);
  const classes = useStyles();
  return (
    <div>
      {status !== null ? (
        <div>
          {status === "lowrisk" ? (
            <LowRiskInvestment
              reload={props.reload}
              setReload={props.setReload}
            />
          ) : (
            ""
          )}
        </div>
      ) : (
        <Grid
          container
          direction="column"
          justify="center"
          alignItems="center"
          component="main"
          className={classes.root}
        >
          <CssBaseline />
          <Grid
            item
            xs={false}
            sm={10}
            md={5}
            component={Paper}
            elevation={10}
            square
          >
            <div className={classes.paper}>
              <Typography component="h1" variant="h5">
                Low Risk
              </Typography>

              <p>
                An Investment where there is perceived to be just a slight
                chance of loosing some or all of the your money.An Investment
                where there is perceived to be just a slight chance of loosing
                some or all of the your money.An Investment where there is
                perceived to be just a slight chance of loosing some or all of
                the your money.An Investment where there is perceived to be just
                a slight chance of loosing some or all of the your money.An
                Investment where there is perceived to be just a slight chance
                of loosing some or all of the your money
              </p>

              <form className={classes.form} id="forms">
                <Button
                  onClick={() => currentStatus("lowrisk")}
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  id = "inv"
                  className={classes.submit}
                >
                  Invest
                </Button>
              </form>
            </div>
          </Grid>
        </Grid>
      )}
    </div>
  );
};
export default Lowrisk;
