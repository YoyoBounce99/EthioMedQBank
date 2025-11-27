// app/quiz/tutor-mode/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase';
import { useRouter } from 'next/navigation';
import { CheckCircle, XCircle, ChevronRight, BookOpen, AlertTriangle } from 'lucide-react';

type Question = {
  id: number;
  question_text: string;
  option_a: string;
  option_b: string;
  option_c: string;
  option_d: string;
  correct_answer: 'A' | 'B' | 'C' | 'D';
  explanation: string;
  reference?: string;
};

export default function TutorModeQuiz() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [loading, setLoading] = useState(true);

  const supabase = createClient();
  const router = useRouter();

  useEffect(() => {
    async function loadQuestions() {
      const { data, error } = await supabase
        .from('questions')
        .select('*')
        .order('id');

      if (error) {
        console.error('Error loading questions:', error);
        return;
      }
      setQuestions(data || []);
      setLoading(false);
    }
    loadQuestions();
  }, [supabase]);

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading questions...</div>;
  if (questions.length === 0) return <div className="min-h-screen flex items-center justify-center">No questions available</div>;

  const currentQuestion = questions[currentIndex];

  const handleSelect = (key: string) => {
    if (!isRevealed) {
      setSelectedAnswer(key);
    }
  };

  const handleSubmit = () => {
    if (!selectedAnswer || isRevealed) return;
    setIsRevealed(true);
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedAnswer(null);
      setIsRevealed(false);
    } else {
      router.push('/dashboard');
    }
  };

  const isCorrect = isRevealed && selectedAnswer === currentQuestion.correct_answer;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-3 flex justify-between items-center">
          <h1 className="text-xl font-bold text-gray-900 flex items-center">
            <BookOpen className="w-5 h-5 mr-2 text-indigo-600" />
            Tutor Mode • Question {currentIndex + 1} of {questions.length}
          </h1>
          <button
            onClick={() => router.push('/dashboard')}
            className="text-sm text-red-600 hover:text-red-800 flex items-center"
          >
            <AlertTriangle className="w-4 h-4 mr-1" /> End Session
          </button>
        </div>
      </header>

      {/* Question */}
      <main className="max-w-4xl mx-auto py-8 px-4">
        <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200">
          <p className="text-xl font-medium text-gray-800 mb-8 whitespace-pre-wrap">
            {currentQuestion.question_text}
          </p>

          <div className="space-y-4 mb-8">
            {(['A', 'B', 'C', 'D'] as const).map((key) => {
              const text = currentQuestion[`option_${key.toLowerCase()}`];
              const isCorrect = key === currentQuestion.correct_answer;
              const isSelected = selectedAnswer === key;

              let classes = "flex items-start p-5 border rounded-xl transition text-left w-full text-gray-800";
              if (isRevealed) {
                if (isCorrect) classes += " bg-green-100 border-green-600 ring-2 ring-green-500 text-green-900 font-bold";
                else if (isSelected) classes += " bg-red-100 border-red-600 ring-2 ring-red-500 text-red-900 font-bold";
                else classes += " bg-white border-gray-200 opacity-60";
              } else {
                if (isSelected) classes += " bg-indigo-100 border-indigo-600 ring-2 ring-indigo-500";
                else classes += " bg-white border-gray-200 hover:border-gray-400";
              }

              return (
                <button
                  key={key}
                  onClick={() => handleSelect(key)}
                  disabled={isRevealed}
                  className={classes}
                >
                  <span className="font-bold mr-4 text-indigo-600">{key}.</span>
                  <span className="flex-1">{text}</span>
                  {isRevealed && isCorrect && <CheckCircle className="w-5 h-5 ml-auto text-green-600" />}
                  {isRevealed && isSelected && !isCorrect && <XCircle className="w-5 h-5 ml-auto text-red-600" />}
                </button>
              );
            })}
          </div>

          {/* Explanation */}
          {isRevealed && (
            <div className={`p-6 rounded-xl border-l-4 ${isCorrect ? 'bg-green-50 border-green-500' : 'bg-red-50 border-red-500'}`}>
              <h3 className={`text-xl font-bold mb-3 flex items-center ${isCorrect ? 'text-green-800' : 'text-red-800'}`}>
                {isCorrect ? <CheckCircle className="w-6 h-6 mr-2" /> : <XCircle className="w-6 h-6 mr-2" />}
                {isCorrect ? 'Correct!' : 'Incorrect'}
              </h3>
              <p className="text-gray-700 whitespace-pre-wrap">{currentQuestion.explanation}</p>
              {currentQuestion.reference && (
                <p className="text-xs text-gray-500 mt-4 pt-4 border-t">
                  Reference: {currentQuestion.reference}
                </p>
              )}
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white shadow-lg border-t fixed bottom-0 left-0 right-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4 flex justify-end">
          {!isRevealed ? (
            <button
              onClick={handleSubmit}
              disabled={!selectedAnswer}
              className="px-8 py-3 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 disabled:bg-gray-400 transition"
            >
              Submit Answer
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="px-8 py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition flex items-center"
            >
              {currentIndex < questions.length - 1 ? 'Next Question' : 'Finish Session'}
              <ChevronRight className="w-5 h-5 ml-2" />
            </button>
          )}
        </div>
      </footer>
    </div>
  );
}
