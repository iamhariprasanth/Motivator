export interface User {
  id: string;
  email: string;
  name: string | null;
  passwordHash: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Session {
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
  relevancyScore: number | null;
  actionTaken: boolean;
  validationScore: number | null;
  createdAt: Date;
}

export interface MovieScene {
  id: string;
  title: string;
  movieName: string;
  category: string;
  sceneDescription: string;
  emotionalArc: string;
  keywords: string[];
  sentiment: string[];
}
