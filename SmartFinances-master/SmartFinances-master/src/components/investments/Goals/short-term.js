import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {List, TextField, Grid, Button, InputLabel, FormHelperText, FormControl, Select, NativeSelect, Paper, CssBaseline, ListItem, Typography} from '@material-ui/core';
import { Container } from '@material-ui/core';
import './goals.css';

const useStyles = makeStyles((theme) => ({
  form: {
    margin: theme.spacing(1),
    minWidth: 120,
    minHeight: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  container: {
    display: 'grid',
    gridTemplateColumns: 'repeat(12, 1fr)',
    gridGap: theme.spacing(3),
    alignItems: 'center',
  },
  Paper: {
    margin: theme.spacing(8, 8),
    display: 'grid',
    flexDirection: 'column',
    alignItems: 'center',
  },
}));

export default function UserGoals() {
  const classes = useStyles();
  const [state, setState] = React.useState({
    budget: '',
    name: '',
    goal: '',
    
    // goalList: [{index: Math.random(), }]
  });

  const handleChange = (event) => {
    const name = event.target.name;
    setState({
      ...state,
      [name]: event.target.value,
    });
  };

  function handleClick() {
    //alert('Hello!');
    var rowIDOPTION = document.getElementById('addOption');
    var rowIDINPUT = document.getElementById('addInput');
    var rowIDBTN = document.getElementById('delBtn'); 
    var input = document.createElement('p');
    var catchOption = document.getElementById('budget-list'); //catch option from selector
    var catchValue = catchOption.value; //catch value from option
    var inputText = document.createTextNode(catchValue);
    var input2 = document.createElement('p');
    var input2Id = document.getElementById('shopping');
    var input2Value = input2Id.value;
    var input22 = document.createTextNode(input2Value);
    var input3 = document.createElement('button');
    var input33 = document.createTextNode('Delete');

    input.appendChild(inputText);
    input2.appendChild(input22);
    input3.setAttribute('class', 'delBtn');
    input3.appendChild(input33);
    console.log(input2Value);

    rowIDOPTION.appendChild(input); 
    rowIDINPUT.append(input2);
    rowIDBTN.append(input3);
  }

  function deleteData() {
    //alert('clicked');
    var rowIDOPTION = document.getElementById('addOption');
    var rowIDINPUT = document.getElementById('addInput');
    var rowIDBTN = document.getElementById('delBtn'); 
    
    rowIDOPTION.remove();
    rowIDINPUT.remove();
    rowIDBTN.remove();

  }

  return (
    <Grid
    container
    direction="column"
    justify="center"
    alignItems="center"
    component="main"
    className={classes.root}
  >
    <Grid
      item
      xs={false}
      sm={10}
      md={10}
      component={Paper}
      elevation={10}
      square
    >
      <div className={classes.paper}>
      <div>
      <Container maxWidth="md" justify="center">

      <br />
      <Typography component="h1" variant="h5" justify="center">
          User goals
      </Typography>
      <br />

      <FormControl variant="outlined" className={classes.form}>
      <Grid container spacing={3}>
        <Grid item md={6}>
          <p>Budget your spendings</p>
        </Grid>
        <Grid item md={6}>
        <NativeSelect
          value={state.goal}
          onChange={handleChange}
          inputProps={{
            name: 'goal',
            id: 'goal-term',
          }}
        >
          <option value={10}>Short Term</option>
          <option value={20}>Long Term</option>
        </NativeSelect>
        </Grid>
    
        <Grid item md={6}>
            <p>
                Enter Income
            </p>
        </Grid>
        <Grid item md={6}>
        <TextField
          placeholder='$2000'
          id="standard-income"
          type="standard-income"
          InputLabelProps={{
            shrink: true,
          }}
        />
        </Grid>

        <Grid item md={3}>
        <NativeSelect
          value={state.budget}
          onChange={handleChange}
         // id='selectOptions'
          inputProps={{
            name: 'budget',
            id: 'budget-list',
          }}
        >
          <option value={'Shopping'}>Shopping</option>
          <option value={'Gas'}>Gas</option>
          <option value={'Groceries'}>Groceries</option>
          <option value={'Eating-Out'}>Eating Out</option>
          <option value={'Rent'}>Rent</option>
          <option value={'Entertainment'}>Entertainment</option>
          <option value={'Maintenance'}>Maintenance</option>
          <option value={'Utilities'}>Utilities</option>
          <option value={'Entertainment'}>Entertainment</option>
          <option value={'Other'}>Other</option>
        </NativeSelect>
        </Grid>
        <Grid item md={3}>
        <TextField
          placeholder='$200'
          id="shopping"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
        />
        </Grid>
        <Grid item md={6}>
          <Button id='btn' variant="contained" color="primary" onClick={handleClick}> Add budget </Button>
        </Grid>

        
        <Grid item md={3}>
        <div id='addOption'>
        {/* {activeOnClick()} */}
        </div>
        </Grid>
        <Grid item md={3}>

        <div id='addInput'>
        </div>
        
        </Grid>
        <Grid item md={3}>

        <div id='delBtn' variant="contained" color="primary" onClick={deleteData}>
        {/* {activeOnClick()} */}
        </div>
       
        </Grid>
        
        <br />
        </Grid>
        <br /><br />
      </FormControl>
      </Container>
    </div>
      </div>
    </Grid>
  </Grid>
);
};

