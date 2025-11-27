// app/page.tsx
import Link from 'next/link';
import { Globe, BookOpen, Video, Brain, ChevronRight, Target, CheckCircle } from 'lucide-react';

export default function EthioMedHubLandingPage() {
  return (
    <div className="min-h-screen bg-gray-50 font-sans flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Globe className="w-8 h-8 text-blue-600" />
            <span className="text-2xl font-extrabold text-gray-900 tracking-tight">EthioMedHub</span>
          </div>
          <Link href="/signup" className="px-5 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition shadow-md">
            Join Platform
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-white border-b border-gray-100 py-20 lg:py-28 text-center">
        <div className="max-w-5xl mx-auto px-4">
          <span className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800 mb-6">
            The #1 Digital Ecosystem for Ethiopian Medics
          </span>
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-6 tracking-tight leading-tight">
            Merging Digital Innovation with <br className="hidden md:block" />
            <span className="text-blue-600">Academic Excellence.</span>
          </h1>
          <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto mb-10">
            We provide high-yield resources tailored to the Ethiopian medical curriculum. From licensing exam prep to clinical guidelines, it's all here.
          </p>
          <Link href="/signup" className="px-8 py-4 bg-blue-600 text-white font-bold rounded-full text-lg shadow-xl hover:bg-blue-700 transition transform hover:scale-105 flex items-center mx-auto w-fit">
            Sign Up <ChevronRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Products Grid */}
      <section id="products" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Our Suite of Tools</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* ApexQbank – LIVE */}
            <div className="bg-white rounded-2xl shadow-xl border-t-4 border-red-500 p-8 flex flex-col hover:shadow-2xl transition relative group">
              <div className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">LIVE</div>
              <div className="mb-6 p-4 bg-red-50 rounded-full w-16 h-16 flex items-center justify-center">
                <Target className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">ApexQbank</h3>
              <p className="text-gray-600 mb-6 flex-grow">
                The premier EHPLE preparation tool. 1,000+ high-yield questions with detailed, localized explanations.
              </p>
              <ul className="space-y-2 mb-8 text-sm text-gray-500">
                <li className="flex items-center"><CheckCircle className="w-4 h-4 mr-2 text-green-500"/> Timed & Tutor Modes</li>
                <li className="flex items-center"><CheckCircle className="w-4 h-4 mr-2 text-green-500"/> Performance Analytics</li>
              </ul>
              <Link href="/apex-qbank" className="w-full block text-center px-6 py-3 bg-red-600 text-white font-bold rounded-xl hover:bg-red-700 transition">
                Start Practicing
              </Link>
            </div>

            {/* Coming Soon Cards */}
            {[
              { title: "ApexResidency", icon: BookOpen, desc: "Advanced preparation for the Ethiopian Residency Matching Program (ERMP)." },
              { title: "Clinical Library", icon: BookOpen, desc: "Curated summaries of Ethiopian and International Standard Protocols." },
              { title: "Video Hall", icon: Video, desc: "Lectures from top Ethiopian professors covering core sciences." },
              { title: "AI Patient Simulator", icon: Brain, desc: "Practice history-taking with advanced AI patients." },
            ].map((item) => (
              <div key={item.title} className="bg-white rounded-2xl shadow-md border border-gray-100 p-8 flex flex-col opacity-80 hover:opacity-100 transition">
                <div className="mb-6 p-4 bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center">
                  <item.icon className="w-8 h-8 text-gray-500" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 mb-6 flex-grow">{item.desc}</p>
                <div className="mt-auto w-full py-3 bg-gray-100 text-gray-500 font-bold rounded-xl text-center">
                  Coming Soon
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <Globe className="w-10 h-10 mx-auto text-blue-500 mb-4" />
          <p className="mb-4">© 2025 EthioMedHub. Empowering the next generation of healthcare professionals.</p>
          <div className="flex justify-center space-x-6 text-sm font-medium">
            <Link href="/contact" className="hover:text-white">Contact</Link>
            <Link href="/privacy" className="hover:text-white">Privacy</Link>
            <Link href="/terms" className="hover:text-white">Terms</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
