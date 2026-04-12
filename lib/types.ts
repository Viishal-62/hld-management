export type Difficulty = "beginner" | "intermediate" | "advanced";

export interface Category {
  id: string;
  name: string;
  icon: string;
  description: string;
  color: string;
}

export interface RealWorldExample {
  company: string;
  description: string;
}

export interface FlowStep {
  title: string;
  description: string;
}

export interface DeepDiveSection {
  title: string;
  content: string;
}

export interface Concept {
  id: string;
  name: string;
  categoryId: string;
  difficulty: Difficulty;
  definition: string;
  importance: string;
  story: string;
  howItWorks: FlowStep[];
  deepDive: DeepDiveSection[];
  whenToUse: string[];
  useCases: string[];
  tradeoffs: {
    pros: string[];
    cons: string[];
  };
  realWorldExamples: RealWorldExample[];
  relatedConcepts: string[];
  keyTakeaway: string;
}

export interface UserProgress {
  completedConcepts: string[];
  lastVisited: string | null;
  bookmarked: string[];
}
