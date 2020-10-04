import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Lowtrend from "./Lowtrend";
import ETFT from "./ETFT";

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

const Lowrisk = () => {
  const [status, setStatus] = useState(null);
  const classes = useStyles();
  return (
    <div>
      {status !== null ? (
        <div>{status === "invest" ? <Lowtrend setStatus={setStatus} classes={classes}/> : <ETFT setStatus={setStatus} classes={classes}/>}</div>
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
              {/* <Typography component="h1" variant="h5">
                Low Risk
              </Typography> */}

             

              <form className={classes.form} id="forms">
                <Button
                  onClick={() => setStatus("invest")}
                  type="submit"
                  fullWidth
                  variant="contained"
                  id = "lowrisk"
                  color="primary"
                  className={classes.submit}
                >
                  Low risk Trend Analysis
                </Button>
                <Button
                  onClick={() => setStatus("etft")}
                  type="submit"
                  fullWidth
                  id = "etf"
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  Exchange Traded Funds Trend
                </Button>
                <Button
                  onClick={() => setStatus("invest")}
                  type="submit"
                  fullWidth
                  id = "savings"
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  Savings Scheme
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
