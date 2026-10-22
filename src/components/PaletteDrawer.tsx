import React from 'react';
import { X } from 'lucide-react';
import { Question, UserResponse } from '../types/quiz';

interface PaletteDrawerProps {
  questions: Question[];
  responses: Record<string, UserResponse>;
  currentIndex: number;
  onSelectIndex: (index: number) => void;
  isOpen: boolean;
  onClose: () => void;
}

export const PaletteDrawer: React.FC<PaletteDrawerProps> = ({
  questions,
  responses,
  currentIndex,
  onSelectIndex,
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  let answeredCount = 0;
  let reviewCount = 0;
  let unansweredCount = 0;

  questions.forEach(q => {
    const res = responses[q.id];
    const isAnswered = res && res.selectedKeys.length > 0;
    const isReview = res && res.isMarkedForReview;
    if (isAnswered) answeredCount++;
    else unansweredCount++;
    if (isReview) reviewCount++;
  });

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-xs animate-in fade-in duration-200" onClick={onClose}>
      <div 
        className="w-full max-w-md sm:max-w-sm h-full bg-warm-canvas dark:bg-dark-canvas border-l border-warm-border dark:border-dark-border shadow-2xl flex flex-col p-5 overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-warm-border dark:border-dark-border">
          <div>
            <h3 className="font-heading font-bold text-base text-warm-charcoal dark:text-dark-text">
              Question Palette
            </h3>
            <p className="text-xs text-warm-muted dark:text-dark-muted">
              50 Questions • 100 Marks
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-warm-surface dark:hover:bg-dark-surface text-warm-charcoal dark:text-dark-text transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Legend */}
        <div className="grid grid-cols-2 gap-2 my-4 p-3 rounded-xl bg-warm-surface dark:bg-dark-surface border border-warm-border dark:border-dark-border text-[11px]">
          <div className="flex items-center gap-2">
            <span className="w-3.5 h-3.5 rounded-md bg-sage-600 dark:bg-sage-500 text-white flex items-center justify-center text-[9px] font-bold">✓</span>
            <span className="text-warm-muted dark:text-dark-muted tabular-nums">Answered ({answeredCount})</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3.5 h-3.5 rounded-md bg-amber-600 text-white flex items-center justify-center text-[9px] font-bold">★</span>
            <span className="text-warm-muted dark:text-dark-muted tabular-nums">Review ({reviewCount})</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3.5 h-3.5 rounded-md bg-warm-pill dark:bg-dark-pill"></span>
            <span className="text-warm-muted dark:text-dark-muted tabular-nums">Unanswered ({unansweredCount})</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3.5 h-3.5 rounded-md border-2 border-sage-600"></span>
            <span className="text-warm-muted dark:text-dark-muted">Current</span>
          </div>
        </div>

        {/* Question Grid */}
        <div className="flex-1 overflow-y-auto">
          <div className="grid grid-cols-5 gap-2.5 py-2">
            {questions.map((q, idx) => {
              const res = responses[q.id];
              const isCurrent = idx === currentIndex;
              const isAnswered = res && res.selectedKeys.length > 0;
              const isReview = res && res.isMarkedForReview;

              let btnStyle = "bg-warm-surface dark:bg-dark-surface text-warm-charcoal dark:text-dark-text border border-warm-border dark:border-dark-border";

              if (isAnswered && isReview) {
                btnStyle = "bg-amber-600 text-white border-transparent shadow-xs";
              } else if (isAnswered) {
                btnStyle = "bg-sage-600 dark:bg-sage-500 text-white border-transparent shadow-xs";
              } else if (isReview) {
                btnStyle = "bg-amber-100 dark:bg-amber-950/60 text-amber-900 dark:text-amber-200 border border-amber-300";
              }

              if (isCurrent) {
                btnStyle += " ring-2 ring-offset-2 ring-sage-600 dark:ring-offset-dark-canvas font-bold scale-105 z-10";
              }

              return (
                <button
                  key={q.id}
                  onClick={() => {
                    onSelectIndex(idx);
                    onClose();
                  }}
                  className={`h-10 rounded-xl font-medium text-xs flex flex-col items-center justify-center relative transition-all spring-press tabular-nums ${btnStyle}`}
                >
                  <span>{idx + 1}</span>
                  {isReview && !isAnswered && (
                    <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-amber-600"></span>
                  )}
                  {isAnswered && isReview && (
                    <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-white"></span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-warm-border dark:border-dark-border mt-auto">
          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-xl bg-warm-charcoal dark:bg-dark-pill text-warm-canvas dark:text-dark-text font-medium text-xs hover:opacity-90 transition-opacity"
          >
            Close Palette
          </button>
        </div>
      </div>
    </div>
  );
};
