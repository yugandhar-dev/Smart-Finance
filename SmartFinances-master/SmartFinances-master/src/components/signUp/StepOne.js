import React from 'react';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

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

  return (
    <Container maxWidth="xs">
      <h3>User Registration</h3>
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
    </Container>
  );
};

export default StepOne;
