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
import {
	getInvestmentOptions,
	getInvestmentDetails,
	getInvestmentCompanies,
} from "./../../auth/index";
import Lowrisk from "./Lowrisk";

export default props => {
	const [noOfUnits, setNoOfUnits] = useState("");
	const [companies, setCompanies] = useState({});
	const [amount, setAmount] = useState();
	const [company, setCompany] = useState("");
	const [len, setLength] = useState();
	const [message, setMessage] = useState("");
	const investType = "lowRiskFund";
	let investmentDetails;

	useEffect(() => {
		const fetchData = async () => {
			const data = {
				investmentType: investType,
			};
			investmentDetails = await getInvestmentCompanies(data);

			let comps = {};
			let comp = [];
			investmentDetails.map(val => {
				comp.push(val.companyName);
			});
			comps = { comp };
			console.log(comps, "line 49");
			setCompanies(comps);
			setLength(comp.length);
		};
		fetchData();
	}, []);

	const getCompany = event => {
		setCompany(event.target.value);
	};

	const calculateAmount = async event => {
		setNoOfUnits(event);
		const data = {
			investmentType: investType,
		};
		investmentDetails = await getInvestmentCompanies(data);
		investmentDetails.map(value => {
			if (value.companyName === company) {
				const creditAmount = parseFloat(
					parseFloat(event * value.pricePerUnit).toFixed(2),
				);
				setAmount(creditAmount);
				setMessage(
					`Your account gets credited with $${creditAmount} if you sell  ${noOfUnits} no of units`,
				);
			}
		});
    };
    
    const buyFunds = async () => {
        //logic - to be written by Monica
    }

	return (
		<Grid container justify='center'>
			<List>
				<ListItem>
					<h4>Low Risk Investments</h4>
				</ListItem>
				<ListItem>
					<a>Select company:</a>
					<Select
						style={{ margin: "2px", padding: "0px 5px" }}
						variant='outlined'
						style={{ padding: "0px 40px" }}
						labelId='companies'
						id='companies'
						onChange={getCompany}
					>
						{companies.comp && len > 0 ? (
							companies.comp.map((val, index) => (
								<MenuItem key={index} value={val}>
									{val}
								</MenuItem>
							))
						) : (
							<MenuItem selected='selected' value={"No Investments Found"}>
								No Companies Found
							</MenuItem>
						)}
					</Select>
				</ListItem>
				<br />
				<ListItem>
					<a>Enter Number of Units: </a>
					<TextField
						placeholder='Units'
						onChange={event => calculateAmount(event.target.value)}
					/>
				</ListItem>
				<ListItem>
					<a>Amount:</a>
					<TextField value={amount} />
				</ListItem>
				<Grid container justify='space-evenly'>
						<Grid item>
							<Button variant='contained' color='primary' >
								Reset
							</Button>
						</Grid>
						<Grid item>
							<Button variant='contained' color='primary'>
								Sell
							</Button>
						</Grid>
					</Grid>
				<div>{message}</div>
			</List>
		</Grid>
	);
};
