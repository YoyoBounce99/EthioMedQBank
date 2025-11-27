// app/review/page.tsx
import Link from 'next/link';
import { createClient } from '@/utils/supabase';
import { CheckCircle, XCircle, BarChart3, Clock } from 'lucide-react';

type Result = {
  score: number;
  total: number;
  timeTaken: string;
  correct: number;
  incorrect: number;
};

export default async function ReviewPage() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  // In real app: fetch latest quiz attempt from `quiz_attempts` table
  // For now we show realistic mock data
  const result: Result = {
    score: 78,
    total: 100,
    timeTaken: '1h 22m',
    correct: 78,
    incorrect: 22,
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-md border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-gray-900 flex items-center">
            <BarChart3 className="w-5 h-5 mr-2 text-indigo-600" />
            Quiz Review
          </h1>
          <Link href="/dashboard" className="text-sm font-medium text-indigo-600 hover:text-indigo-800">
            Return to Dashboard
          </Link>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-8 px-4">
        {/* Overall Performance */}
        <div className="bg-white p-8 rounded-xl shadow-lg border-t-4 border-indigo-600 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Overall Performance</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="p-6 bg-indigo-50 rounded-xl">
              <p className="text-5xl font-extrabold text-indigo-600">{result.score}%</p>
              <p className="text-sm font-medium text-indigo-800 mt-2">Accuracy</p>
            </div>
            <div className="p-6 bg-gray-50 rounded-xl">
              <p className="text-3xl font-bold text-gray-700 flex items-center justify-center">
                <Clock className="w-6 h-6 mr-2" /> {result.timeTaken}
              </p>
              <p className="text-sm font-medium text-gray-600 mt-2">Time Taken</p>
            </div>
            <div className="p-6 bg-green-50 rounded-xl">
              <p className="text-4xl font-bold text-green-600">{result.correct}</p>
              <p className="text-sm font-medium text-green-800 mt-2">Correct</p>
            </div>
            <div className="p-6 bg-red-50 rounded-xl">
              <p className="text-4xl font-bold text-red-600">{result.incorrect}</p>
              <p className="text-sm font-medium text-red-800 mt-2">Incorrect</p>
            </div>
          </div>
        </div>

        {/* Question Review */}
        <div className="space-y-8">
          <h3 className="text-2xl font-bold text-gray-900">Detailed Question Review</h3>

          {/* Example Correct */}
          <div className="bg-white p-6 rounded-xl shadow border border-gray-200">
            <div className="flex items-center mb-3 text-green-700 font-bold">
              <CheckCircle className="w-6 h-6 mr-2" /> Question 1 – Correct
            </div>
            <p className="text-gray-800 mb-4">Which antibiotic is first-line for CAP in healthy outpatients?</p>
            <div className="bg-green-50 p-4 rounded border border-green-200 text-sm">
              <span className="font-bold">Explanation:</span> Macrolides (Azithromycin) treat atypical organisms common in this demographic.
            </div>
          </div>

          {/* Example Incorrect */}
          <div className="bg-white p-6 rounded-xl shadow border border-gray-200">
            <div className="flex items-center mb-3 text-red-700 font-bold">
              <XCircle className="w-6 h-6 mr-2" /> Question 2 – Incorrect
            </div>
            <p className="text-gray-800 mb-4">Primary mechanism of SGLT2 inhibitors in heart failure?</p>
            <div className="bg-gray-50 p-4 rounded border border-gray-200 text-sm space-y-2">
              <p><span className="font-bold text-red-600">Your Answer:</span> A (Diuretic effect)</p>
              <p><span className="font-bold text-green-600">Correct Answer:</span> C (Metabolic reprogramming)</p>
              <p className="mt-2">
                <span className="font-bold">Explanation:</span> While they have diuretic effects, the primary HF benefit is metabolic optimization and hemodynamic load reduction.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
