// QuizResult.js

import React from 'react';

const QuizResult = ({ score, totalQuestions }) => {
  return (
    <div className="bg-gradient-to-r from-purple-800 to-blue-900 min-h-screen p-8 flex flex-col justify-center items-center">
      <h1 className="text-3xl font-bold text-white mb-8">Quiz Result</h1>
      <p className="text-white">Your score: {score}/{totalQuestions}</p>
    </div>
  );
}

export default QuizResult;