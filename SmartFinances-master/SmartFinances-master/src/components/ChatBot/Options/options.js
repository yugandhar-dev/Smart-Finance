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
            text: "Sign Up", 
            handler: props.actionProvider.navigateSignup, 
            id: 2, 
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