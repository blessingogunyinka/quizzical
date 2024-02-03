import React from "react"


export default function Landing(props) {

    return (
        <div className="landing-container">
            <img src={require("./images/blob-yellow.png")} className="blob-yellow"/>
            <img src={require("./images/blob-sky.png")} className="blob-sky"/>
            <h1>Quizzical</h1>
            <p>Capstone project for the 'Learn React' Scrimba course on Coursera.org</p>
            <button className="start-quiz-button" onClick={() => props.setStartQuiz(true)}>Start Quiz</button>
        </div>
    )
}