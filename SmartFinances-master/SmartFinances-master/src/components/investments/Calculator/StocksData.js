const getMarketData = async companyDetails => {
  if (!companyDetails[0]) return;
  const res = await fetch(
    `https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=${companyDetails[0].companyStockSymbol}&apikey=9J3P9EGKSMSRIN67`
  );
  const data = await res.json();
  return data;
};

module.exports = getMarketData;
