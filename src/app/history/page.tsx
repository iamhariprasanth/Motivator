'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import ResponseCard from '@/components/ResponseCard';

export default function HistoryPage() {
  const [sessions, setSessions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSession, setSelectedSession] = useState<any>(null);
  const [filter, setFilter] = useState<string>('all');

  // For demo purposes, we'll use localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem('motivationSessions');
      if (stored) {
        setSessions(JSON.parse(stored));
      }
    } catch (error) {
      console.error('Error loading sessions:', error);
    }
    setLoading(false);
  }, []);

  const filteredSessions = filter === 'all'
    ? sessions
    : sessions.filter(s => s.sentiment === filter);

  const sentiments = ['all', 'despair', 'anxiety', 'anger', 'sadness', 'confusion', 'hope', 'determination'];

  const getSentimentEmoji = (sentiment: string) => {
    const emojis: Record<string, string> = {
      despair: '😔',
      anxiety: '😰',
      anger: '😤',
      sadness: '😢',
      confusion: '🤔',
      hope: '🌟',
      determination: '💪',
      neutral: '😐'
    };
    return emojis[sentiment] || '😐';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
        <Header />
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading your journey...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <Header />

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Your Journey</h1>
          <p className="text-xl text-gray-600">
            Track your progress and revisit the wisdom that inspired you
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-sm text-gray-600 mb-1">Total Sessions</p>
            <p className="text-3xl font-bold text-gray-900">{sessions.length}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-sm text-gray-600 mb-1">Most Common Emotion</p>
            <p className="text-2xl font-bold text-blue-600">
              {sessions.length > 0
                ? Object.entries(
                    sessions.reduce((acc, s) => {
                      acc[s.sentiment] = (acc[s.sentiment] || 0) + 1;
                      return acc;
                    }, {} as Record<string, number>)
                  ).sort((a, b) => b[1] - a[1])[0]?.[0] || 'N/A'
                : 'N/A'}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-sm text-gray-600 mb-1">Avg Quality Score</p>
            <p className="text-3xl font-bold text-green-600">
              {sessions.length > 0
                ? (sessions.reduce((acc, s) => acc + (s.validationScore || 0), 0) / sessions.length).toFixed(1)
                : '0'}/10
            </p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-sm text-gray-600 mb-1">Movie Scenes</p>
            <p className="text-3xl font-bold text-purple-600">{sessions.length}</p>
          </div>
        </div>

        {/* Filter */}
        <div className="bg-white rounded-lg shadow p-4 mb-6">
          <p className="text-sm font-medium text-gray-700 mb-3">Filter by emotion:</p>
          <div className="flex flex-wrap gap-2">
            {sentiments.map(sentiment => (
              <button
                key={sentiment}
                onClick={() => setFilter(sentiment)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                  filter === sentiment
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {sentiment !== 'all' && getSentimentEmoji(sentiment)} {sentiment.charAt(0).toUpperCase() + sentiment.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Sessions List */}
        {filteredSessions.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-12 text-center">
            <div className="text-6xl mb-4">📝</div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-2">
              No Sessions Yet
            </h3>
            <p className="text-gray-600 mb-6">
              Start your journey by sharing a challenge on the dashboard
            </p>
            <a
              href="/dashboard"
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition"
            >
              Go to Dashboard
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Sessions List */}
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                All Sessions ({filteredSessions.length})
              </h2>
              {filteredSessions.map((session, idx) => (
                <div
                  key={idx}
                  onClick={() => setSelectedSession(session)}
                  className={`bg-white rounded-lg shadow p-6 cursor-pointer transition hover:shadow-lg ${
                    selectedSession === session ? 'ring-2 ring-blue-500' : ''
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center">
                      <span className="text-2xl mr-3">
                        {getSentimentEmoji(session.sentiment)}
                      </span>
                      <div>
                        <p className="font-semibold text-gray-900">
                          Session {filteredSessions.length - idx}
                        </p>
                        <p className="text-xs text-gray-500">
                          {new Date().toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <span className="text-xs px-3 py-1 bg-blue-100 text-blue-800 rounded-full">
                      {session.sentiment}
                    </span>
                  </div>
                  <p className="text-sm text-gray-700 font-medium mb-2 line-clamp-2">
                    {session.parsed.quote}
                  </p>
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {session.parsed.affirmation}
                  </p>
                </div>
              ))}
            </div>

            {/* Selected Session Detail */}
            <div className="lg:sticky lg:top-4 h-fit">
              {selectedSession ? (
                <ResponseCard response={selectedSession} />
              ) : (
                <div className="bg-white rounded-lg shadow-lg p-12 text-center">
                  <div className="text-6xl mb-4">👈</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Select a Session
                  </h3>
                  <p className="text-gray-600">
                    Click on any session to view the full motivational response
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
