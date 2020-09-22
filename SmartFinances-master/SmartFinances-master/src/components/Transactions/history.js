import React, { useState, useEffect } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import { getTransactionHistory, getUserDetails } from "../../auth/index";

const useStyles = makeStyles(theme => ({
	paper: {
		margin: theme.spacing(8, 8),
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		alignContent: "center",
		alignSelf: "center",
		justifyItems: "center",
	},
}));

export default () => {
	const [rows, setRows] = useState([]);
	useEffect(() => {
		const fetchData = async () => {
			const userDetails = await getUserDetails();
			try {
				const history = await getTransactionHistory({
					walletAccountNumber: userDetails[0].walletAccountNumber,
                });
                setRows(history)
                console.log(history);
			} catch (ex) {
				console.log(ex);
			}
		};
		fetchData();
	}, []);

	return (
		<TableContainer component={Paper}>
			<Table aria-label='collapsible table'>
				<TableHead>
					<TableRow>
						<TableCell align='center'>Date</TableCell>
						{/* <TableCell align='center'>Transaction Description</TableCell> */}
						<TableCell align='center'>Amount</TableCell>
						<TableCell align='center'>Rounded amount</TableCell>
						<TableCell align='center'>Category</TableCell>
						<TableCell align='center'>Sub-Category</TableCell>
						{/* <TableCell /> */}
					</TableRow>
				</TableHead>
				<TableBody>
					{rows.map(row => (
					<TableRow>
						<TableCell align='center'>{row['date'] ? row['date'].split('GMT')[0].trim(): ''}</TableCell>
						<TableCell align='center'>{row['amount'] ? row['amount']: 0}</TableCell>
						<TableCell align='center'>{row['roundedAmount'] ? row['roundedAmount']: 0}</TableCell>
						<TableCell align='center'>{row['category'] ? row['category']: ''}</TableCell>
						<TableCell align='center'>{row['subcategory'] ? row['subcategory']: ''}</TableCell>
                    </TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
};
