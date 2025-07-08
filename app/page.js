"use client";

import { useState } from 'react';

const questions = [
  "I find it difficult to control my anger in everyday situations, even when they're minor or trivial.",
  "I notice that I lose my patience easily and frequently lash out at people close to me or even strangers.",
  "I experience episodes of anger so intense that I regret my words or actions afterward.",
  "I have trouble forgiving or forgetting when someone irritates or frustrates me, holding onto resentment.",
  "I physically experience anger intensely, with increased heart rate, muscle tension, or rapid breathing.",
  "I've recently thought about physically harming someone or myself due to the intensity of my anger.", // FLAG
  "My family, professional, or social relationships have been negatively affected by my frequent irritability.",
  "I've noticed my anger seems to be increasing over time rather than improving or being controlled.",
  "I usually react aggressively or hostilely, even when I prefer to handle situations calmly.",
  "I often feel remorseful or ashamed of the way I acted during my angry episodes."
];

export default function AngerTest() {
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
          <h2 className="text-xl font-semibold mb-4">Anger Test</h2>
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
