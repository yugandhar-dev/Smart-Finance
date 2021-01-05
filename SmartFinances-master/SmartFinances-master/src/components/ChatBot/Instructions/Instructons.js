import React, {useState} from 'react';
import Questions from "./questions";

const Instructions = (props) => {
    console.log(props);
    let [questionIndex, setQuestionIndex] = useState(0);
  
    const incrementIndex = () => setQuestionIndex((prev) => (prev += 1));
  
    const currentQuestion = props.questions[questionIndex];
  
    if (!currentQuestion) {
      return <p>Well done we have reached the end.</p>
    }
  
    return (
      <Questions
        question={currentQuestion.question}
        answer={currentQuestion.answer}
        incrementIndex={incrementIndex}
      />
    );
}

export default Instructions;

