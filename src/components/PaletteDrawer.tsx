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
        className="w-full max-w-md sm:max-w-sm h-full bg-[#FAF8F5] dark:bg-[#1A1B20] border-l border-black/10 dark:border-white/10 shadow-2xl flex flex-col p-5 overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-black/10 dark:border-white/10">
          <div>
            <h3 className="font-bold text-base text-stone-900 dark:text-white">
              Question Palette
            </h3>
            <p className="text-xs text-stone-500 dark:text-stone-400">
              50 Questions • 100 Marks
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-stone-200/60 dark:hover:bg-white/10 text-stone-600 dark:text-stone-300 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Legend */}
        <div className="grid grid-cols-2 gap-2 my-4 p-3 rounded-xl bg-white dark:bg-stone-850 border border-black/5 dark:border-white/5 text-[11px]">
          <div className="flex items-center gap-2">
            <span className="w-3.5 h-3.5 rounded-md bg-emerald-600 dark:bg-emerald-500 text-white flex items-center justify-center text-[9px] font-bold">✓</span>
            <span className="text-stone-600 dark:text-stone-300">Answered ({answeredCount})</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3.5 h-3.5 rounded-md bg-amber-500 text-white flex items-center justify-center text-[9px] font-bold">★</span>
            <span className="text-stone-600 dark:text-stone-300">Review ({reviewCount})</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3.5 h-3.5 rounded-md bg-stone-200 dark:bg-stone-700"></span>
            <span className="text-stone-600 dark:text-stone-300">Unanswered ({unansweredCount})</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3.5 h-3.5 rounded-md border-2 border-emerald-600"></span>
            <span className="text-stone-600 dark:text-stone-300">Current Question</span>
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

              let btnStyle = "bg-white dark:bg-stone-800 text-stone-700 dark:text-stone-300 border border-stone-200 dark:border-stone-700";

              if (isAnswered && isReview) {
                btnStyle = "bg-amber-500 text-white border-amber-600 shadow-xs";
              } else if (isAnswered) {
                btnStyle = "bg-emerald-600 dark:bg-emerald-600 text-white border-emerald-700 shadow-xs";
              } else if (isReview) {
                btnStyle = "bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border border-amber-400";
              }

              if (isCurrent) {
                btnStyle += " ring-2 ring-offset-2 ring-emerald-600 dark:ring-offset-stone-900 font-bold scale-105 z-10";
              }

              return (
                <button
                  key={q.id}
                  onClick={() => {
                    onSelectIndex(idx);
                    onClose();
                  }}
                  className={`h-10 rounded-xl font-medium text-xs flex flex-col items-center justify-center relative transition-all spring-press ${btnStyle}`}
                >
                  <span>{idx + 1}</span>
                  {isReview && !isAnswered && (
                    <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-amber-500"></span>
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
        <div className="pt-4 border-t border-black/10 dark:border-white/10 mt-auto">
          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-xl bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 font-medium text-xs hover:opacity-90 transition-opacity"
          >
            Close Palette
          </button>
        </div>
      </div>
    </div>
  );
};
