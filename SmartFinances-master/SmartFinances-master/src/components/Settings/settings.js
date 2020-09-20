import React, { useState, useEffect } from "react";
import styled from "styled-components";
import {
	List,
	TextField,
	Grid,
	ListItem,
	Button,
	MenuItem,
	Select,
} from "@material-ui/core";
export default()=>{
    return(
        <Grid container justify="center">
            <List>
                <ListItem>
                    <a>UserName:</a>
                    <TextField>usertest@gmail.com</TextField>
                </ListItem>
                <ListItem>
                    <a>Mobile Number:</a>
                    <TextField>Enter Mobile Number</TextField>
                </ListItem>
                <ListItem>
                    <a>Password:</a>
                    <TextField>Password</TextField>
                </ListItem>
                <ListItem>
                    <a>Email:</a>
                    <Button>Contact Us to Change Email Address</Button>
                </ListItem>
            </List>
        </Grid>
    )
}