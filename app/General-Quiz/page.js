"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function GeneralQuiz() {
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [hint, setHint] = useState(""); 
  const [timeLeft, setTimeLeft] = useState(15); 
  const [hintCount, setHintCount] = useState(0); 

  const quizData = [
    {
      question: "What is the capital city of France?",
      options: ["Paris", "Rome", "London", "Berlin"],
      correctAnswer: "Paris",
      hint: "It is often referred to as the 'City of Love' and is famous for the Eiffel Tower."
    },
    {
      question: "Who wrote the novel 'Pride and Prejudice'?",
      options: ["Jane Austen", "Emily Brontë", "Charlotte Brontë", "Charles Dickens"],
      correctAnswer: "Jane Austen",
      hint: "The novel was first published in 1813 and has since become one of the most popular works of English literature."
    },
    {
      question: "What is the chemical symbol for gold?",
      options: ["Au", "Ag", "Fe", "Pb"],
      correctAnswer: "Au",
      hint: "It comes from the Latin word 'aurum' which means 'shining dawn.'"
    },
    {
      question: "Which planet is known as the 'Red Planet'?",
      options: ["Mars", "Venus", "Jupiter", "Saturn"],
      correctAnswer: "Mars",
      hint: "It is named after the Roman god of war."
    },
    {
      question: "Who painted the Mona Lisa?",
      options: ["Leonardo da Vinci", "Vincent van Gogh", "Pablo Picasso", "Michelangelo"],
      correctAnswer: "Leonardo da Vinci",
      hint: "It is one of the most famous paintings in the world, known for its enigmatic smile."
    },
    {
      question: "What is the tallest mountain in the world?",
      options: ["Mount Everest", "K2", "Kanchenjunga", "Lhotse"],
      correctAnswer: "Mount Everest",
      hint: "It is located in the Himalayas on the border between Nepal and China."
    },
    {
      question: "What is the chemical symbol for water?",
      options: ["H2O", "CO2", "O2", "CH4"],
      correctAnswer: "H2O",
      hint: "It is composed of two hydrogen atoms and one oxygen atom."
    },
    {
      question: "Who wrote the play 'Romeo and Juliet'?",
      options: ["William Shakespeare", "Christopher Marlowe", "Oscar Wilde", "Tennessee Williams"],
      correctAnswer: "William Shakespeare",
      hint: "The play is a tragedy about two young star-crossed lovers whose deaths ultimately reconcile their feuding families."
    },
    {
      question: "What is the longest river in the world?",
      options: ["Nile", "Amazon", "Yangtze", "Mississippi"],
      correctAnswer: "Nile",
      hint: "It flows through northeastern Africa, primarily through Egypt and Sudan."
    },
    {
      question: "What is the chemical symbol for iron?",
      options: ["Fe", "Au", "Ag", "Cu"],
      correctAnswer: "Fe",
      hint: "It is a metallic element commonly used in construction and manufacturing."
    }
  ];

  useEffect(() => {
   
    setTimeLeft(15);
    setHint("");
    setHintCount(0);
    const timer = setInterval(() => {
      setTimeLeft(prevTimeLeft => {
        if (prevTimeLeft === 0) {
          if (currentQuestion === quizData.length - 1) {
        
            handleSubmitQuiz();
          } else {
            
            handleNextQuestion();
          }
          return 15; 
        } else {
          return prevTimeLeft - 1;
        }
      });
    }, 1000);


    return () => clearInterval(timer);
  }, [currentQuestion]); 

  const handleAnswerSelection = (selectedOption) => {
    setAnswers({ ...answers, [currentQuestion]: selectedOption });
  };

  const handleNextQuestion = () => {
    setCurrentQuestion(currentQuestion + 1);
  };

  const handleHint = () => {
    if (hintCount < 2) {
      setHint(quizData[currentQuestion].hint);
      setHintCount(hintCount + 1);
    }
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
      <h1 className="text-3xl font-bold text-white mb-8">General Quiz</h1>
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
                disabled={hintCount >= 2} // Disable hint button after using two hints
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