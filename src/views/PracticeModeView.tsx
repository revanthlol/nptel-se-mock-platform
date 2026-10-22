import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  ChevronLeft, 
  ChevronRight, 
  Bookmark, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  Eye, 
  RotateCcw, 
  ZoomIn, 
  BookOpen, 
  Filter
} from 'lucide-react';
import { Question } from '../types/quiz';
import { CodeBlock } from '../components/CodeBlock';
import { ImageModal } from '../components/ImageModal';
import { evaluateQuestion } from '../utils/scoring';
import { toggleBookmark, getBookmarks } from '../utils/storage';

interface PracticeModeViewProps {
  allQuestions: Question[];
  mock1Questions: Question[];
  mock2Questions: Question[];
}

export const PracticeModeView: React.FC<PracticeModeViewProps> = ({
  allQuestions,
  mock1Questions,
  mock2Questions,
}) => {
  const [sourceFilter, setSourceFilter] = useState<'all' | 'mock1' | 'mock2' | 'bookmarked' | string>('all');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  const [hasChecked, setHasChecked] = useState(false);
  const [hasRevealed, setHasRevealed] = useState(false);
  const [modalImage, setModalImage] = useState<string | null>(null);
  const [bookmarkedList, setBookmarkedList] = useState<string[]>([]);

  useEffect(() => {
    setBookmarkedList(getBookmarks());
  }, []);

  // Filter pool of questions
  const getPool = (): Question[] => {
    if (sourceFilter === 'mock1') return mock1Questions;
    if (sourceFilter === 'mock2') return mock2Questions;
    if (sourceFilter === 'bookmarked') {
      return allQuestions.filter(q => bookmarkedList.includes(q.id));
    }
    if (sourceFilter.startsWith('ass_')) {
      const assNum = parseInt(sourceFilter.replace('ass_', ''), 10);
      return allQuestions.filter(q => q.assignment === assNum);
    }
    return allQuestions;
  };

  const pool = getPool();
  const currentQuestion = pool[currentIndex] || pool[0];

  useEffect(() => {
    // Reset state on question change
    setSelectedKeys([]);
    setHasChecked(false);
    setHasRevealed(false);
  }, [currentIndex, sourceFilter]);

  if (!currentQuestion) {
    return (
      <div className="max-w-xl mx-auto px-4 py-16 text-center space-y-4">
        <div className="w-12 h-12 rounded-2xl bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 mx-auto flex items-center justify-center">
          <Bookmark className="w-6 h-6" />
        </div>
        <h3 className="font-bold text-lg text-stone-900 dark:text-white">
          No questions in this filter
        </h3>
        <p className="text-xs text-stone-500">
          {sourceFilter === 'bookmarked' 
            ? 'You haven\'t bookmarked any questions yet. Tap the bookmark icon on any question to save it.'
            : 'Try selecting a different assignment or question set.'}
        </p>
        <button
          onClick={() => setSourceFilter('all')}
          className="px-4 py-2 rounded-xl bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 font-semibold text-xs"
        >
          Reset to All Questions
        </button>
      </div>
    );
  }

  const isCurrentBookmarked = bookmarkedList.includes(currentQuestion.id);

  const handleToggleOption = (key: string) => {
    if (hasChecked) return; // locked after check
    const isMSQ = currentQuestion.type === 'MSQ';
    if (isMSQ) {
      if (selectedKeys.includes(key)) {
        setSelectedKeys(selectedKeys.filter(k => k !== key));
      } else {
        setSelectedKeys([...selectedKeys, key]);
      }
    } else {
      setSelectedKeys([key]);
    }
  };

  const handleToggleBookmark = () => {
    const updated = toggleBookmark(currentQuestion.id);
    setBookmarkedList(updated);
  };

  const evalResult = hasChecked ? evaluateQuestion(currentQuestion, selectedKeys) : null;
  const correctKeys = currentQuestion.correctAnswers.map(k => k.toLowerCase());

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-4 sm:py-8 space-y-5 pb-24">
      {/* Top Travel Banner & Filter */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 sm:p-4 rounded-2xl bg-white dark:bg-stone-850 border border-stone-200 dark:border-stone-750 shadow-2xs">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-amber-500 text-white">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h2 className="font-bold text-xs sm:text-sm text-stone-900 dark:text-white">
              Travel Practice Mode
            </h2>
            <p className="text-[10px] text-stone-500 dark:text-stone-400">
              Instant feedback & solutions on each question
            </p>
          </div>
        </div>

        {/* Source selector dropdown */}
        <div className="flex items-center gap-2">
          <Filter className="w-3.5 h-3.5 text-stone-400" />
          <select
            value={sourceFilter}
            onChange={e => {
              setSourceFilter(e.target.value);
              setCurrentIndex(0);
            }}
            className="text-xs font-semibold px-2.5 py-1.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-800 dark:text-stone-200 focus:outline-hidden"
          >
            <option value="all">All 130 Questions</option>
            <option value="mock1">Mock Test 1 (50 Qs)</option>
            <option value="mock2">Mock Test 2 (50 Qs)</option>
            <option value="bookmarked">Bookmarked Questions ({bookmarkedList.length})</option>
            <optgroup label="Filter by Assignment">
              {[...Array(13)].map((_, i) => (
                <option key={i} value={`ass_${i}`}>
                  Assignment {i} (10 Qs)
                </option>
              ))}
            </optgroup>
          </select>
        </div>
      </div>

      {/* Progress & Jump Bar */}
      <div className="flex items-center justify-between text-xs font-medium text-stone-500 dark:text-stone-400">
        <span>Question {currentIndex + 1} of {pool.length}</span>
        <div className="w-32 sm:w-48 h-1.5 bg-stone-200 dark:bg-stone-750 rounded-full overflow-hidden">
          <div 
            className="h-full bg-emerald-600 transition-all duration-300"
            style={{ width: `${((currentIndex + 1) / pool.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Question Card */}
      <div className="rounded-2xl bg-white dark:bg-stone-850 p-5 sm:p-7 border border-stone-200 dark:border-stone-750 shadow-sm space-y-5">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300">
              {currentQuestion.assignmentName}
            </span>
            <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
              currentQuestion.type === 'MSQ'
                ? 'bg-purple-100 dark:bg-purple-950/60 text-purple-800 dark:text-purple-300'
                : 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300'
            }`}>
              {currentQuestion.type === 'MSQ' ? 'MSQ (Multiple Choice)' : 'MCQ (Single Choice)'}
            </span>
          </div>

          <button
            onClick={handleToggleBookmark}
            className={`p-2 rounded-xl transition-colors ${
              isCurrentBookmarked 
                ? 'bg-amber-100 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400' 
                : 'hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-400'
            }`}
            title="Star Question"
          >
            <Bookmark className={`w-4 h-4 ${isCurrentBookmarked ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* Question Prompt */}
        <div className="text-sm sm:text-base font-medium text-stone-900 dark:text-stone-100 leading-relaxed">
          {currentQuestion.question}
        </div>

        {/* Code Snippet if present */}
        {currentQuestion.codeSnippet && (
          <CodeBlock code={currentQuestion.codeSnippet} language="java" />
        )}

        {/* Diagram Image if present */}
        {currentQuestion.image && (
          <div className="p-3 rounded-xl bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-750 flex flex-col items-center">
            <div 
              onClick={() => setModalImage(currentQuestion.image!)}
              className="cursor-pointer group relative max-w-lg w-full flex flex-col items-center"
            >
              <img 
                src={currentQuestion.image} 
                alt="Question Diagram" 
                className="max-h-60 object-contain rounded-lg"
              />
              <div className="mt-1 flex items-center gap-1 text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">
                <ZoomIn className="w-3 h-3" />
                <span>Tap to zoom diagram</span>
              </div>
            </div>
          </div>
        )}

        {/* Options */}
        <div className="space-y-2.5 pt-1">
          {currentQuestion.options.map(opt => {
            const optKey = opt.key.toLowerCase();
            const isSelected = selectedKeys.includes(opt.key);
            const isCorrect = correctKeys.includes(optKey);
            const showSolutionState = hasChecked || hasRevealed;

            let cardStyle = "bg-white dark:bg-stone-850/60 border-stone-200 dark:border-stone-700/80 text-stone-800 dark:text-stone-200 hover:border-stone-300";
            let badgeStyle = "bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400";

            if (!showSolutionState && isSelected) {
              cardStyle = "border-emerald-600 bg-emerald-50/70 dark:bg-emerald-950/30 text-stone-900 dark:text-white ring-1 ring-emerald-600/50";
              badgeStyle = "bg-emerald-600 text-white";
            } else if (showSolutionState) {
              if (isCorrect) {
                cardStyle = "border-emerald-500 bg-emerald-50/80 dark:bg-emerald-950/30 text-emerald-950 dark:text-emerald-100 ring-1 ring-emerald-500/50";
                badgeStyle = "bg-emerald-600 text-white";
              } else if (isSelected && !isCorrect) {
                cardStyle = "border-red-500 bg-red-50/80 dark:bg-red-950/30 text-red-950 dark:text-red-100 ring-1 ring-red-500/50";
                badgeStyle = "bg-red-600 text-white";
              }
            }

            return (
              <div
                key={opt.key}
                onClick={() => handleToggleOption(opt.key)}
                className={`flex items-start gap-3 p-3.5 sm:p-4 rounded-xl border select-none transition-all spring-press ${
                  hasChecked ? 'cursor-default' : 'cursor-pointer'
                } ${cardStyle}`}
              >
                <div className={`w-5 h-5 rounded-md flex items-center justify-center font-bold text-xs uppercase shrink-0 ${badgeStyle}`}>
                  {opt.key}
                </div>

                <div className="flex-1 text-xs sm:text-sm pt-0.5 leading-relaxed">
                  {opt.text}
                </div>

                {showSolutionState && isCorrect && (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                )}
                {showSolutionState && isSelected && !isCorrect && (
                  <XCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                )}
              </div>
            );
          })}
        </div>

        {/* Action Buttons: Check Answer, Reveal, Clear */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-stone-100 dark:border-stone-800">
          {!hasChecked && !hasRevealed ? (
            <>
              <button
                onClick={() => setHasChecked(true)}
                disabled={selectedKeys.length === 0}
                className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold text-xs shadow-xs transition-all spring-press"
              >
                Check Answer
              </button>

              <button
                onClick={() => setHasRevealed(true)}
                className="px-3.5 py-2.5 rounded-xl border border-stone-200 dark:border-stone-700 hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-600 dark:text-stone-300 font-semibold text-xs transition-colors flex items-center gap-1.5"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Show Solution</span>
              </button>
            </>
          ) : (
            <button
              onClick={() => {
                setHasChecked(false);
                setHasRevealed(false);
                setSelectedKeys([]);
              }}
              className="px-4 py-2.5 rounded-xl border border-stone-200 dark:border-stone-700 hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-700 dark:text-stone-300 font-semibold text-xs flex items-center gap-1.5 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Retry Question</span>
            </button>
          )}
        </div>

        {/* Evaluation Banner after Check */}
        {evalResult && (
          <div className={`p-4 rounded-xl border text-xs space-y-1.5 animate-in fade-in duration-200 ${
            evalResult.status === 'correct'
              ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800/40 text-emerald-900 dark:text-emerald-200'
              : evalResult.status === 'partial'
              ? 'bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-800/40 text-amber-900 dark:text-amber-200'
              : 'bg-red-50 dark:bg-red-950/40 border-red-200 dark:border-red-800/40 text-red-900 dark:text-red-200'
          }`}>
            <div className="font-bold flex items-center gap-1.5 text-sm">
              {evalResult.status === 'correct' && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
              {evalResult.status === 'partial' && <AlertTriangle className="w-4 h-4 text-amber-600" />}
              {evalResult.status === 'incorrect' && <XCircle className="w-4 h-4 text-red-600" />}
              <span>{evalResult.score} / {evalResult.maxScore}.0 Marks</span>
            </div>
            <p className="leading-relaxed">{evalResult.scoringReason}</p>
          </div>
        )}

        {/* Detailed Solution Reveal */}
        {(hasChecked || hasRevealed) && (
          <div className="p-4 rounded-xl bg-stone-100/80 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700 text-xs space-y-1.5 animate-in fade-in duration-300">
            <div className="font-bold text-stone-900 dark:text-white flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>IIT Kharagpur Detailed Solution:</span>
            </div>
            <p className="text-stone-700 dark:text-stone-300 leading-relaxed font-normal">
              {currentQuestion.solution}
            </p>
          </div>
        )}
      </div>

      {/* Floating Travel Bottom Nav Dock */}
      <div className="fixed bottom-0 left-0 right-0 z-30 apple-glass border-t border-black/[0.08] dark:border-white/[0.08] py-3 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto flex items-center justify-between gap-3">
          <button
            onClick={() => setCurrentIndex(Math.max(0, currentIndex - 1))}
            disabled={currentIndex === 0}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-700 dark:text-stone-300 font-semibold text-xs disabled:opacity-40 disabled:cursor-not-allowed hover:bg-stone-50 transition-colors spring-press"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous</span>
          </button>

          <span className="text-xs font-semibold text-stone-500">
            {currentIndex + 1} / {pool.length}
          </span>

          <button
            onClick={() => setCurrentIndex(Math.min(pool.length - 1, currentIndex + 1))}
            disabled={currentIndex === pool.length - 1}
            className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 font-semibold text-xs disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-90 transition-opacity spring-press"
          >
            <span>Next</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* High-res Image Modal */}
      {modalImage && (
        <ImageModal
          src={modalImage}
          alt="Question Diagram"
          isOpen={!!modalImage}
          onClose={() => setModalImage(null)}
        />
      )}
    </div>
  );
};
