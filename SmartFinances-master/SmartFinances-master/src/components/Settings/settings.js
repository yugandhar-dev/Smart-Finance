import React, {useState, useEffect} from 'react';
import styled, {css} from 'styled-components';
import {List, TextField, Grid, ListItem, Button} from '@material-ui/core';
import {
  getUserDetails,
  getProfileSettings,
  getEmailId,
  getUserPhoneNumber,
} from '../../auth/index';
import Paper from '@material-ui/core/Paper';

import CssBaseline from '@material-ui/core/CssBaseline';
import {makeStyles} from '@material-ui/core/styles';
import {Pencil} from '@styled-icons/boxicons-regular/Pencil';

const Message = styled.p`
  color: green;
  ${(props) =>
    props.error &&
    css`
      color: red;
    `}
`;

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },

  paper: {
    margin: theme.spacing(8, 8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    alignContent: 'center',
    alignSelf: 'center',
    justifyItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1), //tilting the page up and down
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  control: {
    padding: theme.spacing(2),
  },
}));

export default () => {
  const [open, setOpen] = useState(false);
  const [openn, setOpenn] = useState(false);
  const [error, setError] = useState('');
  const [currentpassword, setCurrentpassword] = useState('');
  const [newpassword, setNewpassword] = useState('');
  const [phonenumber, setPhonenumber] = useState('');
  const [newphonenumber, setNewPhonenumber] = useState('');
  const [message, setMessage] = useState('');
  const [emailId, setemailId] = useState('');
  const [accNumber, setAccNumber] = useState('');

  const getCurrentPassword = (value) => {
    setCurrentpassword(value);
   
  };
 
  function validatePassword() {
         
    var newPassword = newpassword
    var minNumberofChars = 6;
    var maxNumberofChars = 16;
    var regularExpression  = /^[a-zA-Z0-9!@#$%^&*]{6,16}$/;
    alert(newPassword); 
    if(newPassword.length < minNumberofChars || newPassword.length > maxNumberofChars){
      alert("password should contain atleast One uppercase letter, Lowercase letter, One number, One Special Character");
        return false;
    }
    if(!regularExpression.test(newPassword)) {
        alert("password should contain atleast One uppercase letter, Lowercase letter, One number, One Special Character");
        return false;
    }
}
 
  const getNewPassword = (value) => {
    setNewpassword(value);
  };
  const getPhonenumber = (value) => {
    setNewPhonenumber(value);
  };

 
  const changePwd = (
    <div>
      <ListItem>
        <TextField
          label="Current Password"
          type="password"
          required="required"
          value={currentpassword}
          onChange={(event) => getCurrentPassword(event.target.value)}
        >
          Current Password
        </TextField>
      </ListItem>
      <ListItem>
        <TextField
          label="New Password"
          type="password"
          required="required"
          value={newpassword}
          onChange={(event) => getNewPassword(event.target.value)}
          helperText= "Please enter minimum 8 letters,One uppercase letter, Lowercase letter, One number, One Special Character"
          inputProps={{minLength :8}}
        >
          Change Password
        </TextField>
      </ListItem>
    </div>
  );
  const changeMobile = (
    <div>
      <ListItem>
        <TextField
          label="New Mobile Number"
          value={newphonenumber}
          onChange={(event) => getPhonenumber(event.target.value)}
        >
          New Mobile Number
        </TextField>
      </ListItem>
    </div>
  );

  

  useEffect(() => {
    const getDetails = async () => {
      const userDetails = await getUserDetails();
      setAccNumber(userDetails[0].accountNumber);
      const email = await getEmailId(userDetails[0].accountNumber);
      setemailId(email.emailId);
      const phNo = await getUserPhoneNumber(email.emailId);
      setPhonenumber(phNo.phoneNumber);
    };
    getDetails();
  }, []);

  const Update = async () => {
    if(
      newpassword !== '' || 
      newpassword == ''
    ){ 
      if(newpassword.length < 5){
        alert('Minimum 8 characters in the password') 
        return false
      } if(newpassword.length > 10){ 
        alert('Maximum 10 characters in the password')  
        return false
      }if(!newpassword.includes('@'||'!'||'#'||'$'||'%'||'^'||'&'||'*'||'('||')'||';')){
        alert('Please include one symbol')
        return false  
      }if(newpassword.includes(newpassword.toLocaleLowerCase())){
        alert('Please include one upper case character')
        return false
      } 
    const data = {
      useraccountNumber: accNumber,
      //userphoneNumber: newphonenumber,
    };

    validatePassword();

    const res = await getProfileSettings(data);
    res.error ? setError(res.error + ' Please try again') : setError(null);
    setCurrentpassword('');
    setNewpassword('');
    setNewPhonenumber('');
    const userDetails = await getUserDetails();
    const email = await getEmailId(userDetails[0].accountNumber);
    const phNo = await getUserPhoneNumber(email.emailId);
    setPhonenumber(phNo.phoneNumber);
  };

  const classes = useStyles();

  return (
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
          <form className={classes.form} id="forms">
            <List>
              <ListItem>
                <a>UserName:</a>
                <div>{emailId}</div>
              </ListItem>
              <ListItem>
                <a>Mobile Number:</a>
                <TextField name="phonenumber" value={phonenumber} />
                <Pencil size="25" onClick={() => setOpenn(!openn)} />
              </ListItem>
              {openn && changeMobile}
              <ListItem>
                <a>Password:</a>
                <TextField>Password</TextField>
                <Pencil size="25" onClick={() => setOpen(!open)} />
              </ListItem>
              {open && changePwd}
              <ListItem>
                <a>Email:</a>
                <Button>Contact Us to Change Email Address</Button>
              </ListItem>
              <ListItem>
                <Button variant="contained" color="primary" onClick={Update}>
                  Update
                </Button>
              </ListItem>
            </List>
          </form>
        </div>
      </Grid>
      {error != '' && error == null ? (
        <Message>Your profile is Successfully Updated</Message>
      ) : (
        <Message error>{error}</Message>
      )}
    </Grid>
  )
}}