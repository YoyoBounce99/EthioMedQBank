// app/payment-instructions/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase';
import { useRouter } from 'next/navigation';
import { CheckCircle, Copy, Smartphone, Building2, Mail, ShieldCheck, Loader2 } from 'lucide-react';

export default function PaymentInstructionsPage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const supabase = createClient();
  const router = useRouter();

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) {
        router.replace('/signup');
      } else {
        setUser(data.user);
        setLoading(false);
      }
    });
  }, [router, supabase]);

  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="w-12 h-12 animate-spin text-blue-600" />
      </div>
    );
  }

  const userEmail = user?.email || 'your email';
  const userId = user?.id || 'loading...';

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <span className="text-xl font-bold text-indigo-900">EthioMedHub</span>
            <span className="text-gray-300">|</span>
            <span className="text-indigo-600 font-semibold">ApexQbank</span>
          </div>
          <div className="text-sm text-gray-600">
            Signed in as <span className="font-medium">{userEmail}</span>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-10">
        {/* Status Banner */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6 mb-8 flex items-start gap-4 shadow-sm">
          <Clock className="w-6 h-6 text-yellow-600 shrink-0 mt-1" />
          <div>
            <h2 className="text-lg font-bold text-yellow-900">Subscription Pending</h2>
            <p className="text-yellow-800 mt-1">
              Your account is created! To unlock full access to ApexQbank, please complete payment below.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
          <div className="p-8 md:p-10">
            <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Unlock Your Access</h1>
            <p className="text-gray-600 mb-8">
              Choose your preferred payment method. Access is granted within 2 hours of sending proof.
            </p>

            {/* Payment Methods */}
            <div className="space-y-6">
              <h3 className="text-lg font-bold text-gray-800 flex items-center">
                <span className="bg-indigo-100 text-indigo-700 w-8 h-8 rounded-full flex items-center justify-center mr-3 text-sm">1</span>
                Transfer 400 Birr
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Telebirr */}
                <div className="border border-gray-200 rounded-2xl p-5 hover:border-indigo-300 transition bg-gray-50">
                  <div className="flex items-center mb-3">
                    <div className="bg-blue-100 p-2 rounded-lg mr-3">
                      <Smartphone className="w-6 h-6 text-blue-600" />
                    </div>
                    <span className="font-bold text-gray-900 text-lg">Telebirr</span>
                  </div>
                  <p className="text-sm text-gray-500 mb-2">Transfer to mobile number:</p>
                  <div
                    className="flex items-center justify-between bg-white border border-gray-200 rounded-lg px-3 py-2 cursor-pointer hover:border-blue-400"
                    onClick={() => handleCopy("+251 911 234 567", "telebirr")}
                  >
                    <span className="font-mono font-medium text-gray-800">+251 911 234 567</span>
                    {copiedField === "telebirr" ? <CheckCircle className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4 text-gray-400" />}
                  </div>
                </div>

                {/* CBE */}
                <div className="border border-gray-200 rounded-2xl p-5 hover:border-indigo-300 transition bg-gray-50">
                  <div className="flex items-center mb-3">
                    <div className="bg-purple-100 p-2 rounded-lg mr-3">
                      <Building2 className="w-6 h-6 text-purple-600" />
                    </div>
                    <span className="font-bold text-gray-900 text-lg">CBE Birr</span>
                  </div>
                  <p className="text-sm text-gray-500 mb-2">Transfer to account:</p>
                  <div
                    className="flex items-center justify-between bg-white border border-gray-200 rounded-lg px-3 py-2 cursor-pointer hover:border-purple-400"
                    onClick={() => handleCopy("1000123456789", "cbe")}
                  >
                    <span className="font-mono font-medium text-gray-800">1000123456789</span>
                    {copiedField === "cbe" ? <CheckCircle className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4 text-gray-400" />}
                  </div>
                </div>
              </div>
            </div>

            <hr className="my-8 border-gray-100" />

            {/* Send Proof */}
            <div className="space-y-6">
              <h3 className="text-lg font-bold text-gray-800 flex items-center">
                <span className="bg-indigo-100 text-indigo-700 w-8 h-8 rounded-full flex items-center justify-center mr-3 text-sm">2</span>
                Send Proof of Payment
              </h3>

              <div className="bg-indigo-50 rounded-2xl p-6 border border-indigo-100">
                <p className="text-gray-700 mb-4">
                  Take a screenshot of your transaction. Send it + your User ID to:
                </p>

                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                  <a
                    href="mailto:EthioMedHub@gmail.com"
                    className="flex items-center justify-center px-4 py-3 bg-white border border-indigo-200 rounded-xl shadow-sm text-indigo-700 font-medium hover:bg-indigo-50"
                  >
                    <Mail className="w-5 h-5 mr-2" />
                    EthioMedHub@gmail.com
                  </a>
                  <a
                    href="https://t.me/EthioMedHub"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center px-4 py-3 bg-blue-500 text-white rounded-xl shadow-sm font-medium hover:bg-blue-600"
                  >
                    <svg className="w-5 h-5 mr-2 fill-current" viewBox="0 0 24 24">
                      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 11.944 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                    </svg>
                    @EthioMedHub
                  </a>
                </div>

                <div className="border-t border-indigo-200 pt-4">
                  <label className="text-xs font-bold text-indigo-800 uppercase tracking-wider mb-2 block">
                    Your Unique User ID:
                  </label>
                  <div
                    className="flex items-center justify-between bg-white border border-indigo-300 rounded-lg px-4 py-3 cursor-pointer hover:shadow-md transition"
                    onClick={() => handleCopy(userId, "uid")}
                  >
                    <code className="text-lg font-mono font-bold text-indigo-900 tracking-wide break-all">
                      {userId}
                    </code>
                    {copiedField === "uid" ? (
                      <span className="flex items-center text-green-600 text-sm font-medium">
                        <CheckCircle className="w-4 h-4 mr-1" /> Copied
                      </span>
                    ) : (
                      <span className="flex items-center text-indigo-500 text-sm font-medium">
                        <Copy className="w-4 h-4 mr-1" /> Copy ID
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-indigo-600 mt-2">
                    * You MUST include this ID so we activate the correct account.
                  </p>
                </div>
              </div>
            </div>

            {/* Security Note */}
            <div className="bg-gray-50 px-8 py-6 border-t border-gray-100 flex items-start gap-3 mt-8">
              <ShieldCheck className="w-5 h-5 text-gray-400 shrink-0" />
              <p className="text-sm text-gray-500">
                Secure Verification: We manually verify every transaction. You’ll receive an email confirmation and instant access within 2 hours.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
