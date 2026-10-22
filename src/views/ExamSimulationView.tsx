import React, { useState, useEffect } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Bookmark, 
  Flag, 
  RotateCcw, 
  Send, 
  Grid, 
  AlertCircle, 
  ZoomIn
} from 'lucide-react';
import { Question, UserResponse } from '../types/quiz';
import { CodeBlock } from '../components/CodeBlock';
import { ImageModal } from '../components/ImageModal';
import { PaletteDrawer } from '../components/PaletteDrawer';
import { isBookmarked, toggleBookmark } from '../utils/storage';

interface ExamSimulationViewProps {
  examTitle: string;
  questions: Question[];
  responses: Record<string, UserResponse>;
  currentIndex: number;
  onSelectIndex: (index: number) => void;
  onUpdateResponse: (questionId: string, selectedKeys: string[], isMarkedForReview: boolean) => void;
  onSubmitExam: () => void;
}

export const ExamSimulationView: React.FC<ExamSimulationViewProps> = ({
  examTitle,
  questions,
  responses,
  currentIndex,
  onSelectIndex,
  onUpdateResponse,
  onSubmitExam,
}) => {
  const [isPaletteOpen, setIsPaletteOpen] = useState(false);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState<string | null>(null);
  const [bookmarked, setBookmarked] = useState(false);

  const currentQuestion = questions[currentIndex];
  const currentResponse = responses[currentQuestion?.id] || {
    selectedKeys: [],
    isMarkedForReview: false,
    visited: true,
  };

  useEffect(() => {
    if (currentQuestion) {
      setBookmarked(isBookmarked(currentQuestion.id));
    }
  }, [currentQuestion]);

  if (!currentQuestion) return null;

  const handleToggleOption = (key: string) => {
    const isMSQ = currentQuestion.type === 'MSQ';
    let newKeys: string[];

    if (isMSQ) {
      if (currentResponse.selectedKeys.includes(key)) {
        newKeys = currentResponse.selectedKeys.filter(k => k !== key);
      } else {
        newKeys = [...currentResponse.selectedKeys, key];
      }
    } else {
      // MCQ
      newKeys = [key];
    }

    onUpdateResponse(currentQuestion.id, newKeys, currentResponse.isMarkedForReview);
  };

  const handleClearResponse = () => {
    onUpdateResponse(currentQuestion.id, [], currentResponse.isMarkedForReview);
  };

  const handleToggleReview = () => {
    onUpdateResponse(
      currentQuestion.id,
      currentResponse.selectedKeys,
      !currentResponse.isMarkedForReview
    );
  };

  const handleToggleBookmark = () => {
    toggleBookmark(currentQuestion.id);
    setBookmarked(!bookmarked);
  };

  // Stats for submit modal
  let answeredCount = 0;
  let reviewCount = 0;
  let unattemptedCount = 0;
  questions.forEach(q => {
    const res = responses[q.id];
    if (res && res.selectedKeys.length > 0) answeredCount++;
    else unattemptedCount++;
    if (res && res.isMarkedForReview) reviewCount++;
  });

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4 sm:py-6 space-y-4 sm:space-y-6 pb-28">
      {/* Top Question Info Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 sm:p-4 rounded-2xl bg-white dark:bg-stone-850 border border-stone-200 dark:border-stone-750 shadow-2xs">
        <div className="flex items-center gap-2.5">
          <span className="font-extrabold text-base sm:text-lg text-stone-900 dark:text-white">
            Question {currentIndex + 1}
          </span>
          <span className="text-xs text-stone-400 font-medium">/ 50</span>

          <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
            currentQuestion.type === 'MSQ'
              ? 'bg-purple-100 dark:bg-purple-950/60 text-purple-800 dark:text-purple-300 border border-purple-200 dark:border-purple-800/40'
              : 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/40'
          }`}>
            {currentQuestion.type === 'MSQ' ? 'MSQ • Multiple Correct' : 'MCQ • Single Correct'}
          </span>
          <span className="text-xs text-stone-500 font-medium hidden sm:inline">
            (+2.0 marks)
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          {/* Bookmark Button */}
          <button
            onClick={handleToggleBookmark}
            className={`p-2 rounded-xl transition-colors ${
              bookmarked 
                ? 'bg-amber-100 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400' 
                : 'hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-400 dark:text-stone-500'
            }`}
            title="Star Question"
          >
            <Bookmark className={`w-4 h-4 ${bookmarked ? 'fill-current' : ''}`} />
          </button>

          {/* Palette button */}
          <button
            onClick={() => setIsPaletteOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-100 dark:bg-stone-800 hover:bg-stone-200/70 text-xs font-semibold text-stone-700 dark:text-stone-300 transition-colors"
          >
            <Grid className="w-3.5 h-3.5" />
            <span>Palette ({answeredCount}/50)</span>
          </button>

          {/* Submit Test Button */}
          <button
            onClick={() => setIsSubmitModalOpen(true)}
            className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-2xs"
          >
            Submit Exam
          </button>
        </div>
      </div>

      {/* Main Question Card */}
      <div className="rounded-2xl bg-white dark:bg-stone-850 p-5 sm:p-7 border border-stone-200 dark:border-stone-750 shadow-sm space-y-6">
        {/* Question Topic & Number badge */}
        <div className="flex items-center justify-between text-xs text-stone-500 dark:text-stone-400">
          <span className="font-semibold text-stone-700 dark:text-stone-300">
            {currentQuestion.assignmentName} • {currentQuestion.topic}
          </span>
          {currentQuestion.type === 'MSQ' && (
            <span className="text-[11px] text-amber-600 dark:text-amber-400 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>Select one or more. Partial marks if 0 wrong.</span>
            </span>
          )}
        </div>

        {/* Question Prompt */}
        <div className="text-base sm:text-lg font-medium text-stone-900 dark:text-stone-100 leading-relaxed">
          {currentQuestion.question}
        </div>

        {/* Code Snippet if present */}
        {currentQuestion.codeSnippet && (
          <CodeBlock code={currentQuestion.codeSnippet} language="java" />
        )}

        {/* Diagram Image if present */}
        {currentQuestion.image && (
          <div className="my-4 p-3 rounded-xl bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-750 flex flex-col items-center">
            <div 
              onClick={() => setModalImage(currentQuestion.image!)}
              className="cursor-pointer group relative max-w-lg w-full flex flex-col items-center"
            >
              <img 
                src={currentQuestion.image} 
                alt="Question Diagram" 
                className="max-h-64 object-contain rounded-lg transition-transform group-hover:scale-[1.01]"
              />
              <div className="mt-2 flex items-center gap-1 text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                <ZoomIn className="w-3.5 h-3.5" />
                <span>Tap to view enlarged high-res diagram</span>
              </div>
            </div>
          </div>
        )}

        {/* Options List */}
        <div className="space-y-3 pt-2">
          {currentQuestion.options.map(opt => {
            const isSelected = currentResponse.selectedKeys.includes(opt.key);
            const isMSQ = currentQuestion.type === 'MSQ';

            return (
              <div
                key={opt.key}
                onClick={() => handleToggleOption(opt.key)}
                className={`flex items-start gap-3 p-3.5 sm:p-4 rounded-xl border cursor-pointer select-none transition-all spring-press ${
                  isSelected
                    ? 'border-emerald-600 bg-emerald-50/70 dark:bg-emerald-950/30 text-stone-900 dark:text-white ring-1 ring-emerald-600/50 shadow-2xs'
                    : 'border-stone-200 dark:border-stone-700/80 hover:border-stone-300 dark:hover:border-stone-600 bg-white dark:bg-stone-850/60 text-stone-800 dark:text-stone-200'
                }`}
              >
                {/* Checkbox / Radio symbol */}
                <div className={`w-6 h-6 rounded-lg shrink-0 flex items-center justify-center font-bold text-xs uppercase transition-colors ${
                  isSelected
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 border border-stone-300 dark:border-stone-700'
                }`}>
                  {opt.key}
                </div>

                <div className="flex-1 text-xs sm:text-sm pt-0.5 leading-relaxed font-normal">
                  {opt.text}
                </div>

                {/* Status Indicator Icon */}
                <div className="shrink-0 mt-0.5">
                  {isMSQ ? (
                    <div className={`w-4 h-4 rounded-sm border flex items-center justify-center transition-colors ${
                      isSelected
                        ? 'bg-emerald-600 border-emerald-600 text-white'
                        : 'border-stone-300 dark:border-stone-600'
                    }`}>
                      {isSelected && <span className="text-[10px] font-bold">✓</span>}
                    </div>
                  ) : (
                    <div className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors ${
                      isSelected
                        ? 'border-emerald-600'
                        : 'border-stone-300 dark:border-stone-600'
                    }`}>
                      {isSelected && <div className="w-2 h-2 rounded-full bg-emerald-600" />}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Floating Bottom Control Dock */}
      <div className="fixed bottom-0 left-0 right-0 z-30 apple-glass border-t border-black/[0.08] dark:border-white/[0.08] py-3 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-2 sm:gap-4">
          {/* Left: Previous */}
          <button
            onClick={() => onSelectIndex(Math.max(0, currentIndex - 1))}
            disabled={currentIndex === 0}
            className="flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-700 dark:text-stone-300 font-semibold text-xs sm:text-sm disabled:opacity-40 disabled:cursor-not-allowed hover:bg-stone-50 transition-colors spring-press"
          >
            <ChevronLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Previous</span>
          </button>

          {/* Middle: Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleToggleReview}
              className={`flex items-center gap-1.5 px-3 py-2.5 rounded-xl text-xs font-semibold transition-colors spring-press ${
                currentResponse.isMarkedForReview
                  ? 'bg-amber-500 text-white shadow-xs'
                  : 'bg-stone-100 dark:bg-stone-800 hover:bg-stone-200/70 text-stone-700 dark:text-stone-300 border border-stone-200 dark:border-stone-700'
              }`}
            >
              <Flag className={`w-3.5 h-3.5 ${currentResponse.isMarkedForReview ? 'fill-current' : ''}`} />
              <span className="hidden sm:inline">
                {currentResponse.isMarkedForReview ? 'Marked for Review' : 'Mark for Review'}
              </span>
              <span className="sm:hidden">Review</span>
            </button>

            {currentResponse.selectedKeys.length > 0 && (
              <button
                onClick={handleClearResponse}
                className="flex items-center gap-1 px-2.5 py-2.5 rounded-xl text-xs font-medium text-stone-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors"
                title="Clear selection"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span className="hidden md:inline">Clear</span>
              </button>
            )}
          </div>

          {/* Right: Next or Submit */}
          {currentIndex < questions.length - 1 ? (
            <button
              onClick={() => onSelectIndex(currentIndex + 1)}
              className="flex items-center gap-1 sm:gap-2 px-4 sm:px-6 py-2.5 rounded-xl bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 font-semibold text-xs sm:text-sm hover:opacity-90 transition-opacity spring-press"
            >
              <span>Next</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={() => setIsSubmitModalOpen(true)}
              className="flex items-center gap-1.5 px-4 sm:px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm transition-all shadow-xs spring-press"
            >
              <span>Submit Exam</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Palette Drawer Modal */}
      <PaletteDrawer
        questions={questions}
        responses={responses}
        currentIndex={currentIndex}
        onSelectIndex={onSelectIndex}
        isOpen={isPaletteOpen}
        onClose={() => setIsPaletteOpen(false)}
      />

      {/* High-res Image Modal */}
      {modalImage && (
        <ImageModal
          src={modalImage}
          alt="High Resolution Diagram"
          isOpen={!!modalImage}
          onClose={() => setModalImage(null)}
        />
      )}

      {/* Submit Confirmation Modal */}
      {isSubmitModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="w-full max-w-md bg-white dark:bg-stone-850 rounded-2xl p-6 shadow-2xl border border-black/10 dark:border-white/10 space-y-5">
            <div>
              <h3 className="text-lg font-bold text-stone-900 dark:text-white">
                Submit {examTitle}?
              </h3>
              <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
                Please verify your examination status before submitting.
              </p>
            </div>

            {/* Summary Grid */}
            <div className="grid grid-cols-3 gap-2.5 p-3.5 rounded-xl bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-center">
              <div>
                <span className="block text-xl font-extrabold text-emerald-600 dark:text-emerald-400">
                  {answeredCount}
                </span>
                <span className="text-[11px] text-stone-500 font-medium">Answered</span>
              </div>
              <div>
                <span className="block text-xl font-extrabold text-amber-500">
                  {reviewCount}
                </span>
                <span className="text-[11px] text-stone-500 font-medium">Review</span>
              </div>
              <div>
                <span className="block text-xl font-extrabold text-stone-400">
                  {unattemptedCount}
                </span>
                <span className="text-[11px] text-stone-500 font-medium">Unanswered</span>
              </div>
            </div>

            {unattemptedCount > 0 && (
              <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/40 text-amber-800 dark:text-amber-300 text-xs flex items-start gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-amber-600 dark:text-amber-400" />
                <span>
                  You have <strong>{unattemptedCount} unattempted questions</strong>. You can return to the test to answer them.
                </span>
              </div>
            )}

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => setIsSubmitModalOpen(false)}
                className="flex-1 py-2.5 rounded-xl border border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-300 font-medium text-xs hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors"
              >
                Continue Test
              </button>

              <button
                onClick={() => {
                  setIsSubmitModalOpen(false);
                  onSubmitExam();
                }}
                className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-xs transition-colors"
              >
                Confirm & Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
