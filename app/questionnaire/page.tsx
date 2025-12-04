// app/questionnaire/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase';
import { useRouter } from 'next/navigation';
import { Zap, CheckCircle, Loader2 } from 'lucide-react';

const LEVELS = [
  'Med Student',
  'Intern',
  'GP (General Practitioner)',
  'Resident',
  'Specialist',
  'Fellow',
  'Sub Specialist',
];

export default function QuestionnairePage() {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    sex: '',
    university: '',
    level: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [user, setUser] = useState<any>(null);

  const supabase = createClient();
  const router = useRouter();

  // Load user
  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) {
        router.replace('/signup');
      } else {
        setUser(data.user);
        // Pre-fill name if already exists
        setFormData((prev) => ({
          ...prev,
          name: data.user.user_metadata?.name || data.user.email?.split('@')[0] || '',
        }));
      }
    });
  }, [router, supabase]);

  // Skip questionnaire if already completed or paid
  useEffect(() => {
    if (!user) return;

    supabase
      .from('profiles')
      .select('name, is_paid')
      .eq('id', user.id)
      .single()
      .then(({ data }) => {
        if (data?.name || data?.is_paid) {
          router.replace('/dashboard');
        }
      });
  }, [user, router, supabase]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);

   const { error } = await supabase
    .from('profiles')
    .upsert({
      id: user.id,
      name: formData.name || null,
      age: formData.age ? parseInt(formData.age) : null,
      sex: formData.sex || null,
      university: formData.university || null,
      level: formData.level || null,
      updated_at: new Date().toISOString(),
    }, {
      onConflict: 'id'
    });

  if (error) {
    console.error('Supabase error:', error);
    alert('Error: ' + error.message);
  } else {
    setSuccess(true);
    setTimeout(() => router.push('/payment-instructions'), 2000);
  }
  setLoading(false);
};

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="w-12 h-12 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl p-8 border-t-4 border-blue-600">
        <div className="text-center mb-8">
          <Zap className="w-12 h-12 text-blue-600 mx-auto mb-4" />
          <h1 className="text-3xl font-extrabold text-gray-900">Complete Your Profile</h1>
          <p className="text-gray-600 mt-2">Help us personalize your ApexQbank experience</p>
        </div>

        {success ? (
          <div className="text-center py-12">
            <CheckCircle className="w-20 h-20 text-green-600 mx-auto mb-4" />
            <p className="text-2xl font-bold text-green-700">Profile Saved!</p>
            <p className="text-gray-600 mt-2">Redirecting to payment instructions...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Age</label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  required
                  min="18"
                  max="100"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Sex</label>
                <select
                  name="sex"
                  value={formData.sex}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">University</label>
                <input
                  type="text"
                  name="university"
                  value={formData.university}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., Addis Ababa University"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Professional Level</label>
              <select
                name="level"
                value={formData.level}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Level</option>
                {LEVELS.map((lvl) => (
                  <option key={lvl} value={lvl}>
                    {lvl}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition disabled:opacity-50 flex items-center justify-center"
            >
              {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : 'Save & Continue →'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
