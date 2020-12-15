import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage:
      'url(https://images.unsplash.com/photo-1490079027102-cd08f2308c73?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light'
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center', //for sigin icon
  },
  avatar: {
    margin: theme.spacing(1), //tilting the page up and down
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '90%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  otpBtn: {
    margin: theme.spacing(2, 0, 2),
    padding: '2%',
  },
  phone: {
    width: '75%',
    marginRight: '20px',
  },
}));

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
