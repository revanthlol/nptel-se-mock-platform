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
    if (pct >= 90) return { title: 'Elite + Gold', color: 'text-amber-800 bg-amber-100 dark:bg-amber-950/60 border-amber-300 dark:border-amber-700' };
    if (pct >= 75) return { title: 'Elite + Silver', color: 'text-warm-charcoal bg-warm-pill dark:bg-dark-pill border-warm-border dark:border-dark-border' };
    if (pct >= 60) return { title: 'Elite Standard', color: 'text-sage-800 bg-sage-100 dark:bg-sage-950/60 border-sage-300 dark:border-sage-700' };
    if (pct >= 40) return { title: 'Passing Grade', color: 'text-blue-800 bg-blue-100/70 dark:bg-blue-950/50 border-blue-300 dark:border-blue-700' };
    return { title: 'Revision Recommended', color: 'text-red-800 bg-red-100/70 dark:bg-red-950/50 border-red-300 dark:border-red-700' };
  };

  const tier = getTier(summary.percentage);

  const filteredEvaluations = summary.evaluations.filter(ev => {
    if (filter === 'all') return true;
    return ev.status === filter;
  });

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-8 pb-20">
      {/* Executive Scorecard - Seamless Warm Container */}
      <div className="rounded-3xl bg-warm-surface/90 dark:bg-dark-surface/90 p-6 sm:p-8 border border-warm-border dark:border-dark-border shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-warm-border dark:border-dark-border">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-warm-muted dark:text-dark-muted">
              Exam Performance Analysis
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-warm-charcoal dark:text-dark-text mt-1">
              {summary.examTitle} Result
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <span className={`px-3 py-1.5 rounded-full text-xs font-bold border ${tier.color}`}>
              {tier.title}
            </span>
            <div className="flex items-center gap-1.5 text-xs text-warm-muted dark:text-dark-muted font-medium">
              <Clock className="w-3.5 h-3.5" />
              <span className="tabular-nums font-mono">{formatTime(summary.timeSpentSeconds)}</span>
            </div>
          </div>
        </div>

        {/* Big Score Stats Grid - Tone-on-tone */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          <div className="p-4 rounded-2xl bg-warm-pill/60 dark:bg-dark-pill/60 border border-warm-border dark:border-dark-border">
            <span className="text-xs font-medium text-warm-muted dark:text-dark-muted">Total Score</span>
            <div className="text-2xl sm:text-3xl font-heading font-black text-warm-charcoal dark:text-dark-text mt-1 tabular-nums">
              {summary.earnedMarks} <span className="text-xs sm:text-sm font-semibold text-warm-muted dark:text-dark-muted">/ 100</span>
            </div>
            <span className="text-[11px] font-semibold text-sage-700 dark:text-sage-300 mt-1 block tabular-nums">
              {summary.percentage}% Accuracy
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-sage-100/70 dark:bg-sage-950/30 border border-sage-200 dark:border-sage-900/40">
            <span className="text-xs font-medium text-sage-800 dark:text-sage-200">Fully Correct</span>
            <div className="text-2xl sm:text-3xl font-heading font-black text-sage-700 dark:text-sage-300 mt-1 tabular-nums">
              {summary.correct}
            </div>
            <span className="text-[11px] text-warm-muted dark:text-dark-muted mt-1 block tabular-nums">
              +{summary.correct * 2} marks
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-warm-pill/80 dark:bg-dark-pill/80 border border-warm-border dark:border-dark-border">
            <span className="text-xs font-medium text-warm-charcoal dark:text-dark-text">Partially Correct</span>
            <div className="text-2xl sm:text-3xl font-heading font-black text-warm-charcoal dark:text-dark-text mt-1 tabular-nums">
              {summary.partial}
            </div>
            <span className="text-[11px] text-warm-muted dark:text-dark-muted mt-1 block">
              Strict 0-wrong rule
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-red-50/70 dark:bg-red-950/20 border border-red-200/60 dark:border-red-900/30">
            <span className="text-xs font-medium text-red-800 dark:text-red-200">Incorrect / Skipped</span>
            <div className="text-2xl sm:text-3xl font-heading font-black text-red-700 dark:text-red-400 mt-1 tabular-nums">
              {summary.incorrect + summary.unattempted}
            </div>
            <span className="text-[11px] text-warm-muted dark:text-dark-muted mt-1 block tabular-nums">
              {summary.incorrect} wrong, {summary.unattempted} skipped
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-3 pt-2">
          <button
            onClick={onRetake}
            className="flex-1 min-w-[140px] py-2.5 rounded-xl border border-warm-border dark:border-dark-border hover:bg-warm-surface-hover dark:hover:bg-dark-surface-hover text-warm-charcoal dark:text-dark-text font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors spring-press"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Retake This Exam</span>
          </button>

          <button
            onClick={onTakeOtherMock}
            className="flex-1 min-w-[140px] py-2.5 rounded-xl bg-sage-600 hover:bg-sage-700 text-white font-semibold text-xs flex items-center justify-center gap-1.5 shadow-xs transition-colors spring-press"
          >
            <span>Take Alternate Mock</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => onNavigate('practice')}
            className="flex-1 min-w-[140px] py-2.5 rounded-xl bg-warm-charcoal dark:bg-dark-pill hover:opacity-90 text-warm-canvas dark:text-dark-text font-semibold text-xs flex items-center justify-center gap-1.5 shadow-xs transition-colors spring-press"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Commute Flashcards</span>
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2 pb-1 border-b border-warm-border dark:border-dark-border text-xs font-medium">
        <button
          onClick={() => setFilter('all')}
          className={`px-3 py-1.5 rounded-lg transition-colors ${
            filter === 'all'
              ? 'bg-warm-charcoal dark:bg-dark-pill text-warm-canvas dark:text-dark-text font-bold'
              : 'text-warm-muted dark:text-dark-muted hover:bg-warm-surface dark:hover:bg-dark-surface'
          }`}
        >
          All Questions ({summary.totalQuestions})
        </button>

        <button
          onClick={() => setFilter('incorrect')}
          className={`px-3 py-1.5 rounded-lg transition-colors ${
            filter === 'incorrect'
              ? 'bg-red-700 text-white font-bold'
              : 'text-warm-muted dark:text-dark-muted hover:bg-red-50 dark:hover:bg-red-950/30'
          }`}
        >
          Incorrect ({summary.incorrect})
        </button>

        <button
          onClick={() => setFilter('partial')}
          className={`px-3 py-1.5 rounded-lg transition-colors ${
            filter === 'partial'
              ? 'bg-amber-600 text-white font-bold'
              : 'text-warm-muted dark:text-dark-muted hover:bg-amber-50 dark:hover:bg-amber-950/30'
          }`}
        >
          Partially Correct ({summary.partial})
        </button>

        <button
          onClick={() => setFilter('correct')}
          className={`px-3 py-1.5 rounded-lg transition-colors ${
            filter === 'correct'
              ? 'bg-sage-600 text-white font-bold'
              : 'text-warm-muted dark:text-dark-muted hover:bg-sage-50 dark:hover:bg-sage-950/30'
          }`}
        >
          Fully Correct ({summary.correct})
        </button>

        <button
          onClick={() => setFilter('unattempted')}
          className={`px-3 py-1.5 rounded-lg transition-colors ${
            filter === 'unattempted'
              ? 'bg-warm-muted text-white font-bold'
              : 'text-warm-muted dark:text-dark-muted hover:bg-warm-surface dark:hover:bg-dark-surface'
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
              className={`rounded-2xl bg-warm-surface/90 dark:bg-dark-surface/90 p-5 sm:p-7 border shadow-2xs space-y-5 ${
                ev.status === 'correct' 
                  ? 'border-sage-300 dark:border-sage-800/60' 
                  : ev.status === 'partial'
                  ? 'border-amber-300 dark:border-amber-800/60'
                  : ev.status === 'incorrect'
                  ? 'border-red-200 dark:border-red-900/40'
                  : 'border-warm-border dark:border-dark-border'
              }`}
            >
              {/* Question Header */}
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                <div className="flex items-center gap-2">
                  <span className="font-heading font-extrabold text-sm sm:text-base text-warm-charcoal dark:text-dark-text">
                    Q{q.mockQuestionNumber || idx + 1}
                  </span>
                  <span className="text-warm-muted dark:text-dark-muted">•</span>
                  <span className="font-medium text-warm-muted dark:text-dark-muted">
                    {q.assignmentName} ({q.topic})
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-warm-pill dark:bg-dark-pill text-warm-charcoal dark:text-dark-text">
                    {q.type}
                  </span>

                  <span className={`text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1 ${
                    ev.status === 'correct'
                      ? 'bg-sage-100 dark:bg-sage-950/60 text-sage-800 dark:text-sage-200'
                      : ev.status === 'partial'
                      ? 'bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-200'
                      : ev.status === 'incorrect'
                      ? 'bg-red-100 dark:bg-red-950/60 text-red-800 dark:text-red-200'
                      : 'bg-warm-pill dark:bg-dark-pill text-warm-charcoal dark:text-dark-text'
                  }`}>
                    {ev.status === 'correct' && <CheckCircle2 className="w-3.5 h-3.5" />}
                    {ev.status === 'partial' && <AlertTriangle className="w-3.5 h-3.5" />}
                    {ev.status === 'incorrect' && <XCircle className="w-3.5 h-3.5" />}
                    <span className="tabular-nums">{ev.score} / {ev.maxScore}.0 Marks</span>
                  </span>
                </div>
              </div>

              {/* Question Text */}
              <div className="text-sm sm:text-base font-medium text-warm-charcoal dark:text-dark-text leading-relaxed">
                {q.question}
              </div>

              {/* Code Snippet if present */}
              {q.codeSnippet && <CodeBlock code={q.codeSnippet} language="java" />}

              {/* Diagram Image if present */}
              {q.image && (
                <div className="p-3 rounded-xl bg-warm-pill/50 dark:bg-dark-pill/50 border border-warm-border dark:border-dark-border flex flex-col items-center">
                  <div 
                    onClick={() => setModalImage(q.image!)}
                    className="cursor-pointer group relative max-w-lg w-full flex flex-col items-center"
                  >
                    <img 
                      src={q.image} 
                      alt="Question Diagram" 
                      className="max-h-60 object-contain rounded-lg"
                    />
                    <div className="mt-1 flex items-center gap-1 text-[11px] text-sage-700 dark:text-sage-300 font-medium">
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

                  let optionCardStyle = 'bg-warm-pill/50 dark:bg-dark-pill/50 text-warm-charcoal dark:text-dark-text border border-transparent';
                  let badgeStyle = 'bg-warm-surface dark:bg-dark-surface text-warm-muted dark:text-dark-muted';

                  if (isCorrect && isUserSelected) {
                    optionCardStyle = 'bg-sage-100/90 dark:bg-sage-950/60 border border-sage-500/70 text-warm-charcoal dark:text-dark-text';
                    badgeStyle = 'bg-sage-600 text-white';
                  } else if (isCorrect && !isUserSelected) {
                    optionCardStyle = 'bg-sage-50/50 dark:bg-sage-950/20 border-dashed border-sage-400/60 text-sage-900 dark:text-sage-200';
                    badgeStyle = 'bg-sage-500/20 text-sage-700 dark:text-sage-300 font-bold';
                  } else if (!isCorrect && isUserSelected) {
                    optionCardStyle = 'bg-red-50/80 dark:bg-red-950/30 border border-red-400 text-red-950 dark:text-red-100';
                    badgeStyle = 'bg-red-600 text-white';
                  }

                  return (
                    <div 
                      key={opt.key}
                      className={`flex items-start gap-3 p-3 rounded-xl text-xs sm:text-sm leading-relaxed ${optionCardStyle}`}
                    >
                      <div className={`w-5 h-5 rounded-md flex items-center justify-center font-bold text-xs uppercase shrink-0 ${badgeStyle}`}>
                        {opt.key}
                      </div>

                      <div className="flex-1 pt-0.5">
                        {opt.text}
                      </div>

                      <div className="shrink-0 flex items-center gap-1.5 text-[11px] font-semibold">
                        {isCorrect && (
                          <span className="text-sage-700 dark:text-sage-300 flex items-center gap-0.5">
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
                          <span className="text-sage-700 text-[10px] bg-sage-200/80 dark:bg-sage-950 px-1.5 py-0.5 rounded">
                            Your Choice
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Scoring Reason / Explanation note */}
              <div className="p-3.5 rounded-xl bg-warm-pill/60 dark:bg-dark-pill/50 border border-warm-border dark:border-dark-border text-xs space-y-1.5">
                <div className="font-semibold text-warm-charcoal dark:text-dark-text flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5 text-sage-600 dark:text-sage-400" />
                  <span>Evaluation: {ev.scoringReason}</span>
                </div>
              </div>

              {/* IIT Kharagpur Detailed Solution */}
              <div className="p-4 rounded-xl bg-sage-100/60 dark:bg-sage-950/30 border border-sage-200 dark:border-sage-800/40 text-xs space-y-1.5">
                <div className="font-bold text-sage-900 dark:text-sage-200 flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-sage-600 dark:text-sage-400" />
                  <span>IIT Kharagpur Detailed Solution:</span>
                </div>
                <p className="text-warm-charcoal dark:text-dark-text leading-relaxed font-normal">
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
