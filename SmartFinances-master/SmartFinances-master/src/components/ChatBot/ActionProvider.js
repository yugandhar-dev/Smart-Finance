class ActionProvider {
    constructor(createChatBotMessage, setStateFunc, createClientMessage) {
      this.createChatBotMessage = createChatBotMessage;
      this.setState = setStateFunc;
      this.createClientMessage = createClientMessage;
    }

    greet = () => {
      const message = this.createChatBotMessage("Hello FinTech user.");
      this.addMessageToState(message);
    }

    addMessageToState = (message) => {
      this.setState(preState => ({
        ...preState,
        messages:[...preState.messages, message],
      }));
    };
  }
  
  export default ActionProvider;

