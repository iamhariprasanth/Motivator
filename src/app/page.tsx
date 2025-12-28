import Link from 'next/link';
import { Metadata } from 'next';
import Logo from '@/components/Logo';

export const metadata: Metadata = {
  title: "AI Motivational Coach | Free Mental Health Support & Life Coaching - My Brain Doctor",
  description: "Get instant, personalized motivational coaching powered by AI. Free mental health support, anxiety relief, depression help, and career guidance through powerful movie wisdom. Try now - no signup required!",
  alternates: {
    canonical: "https://mybraindoctor.com"
  }
};

export default function HomePage() {
  return (
    <div className="min-h-screen flex">
      {/* Left Half - Content */}
      <div className="w-1/2 bg-gradient-to-br from-green-600 via-emerald-600 to-teal-600 flex items-center justify-center p-12">
        <div className="max-w-xl text-white">
          <h1 className="text-7xl font-bold mb-8">My Brain Doctor</h1>
          <h2 className="text-3xl font-semibold mb-6">
            Your struggle is your story. Your story is your strength.
          </h2>
          <p className="text-xl mb-12 leading-relaxed opacity-95">
            Free AI-powered motivational coaching and mental health support using powerful movie scenes.
            Get personalized guidance for depression, anxiety, career challenges, and life transitions.
          </p>

          <div className="flex flex-col space-y-4">
            <Link
              href="/demo"
              className="inline-block bg-white text-green-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition shadow-xl text-center"
            >
              Try Demo Now
            </Link>
            <Link
              href="/signup"
              className="inline-block border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white hover:text-green-600 transition text-center"
            >
              Get Started Free
            </Link>
            <Link
              href="/login"
              className="inline-block border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white hover:text-green-600 transition text-center"
            >
              Login
            </Link>
          </div>
        </div>
      </div>

      {/* Right Half - Visual */}
      <div className="w-1/2 bg-gradient-to-br from-green-50 to-emerald-50 flex items-center justify-center p-12">
        <div className="text-center">
          <div className="mb-12 flex justify-center">
            <div className="bg-white p-8 rounded-full shadow-2xl">
              <Logo className="w-48 h-48" />
            </div>
          </div>

          <div className="space-y-6 max-w-md">
            <article className="bg-white p-6 rounded-2xl shadow-lg border-l-4 border-green-500">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-3xl" aria-hidden="true">🎬</span>
                <h3 className="font-bold text-gray-800">Movie-Powered Mental Health Support</h3>
              </div>
              <p className="text-gray-600 text-sm">
                Experience motivational therapy through iconic movie scenes that mirror your personal struggles.
                Cinematic wisdom meets AI coaching for powerful emotional healing.
              </p>
            </article>

            <article className="bg-white p-6 rounded-2xl shadow-lg border-l-4 border-emerald-500">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-3xl" aria-hidden="true">💡</span>
                <h3 className="font-bold text-gray-800">AI-Powered Deep Emotional Analysis</h3>
              </div>
              <p className="text-gray-600 text-sm">
                Advanced GPT-4 AI detects your emotional state (anxiety, depression, stress) and provides
                personalized mental health coaching tailored to your specific situation.
              </p>
            </article>

            <article className="bg-white p-6 rounded-2xl shadow-lg border-l-4 border-teal-500">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-3xl" aria-hidden="true">✨</span>
                <h3 className="font-bold text-gray-800">Actionable Life Coaching Steps</h3>
              </div>
              <p className="text-gray-600 text-sm">
                Get concrete action plans for career development, relationship improvement, and personal growth.
                Transform inspiration into real-world results.
              </p>
            </article>
          </div>
        </div>
      </div>
    </div>
  );
}
