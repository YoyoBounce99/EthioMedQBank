// app/apex-qbank/pricing/page.tsx
import Link from 'next/link';

export default function PricingPage() {
  const plans = [
    {
      name: "Demo",
      price: "Free",
      description: "Test out 10 sample questions in tutor mode with detailed explanations",
      buttonText: "Try Demo",
      href: "/signup",
    },
    {
      name: "1 Month",
      price: "500 birr",
      description: "Full access in exam & tutor mode • Performance analytics • 2 mock exams",
      buttonText: "Get 1 Month",
      href: "/signup",
    },
    {
      name: "3 Months",
      price: "1,000 birr",
      description: "Full access in exam & tutor mode • Performance analytics • 2 mock exams",
      buttonText: "Get 3 Months →",
      href: "/signup",
      popular: true,
    },
    {
      name: "Lifetime",
      price: "10,000 birr",
      description: "Full access + all future products forever",
      buttonText: "Lifetime Access",
      href: "/signup",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-xl font-bold text-gray-900">
            ← Back to EthioMedHub
          </Link>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-16 px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
            ApexQbank Pricing
          </h1>
          <p className="text-xl text-gray-600">
            Choose the plan that fits your EHPLE preparation
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative bg-white rounded-2xl shadow-lg p-8 border-2 transition-all ${
                plan.popular
                  ? 'border-blue-600 ring-4 ring-blue-100 scale-105'
                  : 'border-gray-200'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-bold">
                  MOST POPULAR
                </div>
              )}
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
              <div className="text-4xl font-extrabold text-gray-900 mb-4">
                {plan.price}
              </div>
              <p className="text-gray-600 mb-8 min-h-20">{plan.description}</p>
              <Link
                href={plan.href}
                className={`w-full block text-center py-4 rounded-xl font-bold text-lg transition ${
                  plan.popular
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                }`}
              >
                {plan.buttonText}
              </Link>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <p className="text-2xl font-semibold mb-4">Pay instantly with</p>
          <div className="flex justify-center gap-12 text-4xl">
            <span>Telebirr</span>
            <span>CBE Birr</span>
          </div>
        </div>
      </main>
    </div>
  );
}
