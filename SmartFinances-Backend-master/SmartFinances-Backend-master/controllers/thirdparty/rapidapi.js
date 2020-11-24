/* eslint-disable no-await-in-loop */
const axios = require('axios');
const moment = require('moment');

const InvestmentOption = require('../../models/investmentOptions');

const { ALPHA_ADVANTAGE_RAPID_API_KEY } = process.env;

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const getOptionPrice = async (symbol) => {
  const req = await axios.get('https://alpha-vantage.p.rapidapi.com/query', {
    headers: { 'x-rapidapi-key': ALPHA_ADVANTAGE_RAPID_API_KEY },
    params: {
      function: 'TIME_SERIES_DAILY',
      symbol,
    },
  });

  let delta = 1; // Default to previous day
  if (moment().isoWeekday() === 7) { // Sunday
    delta = 2;
  } else if (moment().isoWeekday() === 1) { // Monday
    delta = 3;
  }

  const lastValidDate = moment().subtract(delta, 'days').format('YYYY-MM-DD');

  return req.data['Time Series (Daily)'][lastValidDate]['4. close'];
};

const updateOption = async (option) => {
  if (!option || !option.companyStockSymbol) {
    // console.log(option, 'does not have a symbol!');
    return;
  }

  const today = moment().format('YYYY-MM-DD');
  if (option.lastUpdate === today) {
    return;
  }

  try {
    option.pricePerUnit = await getOptionPrice(option.companyStockSymbol);
    option.lastUpdate = today;
    await option.save();
  } catch (err) {
    // If there was an error while updating, there is no need to store anything
  }
};

const updatePricesForAllOptions = async () => {
  const options = await InvestmentOption.find().exec();
  for (let i = 0; i < options.length; i += 1) {
    const option = options[i];
    if (option.companyStockSymbol) {
      await updateOption(option);
      await sleep(30 * 1000);
    }
  }
};

module.exports = { updatePricesForAllOptions };
