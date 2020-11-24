describe('Investment sell screen test', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/user');

    cy.get('#email').type('usertest@gmail.com');

    cy.get('#password').type('1234');

    cy.get('#phone').type('+61481831824');

    cy.get('#otp').type('456321');

    cy.get('#sign-in-button').click();
  });

  it('checks elements of investment sell screen', () => {
    cy.get('.MuiTabs-flexContainer.MuiTabs-centered')
      .children('button')
      .eq(3)
      .should('be.visible')
      .click()
      .invoke('text')
      .should('eq', 'Investments');

    cy.contains('Sell Investments')
      .should('be.visible')
      .click()
      .invoke('text')
      .should('eq', ' Sell Investments');

    cy.get('.MuiList-root.MuiList-padding')
      .children('li')
      .eq(0)
      .should('be.visible')
      .invoke('text')
      .should('eq', 'Choose the investment type:');

    cy.get('#investments').should('be.visible').click();

    cy.wait(1000);

    cy.contains('lowRiskFund')
      .should('be.visible')
      .click()
      .invoke('text')
      .should('eq', 'lowRiskFund');

    cy.get('.MuiList-root.MuiList-padding')
      .children('li')
      .eq(2)
      .should('be.visible')
      .invoke('text')
      .should('eq', 'Choose the company:');

    cy.get('.MuiList-root.MuiList-padding')
      .children('li')
      .eq(4)
      .children('div')
      .eq(0)
      .should('be.empty');

    cy.get('#companies').should('be.visible').click();

    cy.contains('ANZ')
      .should('be.visible')
      .click()
      .invoke('text')
      .should('eq', 'ANZ');

    cy.wait(1000);

    cy.get('.MuiList-root.MuiList-padding')
      .children('li')
      .eq(4)
      .children('div')
      .eq(0)
      .should('not.be.empty');

    cy.get('.MuiList-root.MuiList-padding')
      .children('li')
      .eq(5)
      .should('be.visible')
      .invoke('text')
      .should('eq', 'Enter number of units you want to sell:');

    cy.get('p').eq(2).invoke('text').should('be.empty');

    cy.get('.MuiList-root.MuiList-padding')
      .children('li')
      .eq(6)
      .children('div')
      .eq(0)
      .should('be.visible')
      .type('1');

    cy.get('.MuiList-root.MuiList-padding')
      .children('li')
      .eq(6)
      .children('div')
      .eq(1)
      .click();

    cy.get('p').eq(2).invoke('text').should('not.be.empty');

    cy.get('.MuiList-root.MuiList-padding')
      .children('li')
      .eq(7)
      .invoke('text')
      .should('eq', 'Amount:');

    cy.contains('Reset').click();

    cy.get('#investments').should('be.visible').click();

    cy.contains('savingScheme')
      .should('be.visible')
      .click()
      .invoke('text')
      .should('eq', 'savingScheme');

    cy.get('#companies').should('be.visible').click();

    cy.contains('ME Term Deposit')
      .should('be.visible')
      .click()
      .invoke('text')
      .should('eq', 'ME Term Deposit');

    cy.get('#companies').should('be.visible').click();

    cy.contains('UBank Term Deposit')
      .should('be.visible')
      .click()
      .invoke('text')
      .should('eq', 'UBank Term Deposit');
  });

  it('checks selling of savings scheme ME Term Deposit', () => {
    var totalInvestments, savingScheme, walletBalance;

    cy.wait(3000);

    cy.get('p')
      .eq(2)
      .children('font')
      .eq(0)
      .children('font')
      .eq(0)
      .then(($font) => {
        totalInvestments = parseFloat($font.text().replace('$', ''));
        console.log(totalInvestments);
      });

    cy.get('p')
      .eq(7)
      .children('p')
      .eq(0)
      .children('font')
      .eq(0)
      .children('font')
      .eq(0)
      .then(($font) => {
        savingScheme = parseFloat($font.text().replace('$', ''));
        console.log(savingScheme);
      });

    cy.get('p')
      .eq(10)
      .children('font')
      .eq(0)
      .children('font')
      .eq(0)
      .then(($font) => {
        walletBalance = parseFloat($font.text());
        console.log(walletBalance);
      });

    cy.get('.MuiTabs-flexContainer.MuiTabs-centered')
      .children('button')
      .eq(3)
      .should('be.visible')
      .click()
      .invoke('text')
      .should('eq', 'Investments');

    cy.contains('Sell Investments')
      .should('be.visible')
      .click()
      .invoke('text')
      .should('eq', ' Sell Investments');

    cy.get('#investments').should('be.visible').click();

    cy.wait(1000);

    cy.contains('savingScheme')
      .should('be.visible')
      .click()
      .invoke('text')
      .should('eq', 'savingScheme');

    cy.get('#companies').should('be.visible').click();

    cy.contains('ME Term Deposit')
      .should('be.visible')
      .click()
      .invoke('text')
      .should('eq', 'ME Term Deposit');

    cy.wait(1000);

    cy.get('.MuiList-root.MuiList-padding')
      .children('li')
      .eq(6)
      .children('div')
      .eq(0)
      .should('be.visible')
      .type('1');

    cy.get('.MuiList-root.MuiList-padding')
      .children('li')
      .eq(6)
      .children('div')
      .eq(1)
      .click();

    cy.wait(1000);

    cy.get('.MuiList-root.MuiList-padding')
      .children('li')
      .eq(8)
      .children('div')
      .eq(0)
      .children('div')
      .eq(0)
      .children('input')
      .eq(0)
      .invoke('val')
      .then((value) => {
        totalInvestments = totalInvestments - parseFloat(value);
        savingScheme = savingScheme - parseFloat(value);
        walletBalance = walletBalance + parseFloat(value);
      });

    cy.get('.MuiList-root.MuiList-padding')
      .children('li')
      .eq(9)
      .children('div')
      .eq(0)
      .children('div')
      .eq(1)
      .children('button')
      .eq(0)
      .click();

    cy.wait(1000);

    cy.get('p')
      .eq(2)
      .invoke('text')
      .should('eq', '"Sold successfully and your balances are updated"');

    cy.get('.MuiTabs-flexContainer.MuiTabs-centered')
      .children('button')
      .eq(0)
      .click()
      .invoke('text')
      .should('eq', 'Portfolio');

    cy.wait(1000);

    cy.get('p')
      .eq(2)
      .children('font')
      .eq(0)
      .children('font')
      .eq(0)
      .then(($font) => {
        expect($font.text()).to.eq('$' + totalInvestments.toFixed(2));
      });

    cy.get('p')
      .eq(7)
      .children('p')
      .eq(0)
      .children('font')
      .eq(0)
      .children('font')
      .eq(0)
      .then(($font) => {
        expect($font.text()).to.eq('$' + savingScheme.toFixed(2));
      });

    cy.get('p')
      .eq(10)
      .children('font')
      .eq(0)
      .children('font')
      .eq(0)
      .then(($font) => {
        expect($font.text()).to.eq(walletBalance.toFixed(2));
      });
  });

  it('checks selling low risk fund scheme of company ANZ', () => {
    var totalInvestments, lowRiskFunds, walletBalance;

    cy.wait(3000);

    cy.get('p')
      .eq(2)
      .children('font')
      .eq(0)
      .children('font')
      .eq(0)
      .then(($font) => {
        totalInvestments = parseFloat($font.text().replace('$', ''));
        console.log(totalInvestments);
      });

    cy.get('p')
      .eq(3)
      .children('p')
      .eq(0)
      .children('font')
      .eq(0)
      .children('font')
      .eq(0)
      .then(($font) => {
        lowRiskFunds = parseFloat($font.text().replace('$', ''));
        console.log(lowRiskFunds);
      });

    cy.get('p')
      .eq(10)
      .children('font')
      .eq(0)
      .children('font')
      .eq(0)
      .then(($font) => {
        walletBalance = parseFloat($font.text());
        console.log(walletBalance);
      });

    cy.get('.MuiTabs-flexContainer.MuiTabs-centered')
      .children('button')
      .eq(3)
      .should('be.visible')
      .click()
      .invoke('text')
      .should('eq', 'Investments');

    cy.contains('Sell Investments')
      .should('be.visible')
      .click()
      .invoke('text')
      .should('eq', ' Sell Investments');

    cy.get('#investments').should('be.visible').click();

    cy.wait(1000);

    cy.contains('lowRiskFund')
      .should('be.visible')
      .click()
      .invoke('text')
      .should('eq', 'lowRiskFund');

    cy.get('#companies').should('be.visible').click();

    cy.contains('ANZ')
      .should('be.visible')
      .click()
      .invoke('text')
      .should('eq', 'ANZ');

    cy.wait(1000);

    cy.get('.MuiList-root.MuiList-padding')
      .children('li')
      .eq(6)
      .children('div')
      .eq(0)
      .should('be.visible')
      .type('1');

    cy.get('.MuiList-root.MuiList-padding')
      .children('li')
      .eq(6)
      .children('div')
      .eq(1)
      .click();

    cy.wait(1000);

    cy.get('.MuiList-root.MuiList-padding')
      .children('li')
      .eq(8)
      .children('div')
      .eq(0)
      .children('div')
      .eq(0)
      .children('input')
      .eq(0)
      .invoke('val')
      .then((value) => {
        totalInvestments = totalInvestments - parseFloat(value);
        lowRiskFunds = lowRiskFunds - parseFloat(value);
        walletBalance = walletBalance + parseFloat(value);
        console.log(walletBalance);
      });

    cy.get('.MuiList-root.MuiList-padding')
      .children('li')
      .eq(9)
      .children('div')
      .eq(0)
      .children('div')
      .eq(1)
      .children('button')
      .eq(0)
      .click();

    cy.wait(1000);

    cy.get('p')
      .eq(2)
      .invoke('text')
      .should('eq', '"Sold successfully and your balances are updated"');

    cy.contains('Portfolio').click();

    cy.wait(1000);

    cy.get('p')
      .eq(2)
      .children('font')
      .eq(0)
      .children('font')
      .eq(0)
      .then(($font) => {
        expect($font.text()).to.eq('$' + totalInvestments.toFixed(2));
      });

    cy.get('p')
      .eq(3)
      .children('p')
      .eq(0)
      .children('font')
      .eq(0)
      .children('font')
      .eq(0)
      .then(($font) => {
        expect($font.text()).to.eq('$' + lowRiskFunds);
      });

    cy.get('p')
      .eq(10)
      .children('font')
      .eq(0)
      .children('font')
      .eq(0)
      .then(($font) => {
        expect($font.text()).to.eq(walletBalance.toFixed(2));
      });
  });
});
