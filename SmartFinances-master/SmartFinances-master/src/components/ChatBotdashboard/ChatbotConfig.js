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
            question: "What is Upload Receipt?",
            answer:
            "Smart Finance allows the user to upload their expense receipt in order to claim the amount automatically via the receipt, instead entering the amount manually.",
            id: 2,
          },
          {
            question: "Is buying stock risk free?",
            answer:
            "Smart Finance analyses the market and will guide you through the process of buying risk-free stocks.",
            id: 3,
          },
          {
            question: "What is low risk and high risk investments?",
            answer:
            "'Low risk' considered as taking a less risk in investing for long term investments, and as for 'High risk' the user is taking a risk in investing in bigger firms where there would be losses that impact significant amount",
            id: 4,
          },
          {
            question: "How can I find support?",
            answer:
            "Smart Finance is embedded with tools that support users need to save money for future, however, there is customer support provider 24/7 under 'USER SETTINGS TAB'",
            id: 5,
          },
        ],
      },
    },
  ], 
 
};  
 
export default config; 