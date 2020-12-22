class ActionProvider {
    constructor(createChatBotMessage, setStateFunc, createClientMessage) {
      this.createChatBotMessage = createChatBotMessage;
      this.setState = setStateFunc;
      this.createClientMessage = createClientMessage;
    }

    greet = () => {
      const message = this.createChatBotMessage("Hello FinTech user, how can I help you?");
      this.addMessageToState(message);
    }

    navigateSignup = () => {
      const message = this.createChatBotMessage("Welcome to our interface, let's sign you up now!");
      this.addMessageToState(message);
      window.location.replace('/signUp');
    };

    addMessageToState = (message) => {
      this.setState(preState => ({
        ...preState,
        messages:[...preState.messages, message],
      }));
    };
  }
  
  export default ActionProvider;

