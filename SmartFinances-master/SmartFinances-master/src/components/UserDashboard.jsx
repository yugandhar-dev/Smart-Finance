import React, { useState, useEffect } from "react";
import Investments from "./investments/Investments";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { getUserDetails } from "../auth/index";
import { Doughnut } from "react-chartjs-2";
import { Table } from "react-bootstrap";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import "./App.css";
import PayMerchant from "./payToMerchant/payToMerchant";
import WalletDetails from "./WalletDetails";
import { WalletContext } from "../context/wallet";
import UploadReceipt from "./uploadReceipt/uploadReceipt";
import Settings from "./Settings/settings";
import History from "./Transactions/history";
import Trend from "./../components/investments/Lowriskinvest";

const useStyles = makeStyles(theme => ({
	root: {
		flexGrow: 1,
	},
	menuButton: {
		marginRight: theme.spacing(2),
	},
	title: {
		flexGrow: 1,
	},
	walletdiv: {
		width: "50px",
	},

	tab: {
		backgroundColor: "blue",
		border: "none",
		"&:active": {
			outline: "none",
			margin: 0,
		},
		"&:focus": {
			outline: "none",
			margin: 0,
		},

		"&:hover": {
			outline: "none",
			margin: 0,
		},
		"&:visited": {
			outline: "none",
			margin: 0,
		},
		selected: {
			backgroundColor: "blue",
			margin: 0,
		},
	},
}));

function TabPanel(props) {
	const { children, value, index, ...other } = props;

	return (
		<Typography
			component='div'
			role='tabpanel'
			hidden={value !== index}
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
			{...other}
		>
			{value === index && (
				<Box p={3} border={0}>
					{children}
				</Box>
			)}
		</Typography>
	);
}

export default props => {
	const classes = useStyles();
	const [value, setValue] = React.useState(0);
	const [error, setError] = useState("");
	const [response, setResponse] = useState("");
	const [reload, setReload] = useState(true);
	const [walletReload, setWalletReload] = useState(true);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	useEffect(() => {
		getUserDetails()
			.then(data => {
				if (data.error) {
					setError(data.error);
				} else {
					setResponse(data[0]);
				}
			})
			.catch(ex => console.log("Fund Details Retrieval error", ex));
	}, [reload]);

	return (
		<div>
			<div>
				<WalletContext.Provider value={{ walletReload, setWalletReload }}>
					<AppBar position='static'>
						<Toolbar>
							<IconButton
								edge='start'
								className={classes.menuButton}
								color='inherit'
								aria-label='menu'
							>
								<MenuIcon />
							</IconButton>
							<Typography variant='h6' className={classes.title}>
								Smart Finance
							</Typography>
							<Button color='inherit' onClick={props.logout}>
								Logout
							</Button>
						</Toolbar>
						<Tabs
							value={value}
							onChange={handleChange}
							aria-label='simple tabs example'
							centered
						>
							<Tab classname={classes.tab} label='Portfolio' />
							<Tab classname={classes.tab} label='Pay Merchant' />
							<Tab classname={classes.tab} label='Upload Receipt' />
							<Tab classname={classes.tab} label='Investments' />
							<Tab classname={classes.tab} label='Investment Trends' />
							<Tab classname={classes.tab} label='User Settings' />
							<Tab classname={classes.tab} label='Transaction History' />
						</Tabs>
					</AppBar>
					<TabPanel value={value} index={0}>
						<Grid
							container
							direction='column'
							justify='center'
							alignItems='stretch'
							component={Paper}
						>
							<Table marginHeight='sm'>
								<tbody>
									<tr>
										<td>
											<Typography variant='h6' fontWeight='bold'>
												<p>
													<font color='#b80000'>
														Account Number:
														<font color='#1273de'>
															{JSON.stringify(response.accountNumber)}
														</font>
													</font>
												</p>
											</Typography>
											<Typography variant='h6' fontWeight='bold'>
												<p>
													<font color='#b80000'>
														Account Balance:
														<font color='#1273de'>
															${JSON.stringify(response.accountBalance)}
														</font>
													</font>
												</p>
											</Typography>
											<Typography variant='h6' fontWeight='bold'>
												<p>
													<font color='#b80000'>
														Total Investments:
														<font color='#1273de'>
															$
															{parseFloat(
																response.lowRiskFund +
																	response.exchangeTradedFund +
																	response.savingScheme,
															).toFixed(2)}
														</font>
													</font>
												</p>
											</Typography>
											<Typography fontWeight='bold'>
												<p>
													<font color='#f44336'>
														Low Risk Fund Investments:
														<font color='#1273de'>
															${JSON.stringify(response.lowRiskFund)}
														</font>
													</font>
												</p>
											</Typography>
											<Typography fontWeight='bold'>
												<p>
													<font color='#4caf50'>
														Exchange Traded Funds:
														<font color='#1273de'>
															${JSON.stringify(response.exchangeTradedFund)}
														</font>
													</font>
												</p>
											</Typography>
											<Typography fontWeight='bold'>
												<p>
													<font color='#ff9800'>
														Savings Schemes:
														<font color='#1273de'>
															${JSON.stringify(response.savingScheme)}
														</font>
													</font>
												</p>
											</Typography>
										</td>
										<td>
											<div>
												<Doughnut
													data={{
														labels: [
															"Low Risk Investments",
															"Exchange Traded Funds",
															"Savings Schemes",
														],
														datasets: [
															{
																data: [
																	response.lowRiskFund,
																	response.exchangeTradedFund,
																	response.savingScheme,
																],
																backgroundColor: [
																	"#F7464A",
																	"#46BFBD",
																	"#FDB45C",
																	// "#949FB1",
																	// "#4D5360",
																],
																hoverBackgroundColor: [
																	"#FF5A5E",
																	"#5AD3D1",
																	"#FFC870",
																	// "#A8B3C5",
																	// "#616774",
																],
															},
														],
													}}
													options={{ responsive: true }}
												/>
											</div>
										</td>
										<div className={classes.walletdiv}>
											<WalletDetails reload={walletReload} />
										</div>
									</tr>
								</tbody>
							</Table>
						</Grid>
					</TabPanel>
					<TabPanel value={value} index={1}>
						<WalletDetails reload={walletReload} />
						<PayMerchant reload={reload} setReload={setReload} />
						{/* {payMerchant} */}
					</TabPanel>
					<TabPanel value={value} index={2}>
						<WalletDetails reload={walletReload} />

						<UploadReceipt reload={reload} setReload={setReload} />
					</TabPanel>
					<TabPanel value={value} index={3}>
						<WalletDetails reload={walletReload} />
						<Investments reload={reload} setReload={setReload} />
					</TabPanel>
					<TabPanel value={value} index={4}>
						<Trend />
						{/* </Trend> </WalletContext.Provider>/reload={reload} setReload={setReload} /> */}
					</TabPanel>
					<TabPanel value={value} index={5}>
						<WalletDetails reload={walletReload} />
						<Settings reload={reload} setReload={setReload} />
					</TabPanel>
					<TabPanel value={value} index={6}>
						<History reload={reload} setReload={setReload} />
					</TabPanel>
				</WalletContext.Provider>
			</div>
		</div>
	);
};
