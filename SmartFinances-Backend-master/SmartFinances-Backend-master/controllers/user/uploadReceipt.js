const userBalance = require("../../models/balance");
const newTransaction = require("../../models/newTransaction");

exports.UploadReceipt = async (req, res) => {
	const sourceAccountNumber = req.body.sourceAccountNumber;
	const roundOffAmount = parseFloat(req.body.roundOffAmount);
	const amount = req.body.amount
	const subcategory = req.body.subcategory;
	let sourceUser;

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

	//deduct spent(sale+roundoff) amount from source user bank balance
	//add round off amount to source user wallet balance
	try {
		await userBalance
			.updateOne(
				{ accountNumber: sourceAccountNumber },
				{
					accountBalance: parseFloat(
						parseFloat(sourceUser.accountBalance - roundOffAmount).toFixed(2),
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

	//Creating JSON to save transaction
	const transaction = {
		walletAccountNumber: sourceUser.walletAccountNumber,
		category: "Shopping",
		subcategory: subcategory,
		amount: amount,
		roundedAmount: roundOffAmount,
		date: new Date(),
	};

	const saveTransaction = new newTransaction(transaction);

	try {
		//Save transaction to new Transactions collection
		await saveTransaction.save();
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
