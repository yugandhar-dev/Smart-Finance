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
      
      if (lowercase.includes("faq") || lowercase.includes("help to use this application") || lowercase.includes("how to use this")){ 
        this.actionProvider.handleInstructions(); 
      } 
 
      if (lowercase.includes("sign out") || lowercase.includes("want to logout") || lowercase.includes("hi i want to log out")){ 
        this.actionProvider.greetSignup(); 
         
      } 
      
      if (lowercase.includes("instructions") || lowercase.includes("what is smart finance")){
        this.actionProvider.handleInstructions();
      }

      if (lowercase.includes("investments") || lowercase.includes("I want to invest")|| lowercase.includes("invest")){
        this.actionProvider.navigateInvest();
      }

      if (lowercase.includes("calculator") || lowercase.includes("calculate goals") || lowercase.includes("want to save money calculate")){
        this.actionProvider.navigateCalculator();
      }

      if (lowercase.includes("transactions") || lowercase.includes("check spendings") || lowercase.includes("spendings")){
        this.actionProvider.navigateTransactions();
      }
    } 
  } 
 
  export default MessageParser; 