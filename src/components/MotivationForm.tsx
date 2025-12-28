'use client';

import { useState } from 'react';
import { Button } from './ui/Button';
import { Textarea } from './ui/Textarea';

interface MotivationFormProps {
  onResponse: (data: any) => void;
}

export default function MotivationForm({ onResponse }: MotivationFormProps) {
  const [situation, setSituation] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

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
        throw new Error(data.error || 'Failed to generate motivation');
      }

      // Save to localStorage for history
      try {
        const stored = localStorage.getItem('motivationSessions');
        const sessions = stored ? JSON.parse(stored) : [];
        sessions.unshift(data); // Add to beginning
        localStorage.setItem('motivationSessions', JSON.stringify(sessions.slice(0, 50))); // Keep last 50
      } catch (error) {
        console.error('Error saving to history:', error);
      }

      onResponse(data);
      setSituation(''); // Clear form on success
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            What challenge are you facing today?
          </label>
          <Textarea
            value={situation}
            onChange={(e) => setSituation(e.target.value)}
            placeholder="Share your situation in detail... The more specific you are, the better I can help you."
            rows={6}
            required
            minLength={10}
            className="text-base"
          />
          <p className="text-xs text-gray-500 mt-1">
            {situation.length}/10 characters minimum
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        <Button
          type="submit"
          disabled={loading || situation.length < 10}
          className="w-full"
        >
          {loading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Analyzing in ULTRA DEEP MODE...
            </>
          ) : (
            'Get Motivated'
          )}
        </Button>
      </form>
    </div>
  );
}
