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
            question: "Is buying stock risk free?",
            answer:
            "Smart Finance analyses the market and will guide you through the process of buying risk-free stocks.",
            id: 2,
          },
          {
            question: "What is low risk and high risk investments?",
            answer:
            "'Low risk' considered as taking a less risk in investing for long term investments, and as for 'High risk' the user is taking a risk in investing in bigger firms where there would be losses that impact significant amount",
            id: 3,
          },
          {
            question: "What is Upload Receipt?",
            answer:
            "Smart Finance allows the user to upload their expense receipt in order to claim the amount automatically via the receipt, instead entering the amount manually.",
            id: 4,
          },
          {
            question: "How can I find support?",
            answer:
            "Smart Finance is embedded with tools that support users need to save money for future, however, there is customer support provider 24/7 under 'CONTACT US TAB'",
            id: 5,
          },
          {
            question: "How to check my spendings",
            answer:
            "We have provided this you with two methods to check spendings, bank transactions under 'SPENDINGS' tab and wallet transaction under 'TRACTIONACTION HISTORY' tab",
            id: 6,
          },
          {
            question: "How can I change settings?",
            answer:
            "Visit the 'USER SETTINGS TAB' to change your account settings and preferences",
            id: 7,
          },
          {
            question: "Can I create a budget?",
            answer:
            "The application allows the user to create goals and budgets under INVESTMENTS -> GOALS tab",
            id: 8,
          },
          {
            question: "Why a questionnaire page?",
            answer:
            "Smart Finance application wants to support the user to high degree possible by listening to users questions and answers",
            id: 9,
          },
          {
            question: "What is Exchange Traded Funds (etf)?",
            answer:
            "An exchange traded fund (ETF) is a basket of securities that trade on an exchange, just like a stock. ETFs can contain all types of investments including stocks, commodities, or bonds; some offer U.S. only holdings, while others are international.",
            id: 10,
          },
          {
          question: "What is Saving Scheme?",
          answer:
          "Savings scheme is designed to encourage savings by making small deposits",
          id: 11,
        },

        ],
      },
    },
  ], 
 
};  
 
export default config; 