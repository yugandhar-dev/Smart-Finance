const fund = require("../../models/investmentOptions");

exports.modifyFund = async (req, res) => {
  let fundDetails;
  let newPercentageOfReturns;
  let newPricePerUnit;
  try {
    fundDetails = await fund
      .findOne({
        companyName: req.body.companyName,
        investmentType: "savingScheme"
      })
      .exec();
  } catch (err) {
    return res.status(400).json({
      error: err
    });
  }

  if (!fundDetails) {
    return res.status(400).json({
      error: "Fund not found"
    });
  }

  if (req.body.percentageOfReturns == null) {
    newPercentageOfReturns = fundDetails.percentageOfReturns;
  } else {
    newPercentageOfReturns = req.body.percentageOfReturns;
  }

  if (req.body.pricePerUnit == null) {
    newPricePerUnit = fundDetails.pricePerUnit;
  } else {
    newPricePerUnit = req.body.pricePerUnit;
  }

  try {
    await fund
      .updateOne(
        { companyName: req.body.companyName, investmentType: "savingScheme" },
        {
          percentageOfReturns: newPercentageOfReturns,
          pricePerUnit: newPricePerUnit
        }
      )
      .exec();
  } catch (err) {
    return res.status(400).json({
      error: err
    });
  }

  return res.status(200).json({
    Success: "Fund details updated."
  });
};
