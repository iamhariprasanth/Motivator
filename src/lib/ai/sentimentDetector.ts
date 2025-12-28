export type Sentiment =
  | 'despair' | 'anxiety' | 'anger' | 'sadness'
  | 'confusion' | 'hope' | 'determination' | 'neutral';

interface SentimentMarker {
  keywords: string[];
  patterns: RegExp;
  weight: number;
}

const sentimentMarkers: Record<Sentiment, SentimentMarker> = {
  despair: {
    keywords: ['give up', 'hopeless', "can't go on", 'no point', 'worthless', 'failed everything', 'rock bottom', 'end', 'quit'],
    patterns: /lost everything|no way out|can't do this|ready to give up/i,
    weight: 10
  },
  anxiety: {
    keywords: ['worried', 'scared', 'nervous', 'anxious', 'terrified', 'afraid', 'panic', 'stress', 'overwhelmed'],
    patterns: /what if|so scared|can't sleep|constantly worry/i,
    weight: 8
  },
  anger: {
    keywords: ['angry', 'furious', 'hate', 'unfair', 'betrayed', 'frustrated', 'rage', 'pissed'],
    patterns: /so angry|can't believe|betrayed me|makes me furious/i,
    weight: 8
  },
  sadness: {
    keywords: ['sad', 'depressed', 'heartbroken', 'lonely', 'empty', 'loss', 'grief', 'miss'],
    patterns: /feel so sad|lost someone|heartbroken|can't stop crying/i,
    weight: 7
  },
  confusion: {
    keywords: ['confused', 'lost', "don't know", 'uncertain', 'stuck', 'directionless', 'unclear'],
    patterns: /don't know what|so confused|lost and|which path/i,
    weight: 6
  },
  hope: {
    keywords: ['hope', 'trying', 'want to', 'dream', 'aspire', 'believing', 'optimistic'],
    patterns: /really want|dream of|hoping to|believe I can/i,
    weight: 5
  },
  determination: {
    keywords: ['will', 'going to', 'determined', 'committed', 'focused', "won't give up"],
    patterns: /I will|going to succeed|determined to|won't stop/i,
    weight: 5
  },
  neutral: {
    keywords: [],
    patterns: /.*/,
    weight: 0
  }
};

export function detectDeepSentiment(situation: string): Sentiment {
  const situationLower = situation.toLowerCase();
  const scores: Record<string, number> = {};

  for (const [sentiment, markers] of Object.entries(sentimentMarkers)) {
    if (sentiment === 'neutral') continue;

    let score = 0;

    // Check keywords
    markers.keywords.forEach(keyword => {
      if (situationLower.includes(keyword)) {
        score += markers.weight;
      }
    });

    // Check patterns
    if (markers.patterns.test(situation)) {
      score += markers.weight * 1.5;
    }

    scores[sentiment] = score;
  }

  const maxScore = Math.max(...Object.values(scores));
  if (maxScore === 0) return 'neutral';

  return Object.keys(scores).find(key => scores[key] === maxScore) as Sentiment;
}
