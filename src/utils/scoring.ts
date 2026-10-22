import { Question, QuestionEvaluation, ExamSummary } from '../types/quiz';

/**
 * Evaluates a single question based on NPTEL rules:
 * - Total marks: 2.0
 * - MCQ: Correct = 2.0, Wrong = 0, Unattempted = 0
 * - MSQ:
 *     - If ANY selected option is wrong: 0 marks (Strict MSQ penalty)
 *     - If all selected options are correct and ALL correct options are selected: 2.0 marks
 *     - If all selected options are correct but some correct options were missed:
 *       Proportional partial marks: (selectedCount / totalCorrectCount) * 2.0 marks
 *     - Unattempted = 0 marks
 */
export function evaluateQuestion(question: Question, selectedKeys: string[]): QuestionEvaluation {
  const maxScore = question.marks || 2;
  const correctSet = new Set(question.correctAnswers.map(k => k.toLowerCase()));
  const selectedClean = selectedKeys.map(k => k.toLowerCase());

  if (selectedClean.length === 0) {
    return {
      question,
      selectedKeys,
      status: 'unattempted',
      score: 0,
      maxScore,
      scoringReason: 'Question was not attempted.',
    };
  }

  if (question.type === 'MCQ') {
    const isCorrect = selectedClean.length === 1 && correctSet.has(selectedClean[0]);
    if (isCorrect) {
      return {
        question,
        selectedKeys,
        status: 'correct',
        score: maxScore,
        maxScore,
        scoringReason: `Correct! You selected option ${selectedClean[0].toUpperCase()}. (+${maxScore}.0 marks)`,
      };
    } else {
      return {
        question,
        selectedKeys,
        status: 'incorrect',
        score: 0,
        maxScore,
        scoringReason: `Incorrect. You selected ${selectedClean.map(k => k.toUpperCase()).join(', ')}, but the correct answer is ${question.correctAnswers.map(k => k.toUpperCase()).join(', ')}. (0 marks)`,
      };
    }
  }

  // MSQ logic
  const wrongSelections = selectedClean.filter(k => !correctSet.has(k));
  if (wrongSelections.length > 0) {
    return {
      question,
      selectedKeys,
      status: 'incorrect',
      score: 0,
      maxScore,
      scoringReason: `Incorrect: option ${wrongSelections.map(k => k.toUpperCase()).join(', ')} is wrong. Under NPTEL rules, selecting even one incorrect option results in 0 marks.`,
    };
  }

  // No wrong selections made
  if (selectedClean.length === correctSet.size) {
    return {
      question,
      selectedKeys,
      status: 'correct',
      score: maxScore,
      maxScore,
      scoringReason: `Fully Correct! All ${correctSet.size} correct options selected (${question.correctAnswers.map(k => k.toUpperCase()).join(', ')}). (+${maxScore}.0 marks)`,
    };
  }

  // Partially correct (all selected options are in correctSet, but some correct options missed)
  const partialRatio = selectedClean.length / correctSet.size;
  const rawScore = partialRatio * maxScore;
  const score = Math.round(rawScore * 100) / 100;

  return {
    question,
    selectedKeys,
    status: 'partial',
    score,
    maxScore,
    scoringReason: `Partially Correct! You chose ${selectedClean.length} of ${correctSet.size} correct options (${selectedClean.map(k => k.toUpperCase()).join(', ')}) with 0 wrong options. Missed: ${question.correctAnswers.filter(k => !selectedClean.includes(k.toLowerCase())).map(k => k.toUpperCase()).join(', ')}. (+${score} / ${maxScore}.0 marks)`,
  };
}

/**
 * Calculates overall exam summary from answers map
 */
export function calculateExamSummary(
  examTitle: string,
  questions: Question[],
  responses: Record<string, string[]>,
  timeSpentSeconds: number
): ExamSummary {
  const evaluations: QuestionEvaluation[] = questions.map(q => {
    const selected = responses[q.id] || [];
    return evaluateQuestion(q, selected);
  });

  const totalQuestions = questions.length;
  const maxMarks = questions.reduce((sum, q) => sum + (q.marks || 2), 0);
  const earnedMarks = Math.round(evaluations.reduce((sum, e) => sum + e.score, 0) * 100) / 100;
  const percentage = Math.round((earnedMarks / maxMarks) * 1000) / 10;

  let attempted = 0;
  let unattempted = 0;
  let correct = 0;
  let partial = 0;
  let incorrect = 0;

  for (const ev of evaluations) {
    if (ev.status === 'unattempted') {
      unattempted++;
    } else {
      attempted++;
      if (ev.status === 'correct') correct++;
      else if (ev.status === 'partial') partial++;
      else if (ev.status === 'incorrect') incorrect++;
    }
  }

  return {
    examTitle,
    totalQuestions,
    maxMarks,
    earnedMarks,
    percentage,
    attempted,
    unattempted,
    correct,
    partial,
    incorrect,
    timeSpentSeconds,
    evaluations,
  };
}
