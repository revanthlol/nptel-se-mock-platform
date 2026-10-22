import React from 'react';
import { 
  Sparkles, 
  Layers, 
  BookOpen, 
  Clock, 
  ArrowRight,
  Smartphone,
  Bookmark
} from 'lucide-react';
import { AppMode } from '../types/quiz';

interface HomeViewProps {
  onStartExam: (mockNumber: 1 | 2) => void;
  onNavigate: (mode: AppMode) => void;
  bookmarkedCount: number;
}

export const HomeView: React.FC<HomeViewProps> = ({
  onStartExam,
  onNavigate,
  bookmarkedCount,
}) => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6 sm:space-y-8">
      {/* Header - Simple & Direct */}
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 pb-4 border-b border-warm-border dark:border-dark-border">
        <div>
          <h1 className="font-heading text-xl sm:text-2xl font-bold tracking-tight text-warm-charcoal dark:text-dark-text">
            Software Engineering Mock Papers
          </h1>
          <p className="text-xs text-warm-muted dark:text-dark-muted mt-0.5">
            IIT Kharagpur Syllabus • 50 Questions • 100 Marks • 90 Minutes
          </p>
        </div>
      </div>

      {/* Main Mock Papers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {/* Mock Test 1 Card */}
        <div className="rounded-2xl bg-warm-surface/90 dark:bg-dark-surface/90 p-5 sm:p-6 border border-warm-border dark:border-dark-border flex flex-col justify-between transition-colors">
          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs text-warm-muted dark:text-dark-muted">
              <span className="font-semibold tracking-wider uppercase text-[11px] text-sage-700 dark:text-sage-300">
                Mock Exam 1
              </span>
              <div className="flex items-center gap-1 font-medium">
                <Clock className="w-3.5 h-3.5" />
                <span className="tabular-nums">90 Mins</span>
              </div>
            </div>

            <div>
              <h2 className="font-heading text-lg sm:text-xl font-bold text-warm-charcoal dark:text-dark-text">
                Comprehensive Mock Paper I
              </h2>
              <p className="text-xs text-warm-muted dark:text-dark-muted mt-1.5 leading-relaxed">
                Covers Process Models, Agile, COCOMO Estimation, DFDs, UML Class & Sequence Diagrams, Black-box & White-box Testing.
              </p>
            </div>

            <div className="space-y-1.5 text-xs text-warm-muted dark:text-dark-muted pt-3 border-t border-warm-border dark:border-dark-border">
              <div className="flex justify-between">
                <span>Questions</span>
                <span className="font-semibold text-warm-charcoal dark:text-dark-text">50 Questions</span>
              </div>
              <div className="flex justify-between">
                <span>Total Marks</span>
                <span className="font-semibold text-warm-charcoal dark:text-dark-text">100 Marks (2 marks/Q)</span>
              </div>
              <div className="flex justify-between">
                <span>Scoring Scheme</span>
                <span className="font-semibold text-warm-charcoal dark:text-dark-text">Partial MSQ • 0 on Wrong Option</span>
              </div>
            </div>
          </div>

          <div className="pt-6 mt-2">
            <button
              onClick={() => onStartExam(1)}
              className="w-full py-3 rounded-xl bg-sage-600 hover:bg-sage-700 text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xs transition-all spring-press"
            >
              <span>Launch Mock Test 1</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Mock Test 2 Card */}
        <div className="rounded-2xl bg-warm-surface/90 dark:bg-dark-surface/90 p-5 sm:p-6 border border-warm-border dark:border-dark-border flex flex-col justify-between transition-colors">
          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs text-warm-muted dark:text-dark-muted">
              <span className="font-semibold tracking-wider uppercase text-[11px] text-warm-muted dark:text-dark-muted">
                Mock Exam 2
              </span>
              <div className="flex items-center gap-1 font-medium">
                <Clock className="w-3.5 h-3.5" />
                <span className="tabular-nums">90 Mins</span>
              </div>
            </div>

            <div>
              <h2 className="font-heading text-lg sm:text-xl font-bold text-warm-charcoal dark:text-dark-text">
                Comprehensive Mock Paper II
              </h2>
              <p className="text-xs text-warm-muted dark:text-dark-muted mt-1.5 leading-relaxed">
                Complementary set focusing on Structured Analysis, CRC Cards, Use-Case extend/include, Condition Coverage, and Mutation Testing.
              </p>
            </div>

            <div className="space-y-1.5 text-xs text-warm-muted dark:text-dark-muted pt-3 border-t border-warm-border dark:border-dark-border">
              <div className="flex justify-between">
                <span>Questions</span>
                <span className="font-semibold text-warm-charcoal dark:text-dark-text">50 Questions</span>
              </div>
              <div className="flex justify-between">
                <span>Total Marks</span>
                <span className="font-semibold text-warm-charcoal dark:text-dark-text">100 Marks (2 marks/Q)</span>
              </div>
              <div className="flex justify-between">
                <span>Scoring Scheme</span>
                <span className="font-semibold text-warm-charcoal dark:text-dark-text">Partial MSQ • 0 on Wrong Option</span>
              </div>
            </div>
          </div>

          <div className="pt-6 mt-2">
            <button
              onClick={() => onStartExam(2)}
              className="w-full py-3 rounded-xl bg-warm-charcoal dark:bg-dark-pill hover:opacity-90 text-warm-canvas dark:text-dark-text font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xs transition-all spring-press"
            >
              <span>Launch Mock Test 2</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Travel Practice Commute Banner */}
      <div className="rounded-2xl bg-warm-surface/90 dark:bg-dark-surface/90 p-5 sm:p-6 border border-warm-border dark:border-dark-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3.5">
          <div className="p-2 rounded-xl bg-sage-600 text-white shrink-0 mt-0.5">
            <Smartphone className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-heading font-bold text-sm sm:text-base text-warm-charcoal dark:text-dark-text">
              Commute & Travel Practice Mode
            </h3>
            <p className="text-xs text-warm-muted dark:text-dark-muted mt-0.5 leading-relaxed">
              Answer questions with instant feedback and solution reveal, or skim answers like flashcards on mobile while travelling.
            </p>
          </div>
        </div>
        <button
          onClick={() => onNavigate('practice')}
          className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-sage-600 hover:bg-sage-700 text-white font-semibold text-xs shrink-0 transition-all spring-press shadow-xs flex items-center justify-center gap-1.5"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Open Travel Practice</span>
        </button>
      </div>

      {/* Secondary Tools Grid: Question Bank & Formulas */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
        {/* All Questions */}
        <div 
          onClick={() => onNavigate('bank')}
          className="p-4 rounded-xl bg-warm-surface/90 dark:bg-dark-surface/90 border border-warm-border dark:border-dark-border hover:border-sage-500/60 dark:hover:border-sage-500/60 cursor-pointer transition-all group"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-warm-pill/80 dark:bg-dark-pill/80 text-warm-charcoal dark:text-dark-text">
              <Layers className="w-4 h-4 text-sage-600 dark:text-sage-400" />
            </div>
            <div>
              <h4 className="font-heading font-bold text-xs sm:text-sm text-warm-charcoal dark:text-dark-text group-hover:text-sage-700 dark:group-hover:text-sage-300 transition-colors">
                All 130 Questions
              </h4>
              <p className="text-[11px] text-warm-muted dark:text-dark-muted mt-0.5">
                Browse by Assignment (0-12)
              </p>
            </div>
          </div>
        </div>

        {/* Formula & Cheat Sheet */}
        <div 
          onClick={() => onNavigate('cheatsheet')}
          className="p-4 rounded-xl bg-warm-surface/90 dark:bg-dark-surface/90 border border-warm-border dark:border-dark-border hover:border-sage-500/60 dark:hover:border-sage-500/60 cursor-pointer transition-all group"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-warm-pill/80 dark:bg-dark-pill/80 text-warm-charcoal dark:text-dark-text">
              <BookOpen className="w-4 h-4 text-sage-600 dark:text-sage-400" />
            </div>
            <div>
              <h4 className="font-heading font-bold text-xs sm:text-sm text-warm-charcoal dark:text-dark-text group-hover:text-sage-700 dark:group-hover:text-sage-300 transition-colors">
                High-Yield Cheat Sheet
              </h4>
              <p className="text-[11px] text-warm-muted dark:text-dark-muted mt-0.5">
                Formulas, testing & UML rules
              </p>
            </div>
          </div>
        </div>

        {/* Bookmarked Questions */}
        <div 
          onClick={() => onNavigate('bank')}
          className="p-4 rounded-xl bg-warm-surface/90 dark:bg-dark-surface/90 border border-warm-border dark:border-dark-border hover:border-sage-500/60 dark:hover:border-sage-500/60 cursor-pointer transition-all group"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-warm-pill/80 dark:bg-dark-pill/80 text-warm-charcoal dark:text-dark-text">
              <Bookmark className="w-4 h-4 text-amber-600 dark:text-amber-400" />
            </div>
            <div>
              <h4 className="font-heading font-bold text-xs sm:text-sm text-warm-charcoal dark:text-dark-text group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                Bookmarked ({bookmarkedCount})
              </h4>
              <p className="text-[11px] text-warm-muted dark:text-dark-muted mt-0.5">
                Saved tricky questions
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
