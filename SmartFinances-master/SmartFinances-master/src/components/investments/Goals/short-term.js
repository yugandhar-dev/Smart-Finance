import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {List, TextField, Grid, Button, InputLabel, FormHelperText, FormControl, Select, NativeSelect, Paper, CssBaseline} from '@material-ui/core';
import { Container } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  container: {
    display: 'grid',
    gridTemplateColumns: 'repeat(12, 1fr)',
    gridGap: theme.spacing(3),
  },
  Paper: {
    margin: theme.spacing(8, 8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    alignContent: 'center',
    alignSelf: 'center',
    justifyItems: 'center',
  },
}));

export default function UserGoals() {
  const classes = useStyles();
  const [state, setState] = React.useState({
    age: '',
    name: 'goal',
  });

  const handleChange = (event) => {
    const name = event.target.name;
    setState({
      ...state,
      [name]: event.target.value,
    });
  };

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
      sm={10}
      md={10}
      component={Paper}
      elevation={10}
      square
    >
      <div className={classes.paper}>
      <div>
      <Container maxWidth="xs" justify="center">
      
      <FormControl className={classes.formControl}>
      
      <Grid container spacing={3}>
        <Grid item md={6}>
          <p>Budget your spendings</p>
        </Grid>

        <Grid item md={4}>
        <NativeSelect
          value={state.goal}
          onChange={handleChange}
          inputProps={{
            name: 'goal',
            id: 'goals-term',
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
        <Grid item md={4}>
        <TextField
          id="standard-number"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
        />
        </Grid>
        <Grid item md={6}>
        <NativeSelect
          value={state.goal}
          onChange={handleChange}
          inputProps={{
            name: 'budget',
            id: 'budget-list',
          }}
        >
          <option value={10}>Shopping</option>
          <option value={20}>Gas</option>
          <option value={30}>Groceries</option>
          <option value={40}>Eating Out</option>
          <option value={50}>Rent</option>
          <option value={60}>Entertainment</option>
          <option value={70}>Maintenance</option>
          <option value={80}>Utilities</option>
          <option value={90}>Entertainment</option>
          <option value={100}>Other</option>
        </NativeSelect>
        </Grid>
        <Grid item md={6}>
          <Button variant="contained" color="primary"> Add new budget </Button>
        </Grid>
        </Grid>
      </FormControl>
      </Container>
    </div>
      </div>
    </Grid>
  </Grid>
);
};

