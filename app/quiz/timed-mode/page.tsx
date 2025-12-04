// app/quiz/timed-mode/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase';
import { useRouter } from 'next/navigation';
import { Clock, ChevronLeft, ChevronRight, Send, AlertTriangle } from 'lucide-react';

type Question = {
  id: number;
  question_text: string;
  option_a: string;
  option_b: string;
  option_c: string;
  option_d: string;
};

const TOTAL_TIME = 2 * 60 * 60; // 2 hours in seconds

export default function TimedModeQuiz() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [timeRemaining, setTimeRemaining] = useState(TOTAL_TIME);
  const [loading, setLoading] = useState(true);

  const supabase = createClient();
  const router = useRouter();

  useEffect(() => {
    async function loadQuestions() {
      const { data, error } = await supabase
        .from('questions')
        .select('*')
        .order('id');

      if (!error && data) {
        setQuestions(data);
      }
      setLoading(false);
    }
    loadQuestions();
  }, [supabase]);

  // Timer
  useEffect(() => {
    if (loading || timeRemaining <= 0) return;
    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [loading, timeRemaining]);

  const handleAnswer = (qId: number, key: string) => {
    setAnswers((prev) => ({ ...prev, [qId]: key }));
  };

  const handleSubmit = () => {
    // In real app: save answers to quiz_attempts table
    router.push('/review');
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center text-xl">Loading exam...</div>;
  if (questions.length === 0) return <div className="min-h-screen flex items-center justify-center text-xl">No questions available</div>;

  const currentQuestion = questions[currentIndex];
  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;
  const isCritical = timeRemaining < 300; // < 5 minutes

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-md border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
          <h1 className="text-xl font-bold text-gray-900">Timed Mock Exam</h1>
          <div className="flex items-center gap-6">
            <div className={`flex items-center font-bold text-lg px-4 py-2 rounded-lg border-2 ${isCritical ? 'bg-red-50 text-red-700 border-red-300' : 'bg-gray-100 text-gray-700 border-gray-300'}`}>
              <Clock className={`w-5 h-5 mr-2 ${isCritical ? 'text-red-500' : 'text-indigo-500'}`} />
              {minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
            </div>
            <button
              onClick={handleSubmit}
              className="px-5 py-2 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 flex items-center"
            >
              <Send className="w-4 h-4 mr-2" />
              Submit Exam
            </button>
          </div>
        </div>
      </header>

      {/* Question */}
      <main className="max-w-7xl mx-auto py-8 px-4">
        <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">
            <span className="text-indigo-600 mr-3">Q{currentQuestion.id}.</span>
            {currentQuestion.question_text}
          </h2>

          <div className="space-y-4">
            {(['A', 'B', 'C', 'D'] as const).map((key) => {
  const optionText = currentQuestion[
    `option_${key.toLowerCase()}` as keyof Question
  ] as string;
  const isSelected = answers[currentQuestion.id] === key;

  return (
    <button
      key={key}
      onClick={() => handleAnswer(currentQuestion.id, key)}
      className={`w-full text-left p-5 rounded-xl border-2 transition flex items-start ${
        isSelected
          ? 'border-indigo-600 bg-indigo-50 ring-2 ring-indigo-500'
          : 'border-gray-200 hover:border-gray-400'
      }`}
    >
      <span className="font-bold mr-4 text-indigo-600">{key}.</span>
      <span className="flex-1">{optionText}</span>
    </button>
  );
})}
          </div>

          <div className="mt-8 p-4 bg-gray-50 rounded-lg text-sm text-gray-600 border border-gray-200 flex items-center">
            <AlertTriangle className="w-4 h-4 mr-2 text-yellow-500" />
            Explanation available after submission.
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white shadow-lg border-t fixed bottom-0 left-0 right-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <button
            onClick={() => setCurrentIndex(Math.max(0, currentIndex - 1))}
            disabled={currentIndex === 0}
            className="flex items-center text-gray-600 disabled:opacity-50 hover:text-indigo-600 font-medium"
          >
            <ChevronLeft className="w-5 h-5 mr-1" /> Previous
          </button>

          <span className="text-sm font-semibold text-gray-700">
            Question {currentIndex + 1} of {questions.length}
          </span>

          <button
            onClick={() => setCurrentIndex(Math.min(questions.length - 1, currentIndex + 1))}
            disabled={currentIndex === questions.length - 1}
            className="flex items-center text-indigo-600 font-medium hover:text-indigo-800"
          >
            Next <ChevronRight className="w-5 h-5 ml-1" />
          </button>
        </div>
      </footer>
    </div>
  );
}
