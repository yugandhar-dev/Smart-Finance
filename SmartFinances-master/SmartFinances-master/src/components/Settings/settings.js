import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import { List, TextField, Grid, ListItem, Button } from "@material-ui/core";
import {
	getUserDetails,
	getProfileSettings,
	getEmailId,
	getUserPhoneNumber,
} from "../../auth/index";
import { Pencil } from "@styled-icons/boxicons-regular/Pencil";

const Message = styled.p`
	color: green;
	${props =>
		props.error &&
		css`
			color: red;
		`}
`;

export default () => {
	const [open, setOpen] = useState(false);
	const [openn, setOpenn] = useState(false);
	const [error, setError] = useState("");
	const [currentpassword, setCurrentpassword] = useState("");
	const [newpassword, setNewpassword] = useState("");
	const [phonenumber, setPhonenumber] = useState("");
	const [newphonenumber, setNewPhonenumber] = useState("");
	const [message, setMessage] = useState("");
	const [emailId, setemailId] = useState("");
	const [accNumber, setAccNumber] = useState("");

	const getCurrentPassword = value => {
		setCurrentpassword(value);
	};
	const getNewPassword = value => {
		setNewpassword(value);
	};
	const getPhonenumber = value => {
		setNewPhonenumber(value);
	};

	const changePwd = (
		<div>
			<ListItem>
				<TextField
					label='Current Password'
					type='password'
					required='required'
					value={currentpassword}
					onChange={event => getCurrentPassword(event.target.value)}
				>
					Current Password
				</TextField>
			</ListItem>
			<ListItem>
				<TextField
					label='New Password'
					type='password'
					required='required'
					value={newpassword}
					onChange={event => getNewPassword(event.target.value)}
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
					label='New Mobile Number'
					value={newphonenumber}
					onChange={event => getPhonenumber(event.target.value)}
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
		const data = {
			useraccountNumber: accNumber,
			userphoneNumber: newphonenumber,
		};
		const res = await getProfileSettings(data);
		res.error ? setError(res.error + " Please try again") : setError(null);
		setCurrentpassword("");
		setNewpassword("");
        setNewPhonenumber("");
        const userDetails = await getUserDetails();
        const email = await getEmailId(userDetails[0].accountNumber);
        const phNo = await getUserPhoneNumber(email.emailId);
		setPhonenumber(phNo.phoneNumber);
	};

	return (
		<Grid container justify='center'>
			<List>
				<ListItem>
					<a>UserName:</a>
					<div>{emailId}</div>
				</ListItem>
				<ListItem>
					<a>Mobile Number:</a>
					<TextField name='phonenumber' value={phonenumber} />
					<Pencil size='25' onClick={() => setOpenn(!openn)} />
				</ListItem>
				{openn && changeMobile}
				<ListItem>
					<a>Password:</a>
					<TextField>Password</TextField>
					<Pencil size='25' onClick={() => setOpen(!open)} />
				</ListItem>
				{open && changePwd}
				<ListItem>
					<a>Email:</a>
					<Button>Contact Us to Change Email Address</Button>
				</ListItem>
				<ListItem>
					<Button variant='contained' color='primary' onClick={Update}>
						Update
					</Button>
				</ListItem>
			</List>
			{error != "" && error == null ? (
				<Message>Your profile is Successfully Updated</Message>
			) : (
				<Message error>{error}</Message>
			)}
		</Grid>
	);
};
