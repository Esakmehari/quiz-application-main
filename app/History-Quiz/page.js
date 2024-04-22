"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function HistoryQuiz() {
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0); 
  const [hint, setHint] = useState(""); 
  const [timeLeft, setTimeLeft] = useState(15); 
  const [hintCount, setHintCount] = useState(0); 

  const quizData = [
    {
      question: "Who was the first President of the United States?",
      options: ["George Washington", "Thomas Jefferson", "Abraham Lincoln", "John Adams"],
      correctAnswer: "George Washington",
      hint: "He served as the Commander-in-Chief of the Continental Army during the American Revolutionary War."
    },
    {
      question: "Which civilization built the Great Pyramid of Giza?",
      options: ["Ancient Egyptians", "Ancient Greeks", "Ancient Romans", "Mesopotamians"],
      correctAnswer: "Ancient Egyptians",
      hint: "It is one of the Seven Wonders of the Ancient World and was built as a tomb for the Pharaoh Khufu."
    },
    {
      question: "Who was the first female Prime Minister of the United Kingdom?",
      options: ["Margaret Thatcher", "Theresa May", "Indira Gandhi", "Angela Merkel"],
      correctAnswer: "Margaret Thatcher",
      hint: "She served as Prime Minister from 1979 to 1990 and was known as the 'Iron Lady' for her leadership style."
    },
    {
      question: "When did World War I begin?",
      options: ["1914", "1918", "1939", "1941"],
      correctAnswer: "1914",
      hint: "The war began after the assassination of Archduke Franz Ferdinand of Austria-Hungary."
    },
    {
      question: "Who wrote the 'I Have a Dream' speech?",
      options: ["Martin Luther King Jr.", "Malcolm X", "Nelson Mandela", "Barack Obama"],
      correctAnswer: "Martin Luther King Jr.",
      hint: "He delivered the speech during the March on Washington for Jobs and Freedom in 1963."
    },
    {
      question: "Which ancient civilization was known for its alphabet?",
      options: ["Phoenicians", "Sumerians", "Persians", "Mayans"],
      correctAnswer: "Phoenicians",
      hint: "Their alphabet was the basis for many modern alphabets, including the Greek and Latin alphabets."
    },
    {
      question: "Who was the last Tsar of Russia?",
      options: ["Nicholas II", "Vladimir Lenin", "Joseph Stalin", "Leon Trotsky"],
      correctAnswer: "Nicholas II",
      hint: "He abdicated the throne in 1917 following the February Revolution and was later executed with his family."
    },
    {
      question: "Which ancient civilization built the city of Machu Picchu?",
      options: ["Incas", "Aztecs", "Mayans", "Olmecs"],
      correctAnswer: "Incas",
      hint: "It was built in the 15th century and was later abandoned during the Spanish conquest of the Inca Empire."
    },
    {
      question: "Who was the first Emperor of Rome?",
      options: ["Augustus", "Julius Caesar", "Nero", "Caligula"],
      correctAnswer: "Augustus",
      hint: "He was the founder of the Roman Principate and ruled from 27 BC until his death in AD 14."
    },
    {
      question: "When did the Berlin Wall fall?",
      options: ["1989", "1991", "1975", "1990"],
      correctAnswer: "1989",
      hint: "The fall of the Berlin Wall symbolized the end of the Cold War and the reunification of East and West Germany."
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
      <h1 className="text-3xl font-bold text-white mb-8">History Quiz</h1>
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