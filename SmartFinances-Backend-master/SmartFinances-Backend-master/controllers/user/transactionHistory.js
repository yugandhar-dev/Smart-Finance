const transactions = require("../../models/newTransaction");

exports.GetTransactions = (req, res) => {
	transactions
		.find({
			walletAccountNumber: req.body.walletAccountNumber,
			category: req.body.category,
		})
		.exec((err, userTransactions) => {
			if (err) {
				return res.status(400).json({
					error: err,
				});
			} else if (userTransactions.length == 0) {
				return res.status(400).json({
					error: "No User Transactions Found",
				});
			} else {
				res.json(userTransactions);
			}
		});
};
