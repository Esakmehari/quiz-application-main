"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function SportQuiz() {
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0); // Track the current question index
  const [hint, setHint] = useState(""); // Track hint text for current question
  const [timeLeft, setTimeLeft] = useState(5); // Track time left for current question

  const quizData = [
    {
      question: "which team won the 2010 world cup?",
      options: ["Germany", "Spain", "Brazil", "Argentina"],
      correctAnswer: "Spain",
      hint: "The winning team's jersey was red."
    },
    {
      question: "Which team won the 2022 NBA finals?",
      options: ["Denver Nuggets", "Golden State Warriors", "Lakers", "Milwaukee Bucks"],
      correctAnswer: "Golden State Warriors",
      hint: "This team is known for their sharpshooting backcourt."
    },
    // Add other quiz questions here
  ];

  useEffect(() => {
    // Reset timer and hint when moving to the next question
    setTimeLeft(5);
    setHint("");
    const timer = setInterval(() => {
      setTimeLeft(prevTimeLeft => {
        if (prevTimeLeft === 0) {
          if (currentQuestion === quizData.length - 1) {
            // If time runs out on the last question, submit the quiz
            handleSubmitQuiz();
          } else {
            // If time runs out on other questions, move to the next question
            handleNextQuestion();
          }
          return 5; // Reset timer for next question
        } else {
          return prevTimeLeft - 1;
        }
      });
    }, 1000);

    // Cleanup function to clear interval
    return () => clearInterval(timer);
  }, [currentQuestion]); // Run this effect whenever currentQuestion changes

  const handleAnswerSelection = (selectedOption) => {
    setAnswers({ ...answers, [currentQuestion]: selectedOption });
  };

  const handleNextQuestion = () => {
    setCurrentQuestion(currentQuestion + 1);
  };

  const handleHint = () => {
    setHint(quizData[currentQuestion].hint);
  };

  const handleSubmitQuiz = () => {
    let updatedScore = 0;
    quizData.forEach((question, index) => {
      if (question.correctAnswer === answers[index]) {
        updatedScore++;
      }
    });
    setScore(updatedScore);
    setShowResults(true);
  };

  return (
    <main className="bg-gradient-to-r from-purple-800 to-blue-900 min-h-screen p-8 flex flex-col justify-center items-center">
      <h1 className="text-3xl font-bold text-white mb-8">Sport Quiz</h1>
      {!showResults && (
        <>
          <h2 className="text-lg text-center text-white mb-4">{quizData[currentQuestion].question}</h2>
          {hint && <p className="text-sm text-white mb-4">{hint}</p>}
          <div className="text-white mb-4">Time Left: {timeLeft} seconds</div>
          <form className="w-full max-w-md space-y-6">
            <div className="bg-gray-800 p-4 rounded-md">
              <ul className="space-y-2">
                {quizData[currentQuestion].options.map((option, optionIndex) => (
                  <li key={optionIndex} className="flex items-center">
                    <input
                      type="radio"
                      id={`option-${optionIndex}`}
                      value={option}
                      checked={answers[currentQuestion] === option}
                      onChange={() => handleAnswerSelection(option)}
                      className="mr-2 cursor-pointer"
                    />
                    <label htmlFor={`option-${optionIndex}`} className="text-gray-100 font-semibold text-lg">{option}</label>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex justify-between">
              <button
                type="button"
                onClick={handleHint}
                className="bg-blue-500 text-white font-semibold py-3 px-6 rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
              >
                Hint
              </button>
              {currentQuestion < quizData.length - 1 ? (
                <button
                  type="button"
                  onClick={handleNextQuestion}
                  className="bg-blue-500 text-white font-semibold py-3 px-6 rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
                >
                  Next Question
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleSubmitQuiz}
                  className="bg-blue-500 text-white font-semibold py-3 px-6 rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
                >
                  Submit Quiz
                </button>
              )}
            </div>
          </form>
        </>
      )}

      {showResults && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center">
          <div className="bg-black p-8 rounded-md shadow-md text-center">
            <h2 className="text-xl font-bold mb-4 text-white">Quiz Results</h2>
            <p className="text-lg mb-4 text-white">Your score: {score}/{quizData.length}</p>
            <Link href="/" passHref>
              <button className="bg-blue-500 text-white font-semibold py-3 px-6 rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300">
                Go to Home
              </button>
            </Link>
          </div>
        </div>
      )}
    </main>
  );
}