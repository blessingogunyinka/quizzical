import React from "react"


export default function Question(props) {

    const answerButtons = props.result.all_answers.map(item => {

        const qn = props.result.question ; 
        const ans = item.answer ;

        function getNewButtonClassName() { 

            const correctAnswer = item.answer === props.result.correct_answer ;

            const selectedAndIncorrect = item.isSelected && item.answer !== props.result.correct_answer ; 

            const newButtonClassName = correctAnswer ? "answer-btn-correct" : 
                selectedAndIncorrect ? "answer-btn-incorrect" : "answer-btn-unselected" ;
            
            if (item.isSelected && item.answer === props.result.correct_answer) {
                props.increaseCount() ; 
            }

            return newButtonClassName ; 
        }
 
        return (
            <>
            {
                props.validSelections !== true 
                ?
                <button 
                    className={item.isSelected ? "answer-btn-clicked" : "answer-btn"} 
                    onClick={ () => props.selectAnswer(qn, ans) }
                >
                    {item.answer}
                </button>
                :
                <button 
                    className={getNewButtonClassName()} 
                >
                    {item.answer}
                </button>
            }
            </>
        )
    })

    return (
        <div className="question-container">
            <p>{props.result.question}</p>
            {answerButtons}
            <hr />
            <img src={require("./images/blob-yellow.png")} className="blob-yellow"/>
            <img src={require("./images/blob-sky.png")} className="blob-sky"/>
        </div>
    )

}