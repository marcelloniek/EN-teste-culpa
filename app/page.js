"use client";

import { useState } from 'react';

const questions = [
  "I have difficulty forgiving myself for past mistakes, even small or unintentional ones.",
  "I often feel guilty for situations or events, even when I'm not clearly responsible for them.",
  "I frequently believe I am responsible for the unhappiness or suffering of people around me.",
  "I have trouble accepting compliments or recognizing my own qualities due to frequent feelings of guilt.",
  "I repeatedly mentally relive past mistakes, feeling shame or remorse about those events.",
  "Recently, I've thought that I don't deserve happiness or that I deserve severe punishment for something I did or didn't do.", // FLAG
  "I often feel anguished or sad because I think I could have done more or better in past situations.",
  "My emotional life and self-esteem are deeply affected by frequent thoughts of guilt and self-blame.",
  "I find it difficult to make decisions due to fear of making mistakes and feeling guilty afterward.",
  "I avoid contact with people or situations out of shame or fear of being judged for my past mistakes."
];

export default function GuiltTest() {
  const [responses, setResponses] = useState(Array(10).fill(0));
  const [result, setResult] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const recordResponse = (value) => {
    const newResponses = [...responses];
    newResponses[currentIndex] = value;
    setResponses(newResponses);

    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      calculateResult(newResponses);
    }
  };

  const calculateResult = (responses) => {
    if (responses[5] >= 3) { // FLAG
      setResult("RED");
    } else {
      const total = responses.reduce((a, b) => a + b, 0);
      if (total <= 20) setResult("GREEN");
      else if (total <= 35) setResult("YELLOW");
      else setResult("RED");
    }
  };

  const resetTest = () => {
    setResponses(Array(10).fill(0));
    setResult(null);
    setCurrentIndex(0);
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-gray-100 dark:bg-gray-800 rounded-xl shadow-md text-gray-900 dark:text-gray-100">
      {!result ? (
        <>
          <h2 className="text-xl font-semibold mb-4">Guilt Test</h2>
          <p className="mb-4">{questions[currentIndex]}</p>
          <div className="flex justify-between">
            {[1, 2, 3, 4, 5].map((num) => (
              <button
                key={num}
                className="px-4 py-2 bg-blue-500 dark:bg-blue-600 text-white rounded hover:bg-blue-600 dark:hover:bg-blue-700"
                onClick={() => recordResponse(num)}
              >
                {num}
              </button>
            ))}
          </div>
          <p className="mt-4 text-sm">Question {currentIndex + 1} of {questions.length}</p>
        </>
      ) : (
        <>
          <h2 className="text-xl font-semibold mb-4">Result: {result}</h2>
          {result === "GREEN" && <p>You handle this topic very well and are emotionally well-adjusted. You could greatly help others in need.</p>}
          {result === "YELLOW" && <p>There are clear signs of emotional difficulties that need attention but can be overcome with determination and help.</p>}
          {result === "RED" && <p>Your emotional issues with this topic require professional assistance. Please promptly seek help from a doctor or psychologist.</p>}
          <button
            className="mt-4 px-4 py-2 bg-green-500 dark:bg-green-600 text-white rounded hover:bg-green-600 dark:hover:bg-green-700"
            onClick={resetTest}
          >
            Retake Test
          </button>
        </>
      )}
    </div>
  );
}
