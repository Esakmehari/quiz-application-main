

"use client";
import React, { useState } from 'react';
import Link from 'next/link';

export default function SportQuiz() {
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0); // Track the current question index

  const quizData = [
    {
      question: "Which planet is known as the Red Planet?",
      options: ["Earth", "Mars", "Jupiter", "Saturn"],
      correctAnswer: "Mars"
    },
    {
      question: "?",
      options: ["Yuan", "Dollar", "Euro", "Yen"],
      correctAnswer: "Yen"
    },
    {
      question: "Who invented the telephone?",
      options: ["Thomas Edison", "Alexander Graham Bell", "Nikola Tesla", "Albert Einstein"],
      correctAnswer: "Alexander Graham Bell"
    },
    {
      question: "Which ocean is the largest?",
      options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
      correctAnswer: "Pacific Ocean"
    },

    {
      question: "In what year did WW1 brgin",
      options: ["1914", "1941", "1921", "1917"],
      correctAnswer: "1914"
    }, 
    {
      question: "Who killed the most people",
      options: ["hitler", "Genghis Khan", "Kōta Yuzuru", " Joseph Stalin"],
      correctAnswer: "Joseph Stalin"
    },
    {
      question: "What is the largest mammal on Earth?",
      options: ["Elephant", "Blue Whale", "Giraffe", "Hippopotamus"],
      correctAnswer: "Blue Whale"
    },
    {
      question: "What is the chemical symbol for gold?",
      options: ["Au", "Ag", "Hg", "Fe"],
      correctAnswer: "Au"
    },
    {
      question: "Who wrote the novel 'To Kill a Mockingbird'?",
      options: ["Harper Lee", "Mark Twain", "J.K. Rowling", "George Orwell"],
      correctAnswer: "Harper Lee"
    },
    {
      question: "What is the capital of Australia?",
      options: ["Sydney", "Melbourne", "Canberra", "Perth"],
      correctAnswer: "Canberra"
    },
    {
      question: "What is the boiling point of water in Kelvin?",
      options: ["373 K", "273 K", "473 K", "573 K"],
      correctAnswer: "373 K"
    },
    {
      question: "Who painted the ceiling of the Sistine Chapel?",
      options: ["Leonardo da Vinci", "Raphael", "Michelangelo", "Donatello"],
      correctAnswer: "Michelangelo"
    },
    {
      question: "Which of Shakespeare's plays is the longest?",
      options: ["Hamlet", "Macbeth", "Othello", "Coriolanus"],
      correctAnswer: "Hamlet"
    },
    {
      question: "Who was the first woman to win a Nobel Prize?",
      options: ["Marie Curie", "Rosalind Franklin", "Dorothy Hodgkin", "Barbara McClintock"],
      correctAnswer: "Marie Curie"
    },
    {
      question: "What is the largest organ in the human body?",
      options: ["Heart", "Liver", "Skin", "Brain"],
      correctAnswer: "Skin"
    }
  ];

  const handleAnswerSelection = (selectedOption) => {
    setAnswers({ ...answers, [currentQuestion]: selectedOption });
  };

  const handleNextQuestion = () => {
    setCurrentQuestion(currentQuestion + 1);
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
          <h2 className="text-lg text-center text-white mb-12">{quizData[currentQuestion].question}</h2>
          <form className="w-full max-w-md space-y-6">
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
                  <label htmlFor={`option-${optionIndex}`} className="text-gray-800">{option}</label>
                </li>
              ))}
            </ul>
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
          </form>
        </>
      )}

      {showResults && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center">
          <div className="bg-gray-200 p-8 rounded-md shadow-md text-center">
            <h2 className="text-xl font-bold mb-4">Quiz Results</h2>
            <p className="text-lg mb-4">Your score: {score}/{quizData.length}</p>
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