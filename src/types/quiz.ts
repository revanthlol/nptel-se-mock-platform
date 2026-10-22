export type QuestionType = 'MCQ' | 'MSQ';

export interface Option {
  key: string;
  text: string;
}

export interface Question {
  id: string;
  globalIndex: number;
  assignment: number;
  assignmentName: string;
  questionNumber: number;
  mockQuestionNumber?: number;
  topic: string;
  type: QuestionType;
  marks: number;
  question: string;
  codeSnippet?: string | null;
  image?: string | null;
  options: Option[];
  correctAnswers: string[];
  solution: string;
}

export interface UserResponse {
  selectedKeys: string[];
  isMarkedForReview: boolean;
  visited: boolean;
}

export interface QuestionEvaluation {
  question: Question;
  selectedKeys: string[];
  status: 'correct' | 'partial' | 'incorrect' | 'unattempted';
  score: number;
  maxScore: number;
  scoringReason: string;
}

export interface ExamSummary {
  examTitle: string;
  totalQuestions: number;
  maxMarks: number;
  earnedMarks: number;
  percentage: number;
  attempted: number;
  unattempted: number;
  correct: number;
  partial: number;
  incorrect: number;
  timeSpentSeconds: number;
  evaluations: QuestionEvaluation[];
}

export type AppMode = 
  | 'home'
  | 'mock-exam'     // Full 50-Q timed simulation
  | 'mock-review'   // Post-exam review with breakdown
  | 'practice'      // Flashcard/travel study mode with instant check
  | 'bank'          // All 130 questions filtered by assignment
  | 'cheatsheet';   // High-yield formula and revision sheet
