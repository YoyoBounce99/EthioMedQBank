'use client';
import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase';
import { Question } from '@/types';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function Practice() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes
  const [isReviewing, setIsReviewing] = useState(false);
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  
  const supabase = createClient();
  const router = useRouter();

  // 1. Fetch Questions & Verify Subscription
  useEffect(() => {
    const init = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return router.push('/login');

      const { data: profile } = await supabase.from('profiles').select('paid_until').eq('id', user.id).single();
      if (!profile?.paid_until || new Date(profile.paid_until) < new Date()) {
        alert("Subscription expired");
        return router.push('/dashboard');
      }

      const { data: qData } = await supabase.from('questions').select('*').limit(10);
      if (qData) setQuestions(qData);
    };
    init();
  }, [router, supabase]);

  // 2. Timer Logic
  useEffect(() => {
    if (showResult || questions.length === 0) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmitQuiz();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [showResult, questions]);

  const handleOptionSelect = (opt: string) => {
    if (showResult) return;
    setSelectedOption(opt);
    setAnswers({ ...answers, [questions[currentIndex].id]: opt });
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedOption(answers[questions[currentIndex + 1].id] || null);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setSelectedOption(answers[questions[currentIndex - 1].id] || null);
    }
  };

  const handleSubmitQuiz = () => {
    let calcScore = 0;
    questions.forEach(q => {
      if (answers[q.id] === q.correct_option) calcScore++;
    });
    setScore(calcScore);
    setShowResult(true);
    setIsReviewing(true);
    setCurrentIndex(0); // Go back to start for review
  };

  if (questions.length === 0) return <div className="p-10">Loading Exam...</div>;

  const currentQ = questions[currentIndex];
  const isCorrect = answers[currentQ.id] === currentQ.correct_option;

  return (
    <div className="min-h-screen bg-slate-100 p-4 md:p-8 text-slate-900">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        
        {/* Header */}
        <div className="bg-blue-900 text-white p-4 flex justify-between items-center">
          <h2 className="font-bold text-lg">Gastroenterology EHPLE</h2>
          {!showResult && (
            <div className={`font-mono font-bold ${timeLeft < 60 ? 'text-red-400' : 'text-white'}`}>
              {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, '0')}
            </div>
          )}
        </div>

        {/* Score Screen */}
        {showResult && !isReviewing && (
          <div className="p-8 text-center">
            <h2 className="text-3xl font-bold mb-4">Quiz Completed</h2>
            <div className="text-5xl font-bold text-blue-600 mb-4">{score} / {questions.length}</div>
            <button onClick={() => setIsReviewing(true)} className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
              Review Answers
            </button>
          </div>
        )}

        {/* Question Interface (Quiz or Review) */}
        {(!showResult || isReviewing) && (
          <div className="p-6">
            <div className="flex justify-between text-sm text-slate-500 mb-4">
               <span>Question {currentIndex + 1} of {questions.length}</span>
               {isReviewing && (
                 <span className={isCorrect ? "text-green-600 font-bold" : "text-red-600 font-bold"}>
                   {isCorrect ? "Correct" : "Incorrect"}
                 </span>
               )}
            </div>

            <p className="text-lg font-medium text-slate-800 mb-6">{currentQ.question_text}</p>

            {/* Image Placeholder */}
            {currentQ.image_url && (
              <div className="mb-6 bg-gray-200 w-full h-64 flex items-center justify-center rounded text-gray-500">
                 {/* In production, use <Image /> with real URLs */}
                 <span>[Radiology Image Placeholder]</span>
              </div>
            )}

            <div className="space-y-3">
              {['A', 'B', 'C', 'D'].map((opt) => {
                const optionKey = `option_${opt.toLowerCase()}` as keyof Question;
                const isSelected = answers[currentQ.id] === opt;
                const isRealCorrect = currentQ.correct_option === opt;

                let btnClass = "w-full text-left p-4 rounded border transition-colors ";
                
                if (isReviewing) {
                  if (isRealCorrect) btnClass += "bg-green-100 border-green-500 text-green-900 font-bold";
                  else if (isSelected && !isRealCorrect) btnClass += "bg-red-100 border-red-500 text-red-900";
                  else btnClass += "border-slate-200 opacity-60";
                } else {
                  btnClass += isSelected ? "bg-blue-100 border-blue-500 text-blue-900" : "border-slate-200 hover:bg-slate-50";
                }

                return (
                  <button
                    key={opt}
                    onClick={() => handleOptionSelect(opt)}
                    disabled={showResult}
                    className={btnClass}
                  >
                    <span className="font-bold mr-2">{opt}.</span>
                    {currentQ[optionKey]}
                  </button>
                );
              })}
            </div>

            {/* Explanation Block (Only in Review) */}
            {isReviewing && (
              <div className="mt-6 p-4 bg-yellow-50 border-l-4 border-yellow-400 text-slate-700">
                <h4 className="font-bold text-yellow-800 mb-1">Explanation:</h4>
                <p>{currentQ.explanation}</p>
              </div>
            )}

            {/* Navigation */}
            <div className="mt-8 flex justify-between">
              <button onClick={handlePrev} disabled={currentIndex === 0} className="px-4 py-2 rounded border hover:bg-gray-50 disabled:opacity-50">
                Previous
              </button>
              
              {currentIndex === questions.length - 1 ? (
                !showResult && (
                  <button onClick={handleSubmitQuiz} className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700">
                    Submit Exam
                  </button>
                )
              ) : (
                <button onClick={handleNext} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                  Next
                </button>
              )}
            </div>
            
            {isReviewing && (
                 <button onClick={() => router.push('/dashboard')} className="mt-6 w-full py-2 text-blue-600 hover:underline">
                   Back to Dashboard
                 </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
