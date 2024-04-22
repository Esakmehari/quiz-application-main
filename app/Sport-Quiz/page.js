"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function SportQuiz() {
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0); 
  const [hint, setHint] = useState(""); 
  const [timeLeft, setTimeLeft] = useState(15); 
  const [hintCount, setHintCount] = useState(0); 

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
    {
      question: "Who is considered the greatest basketball player of all time?",
      options: ["Michael Jordan", "LeBron James", "Kobe Bryant", "Magic Johnson"],
      correctAnswer: "Michael Jordan",
      hint: "He won six NBA championships with the Chicago Bulls."
    },
    {
      question: "Which athlete has won the most Olympic gold medals?",
      options: ["Michael Phelps", "Usain Bolt", "Carl Lewis", "Simone Biles"],
      correctAnswer: "Michael Phelps",
      hint: "He is a swimmer from the United States."
    },
    {
      question: "In which year did Roger Federer win his first Wimbledon title?",
      options: ["2001", "2003", "2005", "2007"],
      correctAnswer: "2003",
      hint: "He defeated Mark Philippoussis in the final."
    },
    {
      question: "Who won the 2020 Formula 1 World Championship?",
      options: ["Lewis Hamilton", "Max Verstappen", "Valtteri Bottas", "Sebastian Vettel"],
      correctAnswer: "Lewis Hamilton",
      hint: "He drives for the Mercedes-AMG Petronas Formula One Team."
    },
    {
      question: "Which country has won the most FIFA Women's World Cup titles?",
      options: ["United States", "Germany", "Norway", "Brazil"],
      correctAnswer: "United States",
      hint: "They have won the tournament four times."
    },

    {
      question: "Who holds the record for the fastest 100-meter sprint?",
      options: ["Usain Bolt", "Carl Lewis", "Asafa Powell", "Justin Gatlin"],
      correctAnswer: "Usain Bolt",
      hint: "He set the record at the 2009 World Championships in Berlin."
    },
    {
      question: "Who is the only boxer to win world titles in eight different weight classes?",
      options: ["Manny Pacquiao", "Floyd Mayweather Jr.", "Oscar De La Hoya", "Roy Jones Jr."],
      correctAnswer: "Manny Pacquiao",
      hint: "He is also a senator in the Philippines."
    },
    {
      question: "Which team has won the most NBA championships?",
      options: ["Los Angeles Lakers", "Boston Celtics", "Chicago Bulls", "Golden State Warriors"],
      correctAnswer: "Boston Celtics",
      hint: "They have won a total of 17 NBA championships."
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
                disabled={hintCount >= 2}
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