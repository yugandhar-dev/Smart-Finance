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
          {
            question: "How will I save money?",
            answer:
            "Smart Finance will help set goals, budgets and help you invest in stocks.",
            id: 2,
          },
          {
            question: "Is buying stock risk free?",
            answer:
            "Smart Finance analyses the market and will guide you through the process of buying risk-free stocks.",
            id: 3,
          },
          {
            question: "How can I join this?",
            answer:
            "Any person is eligible to join this platform by following the steps. Click user -> 'New User? Sign up'",
            id: 4,
          },
          {
            question: "How can I find support?",
            answer:
            "Smart Finance is embedded with tools that support users need to save money for future, however, there is customer support provider 24/7",
            id: 5,
          },
        ],
      },
    },
  ], 
 
};  
 
export default config; 