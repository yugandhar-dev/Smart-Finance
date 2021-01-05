import React from "react"; 
import { createChatBotMessage } from "react-chatbot-kit"; 
import Options from "./Options/options"; 
import Instructions from "./Instructions/Instructons"; 
 
const config = { 

  botName: "FinTech ChatBot", 
  initialMessages: [createChatBotMessage(`Hello! I'm FinTech bot! What can I do for you today? :)`, { 
    widget: "options", 
  })], 

  widgets: [ 
    { 
      widgetName: "options", 
      widgetFunc: (props) => <Options {...props} />, 
    }, 
    {
      widgetName: "Instructions",
      widgetFunc: (props) => <Instructions {...props} />,
      props: {
        questions: [
          {
            question: "what is Smart Finance?",
            answer:
            "Smart Finance is a web application built to help anyone whom struggling to save funds for future investments.",
            id: 1,
          },
        ],
      },
    },
  ], 
 
};  
 
export default config; 