"use client"
import React from 'react';
import Link from 'next/link';

export default function HomePage() {
  

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-blue-900 to-purple-900 text-white p-4">
      <h1 className="text-4xl font-bold mb-6">Welcome to knowledge forge</h1>
      <div className="border border-white p-20 rounded-xl">
        <h2 className="text-xl font-bold mb-20">Instruction:</h2>
        <h3 className="text-lg mb-15">  There are 10 questions in the quiz</h3>
        <h3 className="text-lg mb-15">  You will have 15 seconds to answer each question</h3>
        <h3 className="text-lg mb-20">  If you press the hint button you will be provided with hints </h3>
        <h2 className="text-lg mb-4">  Alright ready to test your knowledge! Choose your quiz:</h2>
        <div className="flex flex-col">
          <Link href="/General-Quiz" passHref><div className="text-blue-300 hover:underline cursor-pointer mb-2">Option 1: General Quiz</div></Link>
          <Link href="/Sport-Quiz" passHref><div className="text-blue-300 hover:underline cursor-pointer mb-2">Option 2: Sport Quiz</div></Link>
          <Link href="/History-Quiz" passHref><div className="text-blue-300 hover:underline cursor-pointer mb-2">Option 3: History Quiz</div></Link>
        </div>
      </div>
    </div>
  );
}