const usersWalletBalance = require("../../models/balance");
const userInvestments = require("../../models/userInvestments");
const investmentOptions = require("../../models/investmentOptions");
const transaction = require("../../models/newTransaction");

exports.InvestmentSell = async (req, res) => {
	let calculateAmount;
	let amountInvested;
	let updatedNumberOfUnits;
	const now = new Date();

	// Query for retrieving user information from all tables according to the request
	const query = {
		walletAccountNumber: req.body.walletAccountNumber,
		investmentType: req.body.investmentType,
		companyName: req.body.companyName,
	};

	// Finding user current investments
	const user = await userInvestments
		.findOne(query)
		.exec()
		.catch(() => null);

	// Validations for retrieval of user investment details
	if (!user) {
		return res.status(400).json({
			error: "Not able to find the user Information",
		});
	} else if (req.body.numberOfUnits > user.numberOfUnits) {
		return res.status(400).json({
			error: "Number of units entered is greater than available units",
		});
	}

	// Finding current price per unit from investment option details collection
	const investmentDetails = await investmentOptions
		.findOne({
			investmentType: req.body.investmentType,
			companyName: req.body.companyName,
		})
		.exec()
		.catch(() => null);

	if (!investmentDetails) {
		return res.status(400).json({
			error: "It was unable to find the investment details",
		});
	}

	if (user.investmentType === "savingScheme") {
		const dateDiff = new Date() - new Date(user.createdDate);
		const noOfDays = dateDiff / (1000 * 60 * 60 * 24);
		const pricePerUnit =
			parseFloat(user.amountInvested) / parseFloat(user.numberOfUnits);
		const prorata =
			parseFloat(investmentDetails.percentageOfReturns) * (noOfDays / 365);

		calculateAmount = parseFloat(
			pricePerUnit * parseFloat(req.body.numberOfUnits * (1 + prorata / 100)),
		).toFixed(2);
		updatedNumberOfUnits = parseFloat(
			user.numberOfUnits - req.body.numberOfUnits,
		).toFixed(2);
		amountInvested = parseFloat(updatedNumberOfUnits * pricePerUnit).toFixed(2);
	} else {
		calculateAmount = parseFloat(
			parseFloat(
				req.body.numberOfUnits * investmentDetails.pricePerUnit,
			).toFixed(2),
		);
		updatedNumberOfUnits = user.numberOfUnits - req.body.numberOfUnits;
		amountInvested = parseFloat(
			parseFloat(updatedNumberOfUnits * investmentDetails.pricePerUnit).toFixed(
				2,
			),
		);
	}

	const userInvestment = await userInvestments
		.updateOne(query, {
			numberOfUnits: updatedNumberOfUnits,
			amountInvested: parseFloat(amountInvested).toFixed(2),
		})
		.exec()
		.catch(() => null);

	if (!userInvestment) {
		return res.status(400).json({
			error: "It was unable to update the user investment",
		});
	}

	// Finding balances of user using wallet account number from balances table
	const userBalance = await usersWalletBalance
		.findOne({
			walletAccountNumber: req.body.walletAccountNumber,
		})
		.exec()
		.catch(() => null);

	if (!userBalance) {
		res.status(400).json({
			error: "Not able to fetch the details of user balances",
		});
	}

	userBalance.walletAccountBalance += parseFloat(calculateAmount);
	userBalance[req.body.investmentType] = parseFloat(
		parseFloat(userBalance[req.body.investmentType]) -
			parseFloat(calculateAmount),
	).toFixed(2);
	userBalance.totalfunds = parseFloat(
		parseFloat(userBalance.totalfunds) - parseFloat(calculateAmount),
	).toFixed(2);

	// Saving the updated balances of user in balances collection
	try {
		await userBalance.save();
	} catch (err) {
		res.status(400).json({
			error: err,
		});
	}

	//Creating JSON to save wallet transaction
	const detail = {
		walletAccountNumber: req.body.walletAccountNumber,
		category: "Investments",
		subcategory: "Investment sold",
		amount: calculateAmount,
		date: now,
	
	  }
	  
	  //Creating JSON to save investment transaction
	//   const investmentTransaction = {
	// 	walletAccountNumber: req.body.walletAccountNumber,
	// 	category: req.body.category,
	// 	subcategory: "investmentToWallet",
	// 	amount: calculateAmount,
	// 	date: now,
	
	//   }
	
	  
	  const history = new transaction(detail);
	//   const saveInvestmentTransaction = new transaction(investmentTransaction);
		try{
		//Saving wallet transaction to new transactions collection 
		  await history.save();
		//Saving investment transaction to new transactions collection
		//   await saveInvestmentTransaction.save();
		}catch(error){
		  return res.status(400).json({
			error: "Unable to save transaction"
		  });
		}

	return res.status(200).json({
		Success: "Sold successfully and your balances are updated",
	});
};
