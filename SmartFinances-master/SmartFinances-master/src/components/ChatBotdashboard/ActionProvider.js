class ActionProvider {
  constructor(createChatBotMessage, setStateFunc, createClientMessage) {
    this.createChatBotMessage = createChatBotMessage;
    this.setState = setStateFunc;
    this.createClientMessage = createClientMessage;
  }

  greet = () => {
    const message = this.createChatBotMessage(
      'Hello FinTech user, how can I help you?'
    );
    this.addMessageToState(message);
  };

  greetSignup = () => {
    const message = this.createChatBotMessage(
      'Hello FinTech user, you have already logged in. You can click logout to signout.'
    );
    this.addMessageToState(message);
  };

  handleInstructions = () => {
    const message = this.createChatBotMessage("Great, let's take a tour!", {
      widget: 'Instructions',
    });

    this.addMessageToState(message);
  };

  navigateInvest = () => {
    const message = this.createChatBotMessage(
      "Excellent let's make an investment today!"
    );
    this.addMessageToState(message);
    const button = document.getElementById('Investments');
    button.click();
  };

  navigateCalculator = () => {
    const message = this.createChatBotMessage(
      "Excellent let's calculate your investments!"
    );
    this.addMessageToState(message);
    let button = document.getElementById('Investments');
    button.click();

    setTimeout(function () {
      let button2 = document.getElementById('Calculator');
      button2.click();
    }, 1000);
  };

  navigateTransactions = () => {
    const message = this.createChatBotMessage(
      "Excellent let's check your spendings!"
    );
    this.addMessageToState(message);
    const button = document.getElementById('Transactions');
    button.click();
  };

  lowRisk = () => {
    const message = this.createChatBotMessage(
      'Low Risk Investments are investments that are inherently safer than their counterparts. Learn more about it here - https://capital.com/low-risk-investment-definition'
    );
    this.addMessageToState(message);
  };

  etf = () => {
    const message = this.createChatBotMessage(
      'An exchange traded fund (ETF) is a basket of securities that trade on an exchange, just like a stock. ETFs can contain all types of investments including stocks, commodities, or bonds; some offer U.S. only holdings, while others are international. Learn more about it here. - https://www.investopedia.com/terms/e/etf.asp'
    );
    this.addMessageToState(message);
  };

  savingScheme = () => {
    const message = this.createChatBotMessage(
      'Savings scheme is designed to encourage savings by making small deposits. Learn more about it here - https://cleartax.in/g/terms/savings-scheme#:~:text=Savings%20scheme%20means%20a%20scheme,savings%20by%20making%20small%20deposits.'
    );
    this.addMessageToState(message);
  };

  addMessageToState = message => {
    this.setState(preState => ({
      ...preState,
      messages: [...preState.messages, message],
    }));
  };
}

export default ActionProvider;
