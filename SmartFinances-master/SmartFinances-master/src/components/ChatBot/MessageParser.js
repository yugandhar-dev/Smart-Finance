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
    }
  }

  export default MessageParser;