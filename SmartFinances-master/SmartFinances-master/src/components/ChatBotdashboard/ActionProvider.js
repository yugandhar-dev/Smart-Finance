
class ActionProvider { 
    constructor(createChatBotMessage, setStateFunc, createClientMessage) { 
      this.createChatBotMessage = createChatBotMessage; 
      this.setState = setStateFunc; 
      this.createClientMessage = createClientMessage; 
    };

    greet = () => {
      const message = this.createChatBotMessage("Hello FinTech user, how can I help you?"); 
      this.addMessageToState(message); 
    };

    greetSignup = () => {
      const message = this.createChatBotMessage("Hello FinTech user, you have already logged in. You can click logout to signout."); 
      this.addMessageToState(message); 
    };

    handleInstructions = () => {
      const message = this.createChatBotMessage(
        "Great, let's take a tour!",
        {
          widget: "Instructions",
        }
      );

      this.addMessageToState(message);

    };

    navigateInvest = () => {
      const message = this.createChatBotMessage("Excellent let's make an investment today!"); 
      this.addMessageToState(message); 
      const button = document.getElementById('Investments');
      button.click();
    };

    navigateCalculator = () => {
      const message = this.createChatBotMessage("Excellent let's create a goal!"); 
      this.addMessageToState(message); 
      let button = document.getElementById('Investments');
      button.click();
      
      setTimeout(function(){
        let button2 = document.getElementById('Calculator');
        button2.click()},1000)
    };

    navigateTransactions = () => {
      const message = this.createChatBotMessage("Excellent let's check your spendings!"); 
      this.addMessageToState(message); 
      const button = document.getElementById('Transactions');
      button.click();
    };
 
    addMessageToState = (message) => {
      this.setState(preState => ({
        ...preState,
        messages:[...preState.messages, message],
      }));
    };
  } 
   
  export default ActionProvider; 

