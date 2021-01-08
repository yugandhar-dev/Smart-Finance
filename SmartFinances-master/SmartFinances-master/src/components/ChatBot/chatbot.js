import React from 'react'; 
import './chatbot.css'; 
import Chatbot from "react-chatbot-kit"; 
import config from "./ChatbotConfig"; 
import MessageParser from "./MessageParser"; 
import ActionProvider from "./ActionProvider"; 
 
function chatBot() { 
    return ( 
        <div className = "chatBot"> 
            <div style={{ maxWidth: "300px", maxHeight: "500px"}}> 
                <Chatbot 
                config = {config} 
                messageParser = {MessageParser} 
                actionProvider = {ActionProvider} 
                /> 
            </div> 
        </div> 
    ); 
}; 
 
export default chatBot; 