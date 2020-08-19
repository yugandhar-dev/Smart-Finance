import React, { useState } from "react";
import styled, { css } from "styled-components";
import { Wallet } from "@styled-icons/entypo/Wallet";
import { Calculator } from "@styled-icons/boxicons-solid/Calculator";
import { Funds } from "@styled-icons/remix-fill/Funds";
import { HandHoldingUsd } from "@styled-icons/fa-solid/HandHoldingUsd";
import { MoneyCheckAlt } from "@styled-icons/fa-solid/MoneyCheckAlt";
import { Plus } from "@styled-icons/evaicons-solid/Plus";
import { Minus } from "@styled-icons/boxicons-regular/Minus";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import OTP from "./OTP";



const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },

  paper: {
    margin: theme.spacing(8, 8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    alignContent: "center",
    alignSelf: "center",
    justifyItems: "center",
  },
  avatar: {
    margin: theme.spacing(1), //tilting the page up and down
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  control: {
    padding: theme.spacing(2),
  },
}));




function Success() {
  

 

 
  const classes = useStyles();
  return (
    <div>
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
                <Typography component="h1" variant="h5">
                  SUCCESS
            </Typography>
            </div>
            </Grid>
            </Grid>
    </div>

  );
}


export default Success;
