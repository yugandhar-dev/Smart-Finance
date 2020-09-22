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
} from "./../../../auth/index";

export default props => {
	const [noOfUnits, setNoOfUnits] = useState("");
	const [companies, setCompanies] = useState({});
	const [amount, setAmount] = useState();
	const [company, setCompany] = useState("");
	const [len, setLength] = useState();
	const [message, setMessage] = useState("");
	const investType = "exchangeTradedFunds";
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
				const calAmount = parseFloat(
					parseFloat(event * value.pricePerUnit).toFixed(2),
                );
				setAmount(calAmount);
				setMessage(
					`Your account gets credited with $${calAmount} if you buy  ${noOfUnits} no of units`,
				);
			}
		});
    };
    
    

	return (
		<Grid container justify='center'>
			<List>
				<ListItem>
					<h4>Exchange Traded Funds</h4>
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
				<button  >Invest</button>
				<button>Reset</button>
				<div>{message}</div>
			</List>
		</Grid>
	);
};
