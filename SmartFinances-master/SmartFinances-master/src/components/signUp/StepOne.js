import React from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  formControlName: {
    margin: theme.spacing(1),
    minWidth: '20vw',
    backgroundColor: '#fff',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: '40vw',
    backgroundColor: '#fff',
  },
  root: {
    width: '50vw',
    backgroundColor: '#fff',
    padding: '20px',
    textAlign: 'center',
    fontSize: '1.2rem',
    margin: 'auto',
  },
}));

const StepOne = ({ formData, setFormData, count, setCount }) => {
  const {
    firstName,
    lastName,
    email,
    dob,
    phone,
    gender,
    address,
    city,
    state,
    postalCode,
  } = formData;

  const handleChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const classes = useStyles();
  return (
    <div>
      <h3>User Registration</h3>
      <Grid container className={classes.root} spacing={2}>
        <Grid item xs={6}>
          <FormControl variant="outlined" className={classes.formControlName}>
            <TextField
              label="First Name"
              name="firstName"
              value={firstName}
              onChange={handleChange}
              margin="normal"
              variant="outlined"
              autoComplete="off"
              fullWidth
            />
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <FormControl variant="outlined" className={classes.formControlName}>
            <TextField
              label="Last Name"
              name="lastName"
              value={lastName}
              onChange={handleChange}
              margin="normal"
              variant="outlined"
              autoComplete="off"
              fullWidth
            />
          </FormControl>
        </Grid>
        <Grid item lg={12}>
          <FormControl variant="outlined" className={classes.formControl}>
            <TextField
              label="Email Address"
              name="email"
              value={email}
              onChange={handleChange}
              margin="normal"
              variant="outlined"
              autoComplete="off"
              fullWidth
            />
          </FormControl>
        </Grid>
        <TextField
          label="Date of Birth"
          name="dob"
          value={dob}
          onChange={handleChange}
          margin="normal"
          variant="outlined"
          autoComplete="off"
          fullWidth
        />
        <TextField
          label="Phone Number"
          name="phone"
          value={phone}
          onChange={handleChange}
          margin="normal"
          variant="outlined"
          autoComplete="off"
          fullWidth
        />
        <TextField
          label="Gender"
          name="gender"
          value={gender}
          onChange={handleChange}
          margin="normal"
          variant="outlined"
          autoComplete="off"
          fullWidth
        />
        <TextField
          label="Address"
          name="address"
          value={address}
          onChange={handleChange}
          margin="normal"
          variant="outlined"
          autoComplete="off"
          fullWidth
        />
        <TextField
          label="City"
          name="city"
          value={city}
          onChange={handleChange}
          margin="normal"
          variant="outlined"
          autoComplete="off"
          fullWidth
        />
        <TextField
          label="State"
          name="state"
          value={state}
          onChange={handleChange}
          margin="normal"
          variant="outlined"
          autoComplete="off"
          fullWidth
        />
        <TextField
          label="Postal Code"
          name="postalCode"
          value={postalCode}
          onChange={handleChange}
          margin="normal"
          variant="outlined"
          autoComplete="off"
          fullWidth
        />
        <div style={{ marginTop: '1rem' }}>
          <Button
            color="primary"
            variant="contained"
            onClick={() => setCount(count + 1)}
          >
            Next
          </Button>
        </div>
      </Grid>
    </div>
  );
};

export default StepOne;
