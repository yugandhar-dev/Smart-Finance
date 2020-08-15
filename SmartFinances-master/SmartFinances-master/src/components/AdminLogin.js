import React, { useState } from "react";
import "./App.css";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
//import DesktopWindowsIcon from '@material-ui/icons/DesktopWindows';
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import { signin } from "../auth/index";
import "./Homepage.css";
import { useAuth } from "../context/auth";

//import { Button, Form, FormGroup, Label, Input} from 'reactstrap';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Smart Finance
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    backgroundImage:
      "url(https://images.unsplash.com/photo-1490079027102-cd08f2308c73?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60)",
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center", //for sigin icon
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
}));

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { setAuthToken } = useAuth();

  const classes = useStyles();

  let history = useHistory();

  const onSubmit = (event) => {
    event.preventDefault();
    //history.push("/signin/user");
    signin({ email, password, role : 'admin' })
      .then((data) => {
        if (data.error) {
          setError(data.error);
        } else {
          setAuthToken(data.token)
          history.push("/admin/fundsDashboard");
        }
      })
      .catch(ex => console.log(ex));
  };

  return (
    <div>
      <Grid container component="main" className={classes.root}>
        <CssBaseline />
        <div className="content">
          <h1>Smart Finance</h1>
          <p>Smart Finance, the place where all your tomorrows are secured.</p>
          <p>
            Life is navigating from one choice to another. If you are here, you
            have already made one smart choice.
          </p>
          <p>
            As our privileged user, you would to able to contribute to your
            life-savings by investing in the funds of various risks. Worried
            about the risk factors, Don't worry we got you covered. With our
            varied fund options, you will be having total control in your
            investments. The more you invest the more we can help you in
            managing your savings.
          </p>
        </div>
        <Grid item xs={false} sm={4} md={7} className={classes.image} />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Admin Sign In
            </Typography>
            <p>{error}</p>
            <form className={classes.form} noValidate>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />

              <Button
                onClick={onSubmit}
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Login
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  {/* <Link href="#" variant="body2">
                              {"Don't have an account? Sign Up"}
                            </Link> */}
                </Grid>
              </Grid>
              <Box mt={5}>
                <Copyright />
              </Box>
            </form>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default AdminLogin;
