// app/apex-qbank/page.tsx
import Link from 'next/link';
import { ArrowRight, BarChart3, Clock, BookOpen, GraduationCap } from 'lucide-react';

export default function ApexQBankLandingPage() {
  return (
    <div className="min-h-screen bg-gray-50 font-inter">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-2">
              <GraduationCap className="w-8 h-8 text-indigo-600" />
              <span className="text-2xl font-extrabold text-gray-900 tracking-tight">
                ApexQBank
              </span>
              <span className="text-sm text-gray-500 hidden sm:inline">by EthioMedHub</span>
            </Link>

            <nav className="flex items-center space-x-4">
              <Link
                href="/apex-qbank/pricing"
                className="text-gray-600 hover:text-indigo-600 font-medium transition hidden sm:inline"
              >
                Pricing
              </Link>
              <Link
                href="/signup"
                className="px-5 py-2 bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-700 transition font-semibold flex items-center"
              >
                Start Free Trial
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <main>
        {/* Hero */}
        <section className="py-20 sm:py-28 bg-white border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <span className="inline-flex items-center rounded-full bg-yellow-100 px-3 py-1 text-sm font-medium text-yellow-800 mb-4">
              EHPLE Focused | Written by Ethiopian Physicians
            </span>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-gray-900 leading-tight">
              Master the EHPLE <br className="hidden sm:inline" />
              with the <span className="text-indigo-600">ApexQbank Edge.</span>
            </h1>
            <p className="mt-6 text-xl text-gray-600 max-w-3xl mx-auto">
              The first comprehensive, high-yield question bank built specifically for the Ethiopian Health Professionals Licensing Examination (EHPLE). Stop guessing, start mastering.
            </p>
            <div className="mt-10">
              <Link
                href="/signup"
                className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-xl shadow-lg text-white bg-indigo-600 hover:bg-indigo-700 transition transform hover:scale-105"
              >
                Start a Free Practice Session
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        </section>

        {/* Trust & Metrics */}
        <section className="py-12 bg-indigo-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <dl className="grid grid-cols-1 gap-8 sm:grid-cols-3 text-center">
              <div className="flex flex-col">
                <dt className="order-2 mt-2 text-lg leading-6 font-medium text-indigo-800">
                  High-Yield Questions
                </dt>
                <dd className="order-1 text-5xl font-extrabold text-indigo-600">500+</dd>
              </div>
              <div className="flex flex-col">
                <dt className="order-2 mt-2 text-lg leading-6 font-medium text-indigo-800">
                  Active Students
                </dt>
                <dd className="order-1 text-5xl font-extrabold text-indigo-600">100+</dd>
              </div>
              <div className="flex flex-col">
                <dt className="order-2 mt-2 text-lg leading-6 font-medium text-indigo-800">
                  Success Rate
                </dt>
                <dd className="order-1 text-5xl font-extrabold text-indigo-600">98%</dd>
              </div>
            </dl>
          </div>
        </section>

        {/* Features */}
        <section className="py-20 sm:py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="lg:text-center">
              <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">
                The Apex Difference
              </h2>
              <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                Built to match the EHPLE, designed like UWorld.
              </p>
            </div>
            <div className="mt-20">
              <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-3 md:gap-x-8 md:gap-y-10">
                <div className="relative">
                  <dt>
                    <div className="absolute flex items-center justify-center h-12 w-12 rounded-xl bg-indigo-500 text-white">
                      <BookOpen className="h-6 w-6" />
                    </div>
                    <p className="ml-16 text-lg leading-6 font-medium text-gray-900">
                      Comprehensive Explanations
                    </p>
                  </dt>
                  <dd className="mt-2 ml-16 text-base text-gray-500">
                    Detailed, concept-focused explanations for both correct and incorrect choices, written by Ethiopian physicians familiar with the EHPLE curriculum.
                  </dd>
                </div>

                <div className="relative">
                  <dt>
                    <div className="absolute flex items-center justify-center h-12 w-12 rounded-xl bg-indigo-500 text-white">
                      <BarChart3 className="h-6 w-6" />
                    </div>
                    <p className="ml-16 text-lg leading-6 font-medium text-gray-900">
                      Personalized Analytics
                    </p>
                  </dt>
                  <dd className="mt-2 ml-16 text-base text-gray-500">
                    Track your performance by subject, topic, and difficulty. Identify your weak areas instantly so you know exactly where to focus.
                  </dd>
                </div>

                <div className="relative">
                  <dt>
                    <div className="absolute flex items-center justify-center h-12 w-12 rounded-xl bg-indigo-500 text-white">
                      <Clock className="h-6 w-6" />
                    </div>
                    <p className="ml-16 text-lg leading-6 font-medium text-gray-900">
                      Realistic Timed Practice
                    </p>
                  </dt>
                  <dd className="mt-2 ml-16 text-base text-gray-500">
                    Simulate the real exam experience with timed question blocks. Build the speed and endurance needed to pass the EHPLE with confidence.
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="bg-indigo-600">
          <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8 lg:flex lg:items-center lg:justify-between">
            <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              <span className="block">Ready to pass the EHPLE?</span>
              <span className="block text-indigo-200">
                Start preparing with ApexQbank today.
              </span>
            </h2>
            <div className="mt-8 lg:mt-0 lg:flex-shrink-0">
              <Link
                href="/apex-qbank/pricing"
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-xl text-indigo-600 bg-white hover:bg-indigo-50 transition"
              >
                See Pricing & Plans
              </Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-800">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <nav className="-mx-5 -my-2 flex flex-wrap justify-center">
            <div className="px-5 py-2">
              <Link href="/" className="text-base text-gray-400 hover:text-white">
                Back to EthioMedHub
              </Link>
            </div>
          </nav>
          <p className="mt-8 text-center text-base text-gray-400">
            © 2025 EthioMedHub. All rights reserved. ApexQbank is a product of EthioMedHub.
          </p>
        </div>
      </footer>
    </div>
  );
}
