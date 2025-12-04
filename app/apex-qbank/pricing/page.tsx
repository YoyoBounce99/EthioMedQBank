// app/apex-qbank/pricing/page.tsx
import Link from 'next/link';
import { CheckCircle, ArrowRight, BookOpen } from 'lucide-react';

const currency = "Birr";

const coreFeatures = [
  "Full access to 800 + questions",
  "Timed mock exam mode",
  "Tutor mode",
  "Detailed explanations for all answers",
  "Basic performance tracking",
];

const pricingPlans = [
  {
    name: "1 Month Cram",
    duration: "30 Days",
    price: 300,
    description: "Perfect for students preparing in the final weeks before the EHPLE.",
    features: coreFeatures,
    cta: "Select 1 Month",
    color: "bg-indigo-500",
    isRecommended: false,
  },
  {
    name: "3 Months Value",
    duration: "90 Days",
    price: 600,
    description: "Our most popular choice for balanced, comprehensive, and stress-free preparation.",
    features: [
      ...coreFeatures,
      "Save 33% (vs. 1-month plan)",
      "Access for 3 months",
    ],
    cta: "Select 3 Months",
    color: "bg-indigo-700",
    isRecommended: true,
  },
  {
    name: "1 Year Pro",
    duration: "365 Days",
    price: 1000,
    description: "Ideal for early planners, repeat test-takers, or professionals needing continuous review.",
    features: [
      ...coreFeatures,
      "Priority Email Support",
      "Save 72% (vs. 1-month plan)",
      "Access for 1 year",
    ],
    cta: "Select 1 Year",
    color: "bg-indigo-900",
    isRecommended: false,
  },
];

const features = [
  "Full Question Bank Access (800+ Questions)",
  "Timed Mock Exam Simulator",
  "Tutor Mode (Step-by-Step Guidance)",
  "Subject-Specific Performance Analytics",
  "Detailed, Localized Explanations",
  "Mobile-Optimized Interface",
  "Offline Mode (Coming Soon)",
];

export default function ApexQBankPricingPage() {
  return (
    <div className="min-h-screen bg-gray-50 font-sans flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Target className="w-8 h-8 text-indigo-600" />
            <span className="text-2xl font-extrabold text-gray-900 tracking-tight">
              ApexQbank Pricing
            </span>
          </div>
          <Link href="/" className="text-sm text-gray-600 hover:text-indigo-600 font-semibold">
            Back to EthioMedHub
          </Link>
        </div>
      </header>

      <main className="flex-grow">
        {/* Hero & Title */}
        <section className="py-16 text-center bg-white border-b border-gray-100">
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl mb-4">
            Invest in Your Career Success.
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose the plan that fits your study timeline and budget for the Ethiopian Health Professionals Licensing Examination (EHPLE).
          </p>
        </section>

        {/* Pricing Tiers Grid */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
              {pricingPlans.map((plan) => (
                <div
                  key={plan.name}
                  className={`relative p-8 flex flex-col rounded-3xl shadow-xl transition transform hover:scale-[1.02] ${plan.color} text-white`}
                >
                  {plan.isRecommended && (
                    <div className="absolute top-0 right-0 -mt-4 mr-4 px-4 py-1 text-xs font-bold uppercase tracking-wider text-white bg-red-500 rounded-full shadow-lg">
                      Best Value
                    </div>
                  )}
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <p className="opacity-90 mb-6">{plan.description}</p>

                  <div className="flex items-baseline mb-8">
                    <span className="text-6xl font-extrabold">{plan.price}</span>
                    <span className="ml-2 text-2xl font-medium opacity-90">{currency}</span>
                    <span className="ml-2 text-lg opacity-80">/ {plan.duration}</span>
                  </div>

                  <ul className="space-y-4 flex-grow">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        <CheckCircle className="flex-shrink-0 h-5 w-5 text-green-300 mt-1 mr-3" />
                        <span className="text-base font-medium">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    href="/signup"
                    className="mt-10 block w-full py-3 text-center bg-white text-indigo-600 font-extrabold rounded-xl shadow-lg hover:bg-gray-100 transition"
                  >
                    {plan.cta}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Free Trial Section */}
        <section className="py-16 bg-white border-t border-gray-100">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Not Ready to Commit? Try it FREE!</h2>
            <p className="text-lg text-gray-600 mb-8">
              Experience the ApexQbank quality risk-free. Our free trial gives you a true feel for our high-yield content and simulator features.
            </p>
            <div className="flex items-center justify-center space-x-4 p-6 bg-indigo-50 border border-indigo-200 rounded-xl">
              <BookOpen className="w-6 h-6 text-indigo-600" />
              <p className="text-xl font-semibold text-indigo-800">
                Free Trial: <span className="font-extrabold">2 Questions per Subject</span>, including explanations.
              </p>
              <Link
                href="/practice?mode=trial"
                className="ml-6 px-6 py-3 bg-red-600 text-white font-bold rounded-lg shadow-md hover:bg-red-700 transition flex items-center"
              >
                Start Trial Now <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </div>
          </div>
        </section>

        {/* Feature Comparison Table */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">
              What Every Paid Plan Includes
            </h2>
            <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
              <div className="p-8">
                <ul className="space-y-4">
                  {features.map((feature, index) => (
                    <li key={index} className="flex items-center justify-between border-b last:border-b-0 py-3">
                      <span className="text-lg font-medium text-gray-700">{feature}</span>
                      <CheckCircle className="h-6 w-6 text-indigo-600" />
                    </li>
                  ))}
                  <li className="flex items-center justify-between border-b last:border-b-0 py-3">
                    <span className="text-lg font-medium text-gray-700">Support Level</span>
                    <span className="text-lg font-bold text-indigo-600">Standard / Priority</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-800 text-gray-300 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-sm">&copy; 2025 ApexQbank by EthioMedHub. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
