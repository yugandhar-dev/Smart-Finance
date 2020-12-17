import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Container from '@material-ui/core/Container';
import { submitNewUser } from '../../auth/index';

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
    backgroundColor: '#fff',
    margin: theme.spacing(4, 2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center', //for sigin icon
    textAlign: 'center',
  },
  avatar: {
    margin: theme.spacing(1), //tilting the page up and down
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    //width: '90%', // Fix IE 11 issue.
    textAlign: 'center',
    marginTop: theme.spacing(1),
    border: '1px black',
  },
  form1: {
    //width: '90%', // Fix IE 11 issue.
    textAlign: 'center',
    marginTop: theme.spacing(1),
  },

  otpBtn: {
    margin: theme.spacing(2, 0, 2),
    padding: '2%',
  },
}));

const StepTwo = ({ formData, setFormData, count, setCount }) => {
  const {
    isEnrolled,
    isWorking,
    industry,
    university,
    commuteToUniversity,
    officeLocation,
    commuteToOffice,
  } = formData;
  const [error, setError] = useState('');

  const handleChange = e => {
    e.target.textContent === 'Yes' &&
      setFormData({ ...formData, isEnrolled: true });
    e.target.textContent === 'No' &&
      setFormData({
        ...formData,
        isEnrolled: false,
        university: '',
        commuteToUniversity: '',
      });
    e.target.textContent === 'Full Time' &&
      setFormData({ ...formData, isWorking: 'Full Time' });
    e.target.textContent === 'Part Time' &&
      setFormData({ ...formData, isWorking: 'Part Time' });
    e.target.textContent === 'None' &&
      setFormData({
        ...formData,
        isWorking: 'None',
        industry: '',
        officeLocation: '',
        commuteToOffice: '',
      });
  };

  const handleForm = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const changeStyle = {
    backgroundColor: '#07236a',
    color: 'white',
  };

  const enrollmentForm = (
    <>
      <FormControl variant="outlined">
        <InputLabel>University</InputLabel>
        <Select
          labelId="university"
          name="university"
          id="university-type-outlined"
          onChange={handleForm}
          label="University"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>

          {Array.from(
            new Set([
              'Deakin University',
              'Federation University Australia',
              'La Trobe University',
              'Monash University',
              'RMIT University',
              'Swinburne University of Technology',
              'The University of Melbourne',
              'Victoria University',
            ])
          ).map(university => (
            <MenuItem key={Math.random(10)} value={university}>
              {university}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <br></br>
      <FormControl variant="outlined">
        <InputLabel>Method of Transport</InputLabel>
        <Select
          labelId="transport"
          name="commuteToUniversity"
          id="transport-type-outlined"
          onChange={handleForm}
          label="Method of Transport"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>

          {Array.from(
            new Set(['Walk', 'Car', 'Bicycle', 'Public transport'])
          ).map(transport => (
            <MenuItem key={Math.random(10)} value={transport}>
              {transport}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );

  const fullTimeForm = (
    <>
      <FormControl variant="outlined">
        <InputLabel>Industry</InputLabel>
        <Select
          labelId="industry"
          name="industry"
          id="industry-type-outlined"
          onChange={handleForm}
          label="Industry"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>

          {Array.from(
            new Set([
              'Accounting',
              'Administration & Office support',
              'Advertising, Arts & Media',
              'Banking & Financial Services',
              'Call centre & customer service',
              'Construction',
              'Design & Architecture',
              'Education & Training',
              'Engineering',
              'Government & Defence',
              'Hospitality & Tourism',
              'Healthcare & Medical',
              'Information & Communication Technology',
              'Insurance & Superannuation',
              'Science & Technology',
              'Self Employment',
            ])
          ).map(ofcIndustry => (
            <MenuItem key={Math.random(10)} value={ofcIndustry}>
              {ofcIndustry}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <br></br>
      <FormControl variant="outlined">
        <TextField
          id="outlined-basic"
          label="Office location"
          name="officeLocation"
          onChange={handleForm}
          variant="outlined"
          autoComplete="off"
        />
      </FormControl>
      <br></br>
      <FormControl variant="outlined">
        <InputLabel>Method of Transport</InputLabel>
        <Select
          labelId="transport"
          name="commuteToOffice"
          id="transport-type-outlined"
          onChange={handleForm}
          label="Method of Transport"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>

          {Array.from(
            new Set(['Walk', 'Car', 'Bicycle', 'Public transport'])
          ).map(transport => (
            <MenuItem key={Math.random(10)} value={transport}>
              {transport}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );

  const submitForm = async () => {
    if (
      isEnrolled === true &&
      (university === '' || commuteToUniversity === '')
    ) {
      setError('Please enter all the fields');
      return;
    } else if (
      (isWorking === 'Full Time' || isWorking === 'Part Time') &&
      (industry === '' || officeLocation === '' || commuteToOffice === '')
    ) {
      setError('Please enter all the fields');
      return;
    } else {
      setError('');
      await submitNewUser(formData);
    }
  };

  const classes = useStyles();
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
              User Registration
            </Typography>
            <br />

            <Container maxWidth="xs">
              <Box border={1}>
                <FormControl variant="outlined" className={classes.form1}>
                  <h4>Have you enrolled in any course?</h4>
                  <ButtonGroup
                    fullWidth
                    color="primary"
                    onClick={handleChange}
                    aria-label="outlined primary button group"
                  >
                    <Button style={isEnrolled === true ? changeStyle : {}}>
                      Yes
                    </Button>
                    <Button style={isEnrolled === false ? changeStyle : {}}>
                      No
                    </Button>
                  </ButtonGroup>
                  <br />
                  {isEnrolled === true && enrollmentForm}
                  <br />
                </FormControl>
              </Box>
              <br />
              <Box border={1}>
                <FormControl variant="outlined" className={classes.form}>
                  <h4>Do you Work?</h4>
                  <ButtonGroup
                    color="primary"
                    onClick={handleChange}
                    aria-label="outlined primary button group"
                  >
                    <Button
                      style={isWorking === 'Full Time' ? changeStyle : {}}
                    >
                      Full Time
                    </Button>
                    <Button
                      style={isWorking === 'Part Time' ? changeStyle : {}}
                    >
                      Part Time
                    </Button>
                    <Button style={isWorking === 'None' ? changeStyle : {}}>
                      None
                    </Button>
                  </ButtonGroup>
                  <br />
                  {(isWorking === 'Full Time' || isWorking === 'Part Time') &&
                    fullTimeForm}
                  <br />
                </FormControl>
              </Box>
              <p style={{ color: 'red' }}>{error}</p>
              <div style={{ marginTop: '1rem' }}>
                <Button
                  fullWidth
                  onClick={() => setCount(count - 1)}
                  variant="contained"
                  color="secondary"
                  className={classes.otpBtn}
                >
                  Back
                </Button>
                <Button
                  fullWidth
                  onClick={submitForm}
                  variant="contained"
                  color="primary"
                  className={classes.otpBtn}
                >
                  Next
                </Button>
              </div>
            </Container>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default StepTwo;
