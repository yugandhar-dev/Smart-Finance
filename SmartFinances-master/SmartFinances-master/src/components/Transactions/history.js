import React, { useState, useEffect } from "react";
import { getTransactionHistory, getUserDetails } from "../../auth/index";
import Datatable from "./datatable";

export default () => {
	const [rows, setRows] = useState([]);
	const [toggle, setToggle] = useState(false);
	const [zeroRecords, setZeroRecords] = useState(false);
	useEffect(() => {
		const fetchData = async () => {
			const userDetails = await getUserDetails();
			try {
				const history = await getTransactionHistory({
					walletAccountNumber: userDetails[0].walletAccountNumber,
				});
				if (!history["error"]) {
					setRows(history);
					setToggle(!toggle);
				} else {
					if (history["error"] == "No User Transactions Found")
						setZeroRecords(true);
					setToggle(!toggle);
				}
			} catch (ex) {
				console.log(ex);
			}
		};
		fetchData();
	}, []);

	return (
		<div>
			{rows && rows != [] ? (
				<Datatable history={rows} toggle={toggle} zeroRecords={zeroRecords} />
			) : (
				""
			)}
		</div>
	);
};
