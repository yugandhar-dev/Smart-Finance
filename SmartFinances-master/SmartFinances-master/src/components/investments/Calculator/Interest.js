const Interest = formdata => {
  const { principal, contribution, interest, tenure } = formdata;

  let monthlyRate = interest / 12 / 100;
  let fraction = 0;
  const amount = [],
    years = [],
    contributions = [],
    interests = [];

  for (let i = 1; i <= tenure; i++) {
    fraction = Math.pow(1 + monthlyRate, i * 12);
    years.push(2020 + i);
    contributions.push(contribution * i * 12 + principal);
    amount.push(
      Math.floor(
        principal * fraction +
          contribution * ((fraction - 1) / monthlyRate) * (1 + monthlyRate)
      )
    );
    interests.push(amount[i - 1] - contribution * 12 * i - principal);
  }

  return {
    amount,
    years,
    contributions,
    interests,
    principal,
    contribution,
    tenure,
  };
};

module.exports = Interest;
