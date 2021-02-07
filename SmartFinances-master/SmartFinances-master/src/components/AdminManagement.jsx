import React, { useState } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
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
const AdminManagement = () => {

  const classes = useStyles();
  const [formData, setFormData] = useState({})
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const onSubmit = (event) => {
    event.preventDefault();
    console.log({formData});
    }
  return (
    <div>
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
            <Typography component="h1" variant="h3">
              ENTER DETAILS
            </Typography>
            <p>{successMsg}</p>
            <form className={classes.form} noValidate id="forms">
              
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="Email"
                label="Email"
                id="Email"
                autoComplete="Email"
                autoFocus
                onChange={(e) => setFormData({...formData, [e.target.name]: e.target.value})}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="FirstName"
                label="FirstName"
                id="FirstName"
                autoComplete="FirstName"
                autoFocus
                onChange={(e) => setFormData({...formData, [e.target.name]: e.target.value})}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="LastName"
                label="LastName"
                id="LastName"
                autoComplete="LastName"
                autoFocus
                onChange={(e) => setFormData({...formData, [e.target.name]: e.target.value})}
              />
              
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="Address"
                label="Address"
                id="Address"
                autoComplete="Address"
                autoFocus
                onChange={(e) => setFormData({...formData, [e.target.name]: e.target.value})}
              />
              
              <TextField
                variant="outlined"
                margin="normal"
                type='number'
                required
                fullWidth
                name="Phone number"
                label="Phone number"
                id="Phone number"
                autoComplete="Phone number"
                autoFocus
                onChange={(e) => setFormData({...formData, [e.target.name]: e.target.value})}
              />
              <TextField
                variant="outlined"
                margin="normal"
                type="password"
                required
                fullWidth
                name="Password"
                label="Password"
                id="Password"
                autoComplete="Password"
                autoFocus
                onChange={(e) => setFormData({...formData, [e.target.name]: e.target.value})}
              />
              
              <Button
                onClick={onSubmit}
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Create New Admin
              </Button>
              
            </form>
          </div>
        </Grid>
      </Grid>
    </div>
  );
  
};
export default AdminManagement;
