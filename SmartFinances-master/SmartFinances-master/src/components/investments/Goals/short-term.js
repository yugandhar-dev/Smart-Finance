import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { Container } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
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
    <Container maxWidth="sm">
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor='goals-term'>Goal Setting</InputLabel>
        <NativeSelect
          value={state.goal}
          onChange={handleChange}
          inputProps={{
            name: 'goal',
            id: 'goals-term',
          }}
        >
          {/* <option aria-label="Short Term" value="" /> */}
          <option value={10}>Short Term</option>
          <option value={20}>Long Term</option>
        </NativeSelect>
        {/* <FormHelperText>Select your duration</FormHelperText> */}
        <Grid container spacing={3}>
        <Grid item xs={6}>
          <p>Budget your spendings</p>
        </Grid>
        <Grid item xs={6}>
        <TextField
          id="standard-number"
          label="Income"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
        />
        </Grid>
        </Grid>

      </FormControl>
    </div>
    </Container>
  );

}
