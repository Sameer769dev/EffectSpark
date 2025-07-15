export type EffectIdea = {
  id: string;
  title: string;
  description: string;
  implementationHints: string;
  viralityScore?: number;
  predictionReasoning?: string;
};

export interface User {
  isLoggedIn: boolean;
  username: string;
  avatar: string;
}
