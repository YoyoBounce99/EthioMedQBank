'use client';
import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase';
import { Profile } from '@/types';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();
  const router = useRouter();

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push('/login');
        return;
      }

      const { data } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();
      
      setProfile(data);
      setLoading(false);
    };
    getUser();
  }, [router, supabase]);

  if (loading) return <div className="p-10 text-center">Loading profile...</div>;

  const isPaid = profile?.paid_until ? new Date(profile.paid_until) > new Date() : false;

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-slate-800 mb-4">Student Dashboard</h1>
        
        <div className="bg-white p-6 rounded-lg shadow border border-slate-200 mb-6">
          <h2 className="text-xl font-semibold mb-2">Subscription Status</h2>
          {isPaid ? (
            <div className="text-green-600 font-medium bg-green-50 p-3 rounded">
              Active until: {new Date(profile!.paid_until!).toLocaleDateString()}
            </div>
          ) : (
            <div className="text-red-600 font-medium bg-red-50 p-3 rounded">
              Inactive. Please contact admin to activate access.
              <br/>
              <span className="text-xs text-slate-500">(Admin: Set date in Supabase 'profiles' table)</span>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className={`p-6 rounded-lg shadow border ${isPaid ? 'bg-white' : 'bg-gray-100 opacity-75'}`}>
            <h3 className="text-lg font-bold text-blue-900 mb-2">Gastroenterology Mock Exam</h3>
            <p className="text-sm text-slate-600 mb-4">10 Questions | Timed | EHPLE Style</p>
            {isPaid ? (
              <Link href="/practice" className="block w-full text-center bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
                Start Quiz
              </Link>
            ) : (
              <button disabled className="w-full bg-slate-400 text-white py-2 rounded cursor-not-allowed">
                Locked
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
