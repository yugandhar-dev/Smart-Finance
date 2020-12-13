import React from 'react';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import InputLabel from '@material-ui/core/InputLabel';

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
      <InputLabel id="investmentType">
        Have you enrolled in any course?
      </InputLabel>
      <ButtonGroup color="primary" aria-label="outlined primary button group">
        <Button>Yes</Button>
        <Button>No</Button>
      </ButtonGroup>
      <br />
      <InputLabel id="investmentType">Do you work?</InputLabel>
      <ButtonGroup color="primary" aria-label="outlined primary button group">
        <Button>Full Time</Button>
        <Button>Part Time</Button>
        <Button>None</Button>
      </ButtonGroup>
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
