import React, { useState } from "react";
import UserManagement from "./UserManagement.jsx";
import Risk from "./Risk";
import ExistingFunds from "./ExistingFunds";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

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

export default () => {
  const [status, currentStatus] = useState(null);
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  return (
    <div>
      {status !== null ? (
        <div>{status === "risk" ? <Risk /> : <ExistingFunds />}</div>
      ) : (
        <div>
          <TabPanel value={value} index={0}>
            <div className="App">
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
                  sm={12}
                  md={12}
                  component={Paper}
                  elevation={10}
                  square
                >
                  <div className={classes.paper}>
                    <form className={classes.form} noValidate>
                      <Button
                        onClick={() => currentStatus("risk")}
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                      >
                        CREATE A NEW FUND
                      </Button>
                      <br></br>
                      <br></br>
                      <br></br>
                      <Button
                        onClick={() => currentStatus("existingfunds")}
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                      >
                        MANAGE EXISTING FUNDS
                      </Button>
                    </form>
                  </div>
                </Grid>
              </Grid>
            </div>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <UserManagement />
          </TabPanel>
        </div>
      )}
    </div>
  );
};
