'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Textarea } from '@/components/ui/Textarea';
import Logo from '@/components/Logo';

export default function DemoPage() {
  const [situation, setSituation] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const [sendingEmail, setSendingEmail] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/motivate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ situation })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to generate response');
      }

      setResult(data);

    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSendEmail = async () => {
    if (!email || !result) return;

    setSendingEmail(true);
    try {
      const res = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          motivation: result
        })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to send email');
      }

      alert(data.message || `Motivation sent to ${email}!`);
      setEmail('');
    } catch (err: any) {
      alert(err.message || 'Failed to send email');
    } finally {
      setSendingEmail(false);
    }
  };

  const exampleSituations = [
    "I just got rejected from my dream job for the third time. I've spent 6 months preparing, did everything right, but they chose someone else. I'm starting to think I'm not good enough.",
    "I'm terrified about my presentation tomorrow. I can't sleep, my hands are shaking, and I keep imagining everything going wrong.",
    "I've been working on my startup for 2 years and we finally got our first big client. I'm so excited but also scared I'll mess it up."
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
      <div className="h-screen flex">
        {/* Left Pane - Conversations */}
        <div className="w-1/3 bg-white border-r border-gray-200 flex flex-col">
          <div className="p-6 border-b border-gray-200 bg-gradient-to-br from-green-50 to-emerald-100">
            <div className="flex items-center justify-between mb-4">
              <a
                href="/"
                className="text-green-600 hover:text-green-700 font-semibold text-sm flex items-center gap-2 transition"
              >
                <span>←</span> Back to Home
              </a>
            </div>
            <div className="flex items-center justify-center">
              <div className="inline-flex items-center justify-center p-4 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full shadow-lg">
                <span className="text-5xl">✨</span>
              </div>
            </div>
          </div>


          {/* Input Form in Left Pane */}
          <div className="p-5 border-t border-gray-200 bg-gradient-to-br from-green-50 to-emerald-50 pb-4">
            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="relative">
                <Textarea
                  value={situation}
                  onChange={(e) => setSituation(e.target.value)}
                  placeholder="What's on your mind? Share your challenge..."
                  rows={5}
                  required
                  minLength={10}
                  className="w-full px-4 py-3 border-2 border-green-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition resize-none bg-white shadow-sm text-gray-900 text-base font-medium placeholder:text-gray-400 placeholder:font-normal"
                  style={{ color: '#111827' }}
                />
                <div className="absolute bottom-3 right-3 text-xs font-semibold text-gray-500 bg-white/80 px-2 py-1 rounded">
                  {situation.length} chars
                </div>
              </div>

              <Button
                type="submit"
                disabled={loading || situation.length < 10}
                className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold py-3 rounded-xl shadow-md transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:hover:scale-100"
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Analyzing...
                  </span>
                ) : (
                  <span className="flex items-center justify-center">
                    <span className="mr-2">✨</span>
                    Get Motivated
                  </span>
                )}
              </Button>
            </form>

            <div className="mt-4">
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs font-semibold text-gray-700 uppercase tracking-wide">Quick Start</p>
                <span className="text-xs text-gray-500">Click to try</span>
              </div>
              <div className="space-y-2">
                {exampleSituations.map((example, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSituation(example)}
                    className="block w-full text-left text-xs p-3 bg-white hover:bg-gradient-to-r hover:from-green-50 hover:to-emerald-50 rounded-lg border-2 border-gray-200 hover:border-green-300 transition-all shadow-sm hover:shadow-md group"
                  >
                    <div className="flex items-start space-x-2">
                      <span className="text-base group-hover:scale-110 transition-transform">
                        {idx === 0 ? '💼' : idx === 1 ? '😰' : '🚀'}
                      </span>
                      <span className="flex-1 text-gray-700 group-hover:text-gray-900">
                        {example.substring(0, 60)}...
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Pane - Motivation Message */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="border-b border-gray-200 bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600">
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-800 rounded-lg p-4 mb-6">
                <p className="font-semibold">Error:</p>
                <p>{error}</p>
              </div>
            )}

            {!result && !error && (
              <div className="text-center py-32">
                <div className="inline-block p-6 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full mb-6">
                  <span className="text-7xl">✨</span>
                </div>
                <h3 className="text-3xl font-bold text-gray-800 mb-3">Ready for Your Breakthrough?</h3>
                <p className="text-lg text-gray-600 max-w-md mx-auto">
                  Share your challenge on the left and let AI guide you with movie-powered wisdom
                </p>
              </div>
            )}

            {result && (
              <div className="flex items-center justify-center min-h-full p-8">
                <div className="w-full max-w-2xl bg-gradient-to-br from-white via-green-50/30 to-emerald-50/30 rounded-3xl shadow-2xl border border-gray-200/50 overflow-hidden">
                  {/* Card Header */}
                  <div className="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 p-8 text-center">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full">
                      <Logo className="w-16 h-16" />
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-8 space-y-6">
                    {/* Quote */}
                    <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-2xl border border-green-100">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-3xl">💬</span>
                        <h3 className="text-lg font-bold text-gray-800">Inspiring Quote</h3>
                      </div>
                      <p className="text-base italic text-gray-700 leading-relaxed pl-12">
                        {result.parsed.quote}
                      </p>
                    </div>

                    {/* Movie Scene */}
                    <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-3xl">🎬</span>
                        <h3 className="text-lg font-bold text-gray-800">Movie Scene</h3>
                      </div>
                      <p className="text-base text-gray-700 leading-relaxed pl-12">
                        {result.parsed.movieScene}
                      </p>
                    </div>

                    {/* Deep Meaning */}
                    <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-3xl">💡</span>
                        <h3 className="text-lg font-bold text-gray-800">Deep Meaning</h3>
                      </div>
                      <p className="text-base text-gray-700 leading-relaxed pl-12">
                        {result.parsed.deepMeaning}
                      </p>
                    </div>

                    {/* Actionable Path */}
                    <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-3xl">✨</span>
                        <h3 className="text-lg font-bold text-gray-800">Actionable Path</h3>
                      </div>
                      <p className="text-base text-gray-700 leading-relaxed pl-12">
                        {result.parsed.actionablePath}
                      </p>
                    </div>

                    {/* Affirmation */}
                    <div className="bg-gradient-to-r from-green-400/20 to-emerald-400/20 p-6 rounded-2xl border border-green-200">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-3xl">🌟</span>
                        <h3 className="text-lg font-bold text-gray-800">Your Affirmation</h3>
                      </div>
                      <p className="text-lg font-semibold text-gray-900 leading-relaxed pl-12">
                        {result.parsed.affirmation}
                      </p>
                    </div>
                  </div>

                  {/* Card Footer */}
                  <div className="bg-gray-50 px-8 py-6 border-t border-gray-200 space-y-4">
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <span className="flex items-center gap-2">
                        <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold uppercase">
                          {result.sentiment}
                        </span>
                      </span>
                      <span className="text-xs">My Brain doctor</span>
                    </div>

                    {/* Email Send Section */}
                    <div className="pt-4 border-t border-gray-200">
                      <h4 className="text-sm font-semibold text-gray-900 mb-3 flex items-center">
                        <span className="mr-2">📧</span>
                        Send this to your email
                      </h4>
                      <div className="flex gap-2">
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="your@email.com"
                          className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                        />
                        <Button
                          onClick={handleSendEmail}
                          disabled={!email || sendingEmail}
                          className="whitespace-nowrap text-sm px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                        >
                          {sendingEmail ? 'Sending...' : 'Send'}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
