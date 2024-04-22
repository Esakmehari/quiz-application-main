"use client"
import Link from 'next/link';
import { useState } from 'react';

export default function Page() {
  const [timerEnabled, setTimerEnabled] = useState(true); // Track if timer is enabled or not

  return (
    <main className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-blue-900 to-purple-900 text-white">
      <h1 className="text-4xl font-bold mb-4">Welcome to</h1>
      <h2 className="text-xl mb-6">KNOWLEDGE FORGE</h2>
      
      <h2 className="text-lg mb-4">Ready to test your knowledge! Choose your quiz:</h2>
      
      <div className="flex flex-col">
        <Link href="/General-Quiz" passHref><div className="text-blue-300 hover:underline cursor-pointer mb-2">Option 1: General Quiz</div></Link>
        <Link href="/Sport-Quiz" passHref><div className="text-blue-300 hover:underline cursor-pointer mb-2">Option 2: Sport Quiz</div></Link>
        <Link href="/History-Quiz" passHref><div className="text-blue-300 hover:underline cursor-pointer mb-2">Option 3: History Quiz</div></Link>
      </div>

      <div className="mt-4 flex items-center"> {/* Added flex and items-center classes */}
        <label htmlFor="timerCheckbox" className="text-white mr-2">Timer:</label>
        <input
          type="checkbox"
          id="timerCheckbox"
          checked={timerEnabled}
          onChange={() => setTimerEnabled(!timerEnabled)}
          className="cursor-pointer h-6 w-6" // Increased height and width
        />
      </div>
    </main>
  );
}