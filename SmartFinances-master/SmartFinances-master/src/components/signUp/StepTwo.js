import React from 'react';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import InputLabel from '@material-ui/core/InputLabel';

const StepTwo = ({ formData, setFormData, count, setCount }) => {
  const { isEnrolled, isWorking } = formData;

  const handleChange = e => {
    e.target.textContent === 'Yes' &&
      setFormData({ ...formData, isEnrolled: true });
    e.target.textContent === 'No' &&
      setFormData({ ...formData, isEnrolled: false });
    e.target.textContent === 'Full Time' &&
      setFormData({ ...formData, isWorking: 'Full Time' });
    e.target.textContent === 'Part Time' &&
      setFormData({ ...formData, isWorking: 'Part Time' });
    e.target.textContent === 'None' &&
      setFormData({ ...formData, isWorking: 'None' });
  };

  const changeStyle = {
    backgroundColor: '#07236a',
    color: 'white',
  };

  const enrollmentForm = (
    <>
      <InputLabel id="investmentType">University</InputLabel>
      <ButtonGroup
        color="primary"
        onClick={handleChange}
        aria-label="outlined primary button group"
      >
        <Button>University Name</Button>
      </ButtonGroup>
      <InputLabel id="investmentType">Method of Transport</InputLabel>
      <ButtonGroup
        color="primary"
        onClick={handleChange}
        aria-label="outlined primary button group"
      >
        <Button>commute</Button>
      </ButtonGroup>
    </>
  );

  const fullTimeForm = (
    <>
      <InputLabel id="investmentType">Location</InputLabel>
      <ButtonGroup
        color="primary"
        onClick={handleChange}
        aria-label="outlined primary button group"
      >
        <Button>Office location</Button>
      </ButtonGroup>
      <InputLabel id="investmentType">Method of Transport</InputLabel>
      <ButtonGroup
        color="primary"
        onClick={handleChange}
        aria-label="outlined primary button group"
      >
        <Button>commute</Button>
      </ButtonGroup>
    </>
  );

  return (
    <Container maxWidth="xs">
      <h3>User Registration</h3>
      <InputLabel id="investmentType">
        Have you enrolled in any course?
      </InputLabel>
      <ButtonGroup
        color="primary"
        onClick={handleChange}
        aria-label="outlined primary button group"
      >
        <Button style={isEnrolled === true ? changeStyle : {}}>Yes</Button>
        <Button style={isEnrolled === false ? changeStyle : {}}>No</Button>
      </ButtonGroup>
      <br />
      {isEnrolled === true && enrollmentForm}

      <InputLabel id="investmentType">Do you work?</InputLabel>
      <ButtonGroup
        color="primary"
        onClick={handleChange}
        aria-label="outlined primary button group"
      >
        <Button style={isWorking === 'Full Time' ? changeStyle : {}}>
          Full Time
        </Button>
        <Button style={isWorking === 'Part Time' ? changeStyle : {}}>
          Part Time
        </Button>
        <Button style={isWorking === 'None' ? changeStyle : {}}>None</Button>
      </ButtonGroup>
      {(isWorking === 'Full Time' || isWorking === 'Part Time') && fullTimeForm}
      <div style={{ marginTop: '1rem' }}>
        <Button
          color="secondary"
          variant="contained"
          style={{ marginRight: '1rem' }}
          onClick={() => setCount(count - 1)}
        >
          Back
        </Button>
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

export default StepTwo;
