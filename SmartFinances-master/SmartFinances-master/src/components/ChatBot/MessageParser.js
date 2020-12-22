class MessageParser {
    constructor(actionProvider, state) {
      this.actionProvider = actionProvider;
      this.state = state;
    }
  
    parse(message) {
      console.log(message);
      const lowercase = message.toLowerCase();

      if (lowercase.includes("hi") || lowercase.includes("hello") || lowercase.includes("hey")){
        this.actionProvider.greet();
      }

      if (lowercase.includes("new account create") || lowercase.includes("sign up") || lowercase.includes("create account") || lowercase.includes("hi i want to create a new account")){
        this.actionProvider.navigateSignup();
        
      }
    }
  }

  export default MessageParser;