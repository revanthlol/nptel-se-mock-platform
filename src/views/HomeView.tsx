import React from 'react';
import { 
  Sparkles, 
  Layers, 
  BookOpen, 
  Clock, 
  Award, 
  ArrowRight,
  ShieldAlert,
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
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-8 sm:space-y-12">
      {/* Hero Header */}
      <div className="text-center space-y-3 sm:space-y-4 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sage-100/90 dark:bg-sage-950/60 text-sage-800 dark:text-sage-200 text-xs font-semibold tracking-wide">
          <Award className="w-3.5 h-3.5 text-sage-600 dark:text-sage-400" />
          <span>NPTEL Software Engineering • Final Revision</span>
        </div>

        <h1 className="font-heading text-2xl sm:text-4xl font-extrabold tracking-tight text-warm-charcoal dark:text-dark-text leading-tight">
          Master Your SE Exam Tomorrow.
        </h1>

        <p className="text-sm sm:text-base text-warm-muted dark:text-dark-muted leading-relaxed font-normal">
          Designed specifically for your final revision: 2 full 50-question mock exams, complete with IIT Kharagpur assignment solutions, exact MSQ partial-credit scoring, and a comfortable mobile travel mode.
        </p>

        {/* Feature Tags */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-2 text-[11px] font-medium text-warm-muted dark:text-dark-muted">
          <span className="px-2.5 py-1 rounded-md bg-warm-surface dark:bg-dark-surface border border-warm-border dark:border-dark-border">
            50 Questions • 100 Marks
          </span>
          <span className="px-2.5 py-1 rounded-md bg-warm-surface dark:bg-dark-surface border border-warm-border dark:border-dark-border">
            Strict MSQ Logic Enforced
          </span>
          <span className="px-2.5 py-1 rounded-md bg-warm-surface dark:bg-dark-surface border border-warm-border dark:border-dark-border">
            All 13 Assignments (130 Qs)
          </span>
          <span className="px-2.5 py-1 rounded-md bg-warm-surface dark:bg-dark-surface border border-warm-border dark:border-dark-border">
            Commute & Mobile Optimized
          </span>
        </div>
      </div>

      {/* Main Mock Papers Grid - Seamless Warm Containers */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {/* Mock Test 1 Card */}
        <div className="relative overflow-hidden rounded-2xl bg-warm-surface/85 dark:bg-dark-surface/85 p-6 border border-warm-border dark:border-dark-border shadow-xs hover:shadow-sm transition-shadow flex flex-col justify-between group">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-sage-100 dark:bg-sage-950/60 text-sage-800 dark:text-sage-200">
                Mock Exam 1
              </span>
              <div className="flex items-center gap-1 text-xs text-warm-muted dark:text-dark-muted font-medium">
                <Clock className="w-3.5 h-3.5" />
                <span className="tabular-nums">90 Mins</span>
              </div>
            </div>

            <div>
              <h2 className="font-heading text-xl font-bold text-warm-charcoal dark:text-dark-text">
                Comprehensive Mock Paper I
              </h2>
              <p className="text-xs text-warm-muted dark:text-dark-muted mt-1 leading-relaxed">
                50 questions covering Process Models, Agile, Estimation (COCOMO), DFD, UML Class & Sequence Diagrams, Black-box & White-box Testing.
              </p>
            </div>

            <div className="space-y-1.5 text-xs text-warm-muted dark:text-dark-muted pt-2 border-t border-warm-border dark:border-dark-border">
              <div className="flex justify-between">
                <span>Questions:</span>
                <span className="font-semibold text-warm-charcoal dark:text-dark-text">50 Questions</span>
              </div>
              <div className="flex justify-between">
                <span>Total Marks:</span>
                <span className="font-semibold text-warm-charcoal dark:text-dark-text">100 Marks (2 marks/Q)</span>
              </div>
              <div className="flex justify-between">
                <span>Scoring Logic:</span>
                <span className="font-semibold text-warm-charcoal dark:text-dark-text">Partial MSQ + Wrong Option Rule</span>
              </div>
            </div>
          </div>

          <div className="pt-6 mt-4">
            <button
              onClick={() => onStartExam(1)}
              className="w-full py-3 rounded-xl bg-sage-600 hover:bg-sage-700 text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-xs transition-all spring-press"
            >
              <span>Launch Mock Test 1</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Mock Test 2 Card */}
        <div className="relative overflow-hidden rounded-2xl bg-warm-surface/85 dark:bg-dark-surface/85 p-6 border border-warm-border dark:border-dark-border shadow-xs hover:shadow-sm transition-shadow flex flex-col justify-between group">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-warm-pill dark:bg-dark-pill text-warm-charcoal dark:text-dark-text">
                Mock Exam 2
              </span>
              <div className="flex items-center gap-1 text-xs text-warm-muted dark:text-dark-muted font-medium">
                <Clock className="w-3.5 h-3.5" />
                <span className="tabular-nums">90 Mins</span>
              </div>
            </div>

            <div>
              <h2 className="font-heading text-xl font-bold text-warm-charcoal dark:text-dark-text">
                Comprehensive Mock Paper II
              </h2>
              <p className="text-xs text-warm-muted dark:text-dark-muted mt-1 leading-relaxed">
                50 complementary questions focusing on Structured Analysis, CRC cards, Use-Case extend/include, Condition Coverage, and Mutation Testing.
              </p>
            </div>

            <div className="space-y-1.5 text-xs text-warm-muted dark:text-dark-muted pt-2 border-t border-warm-border dark:border-dark-border">
              <div className="flex justify-between">
                <span>Questions:</span>
                <span className="font-semibold text-warm-charcoal dark:text-dark-text">50 Questions</span>
              </div>
              <div className="flex justify-between">
                <span>Total Marks:</span>
                <span className="font-semibold text-warm-charcoal dark:text-dark-text">100 Marks (2 marks/Q)</span>
              </div>
              <div className="flex justify-between">
                <span>Scoring Logic:</span>
                <span className="font-semibold text-warm-charcoal dark:text-dark-text">Partial MSQ + Wrong Option Rule</span>
              </div>
            </div>
          </div>

          <div className="pt-6 mt-4">
            <button
              onClick={() => onStartExam(2)}
              className="w-full py-3 rounded-xl bg-warm-charcoal dark:bg-dark-pill hover:opacity-90 text-warm-canvas dark:text-dark-text font-semibold text-sm flex items-center justify-center gap-2 shadow-xs transition-all spring-press"
            >
              <span>Launch Mock Test 2</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Travelling / Commute Study Banner */}
      <div className="rounded-2xl bg-warm-surface dark:bg-dark-surface p-5 sm:p-6 border border-warm-border dark:border-dark-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3.5">
          <div className="p-2.5 rounded-xl bg-sage-600 text-white shadow-xs shrink-0">
            <Smartphone className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-heading font-bold text-base text-warm-charcoal dark:text-dark-text">
              Studying while travelling to the exam center?
            </h3>
            <p className="text-xs sm:text-sm text-warm-muted dark:text-dark-muted mt-0.5">
              Switch to <strong>Travel Practice Mode</strong>: answer questions on your phone with instant solution reveals, or quickly skim all solutions like flashcards on the metro/bus.
            </p>
          </div>
        </div>
        <button
          onClick={() => onNavigate('practice')}
          className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-sage-600 hover:bg-sage-700 text-white font-semibold text-xs tracking-wide shrink-0 transition-all spring-press shadow-xs flex items-center justify-center gap-1.5"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Open Travel Practice</span>
        </button>
      </div>

      {/* Secondary Tools: Question Bank & Formulas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* All Questions */}
        <div 
          onClick={() => onNavigate('bank')}
          className="p-4 rounded-xl bg-warm-surface dark:bg-dark-surface border border-warm-border dark:border-dark-border hover:border-sage-400 dark:hover:border-sage-600 cursor-pointer transition-all shadow-2xs group"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-sage-100/70 dark:bg-sage-950/50 text-sage-700 dark:text-sage-300">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-heading font-bold text-sm text-warm-charcoal dark:text-dark-text group-hover:text-sage-700 dark:group-hover:text-sage-300 transition-colors">
                All 130 Questions
              </h4>
              <p className="text-xs text-warm-muted dark:text-dark-muted mt-0.5">
                Browse & search by Assignment (0-12)
              </p>
            </div>
          </div>
        </div>

        {/* Formula & Cheat Sheet */}
        <div 
          onClick={() => onNavigate('cheatsheet')}
          className="p-4 rounded-xl bg-warm-surface dark:bg-dark-surface border border-warm-border dark:border-dark-border hover:border-sage-400 dark:hover:border-sage-600 cursor-pointer transition-all shadow-2xs group"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-sage-100/70 dark:bg-sage-950/50 text-sage-700 dark:text-sage-300">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-heading font-bold text-sm text-warm-charcoal dark:text-dark-text group-hover:text-sage-700 dark:group-hover:text-sage-300 transition-colors">
                High-Yield Cheat Sheet
              </h4>
              <p className="text-xs text-warm-muted dark:text-dark-muted mt-0.5">
                Formulas, testing metrics & UML rules
              </p>
            </div>
          </div>
        </div>

        {/* Bookmarked Questions */}
        <div 
          onClick={() => onNavigate('bank')}
          className="p-4 rounded-xl bg-warm-surface dark:bg-dark-surface border border-warm-border dark:border-dark-border hover:border-sage-400 dark:hover:border-sage-600 cursor-pointer transition-all shadow-2xs group sm:col-span-2 lg:col-span-1"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-sage-100/70 dark:bg-sage-950/50 text-sage-700 dark:text-sage-300">
              <Bookmark className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-heading font-bold text-sm text-warm-charcoal dark:text-dark-text group-hover:text-sage-700 dark:group-hover:text-sage-300 transition-colors">
                Bookmarked Questions ({bookmarkedCount})
              </h4>
              <p className="text-xs text-warm-muted dark:text-dark-muted mt-0.5">
                Review your starred tricky questions
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Rules & MSQ Logic Explanation Card */}
      <div className="rounded-2xl bg-warm-surface dark:bg-dark-surface p-5 sm:p-6 border border-warm-border dark:border-dark-border space-y-4">
        <div className="flex items-center gap-2 text-warm-charcoal dark:text-dark-text font-heading font-bold text-sm sm:text-base">
          <ShieldAlert className="w-4 h-4 text-sage-600 dark:text-sage-400" />
          <span>NPTEL Examination Pattern & MSQ Partial-Scoring Engine</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-3.5 rounded-xl bg-warm-pill/60 dark:bg-dark-pill/50 border border-warm-border dark:border-dark-border space-y-1.5">
            <span className="font-semibold text-warm-charcoal dark:text-dark-text block">
              1. Single Choice Questions (MCQ)
            </span>
            <p className="text-warm-muted dark:text-dark-muted leading-relaxed">
              Exactly one option is correct. Choosing the correct option awards full <strong>+2.0 marks</strong>. Any wrong choice or unattempted yields <strong>0 marks</strong>.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-sage-100/60 dark:bg-sage-950/30 border border-sage-200/60 dark:border-sage-800/40 space-y-1.5">
            <span className="font-semibold text-sage-900 dark:text-sage-200 block">
              2. Multiple Select Questions (MSQ) — Strict Logic
            </span>
            <p className="text-sage-800 dark:text-sage-300 leading-relaxed">
              If <strong>even one wrong option</strong> is selected, the whole question is marked wrong (<strong>0 marks</strong>). Partial marks are awarded <em>only</em> if all your chosen options are correct without any incorrect selection (e.g. 2 out of 3 correct with 0 wrong gives +1.33 marks).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
