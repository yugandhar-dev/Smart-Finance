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
import {Pencil} from "@styled-icons/boxicons-regular/Pencil";

export default()=>{
    return(
        <Grid container justify="center">
            <List>
                <ListItem>
                    <td><a>UserName:</a></td>
                    <td><TextField>usertest@gmail.com</TextField></td>
                </ListItem>
                <ListItem>
                    <a>Mobile Number:</a>
                    <TextField>Enter Mobile Number</TextField>
                    <Pencil size="25" />
                </ListItem>
                <ListItem>
                    <a>Password:</a>
                    <TextField>Password</TextField>
                    <Pencil size="25" />
                </ListItem>
                <ListItem>
                    <a>Email:</a>
                    <Button>Contact Us to Change Email Address</Button>
                </ListItem>
                <ListItem>
                    <Button variant="contained" color="primary">Update</Button>
                </ListItem>
            </List>
        </Grid>
    )
}