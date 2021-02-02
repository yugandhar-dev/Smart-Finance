import React from "react"; 
import './options.css'; 


const Options = (props) => { 
    const options = [ 
        { 
            text: "FAQ", 
            handler: props.actionProvider.handleInstructions, 
            id: 1, 
        }, 
        { 
            text: "Invest", 
            handler: props.actionProvider.navigateInvest, 
            id: 2, 
        },
        { 
            text: "Calculator", 
            handler: props.actionProvider.navigateCalculator, 
            id: 3, 
        }, 
        { 
            text: "My Spendings", 
            handler: props.actionProvider.navigateTransactions, 
            id: 4, 
        }, 
         //{ text: "", handler: () => {}, id: 2 }, 
        //  { text: "Goals", handler: () => {}, id: 3 }, 
    ]; 
 
    const buttonsMarkup = options.map((option) => ( 
        <button key={option.id} onClick={option.handler} className="option-button"> 
        {option.text} 
        </button> 
    )); 
  
    return <div className="option-container">{buttonsMarkup}</div>
}; 

export default Options; 