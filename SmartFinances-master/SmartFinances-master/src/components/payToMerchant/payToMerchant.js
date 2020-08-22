import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import { TextField, ListItem } from "@material-ui/core";
import { getUserDetails, payToMerchant } from "../../auth/index";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { List } from "@material-ui/core";

export default () => {
	const [amount, setAmount] = useState("");
	const [payeename, setPayeename] = useState("");
	const [payeeaccount, setPayeeaccount] = useState("");
	const [roundOffAmount, setRoundOffAmount] = useState("");
	const [message, setMessage] = useState("");
	const [otp, setOTP] = useState("");
	let response = "";

	const getAmount = value => {
		setAmount(value);
		setRoundOffAmount(parseFloat(parseFloat(5 - (value % 5)).toFixed(2)));
	};

	const resetValues = () => {
		setAmount("");
		setPayeename("");
		setPayeeaccount("");
		setRoundOffAmount("");
		setMessage("");
	};

	const payAmount = async () => {
		setMessage();
		if (otp == 220292) {
			try {
				const userDetails = await getUserDetails();
				const data = {
					sourceAccountNumber: userDetails[0].accountNumber,
					destinationAccountNumber: payeeaccount,
					amount,
					roundOffAmount,
				};
				response = await payToMerchant(data);
				if (response.Success) setMessage(response.Success);
				if (response.error) setMessage(response.error);
			} catch (ex) {
				setMessage(`Something wrong, ${ex}`);
			}
		} else {
			setMessage("Reenter OTP");
		}
	};
	const validateInput = () =>
		payeeaccount.toString().length < 3 ||
		parseFloat(amount) <= 0 ||
		amount <= 0 ||
		otp.toString().length < 1;

	return (
		<Grid container justify="center">
			<List maxWidth="sm">
				<ListItem style={{ display: "flex", justifyContent: "center" }}>
					<Typography component="h1" variant="h5">
						ENTER DETAILS
					</Typography>
				</ListItem>

				<ListItem>
					<TextField
						size="small"
						label="Merchant name"
						variant="outlined"
						value={payeename}
						onChange={event => setPayeename(event.target.value)}
					/>
				</ListItem>
				<ListItem>
					<TextField
						size="small"
						label="Merchant account number"
						variant="outlined"
						value={payeeaccount}
						onChange={event => setPayeeaccount(event.target.value)}
					/>
				</ListItem>
				<ListItem>
					<TextField
						size="small"
						label="Amount"
						variant="outlined"
						value={amount}
						onChange={event => getAmount(event.target.value)}
					/>
				</ListItem>
				<ListItem>
					<TextField
						size="small"
						label="Roundoff Amount"
						variant="outlined"
						value={roundOffAmount}
						onChange={event => setRoundOffAmount(event.target.value)}
					/>
				</ListItem>
				<ListItem>
					<TextField
						size="small"
						label="OTP"
						variant="outlined"
						value={otp}
						onChange={event => setOTP(event.target.value)}
					/>
				</ListItem>

				<ListItem>
					<Grid container justify="space-evenly">
						<Grid item>
							<Button variant="contained" color="primary" onClick>
								Generate OTP
							</Button>
						</Grid>
					</Grid>
				</ListItem>
				<ListItem>
					<Grid container justify="space-evenly">
						<Grid item>
							<Button variant="contained" color="primary" onClick={resetValues}>
								Cancel
							</Button>
						</Grid>
						<Grid item>
							<Button
								variant="contained"
								color="primary"
								onClick={payAmount}
								disabled={validateInput()}
							>
								Pay
							</Button>
						</Grid>
					</Grid>
				</ListItem>
				<ListItem>
					<div>{message}</div>
				</ListItem>
			</List>
		</Grid>
	);
};
