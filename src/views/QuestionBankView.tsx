import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Bookmark, 
  BookOpen, 
  ZoomIn, 
  CheckCircle2, 
  Layers, 
  ChevronDown, 
  ChevronUp 
} from 'lucide-react';
import { Question } from '../types/quiz';
import { CodeBlock } from '../components/CodeBlock';
import { ImageModal } from '../components/ImageModal';
import { getBookmarks, toggleBookmark } from '../utils/storage';

interface QuestionBankViewProps {
  questions: Question[];
}

export const QuestionBankView: React.FC<QuestionBankViewProps> = ({ questions }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAssignment, setSelectedAssignment] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [onlyBookmarked, setOnlyBookmarked] = useState(false);
  const [bookmarkedList, setBookmarkedList] = useState<string[]>([]);
  const [expandedSolutions, setExpandedSolutions] = useState<Record<string, boolean>>({});
  const [modalImage, setModalImage] = useState<string | null>(null);

  useEffect(() => {
    setBookmarkedList(getBookmarks());
  }, []);

  const handleToggleBookmark = (id: string) => {
    const updated = toggleBookmark(id);
    setBookmarkedList(updated);
  };

  const toggleSolution = (id: string) => {
    setExpandedSolutions(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleAllSolutions = (expand: boolean) => {
    const next: Record<string, boolean> = {};
    if (expand) {
      filteredQuestions.forEach(q => { next[q.id] = true; });
    }
    setExpandedSolutions(next);
  };

  // Filtering
  const filteredQuestions = questions.filter(q => {
    if (onlyBookmarked && !bookmarkedList.includes(q.id)) return false;
    if (selectedAssignment !== 'all' && q.assignment.toString() !== selectedAssignment) return false;
    if (selectedType !== 'all' && q.type !== selectedType) return false;

    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      const inText = q.question.toLowerCase().includes(term);
      const inSolution = q.solution.toLowerCase().includes(term);
      const inTopic = q.topic.toLowerCase().includes(term);
      const inOptions = q.options.some(o => o.text.toLowerCase().includes(term));
      if (!inText && !inSolution && !inTopic && !inOptions) return false;
    }

    return true;
  });

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-6 pb-20">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-sage-100 dark:bg-sage-950/60 text-sage-800 dark:text-sage-200 text-xs font-semibold mb-1">
            <Layers className="w-3.5 h-3.5" />
            <span>Complete Assignment Repository</span>
          </div>
          <h2 className="font-heading text-2xl font-bold text-warm-charcoal dark:text-dark-text">
            All 130 NPTEL Questions
          </h2>
          <p className="text-xs text-warm-muted dark:text-dark-muted mt-0.5">
            Assignments 0 to 12 with official IIT Kharagpur answer keys & solutions
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => toggleAllSolutions(true)}
            className="text-xs font-semibold px-3 py-1.5 rounded-xl border border-warm-border dark:border-dark-border hover:bg-warm-surface-hover dark:hover:bg-dark-surface-hover text-warm-charcoal dark:text-dark-text transition-colors"
          >
            Expand All Solutions
          </button>
          <button
            onClick={() => toggleAllSolutions(false)}
            className="text-xs font-semibold px-3 py-1.5 rounded-xl border border-warm-border dark:border-dark-border hover:bg-warm-surface-hover dark:hover:bg-dark-surface-hover text-warm-charcoal dark:text-dark-text transition-colors"
          >
            Collapse All
          </button>
        </div>
      </div>

      {/* Search & Filter Controls - Seamless Warm Container */}
      <div className="p-4 rounded-2xl bg-warm-surface/90 dark:bg-dark-surface/90 border border-warm-border dark:border-dark-border shadow-2xs space-y-3">
        {/* Search Input */}
        <div className="relative">
          <Search className="w-4 h-4 text-warm-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            placeholder="Search keywords: COCOMO, Cyclomatic, CRC, Mutation, DFD, Equivalence..."
            className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-warm-border dark:border-dark-border bg-warm-pill/60 dark:bg-dark-pill/60 text-xs sm:text-sm text-warm-charcoal dark:text-dark-text placeholder:text-warm-muted/60 focus:outline-hidden focus:ring-1 focus:ring-sage-600"
          />
        </div>

        {/* Filter Dropdowns */}
        <div className="flex flex-wrap items-center gap-2.5 text-xs">
          <div className="flex items-center gap-1.5">
            <span className="text-warm-muted dark:text-dark-muted font-medium">Assignment:</span>
            <select
              value={selectedAssignment}
              onChange={e => setSelectedAssignment(e.target.value)}
              className="px-2.5 py-1.5 rounded-lg border border-warm-border dark:border-dark-border bg-warm-pill dark:bg-dark-pill text-warm-charcoal dark:text-dark-text font-medium focus:outline-hidden"
            >
              <option value="all">All Assignments (0 - 12)</option>
              {[...Array(13)].map((_, i) => (
                <option key={i} value={i.toString()}>
                  Assignment {i}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-warm-muted dark:text-dark-muted font-medium">Type:</span>
            <select
              value={selectedType}
              onChange={e => setSelectedType(e.target.value)}
              className="px-2.5 py-1.5 rounded-lg border border-warm-border dark:border-dark-border bg-warm-pill dark:bg-dark-pill text-warm-charcoal dark:text-dark-text font-medium focus:outline-hidden"
            >
              <option value="all">All Types (MCQ & MSQ)</option>
              <option value="MCQ">MCQ (Single Correct)</option>
              <option value="MSQ">MSQ (Multiple Correct)</option>
            </select>
          </div>

          <button
            onClick={() => setOnlyBookmarked(!onlyBookmarked)}
            className={`px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1.5 transition-colors ${
              onlyBookmarked
                ? 'bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border border-amber-300'
                : 'border border-warm-border dark:border-dark-border text-warm-muted dark:text-dark-muted hover:bg-warm-pill'
            }`}
          >
            <Bookmark className={`w-3.5 h-3.5 ${onlyBookmarked ? 'fill-current text-amber-600' : ''}`} />
            <span className="tabular-nums">Bookmarked Only ({bookmarkedList.length})</span>
          </button>

          <span className="ml-auto text-warm-muted dark:text-dark-muted font-medium text-[11px] tabular-nums">
            Showing {filteredQuestions.length} of {questions.length} questions
          </span>
        </div>
      </div>

      {/* Question Cards List - Seamless Warm Surfaces */}
      <div className="space-y-5">
        {filteredQuestions.length === 0 ? (
          <div className="p-12 text-center bg-warm-surface/90 dark:bg-dark-surface/90 rounded-2xl border border-warm-border dark:border-dark-border space-y-2">
            <p className="font-semibold text-warm-charcoal dark:text-dark-text">
              No questions matched your filter.
            </p>
            <p className="text-xs text-warm-muted dark:text-dark-muted">
              Try clearing search terms or selecting 'All Assignments'.
            </p>
          </div>
        ) : (
          filteredQuestions.map((q, idx) => {
            const isBookmarkedQ = bookmarkedList.includes(q.id);
            const isExpanded = !!expandedSolutions[q.id];
            const correctKeys = q.correctAnswers.map(k => k.toLowerCase());

            return (
              <div
                key={q.id}
                className="rounded-2xl bg-warm-surface/90 dark:bg-dark-surface/90 p-5 sm:p-6 border border-warm-border dark:border-dark-border shadow-2xs space-y-4"
              >
                {/* Header */}
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-heading font-bold text-warm-charcoal dark:text-dark-text tabular-nums">
                      #{idx + 1}
                    </span>
                    <span className="text-warm-muted dark:text-dark-muted">•</span>
                    <span className="font-semibold text-warm-charcoal dark:text-dark-text">
                      {q.assignmentName} Q{q.questionNumber}
                    </span>
                    <span className="text-warm-muted dark:text-dark-muted hidden sm:inline">•</span>
                    <span className="text-warm-muted dark:text-dark-muted hidden sm:inline">
                      {q.topic}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      q.type === 'MSQ'
                        ? 'bg-sage-200/80 dark:bg-sage-950/70 text-sage-900 dark:text-sage-200'
                        : 'bg-warm-pill dark:bg-dark-pill text-warm-charcoal dark:text-dark-text'
                    }`}>
                      {q.type}
                    </span>

                    <button
                      onClick={() => handleToggleBookmark(q.id)}
                      className={`p-1.5 rounded-lg transition-colors ${
                        isBookmarkedQ 
                          ? 'text-amber-600 bg-amber-100/70 dark:bg-amber-950/40' 
                          : 'text-warm-muted hover:text-warm-charcoal'
                      }`}
                      title="Bookmark Question"
                    >
                      <Bookmark className={`w-4 h-4 ${isBookmarkedQ ? 'fill-current' : ''}`} />
                    </button>
                  </div>
                </div>

                {/* Question Prompt */}
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
                        className="max-h-56 object-contain rounded-lg"
                      />
                      <div className="mt-1 flex items-center gap-1 text-[11px] text-sage-700 dark:text-sage-300 font-medium">
                        <ZoomIn className="w-3 h-3" />
                        <span>Tap to zoom diagram</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Options List - Tone-on-tone Pills */}
                <div className="space-y-2 pt-1">
                  {q.options.map(opt => {
                    const isCorrect = correctKeys.includes(opt.key.toLowerCase());

                    return (
                      <div
                        key={opt.key}
                        className={`flex items-start gap-3 p-3 rounded-xl border text-xs sm:text-sm leading-relaxed ${
                          isExpanded && isCorrect
                            ? 'bg-sage-100/90 dark:bg-sage-950/60 border-sage-500/80 text-warm-charcoal dark:text-dark-text shadow-2xs'
                            : 'bg-warm-pill/50 dark:bg-dark-pill/50 border-transparent text-warm-charcoal dark:text-dark-text'
                        }`}
                      >
                        <div className={`w-5 h-5 rounded-md flex items-center justify-center font-bold text-xs uppercase shrink-0 ${
                          isExpanded && isCorrect
                            ? 'bg-sage-600 text-white'
                            : 'bg-warm-surface dark:bg-dark-surface text-warm-muted dark:text-dark-muted'
                        }`}>
                          {opt.key}
                        </div>

                        <div className="flex-1 pt-0.5">
                          {opt.text}
                        </div>

                        {isExpanded && isCorrect && (
                          <div className="shrink-0 flex items-center gap-1 text-[11px] font-bold text-sage-700 dark:text-sage-300">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Correct</span>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Solution Toggle Button */}
                <div className="pt-1">
                  <button
                    onClick={() => toggleSolution(q.id)}
                    className="flex items-center gap-1.5 text-xs font-semibold text-sage-700 dark:text-sage-300 hover:text-sage-800 transition-colors"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>{isExpanded ? 'Hide Solution' : 'Reveal Answer & Solution'}</span>
                    {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                  </button>
                </div>

                {/* Expanded Solution */}
                {isExpanded && (
                  <div className="p-4 rounded-xl bg-sage-100/60 dark:bg-sage-950/30 border border-sage-200 dark:border-sage-800/40 text-xs space-y-1.5 animate-in fade-in duration-200">
                    <div className="font-bold text-sage-900 dark:text-sage-200">
                      Correct Option(s): {q.correctAnswers.map(a => a.toUpperCase()).join(', ')}
                    </div>
                    <div className="font-semibold text-warm-charcoal dark:text-dark-text pt-1">
                      Detailed Explanation:
                    </div>
                    <p className="text-warm-charcoal dark:text-dark-text leading-relaxed font-normal">
                      {q.solution}
                    </p>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Diagram Modal */}
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
