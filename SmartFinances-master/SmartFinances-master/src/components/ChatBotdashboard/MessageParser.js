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
      
      if (lowercase.includes("instructions") || lowercase.includes("what is smart finance") || lowercase.includes('faq')){
        this.actionProvider.handleInstructions();
      }

      if (lowercase.includes("investment") || lowercase.includes("I want to invest")|| lowercase.includes("invest")){
        this.actionProvider.navigateInvest();
      }

      if (lowercase.includes("calculator") || lowercase.includes("calculate goals") || lowercase.includes("want to save money calculate")){
        this.actionProvider.navigateCalculator();
      }

      if (lowercase.includes("goto transactions") || lowercase.includes("check spendings") || lowercase.includes('my spendings')){
        this.actionProvider.navigateTransactions();
      }

      if (lowercase.includes("low risk")){
        this.actionProvider.lowRisk();
      }

      if (lowercase.includes('exchange traded fund') || lowercase.includes('exchange traded funds') || lowercase.includes('etf')){
        this.actionProvider.etf();
      }
      if (lowercase.includes('saving schemes') || lowercase.includes('saving scheme')){
        this.actionProvider.savingScheme();
      }
      
    } 
  } 
 
  export default MessageParser; 