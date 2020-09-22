const userInvestments = require("../../models/userInvestments");
const investmentOptions = require("../../models/investmentOptions");

exports.GetInvestments = (req, res) => {
	userInvestments
		.find({ walletAccountNumber: req.body.walletAccountNumber })
		.exec((err, investments) => {
			if (err || investments == null) {
				return res.status(400).json({
					error: "No Investments Found",
				});
			}

			res.json(investments);
		});
};

exports.GetInvestmentOptions = (req, res) => {
	investmentOptions
		.find({
			investmentType: req.body.investmentType,
			companyName: req.body.companyName,
		})
		.exec((err, investments) => {
			if (err || investments == null) {
				return res.status(400).json({
					error: "No Investments Found",
				});
			}

			res.json(investments);
		});
};

exports.GetAllInvestmentsOptions = async (req, res) => {
	try {
		const investments = await investmentOptions.find();
		res.json(investments);
	} catch (err) {
		return res.status(400).json({
			error: "No Investments Found",
		});
	}
};

exports.GetInvestmentCompanies = async (req, res) => {
	investmentOptions
		.find({
			investmentType: req.body.investmentType,
		})
		.exec((err, investments) => {
			if (err || investments == null) {
				return res.status(400).json({
					error: "No Investments Found",
				});
			}

			res.json(investments);
		});
};
