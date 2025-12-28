export interface ParsedResponse {
  quote: string;
  movieScene: string;
  deepMeaning: string;
  actionablePath: string;
  affirmation: string;
}

export function parseAIResponse(response: string): ParsedResponse {
  // Match each section with flexible patterns that capture multi-line content
  const quoteMatch = response.match(/💬\s*Quote:\s*(.+?)(?=\n\n|🎬|$)/s);
  const sceneMatch = response.match(/🎬\s*Movie Scene:\s*(.+?)(?=\n\n|💡|$)/s);
  const meaningMatch = response.match(/💡\s*(?:Deep\s*)?Meaning:\s*(.+?)(?=\n\n|✨|$)/s);
  const pathMatch = response.match(/✨\s*(?:Actionable\s*)?Path:\s*(.+?)(?=\n\n|🌟|$)/s);
  const affirmationMatch = response.match(/🌟\s*(?:Affirmation:\s*)?(.+?)$/s);

  return {
    quote: quoteMatch?.[1]?.trim() || '',
    movieScene: sceneMatch?.[1]?.trim() || '',
    deepMeaning: meaningMatch?.[1]?.trim() || '',
    actionablePath: pathMatch?.[1]?.trim() || '',
    affirmation: affirmationMatch?.[1]?.trim() || ''
  };
}

export function validateResponse(response: string, originalSituation: string): number {
  const metrics = {
    wordCount: 0,
    formatCompliance: 0,
    emotionalResonance: 0,
    situationalPrecision: 0
  };

  // 1. Word Count (Under 100 words excluding emojis/labels)
  const cleanText = response
    .replace(/💬|🎬|💡|✨|🌟/g, '')
    .replace(/Quote:|Movie Scene:|Deep Meaning:|Actionable Path:|Affirmation:/gi, '')
    .trim();

  const wordCount = cleanText.split(/\s+/).filter(w => w.length > 0).length;
  metrics.wordCount = wordCount <= 100 ? 10 : Math.max(0, 10 - (wordCount - 100) / 10);

  // 2. Format Compliance (Has all required sections)
  const hasAllSections = [
    /💬\s*Quote:/i,
    /🎬\s*Movie Scene:/i,
    /💡/i,
    /✨/i,
    /🌟/i
  ].every(pattern => pattern.test(response));
  metrics.formatCompliance = hasAllSections ? 10 : 5;

  // 3. Emotional Resonance (Contains empathetic language)
  const emotionalWords = ['understand', 'feel', 'struggle', 'journey', 'challenge', 'overcome', 'strength', 'courage'];
  const emotionalCount = emotionalWords.filter(word =>
    cleanText.toLowerCase().includes(word)
  ).length;
  metrics.emotionalResonance = Math.min(10, emotionalCount * 2);

  // 4. Situational Precision (References user's specific situation)
  const situationKeywords = originalSituation
    .toLowerCase()
    .split(/\s+/)
    .filter(word => word.length > 4)
    .slice(0, 5);

  const precisionCount = situationKeywords.filter(keyword =>
    cleanText.toLowerCase().includes(keyword)
  ).length;
  metrics.situationalPrecision = Math.min(10, precisionCount * 3);

  // Calculate weighted average
  const weights = {
    wordCount: 0.2,
    formatCompliance: 0.3,
    emotionalResonance: 0.25,
    situationalPrecision: 0.25
  };

  const totalScore = Object.keys(metrics).reduce((sum, key) => {
    return sum + (metrics[key as keyof typeof metrics] * weights[key as keyof typeof weights]);
  }, 0);

  return Math.round(totalScore * 10) / 10; // Round to 1 decimal place
}

