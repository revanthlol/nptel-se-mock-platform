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
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/40 text-emerald-800 dark:text-emerald-300 text-xs font-semibold tracking-wide">
          <Award className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
          <span>NPTEL Software Engineering • 2026 Ready</span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-stone-900 dark:text-white leading-tight">
          Master Your SE Exam Tomorrow.
        </h1>

        <p className="text-sm sm:text-base text-stone-600 dark:text-stone-300 leading-relaxed font-normal">
          Designed specifically for your final revision: 2 full 50-question mock exams, complete with IIT Kharagpur assignment solutions, exact MSQ partial-credit scoring, and a comfortable mobile travel mode.
        </p>

        {/* Feature Tags */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-2 text-[11px] font-medium text-stone-600 dark:text-stone-400">
          <span className="px-2.5 py-1 rounded-md bg-stone-100 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700/60">
            50 Questions • 100 Marks
          </span>
          <span className="px-2.5 py-1 rounded-md bg-stone-100 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700/60">
            Strict MSQ Logic Enforced
          </span>
          <span className="px-2.5 py-1 rounded-md bg-stone-100 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700/60">
            All 13 Assignments (130 Qs)
          </span>
          <span className="px-2.5 py-1 rounded-md bg-stone-100 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700/60">
            Commute & Mobile Optimized
          </span>
        </div>
      </div>

      {/* Main Mock Papers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {/* Mock Test 1 Card */}
        <div className="relative overflow-hidden rounded-2xl bg-white dark:bg-stone-850 p-6 border border-stone-200 dark:border-stone-750 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between group">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300">
                Mock Exam 1
              </span>
              <div className="flex items-center gap-1 text-xs text-stone-500 dark:text-stone-400 font-medium">
                <Clock className="w-3.5 h-3.5" />
                <span>90 Mins</span>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-bold text-stone-900 dark:text-white">
                Comprehensive Mock Paper I
              </h2>
              <p className="text-xs text-stone-600 dark:text-stone-400 mt-1 leading-relaxed">
                50 questions covering Process Models, Agile, Estimation (COCOMO), DFD, UML Class & Sequence Diagrams, Black-box & White-box Testing.
              </p>
            </div>

            <div className="space-y-1.5 text-xs text-stone-600 dark:text-stone-400 pt-2 border-t border-stone-100 dark:border-stone-800">
              <div className="flex justify-between">
                <span>Questions:</span>
                <span className="font-semibold text-stone-900 dark:text-stone-200">50 Questions</span>
              </div>
              <div className="flex justify-between">
                <span>Total Marks:</span>
                <span className="font-semibold text-stone-900 dark:text-stone-200">100 Marks (2 marks/Q)</span>
              </div>
              <div className="flex justify-between">
                <span>Scoring Logic:</span>
                <span className="font-semibold text-stone-900 dark:text-stone-200">Partial MSQ + Wrong Option Rule</span>
              </div>
            </div>
          </div>

          <div className="pt-6 mt-4">
            <button
              onClick={() => onStartExam(1)}
              className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-sm transition-all spring-press group-hover:shadow-emerald-600/20"
            >
              <span>Launch Mock Test 1</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Mock Test 2 Card */}
        <div className="relative overflow-hidden rounded-2xl bg-white dark:bg-stone-850 p-6 border border-stone-200 dark:border-stone-750 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between group">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-blue-100 dark:bg-blue-950/60 text-blue-800 dark:text-blue-300">
                Mock Exam 2
              </span>
              <div className="flex items-center gap-1 text-xs text-stone-500 dark:text-stone-400 font-medium">
                <Clock className="w-3.5 h-3.5" />
                <span>90 Mins</span>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-bold text-stone-900 dark:text-white">
                Comprehensive Mock Paper II
              </h2>
              <p className="text-xs text-stone-600 dark:text-stone-400 mt-1 leading-relaxed">
                50 complementary questions focusing on Structured Analysis, CRC cards, Use-Case extend/include, Condition Coverage, and Mutation Testing.
              </p>
            </div>

            <div className="space-y-1.5 text-xs text-stone-600 dark:text-stone-400 pt-2 border-t border-stone-100 dark:border-stone-800">
              <div className="flex justify-between">
                <span>Questions:</span>
                <span className="font-semibold text-stone-900 dark:text-stone-200">50 Questions</span>
              </div>
              <div className="flex justify-between">
                <span>Total Marks:</span>
                <span className="font-semibold text-stone-900 dark:text-stone-200">100 Marks (2 marks/Q)</span>
              </div>
              <div className="flex justify-between">
                <span>Scoring Logic:</span>
                <span className="font-semibold text-stone-900 dark:text-stone-200">Partial MSQ + Wrong Option Rule</span>
              </div>
            </div>
          </div>

          <div className="pt-6 mt-4">
            <button
              onClick={() => onStartExam(2)}
              className="w-full py-3 rounded-xl bg-stone-900 dark:bg-stone-100 hover:bg-stone-800 dark:hover:bg-white text-white dark:text-stone-900 font-semibold text-sm flex items-center justify-center gap-2 shadow-sm transition-all spring-press"
            >
              <span>Launch Mock Test 2</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Travelling / Commute Study Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-amber-500/10 via-emerald-500/10 to-teal-500/10 dark:from-amber-950/20 dark:via-emerald-950/20 dark:to-teal-950/20 p-5 sm:p-6 border border-amber-200/60 dark:border-amber-800/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3.5">
          <div className="p-2.5 rounded-xl bg-amber-500 text-white shadow-xs shrink-0">
            <Smartphone className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-base text-stone-900 dark:text-white">
              Studying while travelling to the exam center?
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 mt-0.5">
              Switch to <strong>Travel Practice Mode</strong>: answer questions on your phone with instant solution reveals, or quickly skim all solutions like flashcards on the metro/bus.
            </p>
          </div>
        </div>
        <button
          onClick={() => onNavigate('practice')}
          className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-semibold text-xs tracking-wide shrink-0 transition-all spring-press shadow-xs flex items-center justify-center gap-1.5"
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
          className="p-4 rounded-xl bg-white dark:bg-stone-850 border border-stone-200 dark:border-stone-750 hover:border-stone-300 dark:hover:border-stone-600 cursor-pointer transition-all shadow-2xs group"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-stone-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                All 130 Questions
              </h4>
              <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
                Browse & search by Assignment (0-12)
              </p>
            </div>
          </div>
        </div>

        {/* Formula & Cheat Sheet */}
        <div 
          onClick={() => onNavigate('cheatsheet')}
          className="p-4 rounded-xl bg-white dark:bg-stone-850 border border-stone-200 dark:border-stone-750 hover:border-stone-300 dark:hover:border-stone-600 cursor-pointer transition-all shadow-2xs group"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-stone-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                High-Yield Cheat Sheet
              </h4>
              <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
                Formulas, testing metrics & UML rules
              </p>
            </div>
          </div>
        </div>

        {/* Bookmarked Questions */}
        <div 
          onClick={() => onNavigate('bank')}
          className="p-4 rounded-xl bg-white dark:bg-stone-850 border border-stone-200 dark:border-stone-750 hover:border-stone-300 dark:hover:border-stone-600 cursor-pointer transition-all shadow-2xs group sm:col-span-2 lg:col-span-1"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400">
              <Bookmark className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-stone-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                Bookmarked Questions ({bookmarkedCount})
              </h4>
              <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
                Review your starred tricky questions
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Rules & MSQ Logic Explanation Card */}
      <div className="rounded-2xl bg-white dark:bg-stone-850 p-5 sm:p-6 border border-stone-200 dark:border-stone-750 space-y-4">
        <div className="flex items-center gap-2 text-stone-900 dark:text-white font-bold text-sm sm:text-base">
          <ShieldAlert className="w-4 h-4 text-amber-600 dark:text-amber-400" />
          <span>NPTEL Examination Pattern & MSQ Partial-Scoring Engine</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-3.5 rounded-xl bg-stone-50 dark:bg-stone-800/40 border border-stone-100 dark:border-stone-800 space-y-1.5">
            <span className="font-semibold text-stone-900 dark:text-stone-200 block">
              1. Single Choice Questions (MCQ)
            </span>
            <p className="text-stone-600 dark:text-stone-400 leading-relaxed">
              Exactly one option is correct. Choosing the correct option awards full <strong>+2.0 marks</strong>. Any wrong choice or unattempted yields <strong>0 marks</strong>.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200/60 dark:border-amber-800/30 space-y-1.5">
            <span className="font-semibold text-amber-900 dark:text-amber-300 block">
              2. Multiple Select Questions (MSQ) — Strict Logic
            </span>
            <p className="text-amber-800 dark:text-amber-200/80 leading-relaxed">
              If <strong>even one wrong option</strong> is selected, the whole question is marked wrong (<strong>0 marks</strong>). Partial marks are awarded <em>only</em> if all your chosen options are correct without any incorrect selection (e.g. 2 out of 3 correct with 0 wrong gives +1.33 marks).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
