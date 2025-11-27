// app/dashboard/page.tsx
import Link from 'next/link';
import { createClient } from '@/utils/supabase';
import { GraduationCap, BookOpen, Clock, User, CheckCircle } from 'lucide-react';

const TOPICS = [
  { name: "Infectious Diseases", icon: "Bug" },
  { name: "Cardiology", icon: "Heart" },
  { name: "Pulmonology", icon: "AirVent" },
  { name: "Gastroenterology", icon: "Nut" },
  { name: "Nephrology", icon: "Tractor" },
  { name: "Endocrinology", icon: "Droplet" },
  { name: "Hematology/Oncology", icon: "Zap" },
  { name: "Neurology", icon: "Brain" },
  { name: "Rheumatology", icon: "Bone" },
  { name: "Orthopedic Surgery", icon: "Footprints" },
  { name: "Endocrine Surgery", icon: "Scale" },
  { name: "Thoracic & Vascular Surgery", icon: "HeartPulse" },
  { name: "GI Surgery", icon: "Scissors" },
  { name: "Urology", icon: "Coffee" },
  { name: "OBGYN", icon: "Baby" },
  { name: "Neonatology", icon: "Bird" },
  { name: "Pediatrics (Non-Neonatal)", icon: "Smile" },
  { name: "ENT", icon: "Ear" },
  { name: "Dentistry", icon: "Pill" },
  { name: "Psychiatry", icon: "Users" },
  { name: "Ophthalmology", icon: "Eye" },
  { name: "Dermatology", icon: "Sun" },
  { name: "Emergency & Critical Care", icon: "Ambulance" },
];

const MOCK_EXAMS = [
  { id: 1, name: "Mock Exam 1" },
  { id: 2, name: "Mock Exam 2" },
  { id: 3, name: "Mock Exam 3" },
];

import {
  Bug, Heart, AirVent, Nut, Tractor, Droplet, Zap, Brain, Bone, Footprints, Scale, HeartPulse,
  Scissors, Coffee, Baby, Bird, Smile, Ear, Pill, Users as UsersIcon, Eye, Sun, Ambulance
} from 'lucide-react';

const IconMap: Record<string, any> = {
  Bug, Heart, AirVent, Nut, Tractor, Droplet, Zap, Brain, Bone, Footprints, Scale, HeartPulse,
  Scissors, Coffee, Baby, Bird, Smile, Ear, Pill, Users: UsersIcon, Eye, Sun, Ambulance,
};

export default async function Dashboard() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const { data: profile } = await supabase
    .from('profiles')
    .select('is_paid, name')
    .eq('id', user?.id)
    .single();

  const isPaid = profile?.is_paid || false;
  const userName = profile?.name || 'Student';

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900 flex items-center">
            <GraduationCap className="w-6 h-6 mr-2 text-indigo-600" />
            ApexQbank Dashboard
          </h1>
          <div className="text-sm text-gray-600 flex items-center">
            <User className="w-4 h-4 mr-1 text-indigo-500" />
            <span className="font-medium text-indigo-600">Dr. {userName}</span>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-10 px-4">
        {/* Paid / Unpaid State */}
        {!isPaid ? (
          <div className="bg-red-50 border border-red-300 text-red-900 p-6 rounded-2xl shadow-lg mb-10">
            <h2 className="text-xl font-bold">Access Restricted</h2>
            <p className="mt-2">Please complete payment via Telebirr/CBE Birr to unlock full access.</p>
            <p className="mt-4 font-medium">Telegram: @EthioMedHub • Email: EthioMedHub@gmail.com</p>
          </div>
        ) : (
          <div className="bg-emerald-50 border border-emerald-300 text-emerald-900 p-6 rounded-2xl shadow-lg mb-10 flex items-center gap-4">
            <CheckCircle className="w-8 h-8 text-emerald-600 shrink-0" />
            <div>
              <h2 className="text-xl font-extrabold">Full Access Granted!</h2>
              <p className="text-sm mt-1">Your subscription is active. Start practicing below to ace the EHPLE.</p>
            </div>
          </div>
        )}

        {/* Mock Exams */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b pb-2 flex items-center">
            <Clock className="w-5 h-5 mr-2 text-green-600" />
            Simulated EHPLE Mock Exams
            <span className="ml-3 text-sm font-medium text-green-600 bg-green-100 px-3 py-1 rounded-full">
              Timed Mode Only
            </span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {MOCK_EXAMS.map((exam) => (
              <Link key={exam.id} href="/quiz/timed-mode" className="block">
                <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg hover:border-green-400 transition transform hover:scale-105">
                  <Clock className="w-8 h-8 text-green-600 mb-3" />
                  <h3 className="text-lg font-semibold text-gray-900">{exam.name}</h3>
                  <p className="text-sm text-gray-500 mt-1">
                    200 Qs • <span className="font-bold text-green-500">Timed Mode Only</span>
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Topic Practice */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b pb-2 flex items-center">
            <BookOpen className="w-5 h-5 mr-2 text-indigo-600" />
            Topic-Based Practice
            <span className="ml-3 text-sm font-medium text-indigo-600 bg-indigo-100 px-3 py-1 rounded-full">
              Tutor Mode Only
            </span>
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {TOPICS.map((topic) => {
              const Icon = IconMap[topic.icon] || BookOpen;
              return (
                <Link key={topic.name} href="/quiz/tutor-mode">
                  <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg hover:border-indigo-400 transition transform hover:scale-105 text-center">
                    <Icon className="w-8 h-8 text-indigo-600 mx-auto mb-3" />
                    <h3 className="text-sm font-semibold text-gray-900">{topic.name}</h3>
                  </div>
                </Link>
              );
            })}

            {/* Public Health */}
            <Link href="/quiz/tutor-mode">
              <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg hover:border-indigo-400 transition transform hover:scale-105 text-center">
                <GraduationCap className="w-8 h-8 text-indigo-600 mx-auto mb-3" />
                <h3 className="text-sm font-semibold text-gray-900">Public Health</h3>
              </div>
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
