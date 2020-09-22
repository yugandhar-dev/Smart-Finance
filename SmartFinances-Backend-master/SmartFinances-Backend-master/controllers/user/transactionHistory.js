const transactions = require("../../models/newTransaction");

exports.GetTransactions = async (req, res) => {
	
	const data = await new Promise(resolve => transactions
		.find({
			$or: [
			{walletAccountNumber: req.body.walletAccountNumber},
			{
				walletAccountNumber: req.body.walletAccountNumber,
				category: req.body.category,
			},
			],
		}, (err, userTransactions) => {
			if (err) {
				resolve({
					error: err,
				});
			} else if (userTransactions.length == 0) {
				resolve({
					error: "No User Transactions Found",
				})
				
			} else {
				resolve(userTransactions);
			}
		})
	)
	if(data['error']){
		res.status(400).json({
			error: data['error'],
		})
	}
	else{
		res.status(200).json(data);
	}
};
