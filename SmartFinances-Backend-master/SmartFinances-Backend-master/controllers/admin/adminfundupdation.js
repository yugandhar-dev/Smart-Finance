const adminfundupdation = require("../../models/investmentOptions");
 
exports.fundUpdation = async (req, res) => {
  let fundDetails;
  let newPercentageOfReturns;
  let newPricePerUnit;
  let investmenttype
  let newcompanyStockSymbol;
  try {
    fundDetails = await adminfundupdation
      .findOne({
        companyName: req.body.companyName,
        //investmentType: "savingScheme"
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
 
  if (req.body.investmentType == null) {
    investmenttype = fundDetails.investmentType;
  } else {
    investmenttype = req.body.investmentType;
  }
 
  if (req.body.companyStockSymbol == null) {
    newcompanyStockSymbol = fundDetails.companyStockSymbol;
  } else {
    newcompanyStockSymbol = req.body.companyStockSymbol;
  }
 
  try {
    await adminfundupdation
      .updateOne(
        { companyName: req.body.companyName },
        {
          percentageOfReturns: newPercentageOfReturns,
          pricePerUnit: newPricePerUnit,
          investmentType: investmenttype,
          companyStockSymbol: newcompanyStockSymbol
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