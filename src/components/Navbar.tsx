import React from 'react';
import { 
  GraduationCap, 
  Sun, 
  Moon, 
  Timer, 
  BookOpen, 
  Sparkles, 
  Layers, 
  Home
} from 'lucide-react';
import { AppMode } from '../types/quiz';

interface NavbarProps {
  currentMode: AppMode;
  onSelectMode: (mode: AppMode) => void;
  activeExamTitle?: string;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
  timerSeconds?: number;
  onExitExamRequest?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentMode,
  onSelectMode,
  activeExamTitle,
  theme,
  onToggleTheme,
  timerSeconds,
  onExitExamRequest,
}) => {
  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const s = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const isExamActive = currentMode === 'mock-exam';

  return (
    <header className="sticky top-0 z-40 w-full apple-glass border-b border-black/[0.06] dark:border-white/[0.08] transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between gap-3">
        {/* Brand */}
        <div 
          onClick={() => {
            if (isExamActive && onExitExamRequest) {
              onExitExamRequest();
            } else {
              onSelectMode('home');
            }
          }}
          className="flex items-center gap-2.5 cursor-pointer select-none group"
        >
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-sm shadow-emerald-500/20 group-hover:scale-105 transition-transform">
            <GraduationCap className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-sm sm:text-base tracking-tight text-stone-900 dark:text-white">
                NPTEL SE
              </span>
              <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300">
                IIT KGP
              </span>
            </div>
            <p className="text-[10px] text-stone-500 dark:text-stone-400 hidden sm:block">
              Software Engineering Exam Prep
            </p>
          </div>
        </div>

        {/* Center: Live Timer if in exam, or Nav Pills if outside exam */}
        {isExamActive ? (
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/40 text-amber-800 dark:text-amber-300 text-xs sm:text-sm font-semibold tracking-wide shadow-sm">
              <Timer className="w-4 h-4 animate-pulse text-amber-600 dark:text-amber-400" />
              <span>{timerSeconds !== undefined ? formatTime(timerSeconds) : '--:--'}</span>
            </div>
            <span className="text-xs font-medium text-stone-500 dark:text-stone-400 hidden md:inline">
              {activeExamTitle}
            </span>
          </div>
        ) : (
          <nav className="hidden md:flex items-center gap-1 bg-stone-100/70 dark:bg-stone-800/40 p-1 rounded-xl border border-black/5 dark:border-white/5 text-xs font-medium">
            <button
              onClick={() => onSelectMode('home')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                currentMode === 'home'
                  ? 'bg-white dark:bg-stone-700 text-stone-900 dark:text-white shadow-xs font-semibold'
                  : 'text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white'
              }`}
            >
              <div className="flex items-center gap-1.5">
                <Home className="w-3.5 h-3.5" />
                <span>Dashboard</span>
              </div>
            </button>

            <button
              onClick={() => onSelectMode('practice')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                currentMode === 'practice'
                  ? 'bg-white dark:bg-stone-700 text-stone-900 dark:text-white shadow-xs font-semibold'
                  : 'text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white'
              }`}
            >
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>Travel Practice</span>
              </div>
            </button>

            <button
              onClick={() => onSelectMode('bank')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                currentMode === 'bank'
                  ? 'bg-white dark:bg-stone-700 text-stone-900 dark:text-white shadow-xs font-semibold'
                  : 'text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white'
              }`}
            >
              <div className="flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-blue-500" />
                <span>All 130 Qs</span>
              </div>
            </button>

            <button
              onClick={() => onSelectMode('cheatsheet')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                currentMode === 'cheatsheet'
                  ? 'bg-white dark:bg-stone-700 text-stone-900 dark:text-white shadow-xs font-semibold'
                  : 'text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white'
              }`}
            >
              <div className="flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-emerald-500" />
                <span>Quick Formulas</span>
              </div>
            </button>
          </nav>
        )}

        {/* Right: Actions */}
        <div className="flex items-center gap-2">
          {isExamActive && (
            <button
              onClick={onExitExamRequest}
              className="text-xs px-2.5 py-1.5 rounded-lg border border-red-200 dark:border-red-900/50 bg-red-50 dark:bg-red-950/30 text-red-700 dark:text-red-300 hover:bg-red-100 transition-colors font-medium"
            >
              Exit Exam
            </button>
          )}

          {/* Theme switch */}
          <button
            onClick={onToggleTheme}
            className="p-2 rounded-xl text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors spring-press"
            aria-label="Toggle dark mode"
            title="Toggle theme"
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-stone-600" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
