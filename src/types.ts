export interface Lesson {
  id: number;
  title: string;
  sections: {
    heading: string;
    content: string;
    codeExample?: string;
  }[];
  starterCode: string;
  solution: string;
  hints: string[];
  validationRules: {
    requiredTags?: string[];
    requiredText?: string[];
    customValidation?: (code: string) => { isValid: boolean; message?: string };
  };
}

export interface UserProgress {
  currentLesson: number;
  points: number;
  streak: number;
  completedLessons: number[];
}

export interface UserPreferences {
  learningStyle: 'visual' | 'auditory' | 'hands-on' | null;
  experienceLevel: 'beginner' | 'intermediate' | 'advanced' | null;
  goal: 'websites' | 'apps' | 'games' | null;
}

export type OnboardingStep = 'welcome' | 'quiz' | 'results' | 'learning';
