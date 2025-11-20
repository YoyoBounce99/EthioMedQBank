import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-slate-900 text-white">
      <h1 className="text-5xl font-bold mb-4 text-center">Medical Licensure Q-Bank</h1>
      <p className="text-xl mb-8 text-slate-300 text-center max-w-lg">
        Prepare for the EHPLE with our specialized Gastroenterology mock exams. High-yield questions and detailed explanations.
      </p>
      <div className="flex gap-4">
        <Link href="/login" className="bg-blue-500 hover:bg-blue-600 px-6 py-3 rounded-lg font-semibold transition">
          Start Practicing
        </Link>
      </div>
    </main>
  );
}
