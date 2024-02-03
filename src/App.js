import React from "react"
import Landing from "./Landing"
import Questions from "./Questions"
import he from "he"

export default function App() {

  const [questionsData, setQuestionsData] = React.useState([])


  function shuffleAnswers(answersArray) {

    const allAnswersTemp = answersArray.map(i => he.decode(i))
    const allAnswers = [] ; 

    for (let i = allAnswersTemp.length; i > 0; i--) {
      let randomIdx = Math.floor(Math.random()*i)
      const removedVal = allAnswersTemp.splice(randomIdx, 1)[0] ; 
      allAnswers.push(removedVal)
    }

    return allAnswers ; 
  }


  function createAnswersArray(answersArray) {
    let allAnswersArray = shuffleAnswers(answersArray) ; 
    allAnswersArray = allAnswersArray.map(ans => ({ answer: ans, isSelected: false }))
    return allAnswersArray ; 
  }


  function selectAnswer(question, answer) {

    const btnQuestion = question ;
    const btnAnswer = answer ;

    const btnIndex = questionsData.findIndex(result => result.question == btnQuestion) ; 
    const btnAnswerIndex = questionsData[btnIndex].all_answers.findIndex(ansObj => ansObj.answer === btnAnswer) ; 

    let tempQuestionsData = [...questionsData]
    let tempAllAnswers = [...tempQuestionsData[btnIndex].all_answers]

    tempAllAnswers.forEach(answerObj => {
      if (answerObj.answer === btnAnswer) {
        answerObj.isSelected = !answerObj.isSelected ;
      }
      else if (answerObj.isSelected) {
        answerObj.isSelected = false ;
      }
    })

    tempQuestionsData[btnIndex].all_answers = tempAllAnswers ; 

    setQuestionsData(tempQuestionsData)

  }

  // ------------------------------------------------------------------

  const [startQuiz, setStartQuiz] = React.useState(false)

  // -------------------------------------------------------------------


  const [validSelections, setValidSelections] = React.useState(null)


  function isOneSelected(resultArr) {
    
    let trueExists = false ; 

    for (let i in resultArr.all_answers) {
      if (resultArr.all_answers[i].isSelected) {
        trueExists = true ; 
      }
    }

    return trueExists ; 
    
  }


  function checkAnswers() {

    const userSelectedAnswers = []
    
    let tempQuestionsData = [...questionsData]
    setValidSelections(tempQuestionsData.every(result => isOneSelected(result)))
    
  }

  // -------------------------------------------------------------------

  const [correctAnswerCount, setCorrectAnswerCount] = React.useState(0) ; 

  function IncreaseCount() {
    React.useEffect(() => {
      setCorrectAnswerCount(prevCount => prevCount + 1)
    }, [])
  }

  // -------------------------------------------------------------------

  // https://opentdb.com/api.php?amount=5&category=21&difficulty=hard&type=multiple"

  React.useEffect(function() {
    fetch("https://opentdb.com/api.php?amount=5&category=21&difficulty=medium&type=multiple")
        .then(response => response.json())
        .then(data => setQuestionsData(data["results"].map(result => ({
          ...result,
          all_answers: createAnswersArray([result.correct_answer, ...result.incorrect_answers]),
          question: he.decode(result.question)
        }))))      
  }, [])
  

  const questionsComponents = questionsData.map(res => {
    return (
      <Questions 
        result={res} 
        selectAnswer={selectAnswer}
        validSelections={validSelections}
        increaseCount={IncreaseCount}
      />
    )
  })

  return (
    <div>
      {
        startQuiz === false ?
        <Landing
          setStartQuiz={setStartQuiz}
        />
        :
        <div>
          {questionsComponents}
          {
            validSelections != true ?
            <div className="check-answers-btn-container">
              <button className="check-answers-btn" onClick={checkAnswers}>Check Answers</button>
            </div>
            :
            <div className="play-again-btn-container">
              <p>You scored {correctAnswerCount}/{questionsData.length} correct answers</p>
              <button className="play-again-btn" onClick={() => window.location.reload()}>Play Again</button>
            </div>
          }
          {validSelections == false && <div className="invalid-selections">Please select an answer for each question</div>}
        </div>
      }
    </div>
  );
}

