class MessageParser { 
    constructor(actionProvider, state) { 
      this.actionProvider = actionProvider; 
      this.state = state; 
    } 
   
    parse(message) { 
      console.log(message); 
      const lowercase = message.toLowerCase(); 
 
      if (lowercase.includes("hi") || lowercase.includes("hello") || lowercase.includes("hey") || lowercase.includes("holla")){ 
        this.actionProvider.greet(); 
      } 
 
      if (lowercase.includes("create new account") || lowercase.includes("sign up") || lowercase.includes("create account") || lowercase.includes("hi i want to create a new account")){ 
        this.actionProvider.navigateSignup(); 
         
      } 
      
      if (lowercase.includes("instructions") || lowercase.includes("what is smart finance")){
        this.actionProvider.handleInstructions();
      }
    } 
  } 
 
  export default MessageParser; 