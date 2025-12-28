'use client';

interface ResponseCardProps {
  response: {
    parsed: {
      quote: string;
      movieScene: string;
      deepMeaning: string;
      actionablePath: string;
      affirmation: string;
    };
    sentiment: string;
    validationScore?: number;
  };
}

const sentimentColors: Record<string, string> = {
  despair: 'bg-purple-100 text-purple-800 border-purple-200',
  anxiety: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  anger: 'bg-red-100 text-red-800 border-red-200',
  sadness: 'bg-blue-100 text-blue-800 border-blue-200',
  confusion: 'bg-gray-100 text-gray-800 border-gray-200',
  hope: 'bg-green-100 text-green-800 border-green-200',
  determination: 'bg-orange-100 text-orange-800 border-orange-200',
  neutral: 'bg-slate-100 text-slate-800 border-slate-200'
};

export default function ResponseCard({ response }: ResponseCardProps) {
  const { parsed, sentiment, validationScore } = response;
  const sentimentColorClass = sentimentColors[sentiment] || sentimentColors.neutral;

  return (
    <div className="bg-white rounded-lg shadow-xl overflow-hidden animate-fade-in">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 text-white">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Your Motivational Response</h2>
          <div className="flex flex-col items-end gap-2">
            <span className={`px-3 py-1 rounded-full text-sm font-medium border ${sentimentColorClass}`}>
              {sentiment}
            </span>
            {validationScore && (
              <span className="text-xs text-white/80">
                Quality: {validationScore}/10
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Quote */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg border-l-4 border-blue-500">
          <div className="flex items-start">
            <span className="text-4xl mr-4">💬</span>
            <div className="flex-1">
              <p className="text-lg italic text-gray-800 leading-relaxed font-serif">
                {parsed.quote}
              </p>
            </div>
          </div>
        </div>

        {/* Movie Scene */}
        <div className="border-l-4 border-purple-500 pl-6">
          <div className="flex items-center mb-3">
            <span className="text-3xl mr-3">🎬</span>
            <h3 className="text-xl font-bold text-gray-900">Movie Scene</h3>
          </div>
          <p className="text-gray-700 leading-relaxed">
            {parsed.movieScene}
          </p>
        </div>

        {/* Deep Meaning */}
        <div className="border-l-4 border-indigo-500 pl-6">
          <div className="flex items-center mb-3">
            <span className="text-3xl mr-3">💡</span>
            <h3 className="text-xl font-bold text-gray-900">Deep Meaning</h3>
          </div>
          <p className="text-gray-700 leading-relaxed">
            {parsed.deepMeaning}
          </p>
        </div>

        {/* Actionable Path */}
        <div className="bg-yellow-50 p-6 rounded-lg border-l-4 border-yellow-500">
          <div className="flex items-center mb-3">
            <span className="text-3xl mr-3">✨</span>
            <h3 className="text-xl font-bold text-gray-900">Your Next Steps</h3>
          </div>
          <p className="text-gray-700 leading-relaxed whitespace-pre-line">
            {parsed.actionablePath}
          </p>
        </div>

        {/* Affirmation */}
        <div className="bg-gradient-to-r from-green-50 to-blue-50 p-8 rounded-lg border-2 border-green-200">
          <div className="flex items-start">
            <span className="text-4xl mr-4">🌟</span>
            <div className="flex-1">
              <p className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 leading-relaxed">
                {parsed.affirmation}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
