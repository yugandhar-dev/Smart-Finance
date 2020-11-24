import React, { useState } from "react";
import CreatedFund from "./CreatedFund.jsx";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
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
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const App = () => {
  const [status, currentStatus] = useState(null);
  const classes = useStyles();
  return (
    <div>
      {status !== null ? (
        <div>{status === "user" ? <CreatedFund /> : <App />}</div>
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
            sm={8}
            md={5}
            component={Paper}
            elevation={10}
            square
          >
            <div className={classes.paper}>
              <Typography component="h1" variant="h5">
                ENTER DETAILS
              </Typography>
              <form className={classes.form} noValidate>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="Fund Name"
                  label="Fund Name"
                  name="Fund Name"
                  autoComplete="Fund Name"
                  autoFocus
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="Risk Type"
                  label="Risk Type"
                  id="Risk Type"
                  autoComplete="Risk Type"
                  autoFocus
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="Fund Description"
                  label="Fund Description"
                  id="Fund Description"
                  autoComplete="Fund Description"
                  autoFocus
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="Gain Type"
                  label="Gain Type"
                  id="Gain Type"
                  autoComplete="Gain Type"
                  autoFocus
                />

                <Button
                  onClick={() => currentStatus("user")}
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  Create New Fund Option
                </Button>
              </form>
            </div>
          </Grid>
        </Grid>
      )}
    </div>
  );
};

export default App;
