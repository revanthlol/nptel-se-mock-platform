import React, { useState } from 'react';
import { 
  Award,
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  Clock, 
  RotateCcw, 
  ArrowRight, 
  ZoomIn, 
  BookOpen,
  Sparkles
} from 'lucide-react';
import { ExamSummary, AppMode } from '../types/quiz';
import { CodeBlock } from '../components/CodeBlock';
import { ImageModal } from '../components/ImageModal';

interface ExamReviewViewProps {
  summary: ExamSummary;
  onRetake: () => void;
  onTakeOtherMock: () => void;
  onNavigate: (mode: AppMode) => void;
}

export const ExamReviewView: React.FC<ExamReviewViewProps> = ({
  summary,
  onRetake,
  onTakeOtherMock,
  onNavigate,
}) => {
  const [filter, setFilter] = useState<'all' | 'incorrect' | 'partial' | 'correct' | 'unattempted'>('all');
  const [modalImage, setModalImage] = useState<string | null>(null);

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const s = secs % 60;
    return `${mins}m ${s}s`;
  };

  const getTier = (pct: number) => {
    if (pct >= 90) return { title: 'Elite + Gold', color: 'text-amber-600 bg-amber-50 dark:bg-amber-950/50 border-amber-300 dark:border-amber-700' };
    if (pct >= 75) return { title: 'Elite + Silver', color: 'text-slate-600 bg-slate-100 dark:bg-slate-800 border-slate-300 dark:border-slate-600' };
    if (pct >= 60) return { title: 'Elite Standard', color: 'text-emerald-700 bg-emerald-50 dark:bg-emerald-950/50 border-emerald-300 dark:border-emerald-700' };
    if (pct >= 40) return { title: 'Passing Grade', color: 'text-blue-700 bg-blue-50 dark:bg-blue-950/50 border-blue-300 dark:border-blue-700' };
    return { title: 'Revision Recommended', color: 'text-red-700 bg-red-50 dark:bg-red-950/50 border-red-300 dark:border-red-700' };
  };

  const tier = getTier(summary.percentage);

  const filteredEvaluations = summary.evaluations.filter(ev => {
    if (filter === 'all') return true;
    return ev.status === filter;
  });

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-8">
      {/* Executive Scorecard */}
      <div className="rounded-3xl bg-white dark:bg-stone-850 p-6 sm:p-8 border border-stone-200 dark:border-stone-750 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-100 dark:border-stone-800">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-stone-400">
              Exam Performance Analysis
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 dark:text-white mt-1">
              {summary.examTitle} Result
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <span className={`px-3 py-1.5 rounded-full text-xs font-bold border ${tier.color}`}>
              {tier.title}
            </span>
            <div className="flex items-center gap-1.5 text-xs text-stone-500 font-medium">
              <Clock className="w-3.5 h-3.5" />
              <span>{formatTime(summary.timeSpentSeconds)}</span>
            </div>
          </div>
        </div>

        {/* Big Score Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          <div className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-900 border border-stone-100 dark:border-stone-800">
            <span className="text-xs font-medium text-stone-500 dark:text-stone-400">Score</span>
            <div className="text-2xl sm:text-3xl font-black text-stone-900 dark:text-white mt-1">
              {summary.earnedMarks} <span className="text-xs sm:text-sm font-semibold text-stone-400">/ 100</span>
            </div>
            <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 mt-1 block">
              {summary.percentage}% Accuracy
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/30">
            <span className="text-xs font-medium text-emerald-700 dark:text-emerald-300">Fully Correct</span>
            <div className="text-2xl sm:text-3xl font-black text-emerald-600 dark:text-emerald-400 mt-1">
              {summary.correct}
            </div>
            <span className="text-[11px] text-stone-500 mt-1 block">
              +{summary.correct * 2} marks
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-100 dark:border-amber-900/30">
            <span className="text-xs font-medium text-amber-700 dark:text-amber-300">Partially Correct</span>
            <div className="text-2xl sm:text-3xl font-black text-amber-600 dark:text-amber-400 mt-1">
              {summary.partial}
            </div>
            <span className="text-[11px] text-stone-500 mt-1 block">
              Strict 0-wrong rule
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-red-50/50 dark:bg-red-950/20 border border-red-100 dark:border-red-900/30">
            <span className="text-xs font-medium text-red-700 dark:text-red-300">Incorrect / Skipped</span>
            <div className="text-2xl sm:text-3xl font-black text-red-600 dark:text-red-400 mt-1">
              {summary.incorrect + summary.unattempted}
            </div>
            <span className="text-[11px] text-stone-500 mt-1 block">
              {summary.incorrect} wrong, {summary.unattempted} skipped
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-3 pt-2">
          <button
            onClick={onRetake}
            className="flex-1 min-w-[140px] py-2.5 rounded-xl border border-stone-200 dark:border-stone-700 hover:bg-stone-50 dark:hover:bg-stone-800 text-stone-700 dark:text-stone-300 font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors spring-press"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Retake This Exam</span>
          </button>

          <button
            onClick={onTakeOtherMock}
            className="flex-1 min-w-[140px] py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs flex items-center justify-center gap-1.5 shadow-2xs transition-colors spring-press"
          >
            <span>Take Alternate Mock</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => onNavigate('practice')}
            className="flex-1 min-w-[140px] py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-white font-semibold text-xs flex items-center justify-center gap-1.5 shadow-2xs transition-colors spring-press"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Commute Flashcards</span>
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2 pb-1 border-b border-stone-200 dark:border-stone-800 text-xs font-medium">
        <button
          onClick={() => setFilter('all')}
          className={`px-3 py-1.5 rounded-lg transition-colors ${
            filter === 'all'
              ? 'bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 font-bold'
              : 'text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800'
          }`}
        >
          All Questions ({summary.totalQuestions})
        </button>

        <button
          onClick={() => setFilter('incorrect')}
          className={`px-3 py-1.5 rounded-lg transition-colors ${
            filter === 'incorrect'
              ? 'bg-red-600 text-white font-bold'
              : 'text-stone-600 dark:text-stone-400 hover:bg-red-50 dark:hover:bg-red-950/30'
          }`}
        >
          Incorrect ({summary.incorrect})
        </button>

        <button
          onClick={() => setFilter('partial')}
          className={`px-3 py-1.5 rounded-lg transition-colors ${
            filter === 'partial'
              ? 'bg-amber-500 text-white font-bold'
              : 'text-stone-600 dark:text-stone-400 hover:bg-amber-50 dark:hover:bg-amber-950/30'
          }`}
        >
          Partially Correct ({summary.partial})
        </button>

        <button
          onClick={() => setFilter('correct')}
          className={`px-3 py-1.5 rounded-lg transition-colors ${
            filter === 'correct'
              ? 'bg-emerald-600 text-white font-bold'
              : 'text-stone-600 dark:text-stone-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/30'
          }`}
        >
          Fully Correct ({summary.correct})
        </button>

        <button
          onClick={() => setFilter('unattempted')}
          className={`px-3 py-1.5 rounded-lg transition-colors ${
            filter === 'unattempted'
              ? 'bg-stone-400 text-white font-bold'
              : 'text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800'
          }`}
        >
          Unattempted ({summary.unattempted})
        </button>
      </div>

      {/* Questions Review List */}
      <div className="space-y-6">
        {filteredEvaluations.map((ev, idx) => {
          const q = ev.question;
          const userKeys = ev.selectedKeys.map(k => k.toLowerCase());
          const correctKeys = q.correctAnswers.map(k => k.toLowerCase());

          return (
            <div 
              key={q.id}
              className={`rounded-2xl bg-white dark:bg-stone-850 p-5 sm:p-7 border shadow-xs space-y-5 ${
                ev.status === 'correct' 
                  ? 'border-emerald-200 dark:border-emerald-900/40' 
                  : ev.status === 'partial'
                  ? 'border-amber-200 dark:border-amber-900/40'
                  : ev.status === 'incorrect'
                  ? 'border-red-200 dark:border-red-900/40'
                  : 'border-stone-200 dark:border-stone-750'
              }`}
            >
              {/* Question Header */}
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-sm sm:text-base text-stone-900 dark:text-white">
                    Q{q.mockQuestionNumber || idx + 1}
                  </span>
                  <span className="text-stone-400">•</span>
                  <span className="font-medium text-stone-600 dark:text-stone-300">
                    {q.assignmentName} ({q.topic})
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400">
                    {q.type}
                  </span>

                  <span className={`text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1 ${
                    ev.status === 'correct'
                      ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300'
                      : ev.status === 'partial'
                      ? 'bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300'
                      : ev.status === 'incorrect'
                      ? 'bg-red-100 dark:bg-red-950/60 text-red-800 dark:text-red-300'
                      : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400'
                  }`}>
                    {ev.status === 'correct' && <CheckCircle2 className="w-3.5 h-3.5" />}
                    {ev.status === 'partial' && <AlertTriangle className="w-3.5 h-3.5" />}
                    {ev.status === 'incorrect' && <XCircle className="w-3.5 h-3.5" />}
                    <span>{ev.score} / {ev.maxScore}.0 Marks</span>
                  </span>
                </div>
              </div>

              {/* Question Text */}
              <div className="text-sm sm:text-base font-medium text-stone-900 dark:text-stone-100 leading-relaxed">
                {q.question}
              </div>

              {/* Code Snippet if present */}
              {q.codeSnippet && <CodeBlock code={q.codeSnippet} language="java" />}

              {/* Diagram Image if present */}
              {q.image && (
                <div className="p-3 rounded-xl bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-750 flex flex-col items-center">
                  <div 
                    onClick={() => setModalImage(q.image!)}
                    className="cursor-pointer group relative max-w-lg w-full flex flex-col items-center"
                  >
                    <img 
                      src={q.image} 
                      alt="Question Diagram" 
                      className="max-h-60 object-contain rounded-lg"
                    />
                    <div className="mt-1 flex items-center gap-1 text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">
                      <ZoomIn className="w-3 h-3" />
                      <span>Tap to zoom</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Options breakdown */}
              <div className="space-y-2 pt-1">
                {q.options.map(opt => {
                  const optKey = opt.key.toLowerCase();
                  const isUserSelected = userKeys.includes(optKey);
                  const isCorrect = correctKeys.includes(optKey);

                  let optionCardStyle = 'bg-stone-50/50 dark:bg-stone-850 border-stone-200 dark:border-stone-750 text-stone-700 dark:text-stone-300';
                  let badgeStyle = 'bg-stone-100 dark:bg-stone-800 text-stone-500';

                  if (isCorrect && isUserSelected) {
                    // Correctly selected
                    optionCardStyle = 'bg-emerald-50/80 dark:bg-emerald-950/30 border-emerald-500 text-emerald-950 dark:text-emerald-100 ring-1 ring-emerald-500/50';
                    badgeStyle = 'bg-emerald-600 text-white';
                  } else if (isCorrect && !isUserSelected) {
                    // Correct but missed by user
                    optionCardStyle = 'bg-emerald-50/30 dark:bg-emerald-950/15 border-dashed border-emerald-500/60 text-emerald-900 dark:text-emerald-200';
                    badgeStyle = 'bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 font-bold';
                  } else if (!isCorrect && isUserSelected) {
                    // Wrong choice selected
                    optionCardStyle = 'bg-red-50/80 dark:bg-red-950/30 border-red-500 text-red-950 dark:text-red-100 ring-1 ring-red-500/50';
                    badgeStyle = 'bg-red-600 text-white';
                  }

                  return (
                    <div 
                      key={opt.key}
                      className={`flex items-start gap-3 p-3 rounded-xl border text-xs sm:text-sm leading-relaxed ${optionCardStyle}`}
                    >
                      <div className={`w-5 h-5 rounded-md flex items-center justify-center font-bold text-xs uppercase shrink-0 ${badgeStyle}`}>
                        {opt.key}
                      </div>

                      <div className="flex-1 pt-0.5">
                        {opt.text}
                      </div>

                      <div className="shrink-0 flex items-center gap-1.5 text-[11px] font-semibold">
                        {isCorrect && (
                          <span className="text-emerald-700 dark:text-emerald-400 flex items-center gap-0.5">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Correct</span>
                          </span>
                        )}
                        {isUserSelected && !isCorrect && (
                          <span className="text-red-600 dark:text-red-400 flex items-center gap-0.5">
                            <XCircle className="w-3.5 h-3.5" />
                            <span>Your Choice (Wrong)</span>
                          </span>
                        )}
                        {isUserSelected && isCorrect && (
                          <span className="text-emerald-600 text-[10px] bg-emerald-100 dark:bg-emerald-950 px-1.5 py-0.5 rounded">
                            Your Choice
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Scoring Reason / Explanation note */}
              <div className="p-3.5 rounded-xl bg-stone-100/70 dark:bg-stone-800/50 border border-stone-200 dark:border-stone-700/60 text-xs space-y-1.5">
                <div className="font-semibold text-stone-800 dark:text-stone-200 flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5 text-amber-500" />
                  <span>Evaluation: {ev.scoringReason}</span>
                </div>
              </div>

              {/* IIT Kharagpur Detailed Solution */}
              <div className="p-4 rounded-xl bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-200/60 dark:border-emerald-800/30 text-xs space-y-1.5">
                <div className="font-bold text-emerald-900 dark:text-emerald-300 flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  <span>IIT Kharagpur Detailed Solution:</span>
                </div>
                <p className="text-emerald-950/90 dark:text-emerald-200/90 leading-relaxed font-normal">
                  {q.solution}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* High-res Image Modal */}
      {modalImage && (
        <ImageModal
          src={modalImage}
          alt="Diagram"
          isOpen={!!modalImage}
          onClose={() => setModalImage(null)}
        />
      )}
    </div>
  );
};
