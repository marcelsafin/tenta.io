
export interface QuestionOption {
  text: string;
  isCorrect: boolean;
}

export interface Question {
  questionText: string;
  questionType: 'multiple-choice' | 'open-ended';
  options?: QuestionOption[];
  correctAnswer: string;
  points: number;
  feedbackForWrongAnswer: string;
}

export interface UserAnswer {
  question: Question;
  answer: string;
  isCorrect: boolean;
  score: number;
  feedback: string;
}

export type AppState = 'start' | 'loading' | 'quiz' | 'grading' | 'results' | 'error';
