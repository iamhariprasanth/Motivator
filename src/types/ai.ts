import { Sentiment } from '@/lib/ai/sentimentDetector';

export interface MotivationalResponse {
  response: string;
  sentiment: Sentiment;
  parsed: {
    quote: string;
    movieScene: string;
    deepMeaning: string;
    actionablePath: string;
    affirmation: string;
  };
  validationScore: number;
}

export interface UserSession {
  id: string;
  userId: string;
  situation: string;
  sentiment: string;
  aiResponse: string;
  movieScene: string;
  quote: string;
  deepMeaning: string;
  actionablePath: string;
  affirmation: string;
  relevancyScore?: number;
  actionTaken: boolean;
  validationScore?: number;
  createdAt: Date;
}
