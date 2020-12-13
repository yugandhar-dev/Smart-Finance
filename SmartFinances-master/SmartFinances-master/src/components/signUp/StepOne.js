import React from 'react';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const StepOne = ({ formData, setFormData, navigation }) => {
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

  return (
    <Container maxWidth="xs">
      <h3>User Registration</h3>
      <TextField
        label="First Name"
        name="firstName"
        value={firstName}
        onChange={setFormData}
        margin="normal"
        variant="outlined"
        autoComplete="off"
        fullWidth
      />
      <TextField
        label="Last Name"
        name="lastName"
        value={lastName}
        onChange={setFormData}
        margin="normal"
        variant="outlined"
        autoComplete="off"
        fullWidth
      />
      <TextField
        label="Email Address"
        name="email"
        value={email}
        onChange={setFormData}
        margin="normal"
        variant="outlined"
        autoComplete="off"
        fullWidth
      />
      <TextField
        label="Date of Birth"
        name="dob"
        value={dob}
        onChange={setFormData}
        margin="normal"
        variant="outlined"
        autoComplete="off"
        fullWidth
      />
      <TextField
        label="Phone Number"
        name="phone"
        value={phone}
        onChange={setFormData}
        margin="normal"
        variant="outlined"
        autoComplete="off"
        fullWidth
      />
      <TextField
        label="Gender"
        name="gender"
        value={gender}
        onChange={setFormData}
        margin="normal"
        variant="outlined"
        autoComplete="off"
        fullWidth
      />
      <TextField
        label="Address"
        name="address"
        value={address}
        onChange={setFormData}
        margin="normal"
        variant="outlined"
        autoComplete="off"
        fullWidth
      />
      <TextField
        label="City"
        name="city"
        value={city}
        onChange={setFormData}
        margin="normal"
        variant="outlined"
        autoComplete="off"
        fullWidth
      />
      <TextField
        label="State"
        name="state"
        value={state}
        onChange={setFormData}
        margin="normal"
        variant="outlined"
        autoComplete="off"
        fullWidth
      />
      <TextField
        label="Postal Code"
        name="postalCode"
        value={postalCode}
        onChange={setFormData}
        margin="normal"
        variant="outlined"
        autoComplete="off"
        fullWidth
      />
      <div style={{ marginTop: '1rem' }}>
        <Button
          color="secondary"
          variant="contained"
          style={{ marginRight: '1rem' }}
          onClick={() => navigation.previous()}
        >
          Back
        </Button>
        <Button
          color="primary"
          variant="contained"
          onClick={() => navigation.next()}
        >
          Next
        </Button>
      </div>
    </Container>
  );
};

export default StepOne;
