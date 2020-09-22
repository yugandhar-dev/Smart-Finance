const userBalance = require("../../models/balance");
const newTransaction = require("../../models/newTransaction");

exports.UserPayToMerchant = async (req, res) => {
	const sourceAccountNumber = req.body.sourceAccountNumber;
	const destinationAccountNumber = req.body.destinationAccountNumber;
	const amount = parseFloat(req.body.amount);
	const roundOffAmount = parseFloat(req.body.roundOffAmount);
	const subcategory = req.body.subcategory;
	let sourceUser;
	let destinationUser;

	// validations
	try {
		sourceUser = await userBalance
			.findOne({ accountNumber: sourceAccountNumber })
			.exec();
	} catch (err) {
		return res.status(400).json({
			error: err,
		});
	}

	if (!sourceUser) {
		return res.status(400).json({
			error: "Error fetching user details",
		});
	}

	if (amount + roundOffAmount > sourceUser.accountBalance) {
		return res.status(400).json({
			error: "Insufficient funds in your account",
		});
	}

	try {
		destinationUser = await userBalance
			.findOne({ accountNumber: destinationAccountNumber })
			.exec();
	} catch (err) {
		return res.status(400).json({
			error: "Error fetching merchant details",
		});
	}

	if (!destinationUser) {
		return res.status(400).json({
			error: "No merchant exists with this account number",
		});
	}

	//deduct spent(sale+roundoff) amount from source user bank balance
	//add round off amount to source user wallet balance
	try {
		await userBalance
			.updateOne(
				{ accountNumber: sourceAccountNumber },
				{
					accountBalance: parseFloat(
						parseFloat(
							sourceUser.accountBalance - amount - roundOffAmount,
						).toFixed(2),
					),
					walletAccountBalance: parseFloat(
						parseFloat(
							sourceUser.walletAccountBalance + roundOffAmount,
						).toFixed(2),
					),
				},
			)
			.exec();
	} catch (err) {
		return res.status(400).json({
			error: "Error updating balances",
		});
	}

	//add sale amount to destination user bank account
	try {
		await userBalance
			.updateOne(
				{ accountNumber: destinationAccountNumber },
				{
					accountBalance: parseFloat(
						parseFloat(destinationUser.accountBalance + amount).toFixed(2),
					),
				},
			)
			.exec();
	} catch (err) {
		return res.status(400).json({
			error: "Payment error",
		});
	}

	//Creating JSON to save transaction
	const transaction = {
		walletAccountNumber: sourceUser.walletAccountNumber,
		category: "Shopping",
		subcategory: subcategory,
		amount: amount,
		roundedAmount: roundOffAmount,
		date: new Date()
	}

	const saveTransaction = new newTransaction(transaction);

	try {
		//Save transaction to new Transactions collection
		const details = await saveTransaction.save();
		console.log(details, "line 111")

	} catch (error) {
		return res.status(400).json({
			error: "Unable to save transaction",
		});
	}

	// success reponse
	res.status(200).json({
		Success: "Wallet Balances are updated",
	});
};
