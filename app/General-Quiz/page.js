"use client";
import { useState } from 'react';
import Link from 'next/link'; // Import Link from Next.js

export default function GeneralQuiz() {
  const [answers, setAnswers] = useState({});
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showResult, setShowResult] = useState(false); // State to control result display

  // Sample quiz data
  const quizData = [
    {
      question: "Which planet is known as the Red Planet?",
      options: ["Earth", "Mars", "Jupiter", "Saturn"],
      correctAnswer: "Mars"
    },
    {
      question: "What is the currency of Japan?",
      options: ["Yuan", "Dollar", "Euro", "Yen"],
      correctAnswer: "Yen"
    }
  ];

  const handleAnswerSelection = (selectedOption) => {
    setAnswers({ ...answers, [currentQuestion]: selectedOption });
  };

  const calculateScore = () => {
    let score = 0;
    quizData.forEach((question, index) => {
      const userAnswer = answers[index];
      if (userAnswer === question.correctAnswer) {
        score++;
      }
    });
    return score;
  };

  const handleCheckResult = () => {
    setShowResult(true); // Show result when button is clicked
  };

  const renderQuizResult = () => {
    const score = calculateScore();
    const totalQuestions = quizData.length;
    const message = `Your score: ${score}/${totalQuestions}`;
    return (
      <div>
        <p>{message}</p>
        <Link href="/Quiz-Result" passHref><div className="text-blue-500 hover:underline cursor-pointer mb-2">Display result</div></Link>
      </div>
    );
  };

  const currentQuestionData = quizData[currentQuestion];

  return (
    <main className="bg-gradient-to-r from-purple-800 to-blue-900 min-h-screen p-8 flex flex-col justify-center items-center">
      <h1 className="text-3xl font-bold text-white mb-8">General Quiz</h1>
      {!currentQuestionData ? (
        <h2 className="text-lg text-center text-white mb-12">You have completed the quiz!</h2>
      ) : (
        <>
          <h3 className="font-semibold text-lg mb-4">{currentQuestionData.question}</h3>
          <form className="w-full max-w-md space-y-6">
            <div className="bg-black p-6 rounded-md shadow-md">
              <ul className="space-y-2">
                {currentQuestionData.options.map((option, optionIndex) => (
                  <li key={optionIndex} className="flex items-center">
                    <input
                      type="radio"
                      id={`option-${optionIndex}`}
                      value={option}
                      checked={answers[currentQuestion] === option}
                      onChange={() => handleAnswerSelection(option)}
                      className="mr-2 cursor-pointer"
                    />
                    <label htmlFor={`option-${optionIndex}`} className={answers[currentQuestion] === option ? "text-purple-500 font-semibold" : "text-gray-800"}>{option}</label>
                  </li>
                ))}
              </ul>
            </div>
            <button
              type="button"
              onClick={() => {
                if (answers[currentQuestion] !== undefined) {
                  setCurrentQuestion(currentQuestion + 1);
                }
              }}
              className="bg-blue-500 text-white font-semibold py-3 px-6 rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
            >
              {currentQuestion === quizData.length - 1 ? "Submit Quiz" : "Next Question"}
            </button>
            {currentQuestion === quizData.length - 1 && (
              <button onClick={handleCheckResult}>Check Result</button>
            )}
          </form>
        </>
      )}
      {showResult && renderQuizResult()} {/* Display result if showResult is true */}
    </main>
  );
}