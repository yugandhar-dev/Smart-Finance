import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { ListItem, TextField } from "@material-ui/core";
import { getReceiptValue } from "../../auth/index";

export default () => {
	const [message, setMessage] = useState();
	const uploadImage = async event => {
		setMessage(`Loading...`);
		const files = event.target.files;
		const formData = new FormData();
		formData.append("files", files[0]);
		const receiptValue = await getReceiptValue(formData).catch(ex =>
			setMessage(ex),
		);
		if (receiptValue.success)
			setMessage(
				`Receipt Upload successful. Your amount is ${receiptValue.value}`,
			);
		else setMessage("Receipt upload unsuccessful. Please try again.");
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
					<ListItem>{message}</ListItem>
				</Grid>
			</Grid>
		</div>
	);
};
