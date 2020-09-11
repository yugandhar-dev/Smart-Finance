import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import { TextField, ListItem } from "@material-ui/core";
import { List } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import {
	getInvestmentOptions,
	getInvestmentDetails,
	sellInvestments,
	getUserDetails,
} from "../../../auth/index";
import { useWallet } from "../../../context/wallet";

export default props => {
	const [message, setMessage] = useState();
	const [units, setUnits] = useState("");
	const [amount, setAmount] = useState("");
	const [investmentType, setInvestmentType] = useState("");
	const { walletReload, setWalletReload } = useWallet();
	const [companyName, setCompanyName] = useState("");
	const [investmentTypes, setInvestmentTypes] = useState([]);
	const [companies, setCompanies] = useState({});
	const [availableUnits, setAvailableUnits] = useState(0.0);
	const [unitMsg, setUnitMsg] = useState("");
	let response = "";

	useEffect(() => {
		const fetchData = async () => {
			const userDetails = await getUserDetails();
			const investmentDetails = await getInvestmentDetails({
				walletAccountNumber: userDetails[0].walletAccountNumber,
			});

			const types = investmentDetails
				.map(({ investmentType }) => investmentType)
				.filter((value, index, arr) => arr.indexOf(value) === index);

			let comps = {};
			investmentDetails.forEach(({ investmentType, companyName }) =>
				comps[investmentType]
					? comps[investmentType].push(companyName)
					: (comps[investmentType] = [companyName]),
			);

			setInvestmentTypes(types);
			setCompanies(comps);
		};
		fetchData();
	}, []);

	const onCompanyChange = async event => {
		setCompanyName(event.target.value);
		await getAvailableUnits(investmentType, event.target.value);
	};

	const calculateAmount = async () => {
		const data = {
			investmentType,
			companyName,
		};
		const options = await getInvestmentOptions(data);
		if (investmentType !== "savingScheme") {
			const creditAmount = parseFloat(
				parseFloat(units * options[0].pricePerUnit).toFixed(2),
			);
			setAmount(creditAmount);
			setMessage(
				`Your account gets credited with $${creditAmount} if you sell  ${units} no of units`,
			);
		} else {
			const userDetails = await getUserDetails();
			const data = {
				walletAccountNumber: userDetails[0].walletAccountNumber,
			};
			const userInvestments = await getInvestmentDetails(data);

			userInvestments.forEach(details => {
				if (
					companyName == details.companyName &&
					investmentType == details.investmentType
				) {
					const dateDiff = new Date() - new Date(details.createdDate);
					const noOfDays = dateDiff / (1000 * 60 * 60 * 24);
					const prorata =
						parseFloat(options[0].percentageOfReturns) * (noOfDays / 365);
					const creditAmount = parseFloat(
						(parseFloat(details.amountInvested) /
							parseFloat(details.numberOfUnits)) *
							parseFloat(units) *
							(1 + prorata / 100),
					).toFixed(2);
					setAmount(creditAmount);
					setMessage(
						`Your account gets credited with $${creditAmount} if you sell  ${units} no of units`,
					);
				}
			});
		}
	};

	const calculateUnits = async value => {
		if (investmentType !== "savingScheme") {
			const data = {
				investmentType,
				companyName,
			};
			const options = await getInvestmentOptions(data);
			const noOfUnits = parseFloat(
				parseFloat(value / options[0].pricePerUnit).toFixed(2),
			);
			setUnits(noOfUnits);
			setAmount(value);
			setMessage(
				`Your account gets credited with $${value} if you sell  ${noOfUnits} no of units`,
			);
		} else {
			const data = {
				investmentType,
				companyName,
			};
			const options = await getInvestmentOptions(data);
			const noOfUnits = parseFloat(
				parseFloat(
					value / (value + value * options[0].percentageOfReturns),
				).toFixed(2),
			);
			setUnits(noOfUnits);
			setAmount(value);
			setMessage(
				`Your account gets credited with $${value} if you sell  ${noOfUnits} no of units`,
			);
		}
	};

	const getAvailableUnits = async (investmentType, companyName) => {
		const userDetails = await getUserDetails();
		const investmentDetails = await getInvestmentDetails({
			walletAccountNumber: userDetails[0].walletAccountNumber,
		});
		investmentDetails.forEach(value => {
			if (
				investmentType === value.investmentType &&
				companyName === value.companyName
			) {
				setAvailableUnits(parseFloat(value.numberOfUnits).toFixed(2));
				setUnitMsg(`you have ${value.numberOfUnits} units in your account`);
			}
		});
	};

	const setNoOfUnits = event => {
		if (parseFloat(event.target.value) > availableUnits) {
			setMessage(
				`Your only have  ${availableUnits} no of units, please enter less number of units`,
			);
		} else {
			setMessage();
			setUnits(event.target.value);
		}
	};

	const sell = async () => {
		setMessage();
		try {
			const userDetails = await getUserDetails();
			const data = {
				walletAccountNumber: userDetails[0].walletAccountNumber,
				investmentType,
				companyName,
				numberOfUnits: units,
			};

			response = await sellInvestments(data);
			if (response.Success) setMessage(response.Success);
			if (response.error) setMessage(response.error);
			setWalletReload(!walletReload);
			props.setReload(!props.reload);
		} catch (ex) {
			setMessage(`Something wrong, ${ex}`);
		}
	};

	const resetValues = () => {
		setUnits("");
		setAmount("");
	};

	return (
		<Grid container justify='center'>
			<List maxwidth='sm'>
				<ListItem>Choose the investment type:</ListItem>
				<ListItem size='small'>
					<Select
						style={{ margin: "4px", padding: "0px 20px" }}
						variant='outlined'
						labelId='investment-options'
						id='investments'
						onChange={e => setInvestmentType(e.target.value)}
					>
						{investmentTypes && investmentTypes.length > 0 ? (
							investmentTypes.map((val, index) => (
								<MenuItem key={index} value={val}>
									{val}
								</MenuItem>
							))
						) : (
							<MenuItem selected='selected' value={"No Investments Found"}>
								No Investments Found
							</MenuItem>
						)}
					</Select>
				</ListItem>
				<ListItem>Choose the company:</ListItem>
				<ListItem>
					<Select
						style={{ margin: "2px", padding: "0px 5px" }}
						variant='outlined'
						style={{ padding: "0px 40px" }}
						labelId='companies'
						id='companies'
						disabled={
							investmentType == "" || investmentType == "No Investments Found"
						}
						onChange={onCompanyChange}
					>
						{companies &&
						Object.keys(companies).length > 0 &&
						!!investmentType ? (
							companies[investmentType].map((val, index) => (
								<MenuItem key={index} value={val}>
									{val}
								</MenuItem>
							))
						) : (
							<MenuItem />
						)}
					</Select>
				</ListItem>
				<ListItem>
					<div>{unitMsg}</div>
				</ListItem>
				<ListItem>Enter number of units you want to sell:</ListItem>
				<ListItem>
					<TextField
						style={{ margin: "2px" }}
						size='small'
						label='No of units'
						variant='outlined'
						value={units}
						onChange={setNoOfUnits}
					/>
					<Grid container justify='space-evenly'>
						<Grid item>
							<Button
								variant='contained'
								color='primary'
								onClick={calculateAmount}
							>
								Calculate amount
							</Button>
						</Grid>
					</Grid>
				</ListItem>
				<ListItem>Amount:</ListItem>
				<ListItem>
					<TextField
						style={{ margin: "2px" }}
						size='small'
						label='Amount'
						variant='outlined'
						value={amount}
						disabled={investmentType === "savingScheme"}
						onChange={event => calculateUnits(event.target.value)}
					/>
				</ListItem>
				<ListItem>
					<Grid container justify='space-evenly'>
						<Grid item>
							<Button variant='contained' color='primary' onClick={resetValues}>
								Reset
							</Button>
						</Grid>
						<Grid item>
							<Button variant='contained' color='primary' onClick={sell}>
								Sell
							</Button>
						</Grid>
					</Grid>
				</ListItem>
				<p style={{ color: "green" }}>{JSON.stringify(message)}</p>
			</List>
		</Grid>
	);
};
