import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { ListItem, TextField } from "@material-ui/core";
import {
	getUserDetails,
	getReceiptValue,
	receiptTransaction,
} from "../../auth/index";
import { useWallet } from "../../context/wallet";

export default props => {
	const [message, setMessage] = useState();
	const [amount, setAmount] = useState();
	const [roundOffAmount, setRoundOffAmount] = useState("");
	const { walletReload, setWalletReload } = useWallet();
	const subcategory = "Upload receipt";
	let response = "";

	const uploadImage = async event => {
		setMessage(`Loading...`);
		const files = event.target.files;
		const formData = new FormData();
		formData.append("files", files[0]);
		const receiptValue = await getReceiptValue(formData).catch(ex =>
			setMessage(ex),
		);
		if (receiptValue.success) {
			setWalletReload(!walletReload);
			props.setReload(!props.reload);
			setAmount(receiptValue.value);
			setRoundOffAmount(
				parseFloat(parseFloat(5 - (receiptValue.value % 5)).toFixed(2)),
			);
			setMessage(
				`Receipt Upload successful. Your amount is ${receiptValue.value}`,
			);
		} else setMessage("Receipt upload unsuccessful. Please try again.");
	};

	const resetValues = () => {
		setAmount("");
		setRoundOffAmount("");
		setMessage("");
	};

	const addtoHistory = async () => {
		try {
			const userDetails = await getUserDetails();
			const data = {
				sourceAccountNumber: userDetails[0].accountNumber,
				amount,
				roundOffAmount,
				subcategory,
			};
			response = await receiptTransaction(data);
			if (response.Success) setMessage(response.Success);
			if (response.error) setMessage(response.error);
			setWalletReload(!walletReload);
			props.setReload(!props.reload);
		} catch (ex) {
			setMessage(`Something wrong, ${ex}`);
		}
	};

	return (
		<div>
			<Grid container justify='space-evenly'>
				<Grid item>
					<ListItem>
						Upload receipt to save in transaction history:
						<Button color='secondary' variant='outlined' component='label'>
							Upload File
							<input
								type='file'
								style={{ display: "none" }}
								onChange={uploadImage}
							/>
						</Button>
					</ListItem>
					<ListItem>
						Receipt Amount:
						<TextField
							size='small'
							variant='outlined'
							value={amount}
							disabled
						/>
					</ListItem>
					<ListItem>
						Roundoff Amount:
						<TextField
							size='small'
							variant='outlined'
							value={roundOffAmount}
							onChange={event => setRoundOffAmount(event.target.value)}
						/>
					</ListItem>
					<ListItem>
						<Grid container justify='space-evenly'>
							<Grid item>
								<Button
									variant='contained'
									color='primary'
									onClick={resetValues}
								>
									clear
								</Button>
							</Grid>
							<Grid item>
								<Button
									variant='contained'
									color='primary'
									onClick={addtoHistory}
								>
									Confirm
								</Button>
							</Grid>
						</Grid>
					</ListItem>
					<ListItem>{message}</ListItem>
				</Grid>
			</Grid>
		</div>
	);
};
