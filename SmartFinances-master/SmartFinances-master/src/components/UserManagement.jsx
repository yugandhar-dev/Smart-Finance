import React, { useState } from "react";
//import AdminLogin from "./AdminLogin";
import NewUserCreation from "./NewUserCreation";
import UserDetails from "./UserDetails";
//import Button from '@material-ui/core/Button';
import CssBaseline from "@material-ui/core/CssBaseline";
//import DesktopWindowsIcon from '@material-ui/icons/DesktopWindows';
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";

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
const UserManagement = () => {
  const [status, currentStatus] = useState(null);
  const classes = useStyles();
  return (
    <div>
      {status !== null ? (
        <div>
          {status === "create new user" ? <NewUserCreation /> : <UserDetails />}
        </div>
      ) : (
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
                <Typography component="h1" variant="h5"></Typography>
                <form className={classes.form} noValidate>
                  <Button
                    onClick={() => currentStatus("create new user")}
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                  >
                    CREATE A NEW USER
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
                    ACCESS USER INFORMATION
                  </Button>
                </form>
              </div>
            </Grid>
          </Grid>
        </div>
      )}
    </div>
  );
  // return (
  //   <div>
  //     {status !== null ? (
  //       <div>{status == "option1" ? <Option1 /> : <Option2 />}</div>
  //     ) : (
  //       <div>
  //         <button onClick={() => currentStatus("option1")}> Option 1</button>
  //         <button onClick={() => currentStatus("option2")}> Option 2</button>
  //       </div>
  //     )}
  //   </div>

  // );
};
export default UserManagement;
