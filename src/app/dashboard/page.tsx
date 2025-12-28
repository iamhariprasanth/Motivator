'use client';

import { useState } from 'react';
import MotivationForm from '@/components/MotivationForm';
import ResponseCard from '@/components/ResponseCard';
import Header from '@/components/Header';

export default function DashboardPage() {
  const [response, setResponse] = useState<any>(null);
  const [previousResponses, setPreviousResponses] = useState<any[]>([]);

  const handleResponse = (data: any) => {
    setResponse(data);
    // Add to previous responses
    setPreviousResponses(prev => [data, ...prev.slice(0, 4)]);
    // Scroll to response
    setTimeout(() => {
      document.getElementById('response')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
      <Header />

      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            Welcome to Your Motivational Dashboard
          </h1>
          <p className="text-xl text-gray-600">
            Share your challenge and receive AI-powered guidance through powerful movie wisdom
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-lg">
                <span className="text-2xl">🎯</span>
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Sessions Today</p>
                <p className="text-2xl font-bold text-gray-900">{previousResponses.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 bg-emerald-100 rounded-lg">
                <span className="text-2xl">🎬</span>
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Movie Scenes Used</p>
                <p className="text-2xl font-bold text-gray-900">50+</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-lg">
                <span className="text-2xl">✨</span>
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">ULTRA DEEP MODE</p>
                <p className="text-2xl font-bold text-green-600">Active</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Form */}
          <div>
            <MotivationForm onResponse={handleResponse} />

            {/* Quick Tips */}
            <div className="mt-6 bg-green-50 border border-green-200 rounded-lg p-4">
              <h3 className="font-semibold text-green-900 mb-2">💡 Tips for Best Results:</h3>
              <ul className="text-sm text-green-800 space-y-1">
                <li>• Be specific about your situation</li>
                <li>• Include how you're feeling</li>
                <li>• Mention what you've already tried</li>
                <li>• Share what you hope to achieve</li>
              </ul>
            </div>
          </div>

          {/* Right Column - Response */}
          <div id="response">
            {response ? (
              <ResponseCard response={response} />
            ) : (
              <div className="bg-white rounded-lg shadow-lg p-12 text-center">
                <div className="text-6xl mb-4">🎭</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Ready to Transform Your Challenge?
                </h3>
                <p className="text-gray-600">
                  Share your situation on the left, and I'll find the perfect movie scene to inspire your breakthrough.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Previous Responses */}
        {previousResponses.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Sessions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {previousResponses.slice(0, 4).map((resp, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-lg shadow p-4 hover:shadow-lg transition cursor-pointer"
                  onClick={() => setResponse(resp)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-900">
                      Session {previousResponses.length - idx}
                    </span>
                    <span className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded">
                      {resp.sentiment}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {resp.parsed.affirmation}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
